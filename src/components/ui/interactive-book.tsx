import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { RefreshCcw, X } from 'lucide-react'

export interface BookPage {
  title?: string
  content: React.ReactNode
  backContent?: React.ReactNode
  pageNumber: number
}

export interface InteractiveBookProps {
  coverImage: string
  /** Photo shown on the left when the cover first opens */
  insideCoverImage?: string
  bookTitle?: string
  bookAuthor?: string
  pages: BookPage[]
  className?: string
  width?: number | string
  height?: number | string
  /** Tighter outer shell for corner / widget placement */
  compact?: boolean
  /** Controlled open state */
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function InteractiveBook({
  coverImage,
  insideCoverImage,
  bookTitle = 'Book Title',
  bookAuthor = 'Author Name',
  pages,
  className,
  width = 350,
  height = 500,
  compact = false,
  open,
  onOpenChange,
}: InteractiveBookProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isOpen = open ?? internalOpen
  const [currentPageIndex, setCurrentPageIndex] = useState(-1)
  const [isHovering, setIsHovering] = useState(false)

  const widthNum = typeof width === 'number' ? width : 350

  const BOOK_OPEN_DURATION = 1.5
  const EASING: [number, number, number, number] = [0.25, 0, 0, 1]

  const setOpen = (next: boolean) => {
    if (open === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }

  const handleOpenBook = () => setOpen(true)

  const handleCloseBook = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setOpen(false)
    setCurrentPageIndex(-1)
  }

  const nextPage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1)
    }
  }

  const prevPage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (currentPageIndex >= 0) {
      setCurrentPageIndex((prev) => prev - 1)
    }
  }

  const restartBook = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentPageIndex(-1)
  }

  useEffect(() => {
    if (!isOpen) setCurrentPageIndex(-1)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPage()
      if (e.key === 'ArrowLeft') prevPage()
      if (e.key === 'Escape') handleCloseBook()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentPageIndex])

  return (
    <div
      className={cn(
        'relative flex items-center justify-center perspective-2000',
        compact && 'interactive-book--compact',
        isOpen && 'interactive-book--open',
        className,
      )}
      style={{
        width: compact
          ? isOpen
            ? widthNum * 2.4
            : widthNum
          : typeof width === 'number'
            ? width * 3.5
            : '100%',
        height: compact
          ? isOpen
            ? Number(height) + 80
            : height
          : typeof height === 'number'
            ? height + 100
            : 'auto',
      }}
    >
      <motion.div
        className="relative preserve-3d"
        style={{ width, height }}
        initial={{ x: 0 }}
        animate={{ x: isOpen ? widthNum / 2 : 0 }}
        transition={{ duration: BOOK_OPEN_DURATION, ease: EASING }}
      >
        {/* Front Cover */}
        <motion.div
          className="absolute inset-0 w-full h-full origin-left"
          initial={{ rotateY: 0, zIndex: 100 }}
          animate={{
            rotateY: isOpen ? -180 : isHovering ? -15 : 0,
            zIndex: isOpen ? 0 : 100,
          }}
          transition={{
            rotateY: { duration: BOOK_OPEN_DURATION, ease: EASING },
            zIndex: {
              delay: isOpen
                ? BOOK_OPEN_DURATION * 0.6
                : BOOK_OPEN_DURATION * 0.4,
            },
          }}
          style={{ transformStyle: 'preserve-3d' }}
          onClick={!isOpen ? handleOpenBook : undefined}
          onHoverStart={() => !isOpen && setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          {/* Front Face */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden book-cover-face cursor-pointer overflow-hidden group"
            style={{ transform: 'translateZ(0.5px)' }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url(${coverImage})`,
                backgroundPosition: 'center center',
              }}
            />
            {/* Soft bottom shade for title only — keep photo sharp */}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none" />

            <div className="absolute bottom-3 left-2.5 right-2.5 text-white text-left z-10">
              <div className="book-cover-title-panel rounded-sm px-2 py-2">
                <h1 className="text-[11px] font-serif font-bold tracking-wide mb-0.5 drop-shadow-md leading-tight">
                  {bookTitle}
                </h1>
                <p className="text-[7px] font-sans tracking-widest opacity-95 uppercase border-t border-white/35 pt-1 inline-block">
                  {bookAuthor}
                </p>
              </div>
            </div>

            {/* Hardcover spine + edge */}
            <div className="book-cover-spine" aria-hidden="true" />
            <div className="book-cover-edge" aria-hidden="true" />
            <div className="book-cover-border" aria-hidden="true" />
          </div>

          {/* Back Face (Inner Cover) */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden rounded-l-md rounded-r-sm bg-[#fdfbf7] border-r border-neutral-200 shadow-xl cursor-pointer overflow-hidden book-page-sheet"
            style={{ transform: 'rotateY(180deg) translateZ(0.5px)' }}
            onClick={(e) => {
              e.stopPropagation()
              prevPage()
            }}
          >
            {insideCoverImage ? (
              <div className="book-spread-photo">
                <img
                  src={insideCoverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center text-center p-6">
                <h2 className="text-lg font-serif text-neutral-800 tracking-wide">
                  {bookTitle}
                </h2>
              </div>
            )}
            <div className="book-page-gutter book-page-gutter--right" />
          </div>
        </motion.div>

        {/* Pages Stack */}
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Stacked paper depth under the page stack */}
          <div className="book-page-stack" aria-hidden="true" />

          {pages.map((page, index) => {
            const isFlipped = index <= currentPageIndex

            return (
              <motion.div
                key={index}
                className="absolute inset-0 w-full h-full origin-left bg-[#fdfbf7] rounded-r-md rounded-l-sm book-page-sheet"
                style={{ transformStyle: 'preserve-3d' }}
                initial={{ rotateY: 0, zIndex: pages.length - index }}
                animate={{
                  rotateY: isFlipped ? -180 : 0,
                  zIndex: isFlipped ? index + 1 : pages.length - index,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.645, 0.045, 0.355, 1],
                }}
              >
                {/* Front Face (Right Side) */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden p-5 flex flex-col bg-[#fdfbf7] cursor-pointer book-page-face"
                  style={{ transform: 'translateZ(0.5px)' }}
                  onClick={(e) => {
                    e.stopPropagation()
                    nextPage()
                  }}
                >
                  <div className="flex-1 min-h-0 flex flex-col">
                    <div className="text-[10px] text-neutral-400 text-right mb-2 font-sans tracking-wider shrink-0">
                      {page.pageNumber * 2 - 1}
                    </div>
                    <div className="book-page-front flex-1 min-h-0 font-serif text-neutral-700 leading-relaxed select-none">
                      {page.title && (
                        <h3 className="text-sm font-medium text-center mb-3 text-neutral-800 tracking-tight">
                          {page.title}
                        </h3>
                      )}
                      {page.content}
                    </div>
                  </div>
                  <div className="book-page-gutter book-page-gutter--left" />
                </div>

                {/* Back Face (Left Side) */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden bg-[#fdfbf7] border-r border-neutral-200 overflow-hidden flex flex-col cursor-pointer book-page-face"
                  style={{ transform: 'rotateY(180deg) translateZ(0.5px)' }}
                  onClick={(e) => {
                    e.stopPropagation()
                    prevPage()
                  }}
                >
                  <div className="book-page-gutter book-page-gutter--right z-10" />

                  <div className="flex-1 overflow-hidden relative">
                    {page.backContent ? (
                      <div className="absolute inset-0">{page.backContent}</div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center opacity-[0.03] p-8">
                        <span className="font-serif text-8xl italic font-bold text-black">
                          {page.pageNumber * 2}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Back Cover (Static) */}
          <div
            className="absolute inset-0 w-full h-full bg-[#f4f1ea] rounded-r-md rounded-l-sm book-back-cover"
            style={{ transform: 'translateZ(-1px)', zIndex: -1 }}
          >
            <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center opacity-50">
              <p className="font-serif text-neutral-500 italic">The End</p>
              <button
                type="button"
                onClick={restartBook}
                className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors text-sm text-neutral-600 cursor-pointer"
              >
                <RefreshCcw size={14} /> Read Again
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleCloseBook}
            className="absolute top-8 right-8 p-2 rounded-full bg-white/50 hover:bg-white border border-transparent hover:border-neutral-200 backdrop-blur-sm text-neutral-800 z-[1000] transition-all hover:scale-110 shadow-sm hover:shadow-xl"
          >
            <X size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {!isOpen && !compact && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-4 text-neutral-500 text-sm font-medium tracking-widest uppercase cursor-pointer z-50 hover:text-neutral-700 transition-colors"
          onClick={handleOpenBook}
        >
          Click to Open
        </motion.div>
      )}
    </div>
  )
}

export default InteractiveBook
