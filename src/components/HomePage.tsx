import { useEffect, useRef, type ReactNode } from 'react'
import { CornerBook } from './CornerBook'
import {
  PerspectiveCarousel,
  type PerspectiveCarouselItem,
} from './ui/perspective-carousel'
import { ScrollDissolveReveal } from './ui/scroll-dissolve-reveal'
import { LiquidMetalButton } from './ui/liquid-metal'
import GradientText from './ui/gradient-text'
import { FlipText } from './ui/flip-text'
import { FaqAccordion, type FaqItem } from './ui/faq-accordion'
import { SessionDateHighlight } from './ui/session-date-highlight'
import './HomePage.css'

const HEADING_GRADIENT = ['#000000', '#ffffff', '#000000'] as const

function HeadingGradient({ children }: { children: ReactNode }) {
  return (
    <GradientText
      colors={[...HEADING_GRADIENT]}
      animationSpeed={8}
      showBorder={false}
    >
      {children}
    </GradientText>
  )
}

/** Everyday questions — images matched to each topic. */
const QUESTION_CAROUSEL: PerspectiveCarouselItem[] = [
  {
    src: '/images/questions/q-rice.jpg',
    title: 'Does rice really raise diabetes risk?',
    alt: 'Bowl of cooked white rice',
  },
  {
    src: '/images/questions/q-fruit.jpg',
    title: 'Should fruit be avoided?',
    alt: 'Fresh fruit platter with mango, berries, and apple',
  },
  {
    src: '/images/questions/q-insulin.jpg',
    title: 'What is insulin resistance?',
    alt: 'Blood glucose meter and insulin syringes',
  },
  {
    src: '/images/questions/q-jaggery.jpg',
    title: 'Is jaggery healthier than sugar?',
    alt: 'Cubes of traditional Indian jaggery',
  },
  {
    src: '/images/questions/q-young-adults.jpg',
    title: 'Why are younger adults getting diabetes?',
    alt: 'Group of young adults',
  },
  {
    src: '/images/questions/q-lifestyle.jpg',
    title: 'Can lifestyle change reduce long-term risk?',
    alt: 'Person exercising as part of a healthy lifestyle',
  },
  {
    src: '/images/questions/q-food-label.jpg',
    title: 'How should food labels actually be read?',
    alt: 'Nutrition Facts food label',
  },
]

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Does eating rice really increase diabetes risk?',
    answer:
      'Rice itself is not the enemy—portion size, how it’s prepared, and what you eat with it matter more. We’ll walk through the evidence so you can make sense of the headlines.',
  },
  {
    question: 'Should fruit be avoided?',
    answer:
      'Whole fruit is not the same as fruit juice or desserts. We’ll separate myth from metabolic science and show when fruit fits a healthy plate.',
  },
  {
    question: 'What exactly is insulin resistance?',
    answer:
      'Insulin resistance is when the body stops responding well to insulin. We’ll explain it in plain language—and why it sits at the center of type 2 diabetes risk.',
  },
  {
    question: 'Is jaggery healthier than sugar?',
    answer:
      'Jaggery is still sugar. We’ll compare how the body handles both, and what “healthier sweetener” claims actually mean.',
  },
  {
    question: 'Why are younger adults developing diabetes?',
    answer:
      'Earlier onset is rising in India. We’ll look at diet, activity, sleep, and stress—and what that means for prevention in your 20s and 30s.',
  },
  {
    question: 'Can lifestyle changes reduce long-term risk?',
    answer:
      'Yes—when they’re specific and sustainable. We’ll cover which changes have the strongest evidence, and how to apply them without overwhelm.',
  },
  {
    question: 'How should food labels actually be read?',
    answer:
      'Labels hide more than they show. We’ll teach a simple method to spot added sugars, portions, and marketing language that confuses shoppers.',
  },
]

function useReveal() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>('[data-reveal]'),
    )

    const reveal = (el: Element) => {
      el.classList.add('is-visible')
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0, rootMargin: '0px 0px -4% 0px' },
    )

    const checkVisible = () => {
      for (const node of nodes) {
        if (node.classList.contains('is-visible')) continue
        const rect = node.getBoundingClientRect()
        const inView =
          rect.bottom > 40 && rect.top < window.innerHeight - 40
        if (inView) {
          reveal(node)
          observer.unobserve(node)
        } else {
          observer.observe(node)
        }
      }
    }

    // HomePage mounts after the loading screen — wait for layout.
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(checkVisible)
    })
    const timeout = window.setTimeout(checkVisible, 150)
    window.addEventListener('scroll', checkVisible, { passive: true })
    window.addEventListener('resize', checkVisible)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(timeout)
      observer.disconnect()
      window.removeEventListener('scroll', checkVisible)
      window.removeEventListener('resize', checkVisible)
    }
  }, [])

  return rootRef
}

export function HomePage({ onReserve }: { onReserve?: () => void }) {
  const rootRef = useReveal()

  return (
    <div className="home" ref={rootRef}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="site-header">
        <div className="site-header__inner">
          <a href="#top" className="brand-mark" aria-label="Make India Safe">
            <FlipText duration={2.4} delay={0.15} loop>
              Make India Safe
            </FlipText>
          </a>
          <LiquidMetalButton
            className="header-cta-metal"
            size="sm"
            borderWidth={3}
            metalConfig={{
              colorBack: '#6b6b6f',
              colorTint: '#ffffff',
              speed: 0.45,
              repetition: 4,
              distortion: 0.12,
            }}
            onClick={() => {
              if (onReserve) {
                onReserve()
                return
              }
              document.getElementById('reserve')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }}
          >
            Reserve a Spot
          </LiquidMetalButton>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="hero" id="top" aria-labelledby="hero-heading">
          <div className="hero__copy" data-reveal>
            <h1 id="hero-heading">
              <HeadingGradient>
                You shouldn&apos;t need a medical degree to understand your own
                health.
              </HeadingGradient>
            </h1>

            <p className="hero__lede">
              Practical, evidence-based medical education for everyday
              decisions—from food labels to when to see a doctor.
            </p>
          </div>

          <div className="hero__carousel" data-reveal>
            <PerspectiveCarousel
              items={QUESTION_CAROUSEL}
              defaultActiveIndex={0}
              loop
              showControls={false}
              slideWidth={200}
              rotationStep={52}
              inactiveScale={0.82}
              className="hero-carousel"
              labelClassName="hero-carousel__label"
              imageClassName="hero-carousel__image"
            />
          </div>
        </section>

        {/* Confusion */}
        <section className="section confusion" aria-labelledby="confusion-heading">
          <div className="section__grid">
            <div className="confusion__visual">
              <img
                src="/images/clinical-note.png?v=2"
                alt="Clinical note surrounded by conflicting health claims from WhatsApp and YouTube"
                className="confusion__transition-image"
                width={1678}
                height={998}
              />
            </div>

            <div className="section__copy">
              <h2 id="confusion-heading">
                <HeadingGradient>
                  Healthcare isn&apos;t becoming more complicated.
                  <span className="line-break">
                    We&apos;re making it complicated.
                  </span>
                </HeadingGradient>
              </h2>
              <p>
                People don&apos;t struggle because medical science is difficult.
              </p>
              <p>
                They struggle because every platform tells a different story.
              </p>
              <p>
                One article says avoid rice.
                <br />
                Another says rice is fine.
              </p>
              <p>
                One video says fruit raises sugar.
                <br />
                Another says fruit prevents diabetes.
              </p>
              <p className="emphasis">
                The result isn&apos;t better health.
                <br />
                It&apos;s confusion.
              </p>
            </div>
          </div>
        </section>

        {/* What we're trying to fix */}
        <section
          className="section fix"
          aria-labelledby="fix-heading"
        >
          <div className="fix__layout">
            <div className="section__copy fix__copy">
              <h2 id="fix-heading">
                <HeadingGradient>What we&apos;re trying to fix.</HeadingGradient>
              </h2>
              <p>People don&apos;t need more health content.</p>
              <p className="lede">They need better health content.</p>
              <p>That means information that</p>
              <ul className="principle-list">
                <li>is medically accurate,</li>
                <li>explains the reasoning,</li>
                <li>acknowledges uncertainty,</li>
                <li>and can actually be applied in daily life.</li>
              </ul>
              <p>
                Every Make India Safe session follows the same principle.
              </p>
            </div>

            <div
              className="fix__visual"
              aria-label="From health confusion to clear understanding"
            >
              <ScrollDissolveReveal
                imageFront="/images/dissolve/confusion.png?v=6"
                imageBack="/images/dissolve/clarity.png?v=6"
                className="fix__dissolve-stage"
                containerClassName="fix__dissolve-scroll"
              />
            </div>
          </div>
        </section>

        {/* Masterclass */}
        <section
          className="section masterclass"
          id="reserve"
          aria-labelledby="masterclass-heading"
        >
          <div className="section__narrow">
            <h2 id="masterclass-heading">
              <HeadingGradient>
                We begin with Diet &amp; Diabetes.
              </HeadingGradient>
            </h2>
            <p>
              India has one of the world&apos;s largest populations living with
              diabetes.
            </p>
            <p>
              Understanding nutrition shouldn&apos;t begin after diagnosis.
              <br />
              It should begin much earlier.
            </p>
            <p>
              This session explains the science behind diet, insulin resistance
              and metabolic health using current medical evidence—not internet
              trends.
            </p>
          </div>
        </section>

        {/* Questions */}
        <section
          className="section questions"
          id="questions"
          aria-labelledby="questions-heading"
        >
          <div className="section__wide">
            <h2 id="questions-heading">
              <HeadingGradient>Questions we&apos;ll answer.</HeadingGradient>
            </h2>
            <FaqAccordion
              title=""
              items={FAQ_ITEMS}
              className="questions-faq"
            />
          </div>
        </section>

        {/* Final CTA */}
        <section className="section closing" aria-labelledby="closing-heading">
          <div className="section__narrow">
            <h2 id="closing-heading">
              <HeadingGradient>Continue the conversation.</HeadingGradient>
            </h2>
            <p className="closing__meta">
              <SessionDateHighlight size="lg" />
              <span className="closing__meta-sep" aria-hidden="true">
                ·
              </span>
              <span className="closing__meta-topic">Diet &amp; Diabetes</span>
            </p>
          </div>
        </section>
      </main>

      <CornerBook />
    </div>
  )
}
