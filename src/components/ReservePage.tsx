import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import { LiquidMetalButton } from './ui/liquid-metal'
import { CreepyButton } from './ui/creepy-button'
import { SessionDateHighlight } from './ui/session-date-highlight'
import './ReservePage.css'

const INTEREST_OPTIONS = [
  'Diet & Diabetes',
  'Insulin resistance',
  'Nutrition & food labels',
  'Prevention for younger adults',
  'Lifestyle changes',
  'Something else',
] as const

function getAgePeekMessage(ageValue: string): string {
  if (!ageValue.trim()) {
    return 'We peeked… into an empty box. Type an age first, then hit Peek again.'
  }

  const age = Number(ageValue)
  if (!Number.isFinite(age) || age <= 0) {
    return 'That doesn’t look like an age. Try a real number — we’re curious, not psychic.'
  }

  if (age < 13) {
    return 'Ooo, too young. Come back when WhatsApp health forwards aren’t your curriculum.'
  }
  if (age < 18) {
    return 'Almost there. Prevention starts early — bring a grown-up who’ll listen with you.'
  }
  if (age < 25) {
    return 'Young adult spotted. Your habits are writing drafts of your future — make them readable.'
  }
  if (age < 35) {
    return 'Peak confusion years. Perfect time to swap myths for medicine that actually makes sense.'
  }
  if (age < 45) {
    return 'Ah, the “I’ll sort it later” club. Spoiler: later just filed a meeting invite.'
  }
  if (age < 55) {
    return 'Old is gold — but gold still needs a label. Clarity beats guesswork from here on.'
  }
  if (age < 65) {
    return 'You’ve seen enough trends come and go. Ready for evidence that doesn’t shout?'
  }
  if (age <= 120) {
    return 'Wisdom years. The jokes get better — and so should the health advice.'
  }

  return 'That age broke our peek. Try something between 1 and 120 — we’re only human.'
}

type FormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  age: string
  interest: string
  speakAbout: string
}

const INITIAL: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  age: '',
  interest: '',
  speakAbout: '',
}

interface ReservePageProps {
  onBack: () => void
}

export function ReservePage({ onBack }: ReservePageProps) {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [ageOpinion, setAgeOpinion] = useState<string | null>(null)

  const update =
    (field: keyof FormState) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const value = event.target.value
      setForm((prev) => ({ ...prev, [field]: value }))
      if (field === 'age') setAgeOpinion(null)
    }

  const handlePeek = () => {
    setAgeOpinion(getAgePeekMessage(form.age))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="reserve">
      <header className="reserve__header">
        <div className="reserve__header-inner">
          <button type="button" className="reserve__back" onClick={onBack}>
            ← Back
          </button>
          <p className="reserve__brand">Make India Safe</p>
        </div>
      </header>

      <main className="reserve__main">
        {submitted ? (
          <div className="reserve__success" role="status">
            <h1>You&apos;re on the list.</h1>
            <p>
              Thanks, {form.firstName}. We&apos;ll reach out at{' '}
              <strong>{form.email}</strong> with details for Diet &amp;
              Diabetes on{' '}
              <SessionDateHighlight size="md" className="reserve__date-inline" />
              .
            </p>
            <LiquidMetalButton
              size="sm"
              borderWidth={3}
              metalConfig={{
                colorBack: '#6b6b6f',
                colorTint: '#ffffff',
                speed: 0.45,
                repetition: 4,
                distortion: 0.12,
              }}
              onClick={onBack}
            >
              Back to home
            </LiquidMetalButton>
          </div>
        ) : (
          <>
            <div className="reserve__intro">
              <div className="reserve__date-row">
                <SessionDateHighlight size="lg" className="reserve__date" />
                <span className="reserve__date-topic">Diet &amp; Diabetes</span>
              </div>
              <h1>Reserve a spot.</h1>
              <p>
                Tell us a little about yourself so we can shape the session
                around what you actually need.
              </p>
            </div>

            <form className="reserve__form" onSubmit={handleSubmit} noValidate>
              <div className="reserve__row">
                <label className="reserve__field">
                  <span>First name</span>
                  <input
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={form.firstName}
                    onChange={update('firstName')}
                  />
                </label>
                <label className="reserve__field">
                  <span>Last name</span>
                  <input
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={form.lastName}
                    onChange={update('lastName')}
                  />
                </label>
              </div>

              <label className="reserve__field">
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                />
              </label>

              <div className="reserve__row">
                <label className="reserve__field">
                  <span>Phone number</span>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                    value={form.phone}
                    onChange={update('phone')}
                  />
                </label>
                <div className="reserve__age-block">
                  <label className="reserve__field">
                    <span>
                      Age{' '}
                      <em className="reserve__age-hint">
                        (want us to peek at your age?)
                      </em>
                    </span>
                    <input
                      name="age"
                      type="number"
                      min={1}
                      max={120}
                      required
                      value={form.age}
                      onChange={update('age')}
                    />
                  </label>
                  <CreepyButton
                    className="reserve__peek"
                    coverClassName="reserve__peek-cover"
                    aria-label="Peek at age"
                    onClick={handlePeek}
                  >
                    Peek
                  </CreepyButton>
                  {ageOpinion ? (
                    <p className="reserve__age-message" role="status">
                      {ageOpinion}
                    </p>
                  ) : null}
                </div>
              </div>

              <label className="reserve__field">
                <span>What are you interested in?</span>
                <select
                  name="interest"
                  required
                  value={form.interest}
                  onChange={update('interest')}
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  {INTEREST_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="reserve__field">
                <span>What do you want us to speak about?</span>
                <textarea
                  name="speakAbout"
                  rows={4}
                  required
                  placeholder="Questions, myths, or situations you want covered…"
                  value={form.speakAbout}
                  onChange={update('speakAbout')}
                />
              </label>

              <div className="reserve__actions">
                <LiquidMetalButton
                  type="submit"
                  size="md"
                  borderWidth={3}
                  metalConfig={{
                    colorBack: '#6b6b6f',
                    colorTint: '#ffffff',
                    speed: 0.45,
                    repetition: 4,
                    distortion: 0.12,
                  }}
                >
                  Submit reservation
                </LiquidMetalButton>
              </div>
            </form>
          </>
        )}
      </main>
    </div>
  )
}
