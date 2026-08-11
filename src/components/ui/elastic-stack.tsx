import { useState, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface ElasticStackItem {
  id: string | number
  image?: string
  name?: string
}

export interface ElasticStackProps extends HTMLAttributes<HTMLDivElement> {
  items: ElasticStackItem[]
  itemSize?: number
  overlap?: number
  pushForce?: number
  /** Highlight the active carousel slide in the stack. */
  activeIndex?: number
  onItemSelect?: (index: number) => void
}

export function ElasticStack({
  items,
  itemSize = 70,
  overlap = 30,
  pushForce = 15,
  activeIndex,
  onItemSelect,
  className,
  ...props
}: ElasticStackProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const total = items.length
  const springEasing =
    'linear(0, 0.79 14.4%, 1.026 22.4%, 1.164 31.2%, 1.207 38.2%, 1.208 46.2%, 1.033 80%, 1)'

  return (
    <div
      className={cn(
        'flex items-center justify-center cursor-pointer py-2',
        className,
      )}
      onMouseLeave={() => setHoveredIndex(null)}
      role="tablist"
      aria-label="Carousel slides"
      {...props}
    >
      {items.map((item, i) => {
        let translateX = 0
        let scale = 1
        let zIndex = i
        const isHovered = hoveredIndex === i
        const isActive = activeIndex === i

        if (hoveredIndex !== null) {
          if (i > hoveredIndex) {
            translateX = Math.min(pushForce * (total - i - 1), overlap)
          } else if (i < hoveredIndex) {
            translateX = -Math.min(pushForce * i, overlap)
          } else {
            scale = 1.25
            zIndex = 100
          }
        } else if (isActive) {
          scale = 1.12
          zIndex = 50
        }

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={item.name ? `Show ${item.name}` : `Show slide ${i + 1}`}
            onMouseEnter={() => setHoveredIndex(i)}
            onFocus={() => setHoveredIndex(i)}
            onBlur={() => setHoveredIndex(null)}
            onClick={() => onItemSelect?.(i)}
            className={cn(
              'relative flex items-center justify-center rounded-full isolate transition-all duration-700',
              'border-2 border-white bg-[#f6f6f4] p-0',
              isHovered || isActive ? 'shadow-xl' : 'shadow-sm',
            )}
            style={{
              width: itemSize,
              height: itemSize,
              marginLeft: i === 0 ? 0 : -overlap,
              transform: `translateX(${translateX}px) scale(${scale})`,
              transitionTimingFunction: springEasing,
              zIndex,
            }}
          >
            {item.image ? (
              <img
                src={item.image}
                alt=""
                className="pointer-events-none h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full font-semibold text-neutral-500">
                {item.name ? item.name.charAt(0) : i + 1}
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default ElasticStack
