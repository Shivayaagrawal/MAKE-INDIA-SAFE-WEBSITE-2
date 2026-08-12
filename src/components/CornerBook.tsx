import { useState, type ReactNode } from 'react'
import { InteractiveBook, type BookPage } from './ui/interactive-book'
import './CornerBook.css'

function BookPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="book-spread-photo">
      <img src={src} alt={alt} />
    </div>
  )
}

function BookCopy({
  chapter,
  title,
  children,
}: {
  chapter: string
  title: string
  children: ReactNode
}) {
  return (
    <div className="book-spread-copy">
      <p className="book-spread-copy__chapter">{chapter}</p>
      <h3 className="book-spread-copy__heading">{title}</h3>
      <div className="book-spread-copy__body">{children}</div>
    </div>
  )
}

/**
 * On open: left = insideCoverImage (Chapter 1 photo), right = first page text.
 * After flipping sheet N: left = sheet N back (next photo), right = sheet N+1 text.
 */
export const BOOK_PAGES: BookPage[] = [
  {
    pageNumber: 1,
    content: (
      <BookCopy chapter="Chapter 1" title="Every Hospital Bed">
        <p>Every hospital bed has a story.</p>
        <p>Most of them didn&apos;t begin here.</p>
      </BookCopy>
    ),
    backContent: (
      <BookPhoto
        src="/images/book/page-2-students.png"
        alt="Talking with students at a campus event"
      />
    ),
  },
  {
    pageNumber: 2,
    content: (
      <BookCopy chapter="Chapter 2" title="Talking to Students">
        <p>Many illnesses don&apos;t arrive suddenly.</p>
        <p>They begin with years of unanswered questions.</p>
      </BookCopy>
    ),
    backContent: (
      <BookPhoto
        src="/images/book/page-3-community.png"
        alt="A community visit in a hospital hallway"
      />
    ),
  },
  {
    pageNumber: 3,
    content: (
      <BookCopy chapter="Chapter 3" title="Community Visit">
        <p>
          A single conversation can change how someone eats, lives, and cares
          for their family.
        </p>
      </BookCopy>
    ),
    backContent: (
      <BookPhoto
        src="/images/book/page-4-meeting.png"
        alt="Meeting people in a clinic office"
      />
    ),
  },
  {
    pageNumber: 4,
    content: (
      <BookCopy chapter="Chapter 4" title="Meeting People">
        <p>
          When knowledge reaches a community, prevention reaches generations.
        </p>
      </BookCopy>
    ),
    backContent: (
      <BookPhoto
        src="/images/book/page-5-portrait.png"
        alt="Portrait of Dr. Yokesh Arul"
      />
    ),
  },
  {
    pageNumber: 5,
    content: (
      <BookCopy chapter="Chapter 5" title="Why We Started Make India Safe">
        <p>That&apos;s why we started Make India Safe.</p>
        <p>
          Making trusted healthcare knowledge accessible to every Indian.
        </p>
      </BookCopy>
    ),
  },
]

interface CornerBookProps {
  /** Controlled open state — lets other UI (e.g. a founder teaser) open the book. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CornerBook({
  open: openProp,
  onOpenChange,
}: CornerBookProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = openProp ?? internalOpen

  const setOpen = (next: boolean) => {
    if (openProp === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }

  return (
    <aside
      className={`corner-book${open ? ' corner-book--open' : ''}`}
      aria-label="Make India Safe book"
    >
      {open ? (
        <button
          type="button"
          className="corner-book__backdrop"
          aria-label="Close book"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <div className="corner-book__stage">
        <InteractiveBook
          coverImage="/images/book/cover-stethoscope.png"
          insideCoverImage="/images/book/page-1-hospital.png"
          bookTitle="Make India Safe"
          bookAuthor="Dr. Yokesh Arul"
          pages={BOOK_PAGES}
          width={150}
          height={215}
          compact
          open={open}
          onOpenChange={setOpen}
        />
      </div>
    </aside>
  )
}
