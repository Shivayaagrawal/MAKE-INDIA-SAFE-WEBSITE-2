import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface CarouselImage {
  src: string
  alt?: string
}

export interface CylinderCarouselProps extends HTMLAttributes<HTMLDivElement> {
  images: CarouselImage[]
  containerClassName?: string
  cardClassName?: string
  animationDuration?: number
  cardWidth?: number
}

export const CylinderCarousel = forwardRef<
  HTMLDivElement,
  CylinderCarouselProps
>(function CylinderCarousel(
  {
    images,
    className,
    containerClassName,
    cardClassName,
    animationDuration = 32,
    cardWidth = 250,
    ...props
  },
  ref,
) {
  const n = images.length
  const customStyle = {
    '--n': n,
    '--w': `${cardWidth}px`,
    '--ba': 'calc(1turn / var(--n))',
    '--anim-dur': `${animationDuration}s`,
  } as CSSProperties

  return (
    <div
      ref={ref}
      className={cn(
        'grid h-full min-h-125 w-full place-items-center overflow-hidden',
        className,
      )}
      style={{
        perspective: '35em',
        maskImage:
          'linear-gradient(90deg, transparent, #000 20% 80%, transparent)',
        WebkitMaskImage:
          'linear-gradient(90deg, transparent, #000 20% 80%, transparent)',
      }}
      {...props}
    >
      <div
        className={cn(
          'grid place-items-center [transform-style:preserve-3d] motion-reduce:animate-[ry_128s_linear_infinite]!',
          containerClassName,
        )}
        style={{
          ...customStyle,
          animation: 'ry var(--anim-dur) linear infinite',
        }}
      >
        <style>
          {`
            @keyframes ry {
              to { transform: rotateY(1turn); }
            }
          `}
        </style>

        {images.map((img, i) => (
          <img
            key={`${img.src}-${i}`}
            src={img.src}
            alt={img.alt || `Carousel image ${i + 1}`}
            className={cn(
              '[grid-area:1/1] max-w-none object-cover rounded-2xl backface-hidden',
              cardClassName,
            )}
            style={
              {
                width: 'var(--w)',
                aspectRatio: '7/10',
                '--i': i,
                transform:
                  'rotateY(calc(var(--i) * var(--ba))) translateZ(calc(-1 * (0.5 * var(--w) + 0.5em) / tan(0.5 * var(--ba))))',
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  )
})

CylinderCarousel.displayName = 'CylinderCarousel'
