/**
 * The single source of truth for "which masterclass is live right now."
 * Make India Safe runs one free masterclass at a time; update `date` when
 * the next session is confirmed instead of hunting through pages, and the
 * rest of the site derives its copy from that one value.
 */
export const CURRENT_MASTERCLASS = {
  topic: 'Diet & Diabetes',
  /** e.g. '12 September 2026'. Leave null until a real date is confirmed. */
  date: '23rd August 2026',
} as const

export const MASTERCLASS_DATE_CONFIRMED = CURRENT_MASTERCLASS.date !== null

export function getMasterclassDateTexts(): string[] {
  const { date } = CURRENT_MASTERCLASS
  if (!date) {
    return ['Date to be announced', 'Join the waitlist', 'New date coming soon']
  }
  return [date, date, 'Save the date']
}
