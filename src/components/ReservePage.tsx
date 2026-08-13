import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import { LiquidMetalButton } from './ui/liquid-metal'
import { CreepyButton } from './ui/creepy-button'
import { SessionDateHighlight } from './ui/session-date-highlight'
import { CURRENT_MASTERCLASS, MASTERCLASS_DATE_CONFIRMED } from '@/lib/masterclass'
import {
  countWords,
  isValidEmail,
  isValidIndianPhone,
  MAX_SPEAK_WORDS,
  normalizeIndianPhone,
} from '@/lib/reservation'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import './ReservePage.css'

const INTEREST_OPTIONS = [
  CURRENT_MASTERCLASS.topic,
  'Gut health & digestion',
  'Stress & sleep',
  'PCOS & hormones',
  'Weight & metabolism',
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

  if (age <= 10) {
    return 'Tiny human, big energy!'
  }
  if (age <= 20) {
    return 'Growing up, glowing up, and still figuring it out!'
  }
  if (age <= 30) {
    return 'Young, wild, and hopefully remembering to drink water!'
  }
  if (age <= 40) {
    return 'Adulting is hard, but staying healthy makes it slightly less dramatic!'
  }
  if (age <= 50) {
    return 'Life is getting serious, but your health does not have to!'
  }
  if (age <= 60) {
    return 'Still young at heart, just with a few more stories to tell!'
  }
  if (age <= 70) {
    return 'Age is just a number, but good health is the real flex!'
  }
  if (age <= 80) {
    return 'Still going strong, still stealing the spotlight!'
  }
  if (age <= 90) {
    return 'Eight decades in and still keeping life interesting!'
  }
  if (age < 100) {
    return 'Ninety and fabulous, with wisdom to spare!'
  }

  return 'Triple digits and still showing us how it’s done!'
}

type FormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  age: string
  city: string
  interest: string
  speakAbout: string
  consent: boolean
}

type FormErrors = Partial<Record<keyof FormState, string>>

const INITIAL: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  age: '',
  city: '',
  interest: '',
  speakAbout: '',
  consent: false,
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}

  if (!form.firstName.trim()) {
    errors.firstName = 'Enter your first name.'
  }

  if (!form.email.trim()) {
    errors.email = 'Enter an email so we can reach you.'
  } else if (!isValidEmail(form.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!form.phone.trim()) {
    errors.phone = 'Enter your phone number.'
  } else if (!isValidIndianPhone(form.phone)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number.'
  }

  if (!form.city.trim()) {
    errors.city = 'Enter your city.'
  }

  if (!form.age.trim()) {
    errors.age = 'Enter your age.'
  } else {
    const age = Number(form.age)
    if (!Number.isFinite(age) || age < 1 || age > 120) {
      errors.age = 'Enter an age between 1 and 120.'
    }
  }

  if (!form.interest) {
    errors.interest = 'Choose what you’re interested in.'
  }

  const speakWords = countWords(form.speakAbout)
  if (speakWords > MAX_SPEAK_WORDS) {
    errors.speakAbout = `Keep this to ${MAX_SPEAK_WORDS} words or fewer (${speakWords} now).`
  }

  if (!form.consent) {
    errors.consent = 'Check the box to confirm you agree to be contacted.'
  }

  return errors
}

interface ReservePageProps {
  onBack: () => void
}

export function ReservePage({ onBack }: ReservePageProps) {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [ageOpinion, setAgeOpinion] = useState<string | null>(null)
  const speakWordCount = countWords(form.speakAbout)

  const update =
    (field: keyof FormState) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const value = event.target.value
      setForm((prev) => ({ ...prev, [field]: value }))
      setErrors((prev) => ({ ...prev, [field]: undefined }))
      if (field === 'age') setAgeOpinion(null)
    }

  const handleConsentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, consent: event.target.checked }))
    setErrors((prev) => ({ ...prev, consent: undefined }))
  }

  const handlePeek = () => {
    setAgeOpinion(getAgePeekMessage(form.age))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    setSubmitError(null)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const phone = normalizeIndianPhone(form.phone)
    if (!phone) {
      setErrors((prev) => ({
        ...prev,
        phone: 'Enter a valid 10-digit Indian mobile number.',
      }))
      return
    }

    if (!isSupabaseConfigured || !supabase) {
      setSubmitError(
        'Reservations are not connected yet. Add your Supabase URL and anon key to .env.',
      )
      return
    }

    setSubmitting(true)
    const { error } = await supabase.from('reservations').insert({
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim() || null,
      email: form.email.trim().toLowerCase(),
      phone,
      age: Number(form.age),
      city: form.city.trim(),
      interest: form.interest,
      speak_about: form.speakAbout.trim() || null,
      consent: form.consent,
      masterclass_topic: CURRENT_MASTERCLASS.topic,
    })
    setSubmitting(false)

    if (error) {
      setSubmitError('Something went wrong saving your reservation. Please try again.')
      return
    }

    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="reserve">
      <header className="reserve__header">
        <div className="reserve__header-inner">
          <button type="button" className="reserve__back" onClick={onBack}>
            ← Back to home
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
              <strong>{form.email}</strong> with details for{' '}
              {CURRENT_MASTERCLASS.topic}
              {MASTERCLASS_DATE_CONFIRMED ? (
                <>
                  {' '}
                  on{' '}
                  <SessionDateHighlight
                    size="md"
                    className="reserve__date-inline"
                  />
                </>
              ) : (
                ' the moment the next session date is confirmed'
              )}
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
                <span className="reserve__date-topic">
                  {CURRENT_MASTERCLASS.topic}
                </span>
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
                    aria-invalid={Boolean(errors.firstName)}
                    aria-describedby={
                      errors.firstName ? 'error-firstName' : undefined
                    }
                    value={form.firstName}
                    onChange={update('firstName')}
                  />
                  {errors.firstName ? (
                    <p className="reserve__error" id="error-firstName" role="alert">
                      {errors.firstName}
                    </p>
                  ) : null}
                </label>
                <label className="reserve__field">
                  <span>Last name (optional)</span>
                  <input
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
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
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'error-email' : undefined}
                  value={form.email}
                  onChange={update('email')}
                />
                {errors.email ? (
                  <p className="reserve__error" id="error-email" role="alert">
                    {errors.email}
                  </p>
                ) : null}
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
                    placeholder="10-digit Indian mobile"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'error-phone' : undefined}
                    value={form.phone}
                    onChange={update('phone')}
                  />
                  {errors.phone ? (
                    <p className="reserve__error" id="error-phone" role="alert">
                      {errors.phone}
                    </p>
                  ) : null}
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
                      aria-invalid={Boolean(errors.age)}
                      aria-describedby={errors.age ? 'error-age' : undefined}
                      value={form.age}
                      onChange={update('age')}
                    />
                    {errors.age ? (
                      <p className="reserve__error" id="error-age" role="alert">
                        {errors.age}
                      </p>
                    ) : null}
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
                <span>City</span>
                <input
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  required
                  aria-invalid={Boolean(errors.city)}
                  aria-describedby={errors.city ? 'error-city' : undefined}
                  value={form.city}
                  onChange={update('city')}
                />
                {errors.city ? (
                  <p className="reserve__error" id="error-city" role="alert">
                    {errors.city}
                  </p>
                ) : null}
              </label>

              <label className="reserve__field">
                <span>What are you interested in?</span>
                <select
                  name="interest"
                  required
                  aria-invalid={Boolean(errors.interest)}
                  aria-describedby={
                    errors.interest ? 'error-interest' : undefined
                  }
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
                {errors.interest ? (
                  <p className="reserve__error" id="error-interest" role="alert">
                    {errors.interest}
                  </p>
                ) : null}
              </label>

              <label className="reserve__field">
                <span>What do you want us to speak about? (optional)</span>
                <textarea
                  name="speakAbout"
                  rows={4}
                  placeholder="Questions, myths, or situations you want covered…"
                  aria-invalid={Boolean(errors.speakAbout)}
                  aria-describedby="speak-about-meta"
                  value={form.speakAbout}
                  onChange={update('speakAbout')}
                />
                <p
                  id="speak-about-meta"
                  className={
                    speakWordCount > MAX_SPEAK_WORDS
                      ? 'reserve__word-count reserve__word-count--over'
                      : 'reserve__word-count'
                  }
                >
                  {speakWordCount}/{MAX_SPEAK_WORDS} words
                </p>
                {errors.speakAbout ? (
                  <p className="reserve__error" id="error-speakAbout" role="alert">
                    {errors.speakAbout}
                  </p>
                ) : null}
              </label>

              <label className="reserve__consent">
                <input
                  name="consent"
                  type="checkbox"
                  required
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={
                    errors.consent ? 'error-consent' : undefined
                  }
                  checked={form.consent}
                  onChange={handleConsentChange}
                />
                <span>
                  I agree to be contacted about this session and understand
                  Make India Safe provides health education, not medical
                  diagnosis or treatment.
                </span>
              </label>
              {errors.consent ? (
                <p className="reserve__error" id="error-consent" role="alert">
                  {errors.consent}
                </p>
              ) : null}

              <p className="reserve__reassurance">
                Free to attend, no payment involved. We&apos;ll only contact
                you about this session — no spam, and your details aren&apos;t
                shared.
              </p>

              {submitError ? (
                <p className="reserve__error" role="alert">
                  {submitError}
                </p>
              ) : null}

              <div className="reserve__actions">
                <LiquidMetalButton
                  type="submit"
                  size="md"
                  disabled={submitting}
                  borderWidth={3}
                  metalConfig={{
                    colorBack: '#6b6b6f',
                    colorTint: '#ffffff',
                    speed: 0.45,
                    repetition: 4,
                    distortion: 0.12,
                  }}
                >
                  {submitting ? 'Submitting…' : 'Submit reservation'}
                </LiquidMetalButton>
              </div>
            </form>
          </>
        )}
      </main>
    </div>
  )
}
