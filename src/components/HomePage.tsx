import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  BookOpen,
  Shield,
  ShieldCheck,
  Stethoscope,
  Target,
} from 'lucide-react'
import { CornerBook } from './CornerBook'
import { BooksShowcase } from './ui/books-showcase'
import { CylinderCarousel } from './ui/cylinder-carousel'
import { ScrollDissolveReveal } from './ui/scroll-dissolve-reveal'
import { LiquidMetalButton } from './ui/liquid-metal'
import GradientText from './ui/gradient-text'
import { FlipText } from './ui/flip-text'
import { FaqAccordion, type FaqItem } from './ui/faq-accordion'
import { SessionDateHighlight } from './ui/session-date-highlight'
import { ConsultationLine } from './ConsultationLine'
import { CURRENT_MASTERCLASS } from '@/lib/masterclass'
import { PROBLEM_BOOKS } from '@/lib/problem-books'
import './HomePage.css'

const HEADING_GRADIENT = ['#171717', '#1c4d6e', '#171717'] as const

const HERO_CAROUSEL_IMAGES = [
  {
    src: '/images/questions/q-rice.jpg',
    alt: 'Bowl of cooked rice',
  },
  {
    src: '/images/carousel/yogurt-gut.jpg',
    alt: 'Yogurt, a gut-friendly food',
  },
  {
    src: '/images/carousel/sleep.jpg',
    alt: 'Person sleeping',
  },
  {
    src: '/images/questions/q-insulin.jpg',
    alt: 'Blood glucose meter and insulin syringes',
  },
  {
    src: '/images/carousel/indian-meal.jpg',
    alt: 'Home-cooked Indian meal',
  },
  {
    src: '/images/questions/q-fruit.jpg',
    alt: 'Fresh fruit platter',
  },
  {
    src: '/images/carousel/yoga.jpg',
    alt: 'Yoga for stress and recovery',
  },
  {
    src: '/images/questions/q-lifestyle.jpg',
    alt: 'Person exercising as part of a healthy lifestyle',
  },
  {
    src: '/images/carousel/vegetables.jpg',
    alt: 'Fresh vegetables',
  },
  {
    src: '/images/carousel/desk-stress.jpg',
    alt: 'Long hours at a desk',
  },
  {
    src: '/images/questions/q-food-label.jpg',
    alt: 'Nutrition facts food label',
  },
  {
    src: '/images/carousel/walking.jpg',
    alt: 'Walking as everyday movement',
  },
  {
    src: '/images/questions/q-jaggery.jpg',
    alt: 'Traditional Indian jaggery',
  },
  {
    src: '/images/questions/q-young-adults.jpg',
    alt: 'Young adults',
  },
] as const

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
  {
    question: 'Why does gut health keep coming up for so many different symptoms?',
    answer:
      'Digestion, appetite, energy, mood and hormones all run through the gut. It doesn’t explain every symptom, but it’s often a bigger lever than people expect—and one most advice skips entirely.',
  },
  {
    question: 'Can stress really affect digestion?',
    answer:
      'Yes—stress can change gut motility and sensitivity, which is part of why anxious weeks often come with an unsettled stomach. We’ll explain the mechanism, not just the correlation.',
  },
  {
    question: 'Why can’t I sleep even when I’m exhausted?',
    answer:
      'Tiredness and sleep quality aren’t the same thing. Late-night routines, blood sugar swings and stress hormones can all interfere with sleep that actually restores you.',
  },
  {
    question: 'How can lifestyle changes affect PCOS symptoms?',
    answer:
      'Diet, movement, sleep and stress can influence insulin resistance, which plays a role in many PCOS symptoms. We’ll walk through what’s evidence-backed and what to discuss with a doctor.',
  },
  {
    question: 'Why is losing weight—or keeping it off—so difficult?',
    answer:
      'Weight is downstream of sleep, stress, gut health and metabolism, not just calories in and out. We’ll unpack why one-variable advice keeps failing.',
  },
  {
    question: 'When should I stop Googling and actually see a doctor?',
    answer:
      'When a symptom is severe, sudden, persistent beyond a few weeks, or you’re making decisions based on fear rather than evidence. We’ll be direct about where self-education ends and medical care begins.',
  },
]

const TRUST_BADGES = [
  {
    icon: Stethoscope,
    title: 'Doctor-led',
    detail: 'by Dr. Yokesh Arul',
  },
  {
    icon: BookOpen,
    title: 'Evidence first',
    detail: 'Not trends',
  },
  {
    icon: Target,
    title: 'Practical steps',
    detail: 'You can apply',
  },
  {
    icon: ShieldCheck,
    title: 'Always responsible',
    detail: 'Never miracle claims',
  },
] as const

const THEN_NOW_PAIRS = [
  {
    then: 'Home-cooked, regular meals',
    now: 'Irregular, convenience eating',
  },
  {
    then: 'Walking and active routines built into the day',
    now: 'Long sedentary stretches at a desk or on a screen',
  },
  {
    then: 'Lower screen exposure before sleep',
    now: 'Late-night scrolling cutting into rest',
  },
  {
    then: 'Predictable meals, fewer snacks',
    now: 'Constant grazing, harder to track',
  },
  {
    then: 'A simpler information environment',
    now: 'Endless, contradictory health content',
  },
] as const

const APPROACH_PILLARS = [
  {
    title: 'Gut & Digestion',
    lead: true,
    body: 'The lever we come back to most. Bowel habits, bloating, constipation, and the gut–brain relationship—understood well enough to act on.',
  },
  {
    title: 'Food & Nutrition',
    body: 'Meals, portions, protein, fibre and food quality—practical eating patterns, not restriction rules.',
  },
  {
    title: 'Sleep',
    body: 'Why sleep quality matters more than sleep duration, and how daily routines quietly undercut it.',
  },
  {
    title: 'Stress & Mental Wellbeing',
    body: 'How stress shows up physically, and what actually helps recovery—not just “relax more.”',
  },
  {
    title: 'Movement',
    body: 'Sustainable activity that fits a real week, not punishment-style exercise.',
  },
  {
    title: 'Yoga',
    body: 'Used where it earns its place: mobility, breathing and stress management.',
  },
  {
    title: 'Integrity',
    body: 'Clear about what the evidence supports, what remains uncertain, and when to see a doctor.',
  },
] as const

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
  const [bookOpen, setBookOpen] = useState(false)

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
          <nav className="site-header__nav" aria-label="Primary">
            <a href="#founder">About Dr. Yokesh</a>
            <a href="#connected">The Gut Connection</a>
            <a href="#stories">Stories</a>
            <a href="#questions">Questions</a>
          </nav>
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
          <div className="hero__inner">
            <div className="hero__copy" data-reveal>
              <ConsultationLine className="hero__consult" />
              <h1 id="hero-heading">
                <HeadingGradient>
                  The answers to your health may begin somewhere you rarely
                  think about.
                </HeadingGradient>
                <span className="hero__emphasis">Your gut.</span>
              </h1>

              <p className="hero__lede">
                From digestion and energy to mood, sleep and metabolism—
                <strong>your gut plays a bigger role than you think.</strong>
              </p>
              <p className="hero__lede">
                <strong>Make India Safe</strong> helps you understand those
                connections without confusion, fear, or miracle claims.
              </p>

              <div className="hero__actions">
                <p className="hero__actions-meta">
                  <Shield size={13} strokeWidth={1.75} aria-hidden="true" />
                  Free to attend · one session · no medical jargon
                </p>
              </div>
            </div>

            <div className="hero__carousel" data-reveal aria-hidden="true">
              <CylinderCarousel
                images={[...HERO_CAROUSEL_IMAGES]}
                animationDuration={40}
                cardWidth={220}
                className="hero__carousel-scene"
                cardClassName="hero__carousel-card"
              />
            </div>
          </div>

          <div className="hero__badges" data-reveal>
            {TRUST_BADGES.map(({ icon: Icon, title, detail }) => (
              <div className="hero__badge" key={title}>
                <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                <div>
                  <strong>{title}</strong>
                  <span>{detail}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recognition */}
        <section
          className="section recognition"
          aria-labelledby="recognition-heading"
        >
          <div className="section__narrow" data-reveal>
            <h2 id="recognition-heading">
              <HeadingGradient>Does any of this sound familiar?</HeadingGradient>
            </h2>
            <p>
              Sometimes the problem isn&apos;t one dramatic symptom. It&apos;s a
              collection of small things that slowly become your new normal.
            </p>
          </div>

          <div className="recognition__showcase" data-reveal>
            <BooksShowcase
              books={PROBLEM_BOOKS}
              heroTitle=""
              navTitle="Everyday signals"
              showNav={false}
              showDetailPanel
              showCarousel
              themeColors={{
                navy: '#12181c',
                pink: '#8eb4c9',
                cream: '#f6f6f4',
                lav: '#c5c9d6',
                peri: '#1c4d6e',
                bgLight: '#f6f6f4',
                bgDark: '#f6f6f4',
                foregroundLight: '#171717',
                foregroundDark: '#171717',
              }}
              className="recognition__books"
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

        {/* The world changed */}
        <section
          className="section world-changed"
          aria-labelledby="world-changed-heading"
        >
          <div className="section__narrow" data-reveal>
            <h2 id="world-changed-heading">
              <HeadingGradient>
                Our bodies didn&apos;t suddenly change.
                <span className="line-break">Our environment did.</span>
              </HeadingGradient>
            </h2>
            <p>
              More packaged food. More sedentary time. More late-night
              screens. More stress. More conflicting advice.
            </p>
            <p>
              None of this explains every health problem. But together, it
              shapes the environment our bodies adapt to every day.
            </p>
          </div>

          <div className="world-changed__table" data-reveal>
            <div className="world-changed__row world-changed__row--head">
              <span>Then</span>
              <span>Now</span>
            </div>
            {THEN_NOW_PAIRS.map((pair) => (
              <div className="world-changed__row" key={pair.then}>
                <span>{pair.then}</span>
                <span>{pair.now}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Your health is connected */}
        <section
          className="section connected"
          id="connected"
          aria-labelledby="connected-heading"
        >
          <div className="section__narrow" data-reveal>
            <h2 id="connected-heading">
              <HeadingGradient>
                Your symptoms may feel disconnected.
                <span className="line-break">Your health isn&apos;t.</span>
              </HeadingGradient>
            </h2>
            <p>
              Digestion, stress, sleep, movement and food habits can all
              influence each other—and gut health is often the biggest lever
              in that system. Not the only cause of everything. The one most
              people never get explained to them.
            </p>
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
                <li>is medically responsible,</li>
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

        {/* Founder */}
        <section
          className="section founder"
          id="founder"
          aria-labelledby="founder-heading"
        >
          <div className="founder__card" data-reveal>
            <img
              src="/images/book/page-5-portrait.png"
              alt="Dr. Yokesh Arul"
              className="founder__portrait"
            />
            <div className="founder__copy">
              <h2 id="founder-heading">
                <HeadingGradient>The doctor behind Make India Safe</HeadingGradient>
              </h2>
              <p>
                Dr. Yokesh Arul, MBBS, started Make India Safe after years of
                watching preventable illness arrive as a surprise. His
                story—hospital wards, campus conversations, and the moment
                this became a mission—is a short, real one.
              </p>
              <button
                type="button"
                className="founder__cta"
                onClick={() => setBookOpen(true)}
              >
                Read his story <span aria-hidden="true">→</span>
              </button>
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
            <p className="masterclass__badge">
              <SessionDateHighlight size="md" />
              <span className="masterclass__badge-topic">
                {CURRENT_MASTERCLASS.topic}
              </span>
            </p>
            <h2 id="masterclass-heading">
              <HeadingGradient>
                We begin with {CURRENT_MASTERCLASS.topic}.
              </HeadingGradient>
            </h2>
            <p>
              India has one of the world&apos;s largest populations living with
              diabetes.
            </p>
            <p className="lede">
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
            <p className="questions__intro">
              The first {FAQ_ITEMS.length - 6} cover {CURRENT_MASTERCLASS.topic}
              , our current masterclass. The rest are the bigger picture
              we&apos;re building toward.
            </p>
            <FaqAccordion
              title=""
              items={FAQ_ITEMS}
              className="questions-faq"
            />
          </div>
        </section>

        {/* Our approach */}
        <section className="section approach" aria-labelledby="approach-heading">
          <div className="section__narrow" data-reveal>
            <h2 id="approach-heading">
              <HeadingGradient>
                No miracle hacks.
                <span className="line-break">No one-variable explanations.</span>
              </HeadingGradient>
            </h2>
            <p>
              We look at the things that shape health every day—and explain
              how to improve them without turning your life upside down.
            </p>
          </div>

          <ul className="approach__pillars">
            {APPROACH_PILLARS.map((pillar) => (
              <li
                key={pillar.title}
                className={
                  'lead' in pillar && pillar.lead
                    ? 'approach__pillar approach__pillar--lead'
                    : 'approach__pillar'
                }
                data-reveal
              >
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Participant stories */}
        <section
          className="section stories"
          id="stories"
          aria-labelledby="stories-heading"
        >
          <div className="section__narrow" data-reveal>
            <h2 id="stories-heading">
              <HeadingGradient>What people take away.</HeadingGradient>
            </h2>
            <p className="stories__status" role="status">
              We&apos;re collecting real feedback from live masterclass
              participants. Verified stories will appear here as sessions
              run—we don&apos;t publish quotes we haven&apos;t earned.
            </p>
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
              <span className="closing__meta-topic">
                {CURRENT_MASTERCLASS.topic}
              </span>
            </p>
            <ConsultationLine className="closing__consult" />
          </div>
        </section>
      </main>

      <CornerBook open={bookOpen} onOpenChange={setBookOpen} />
    </div>
  )
}
