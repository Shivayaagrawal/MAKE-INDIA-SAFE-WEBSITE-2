import { isSupabaseConfigured, supabase } from './supabase'

export const MAX_SPEAK_WORDS = 50

export type ReservationDraft = {
  firstName: string
  lastName: string
  email: string
  phone: string
  age: string
  city: string
  interest: string
  speakAbout: string
  consent: boolean
  masterclassTopic: string
}

export async function saveReservation(
  draft: ReservationDraft,
): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      error:
        'Reservations are not connected yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env.',
    }
  }

  const phone = normalizeIndianPhone(draft.phone)
  if (!phone) {
    return { error: 'Enter a valid 10-digit Indian mobile number.' }
  }

  const { error } = await supabase.from('reservations').insert({
    first_name: draft.firstName.trim(),
    last_name: draft.lastName.trim() || null,
    email: draft.email.trim().toLowerCase(),
    phone,
    age: Number(draft.age),
    city: draft.city.trim(),
    interest: draft.interest,
    speak_about: draft.speakAbout.trim() || null,
    consent: draft.consent,
    masterclass_topic: draft.masterclassTopic,
  })

  if (!error) return { error: null }

  if (error.code === '42501' || /row-level security/i.test(error.message)) {
    return {
      error:
        'Supabase blocked the save (RLS). Open the SQL editor, paste supabase/reservations.sql, and click Run.',
    }
  }

  if (error.code === 'PGRST205' || /could not find the table/i.test(error.message)) {
    return {
      error:
        'The reservations table is missing. Run supabase/reservations.sql in the Supabase SQL editor.',
    }
  }

  return {
    error: error.message || 'Something went wrong saving your reservation. Please try again.',
  }
}

const EMAIL_PATTERN =
  /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]{0,62}[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9.-]{0,251}[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/

export function countWords(text: string): number {
  const trimmed = text.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}

export function isValidEmail(value: string): boolean {
  const email = value.trim()
  if (email.length > 254) return false
  return EMAIL_PATTERN.test(email)
}

/** 10-digit Indian mobile, optional 0 / 91 / +91 prefix. */
export function normalizeIndianPhone(value: string): string | null {
  const digits = value.replace(/\D/g, '')
  let local = digits

  if (digits.length === 12 && digits.startsWith('91')) {
    local = digits.slice(2)
  } else if (digits.length === 11 && digits.startsWith('0')) {
    local = digits.slice(1)
  } else if (digits.length !== 10) {
    return null
  }

  if (!/^[6-9]\d{9}$/.test(local)) return null
  return `+91${local}`
}

export function isValidIndianPhone(value: string): boolean {
  return normalizeIndianPhone(value) !== null
}
