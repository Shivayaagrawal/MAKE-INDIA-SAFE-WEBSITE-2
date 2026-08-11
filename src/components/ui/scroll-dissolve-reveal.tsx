import { Suspense, useEffect, useMemo, useRef, type ReactNode, type RefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrthographicCamera, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useScroll, type MotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

const coverVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const coverFragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform float uDissolve;
  uniform vec2 uCenter;
  uniform float uTime;
  uniform float uGrayscale;
  uniform float uEdgeIntensity;
  uniform float uEdgeBrightness;
  varying vec2 vUv;

  mat3 sobelX = mat3(
    -1.0, 0.0, 1.0,
    -2.0, 0.0, 2.0,
    -1.0, 0.0, 1.0
  );

  mat3 sobelY = mat3(
    -1.0, -2.0, -1.0,
     0.0,  0.0,  0.0,
     1.0,  2.0,  1.0
  );

  float getLuminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
  }

  float sobel(sampler2D tex, vec2 uv, vec2 texelSize) {
    float gx = 0.0;
    float gy = 0.0;

    for (int i = -1; i <= 1; i++) {
      for (int j = -1; j <= 1; j++) {
        vec2 offset = vec2(float(i), float(j)) * texelSize;
        float lum = getLuminance(texture2D(tex, uv + offset).rgb);
        gx += lum * sobelX[i + 1][j + 1];
        gy += lum * sobelY[i + 1][j + 1];
      }
    }

    return sqrt(gx * gx + gy * gy);
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }

    return value;
  }

  void main() {
    vec2 ratio = vec2(
      max((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
      max((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
    );

    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    // Letterbox instead of cropping when the frame doesn't match the image.
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
      return;
    }

    vec4 texColor = texture2D(uTexture, uv);

    float gray = getLuminance(texColor.rgb);
    vec3 grayscaleColor = vec3(gray);
    texColor.rgb = mix(texColor.rgb, grayscaleColor, uGrayscale);

    vec2 centeredUv = vUv - uCenter;
    float aspect = uResolution.x / uResolution.y;
    centeredUv.x *= aspect;
    float dist = length(centeredUv);

    float angle = atan(centeredUv.y, centeredUv.x);

    float noiseScale = 6.0;
    vec2 pixelatedUv = floor(vUv * uResolution / noiseScale) * noiseScale / uResolution;
    float blockNoise = fbm(pixelatedUv * 100.0) * 0.15;

    float angularNoise = fbm(vec2(angle * 5.0, 0.0)) * 0.15;

    float totalNoise = blockNoise + angularNoise;
    float noisyDist = dist + totalNoise;

    float maxDist = length(vec2(aspect * 0.5, 0.5));
    float normalizedDist = noisyDist / maxDist;

    float dissolveThreshold = uDissolve * 1.5;

    vec2 texelSize = 1.0 / uImageResolution;
    float edge = sobel(uTexture, uv, texelSize);

    edge = pow(edge, 0.7) * 2.0;
    edge = clamp(edge, 0.0, 1.0);

    float dissolveMask = smoothstep(dissolveThreshold - 0.03, dissolveThreshold, normalizedDist);

    vec3 edgeColor = vec3(1.0, 1.0, 1.0);

    // Extra lift for dark confusion frame so bubble text stays clear
    vec3 baseColor = clamp(texColor.rgb * 1.2 + 0.06, 0.0, 1.0);
    vec3 finalColor = baseColor;

    float edgeGlowIntensity = uEdgeIntensity * 2.0;
    float edgeGlow = edge * edgeGlowIntensity * (1.0 + uGrayscale * 3.0);
    finalColor += edgeColor * edgeGlow * uEdgeBrightness;

    float edgeZoneWidth = 0.15 * (1.0 - uDissolve) + 0.02;
    float edgeZone = smoothstep(dissolveThreshold - edgeZoneWidth, dissolveThreshold - edgeZoneWidth + 0.04, normalizedDist) *
                     smoothstep(dissolveThreshold + 0.02, dissolveThreshold - 0.02, normalizedDist);
    float sparkle = hash(floor(vUv * uResolution / 4.0)) * edgeZone;

    float edgeBrightness = (1.0 - uDissolve) * uEdgeBrightness * (1.0 + uGrayscale * 2.0);
    finalColor += vec3(sparkle * 3.0 * edgeBrightness);

    float alpha = dissolveMask * texColor.a;

    gl_FragColor = vec4(finalColor, alpha);
  }
`

const coverFragmentShaderReverse = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform float uDissolve;
  uniform vec2 uCenter;
  uniform float uTime;
  uniform float uBrightness;
  uniform float uEdgeIntensity;
  uniform float uDarkness;
  uniform float uGrayscale;
  varying vec2 vUv;

  mat3 sobelX = mat3(
    -1.0, 0.0, 1.0,
    -2.0, 0.0, 2.0,
    -1.0, 0.0, 1.0
  );

  mat3 sobelY = mat3(
    -1.0, -2.0, -1.0,
     0.0,  0.0,  0.0,
     1.0,  2.0,  1.0
  );

  float getLuminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
  }

  float sobel(sampler2D tex, vec2 uv, vec2 texelSize) {
    float gx = 0.0;
    float gy = 0.0;

    for (int i = -1; i <= 1; i++) {
      for (int j = -1; j <= 1; j++) {
        vec2 offset = vec2(float(i), float(j)) * texelSize;
        float lum = getLuminance(texture2D(tex, uv + offset).rgb);
        gx += lum * sobelX[i + 1][j + 1];
        gy += lum * sobelY[i + 1][j + 1];
      }
    }

    return sqrt(gx * gx + gy * gy);
  }

  void main() {
    vec2 ratio = vec2(
      max((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
      max((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
    );

    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    // Letterbox instead of cropping when the frame doesn't match the image.
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
      return;
    }

    vec4 texColor = texture2D(uTexture, uv);

    float gray = getLuminance(texColor.rgb);
    vec3 grayscaleColor = vec3(gray);
    texColor.rgb = mix(texColor.rgb, grayscaleColor, uGrayscale);

    vec2 texelSize = 1.0 / uImageResolution;
    float edge = sobel(uTexture, uv, texelSize);

    edge = pow(edge, 0.7) * 2.0;
    edge = clamp(edge, 0.0, 1.0);

    vec3 edgeColor = vec3(1.0, 1.0, 1.0);

    // Soft lift instead of crushing to black
    vec3 lifted = clamp(texColor.rgb * 1.1 + 0.04, 0.0, 1.0);
    vec3 baseColor = mix(lifted, lifted * 0.85, uDarkness);

    float edgeGlow = edge * uEdgeIntensity * 1.2;
    baseColor += edgeColor * edgeGlow;

    vec3 finalColor = clamp(baseColor, 0.0, 1.0);

    gl_FragColor = vec4(finalColor, texColor.a);
  }
`

interface SceneProps {
  imageFront: string
  imageBack: string
  scrollYProgress: MotionValue<number>
}

function imageSize(texture: THREE.Texture) {
  const img = texture.image as { width?: number; height?: number } | undefined
  return new THREE.Vector2(img?.width ?? 1, img?.height ?? 1)
}

function Scene({ imageFront, imageBack, scrollYProgress }: SceneProps) {
  const [texture1, texture2] = useTexture([imageFront, imageBack])
  const material1Ref = useRef<THREE.ShaderMaterial>(null)
  const material2Ref = useRef<THREE.ShaderMaterial>(null)
  const { size } = useThree()

  useEffect(() => {
    for (const texture of [texture1, texture2]) {
      texture.colorSpace = THREE.SRGBColorSpace
      texture.minFilter = THREE.LinearMipmapLinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.anisotropy = 8
      texture.needsUpdate = true
    }
  }, [texture1, texture2])

  const uniforms1 = useMemo(
    () => ({
      uTexture: { value: texture1 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uImageResolution: { value: imageSize(texture1) },
      uDissolve: { value: 0.0 },
      uCenter: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0.0 },
      uGrayscale: { value: 0.0 },
      uEdgeIntensity: { value: 0.0 },
      uEdgeBrightness: { value: 1.0 },
    }),
    [texture1, size],
  )

  const uniforms2 = useMemo(
    () => ({
      uTexture: { value: texture2 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uImageResolution: { value: imageSize(texture2) },
      uDissolve: { value: 0.0 },
      uCenter: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0.0 },
      uBrightness: { value: 0.0 },
      uEdgeIntensity: { value: 0.05 },
      uDarkness: { value: 0.08 },
      uGrayscale: { value: 0.0 },
    }),
    [texture2, size],
  )

  useFrame((state) => {
    const timeInSeconds = state.clock.getElapsedTime()
    const progress = scrollYProgress.get()

    if (material1Ref.current) {
      material1Ref.current.uniforms.uTime.value = timeInSeconds
      material1Ref.current.uniforms.uResolution.value.set(size.width, size.height)
      material1Ref.current.uniforms.uDissolve.value = progress
      // Keep question bubbles readable — almost no grayscale washout
      material1Ref.current.uniforms.uGrayscale.value = Math.min(0.08, progress * 0.1)
      material1Ref.current.uniforms.uEdgeIntensity.value = progress * 0.08
      material1Ref.current.uniforms.uEdgeBrightness.value = 1.0 - progress * 0.4
    }

    if (material2Ref.current) {
      material2Ref.current.uniforms.uTime.value = timeInSeconds
      material2Ref.current.uniforms.uResolution.value.set(size.width, size.height)
      const acceleratedProgress = Math.min(1.0, progress * 1.15)
      material2Ref.current.uniforms.uEdgeIntensity.value =
        0.05 * (1.0 - acceleratedProgress)
      material2Ref.current.uniforms.uDarkness.value =
        0.08 * (1.0 - acceleratedProgress)
      material2Ref.current.uniforms.uGrayscale.value = 0.0
    }
  })

  return (
    <>
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={material2Ref}
          vertexShader={coverVertexShader}
          fragmentShader={coverFragmentShaderReverse}
          uniforms={uniforms2}
          transparent
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={material1Ref}
          vertexShader={coverVertexShader}
          fragmentShader={coverFragmentShader}
          uniforms={uniforms1}
          transparent
        />
      </mesh>
    </>
  )
}

export interface ScrollDissolveRevealProps {
  imageFront: string
  imageBack: string
  className?: string
  containerClassName?: string
  scrollContainerRef?: RefObject<HTMLElement | null>
  children?: ReactNode
}

export function ScrollDissolveReveal({
  imageFront,
  imageBack,
  className,
  containerClassName,
  scrollContainerRef,
  children,
}: ScrollDissolveRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
    ...(scrollContainerRef ? { container: scrollContainerRef } : {}),
  })

  return (
    <div
      ref={containerRef}
      className={cn('relative h-[300vh] w-full', containerClassName)}
    >
      <div className={cn('sticky top-0 h-screen w-full bg-white', className)}>
        <Canvas
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
          style={{ width: '100%', height: '100%' }}
        >
          <OrthographicCamera
            makeDefault
            manual
            left={-1}
            right={1}
            top={1}
            bottom={-1}
            near={0.1}
            far={10}
            position={[0, 0, 1]}
          />
          <Suspense fallback={null}>
            <Scene
              imageFront={imageFront}
              imageBack={imageBack}
              scrollYProgress={scrollYProgress}
            />
          </Suspense>
        </Canvas>
        {children}
      </div>
    </div>
  )
}

export default ScrollDissolveReveal
