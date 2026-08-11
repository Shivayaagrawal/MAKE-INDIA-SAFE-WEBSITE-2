import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface FaqItem {
  question: string
  answer: ReactNode
}

export interface FaqAccordionProps extends HTMLAttributes<HTMLDivElement> {
  items?: FaqItem[]
  title?: string
}

const DEFAULT_ITEMS: FaqItem[] = [
  {
    question: 'What is Vengeance UI?',
    answer:
      'Vengeance UI is a high-performance, dark-mode first component library designed for the next generation of web applications.',
  },
  {
    question: 'Can I use it with Tailwind CSS?',
    answer:
      'Yes! All components are built on top of Tailwind CSS and highly customizable using utility classes.',
  },
  {
    question: 'Are the components accessible?',
    answer:
      'Accessibility is a core focus. We ensure proper ARIA attributes, keyboard navigation, and semantic HTML structure.',
  },
  {
    question: 'Do I need to install a heavy npm package?',
    answer:
      'No. Vengeance UI provides a CLI that lets you copy and paste only the components you need directly into your project.',
  },
  {
    question: 'Is it compatible with React and Next.js?',
    answer:
      'Absolutely. The library is built with React in mind and perfectly supports Next.js Server Components and client-side rendering.',
  },
]

export function FaqAccordion({
  items = DEFAULT_ITEMS,
  title = 'Vengeance UI FAQs',
  className,
  ...props
}: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div
      className={cn('w-full max-w-3xl mx-auto py-8 relative font-sans', className)}
      {...props}
    >
      {title ? (
        <h2 className="text-center font-bold text-2xl md:text-3xl mb-10 text-neutral-500">
          {title}
        </h2>
      ) : null}

      <ul className="w-full mx-auto list-none p-0 flex flex-col">
        {items.map((item, index) => {
          const isActive = activeIndex === index
          return (
            <li
              key={index}
              className={cn(
                'w-full relative transition-all duration-300 ease-in',
                'border-b-2 border-neutral-100',
                'last:border-b-0',
                isActive ? 'border-b border-neutral-200' : '',
              )}
            >
              <button
                type="button"
                className={cn(
                  'flex flex-row items-center gap-3 w-full min-h-[60px] py-4 relative m-0 pr-12 pl-4 cursor-pointer',
                  'border-l-[6px] md:border-l-[10px] transition-colors duration-200 text-left outline-none text-base md:text-lg',
                  isActive
                    ? 'border-l-neutral-900 bg-neutral-100/50 text-neutral-900 font-semibold'
                    : 'border-l-neutral-300 bg-transparent text-neutral-600 hover:border-l-neutral-500 hover:text-neutral-900 hover:bg-neutral-50',
                )}
                onClick={() => toggleItem(index)}
                aria-expanded={isActive}
              >
                <span
                  className={cn(
                    'flex shrink-0 items-center justify-center w-8 h-8 text-2xl leading-none transition-colors duration-200',
                    isActive ? 'text-neutral-900' : 'text-neutral-400',
                  )}
                  aria-hidden="true"
                >
                  {isActive ? '−' : '+'}
                </span>

                <span className="flex-1 pr-2">{item.question}</span>

                <span
                  className={cn(
                    'absolute right-6 block w-2 h-2 border-t-[3px] border-r-[3px] transition-transform duration-200 ease-in-out',
                    isActive
                      ? 'rotate-[-44deg] border-neutral-900'
                      : 'rotate-[133deg] border-neutral-400',
                  )}
                />
              </button>

              <div
                className={cn(
                  'grid transition-all duration-300 ease-in-out w-full',
                  'border-l-[6px] md:border-l-[10px]',
                  isActive
                    ? 'grid-rows-[1fr] border-l-neutral-900 bg-neutral-100/50'
                    : 'grid-rows-[0fr] border-l-neutral-300 bg-transparent',
                )}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-row items-start w-full pr-12 pl-4 pb-6 pt-1 text-base md:text-lg font-normal text-neutral-700">
                    <span className="w-8 shrink-0" aria-hidden="true" />
                    <span className="opacity-90 italic pl-3">{item.answer}</span>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default FaqAccordion
