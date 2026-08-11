import * as React from 'react'
import { motion, type Transition } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ElasticStack } from './elastic-stack'

export interface PerspectiveCarouselItem {
  src: string
  title: string
  alt?: string
}

export interface PerspectiveCarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: PerspectiveCarouselItem[]
  activeIndex?: number
  defaultActiveIndex?: number
  onActiveIndexChange?: (index: number) => void
  loop?: boolean
  slideWidth?: number
  rotationStep?: number
  inactiveScale?: number
  transition?: Transition
  showControls?: boolean
  viewportClassName?: string
  slideClassName?: string
  imageClassName?: string
  labelClassName?: string
  controlsClassName?: string
  stackItemSize?: number
  stackOverlap?: number
}

const DEFAULT_TRANSITION: Transition = {
  type: 'spring',
  bounce: 0.14,
  duration: 0.9,
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

export function PerspectiveCarousel({
  items,
  activeIndex,
  defaultActiveIndex = 0,
  onActiveIndexChange,
  loop = false,
  slideWidth = 200,
  rotationStep = 60,
  inactiveScale = 0.85,
  transition = DEFAULT_TRANSITION,
  showControls = true,
  viewportClassName,
  slideClassName,
  imageClassName,
  labelClassName,
  controlsClassName,
  stackItemSize = 48,
  stackOverlap = 20,
  className,
  onKeyDown,
  tabIndex,
  ...props
}: PerspectiveCarouselProps) {
  const maxIndex = Math.max(0, items.length - 1)
  const [uncontrolledIndex, setUncontrolledIndex] = React.useState(() =>
    clamp(defaultActiveIndex, 0, maxIndex),
  )
  const currentIndex = clamp(activeIndex ?? uncontrolledIndex, 0, maxIndex)
  const safeSlideWidth = Math.max(96, slideWidth)
  const safeInactiveScale = clamp(inactiveScale, 0.5, 1)

  const selectSlide = React.useCallback(
    (nextIndex: number) => {
      if (!items.length) return

      const resolvedIndex = loop
        ? (nextIndex + items.length) % items.length
        : clamp(nextIndex, 0, maxIndex)

      if (activeIndex === undefined) {
        setUncontrolledIndex(resolvedIndex)
      }

      onActiveIndexChange?.(resolvedIndex)
    },
    [activeIndex, items.length, loop, maxIndex, onActiveIndexChange],
  )

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      selectSlide(currentIndex - 1)
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      selectSlide(currentIndex + 1)
    }
  }

  if (!items.length) return null

  const stackItems = items.map((item, index) => ({
    id: `${item.title}-${index}`,
    image: item.src,
    name: item.title,
  }))

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Health questions carousel"
      tabIndex={tabIndex ?? 0}
      onKeyDown={handleKeyDown}
      className={cn('relative isolate h-full w-full overflow-visible', className)}
      {...props}
    >
      <div
        className={cn(
          'absolute inset-0 overflow-hidden',
          showControls && 'bottom-16',
          viewportClassName,
        )}
        style={{ perspective: '1200px' }}
      >
        <motion.div
          className="absolute left-1/2 top-[46%] flex w-fit -translate-y-1/2 items-center"
          animate={{ x: -(currentIndex * safeSlideWidth + safeSlideWidth / 2) }}
          transition={transition}
        >
          {items.map((item, index) => {
            const isActive = currentIndex === index

            return (
              <div
                key={`${item.src}-${index}`}
                className="shrink-0"
                style={{ width: safeSlideWidth, perspective: '1200px' }}
              >
                <motion.div
                  className={cn(
                    'flex w-full flex-col items-center gap-3 will-change-transform',
                    slideClassName,
                  )}
                  animate={{
                    rotateY: (currentIndex - index) * rotationStep,
                    scale: isActive ? 1 : safeInactiveScale,
                  }}
                  transition={transition}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <button
                    type="button"
                    aria-label={`Show ${item.title}`}
                    aria-current={isActive ? 'true' : undefined}
                    className="aspect-[3/4] w-full cursor-pointer bg-transparent p-0"
                    onClick={() => selectSlide(index)}
                  >
                    <img
                      src={item.src}
                      alt={item.alt ?? item.title}
                      draggable={false}
                      className={cn(
                        'h-full w-full select-none rounded-lg object-cover shadow-xl',
                        imageClassName,
                      )}
                    />
                  </button>

                  <motion.p
                    className={cn(
                      'max-w-[18ch] text-center text-sm leading-snug',
                      labelClassName,
                    )}
                    animate={{
                      filter: isActive ? 'blur(0px)' : 'blur(2px)',
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={transition}
                  >
                    {item.title}
                  </motion.p>
                </motion.div>
              </div>
            )
          })}
        </motion.div>
      </div>

      {showControls ? (
        <div
          className={cn(
            'absolute inset-x-0 bottom-2 z-10 flex justify-center',
            controlsClassName,
          )}
        >
          <ElasticStack
            items={stackItems}
            itemSize={stackItemSize}
            overlap={stackOverlap}
            pushForce={14}
            activeIndex={currentIndex}
            onItemSelect={selectSlide}
          />
        </div>
      ) : null}
    </div>
  )
}

export default PerspectiveCarousel
