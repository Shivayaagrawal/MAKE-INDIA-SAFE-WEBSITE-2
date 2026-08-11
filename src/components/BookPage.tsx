import { BOOK_PAGES } from './CornerBook'
import { InteractiveBook } from './ui/interactive-book'
import './BookPage.css'

/** Full-page book view (standalone). Prefer CornerBook on the homepage. */
export function BookPageView() {
  return (
    <main className="book-page" aria-label="Make India Safe">
        <InteractiveBook
          coverImage="/images/book/cover-stethoscope.png"
          insideCoverImage="/images/book/page-1-hospital.png"
          bookTitle="Make India Safe"
          bookAuthor="Dr. Yokesh Arul"
          pages={BOOK_PAGES}
          width={320}
          height={460}
        />
    </main>
  )
}
