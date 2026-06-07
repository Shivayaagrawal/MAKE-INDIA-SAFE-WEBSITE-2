import type { PillTheme } from '../components/Pill'

export const PROTOCOL_IMAGES = {
  cellular: '/images/protocols/cellular.jpg',
  metabolic: '/images/protocols/metabolic.jpg',
  neural: '/images/protocols/neural.jpg',
  hormonal: '/images/protocols/hormonal.jpg',
  vascular: '/images/protocols/vascular.jpg',
} as const

export const DATA_POINT_IMAGES = {
  body: '/images/datapoints/body.jpg',
  bloodVessels: '/images/datapoints/blood-vessels.jpg',
  heart: '/images/datapoints/heart.jpg',
  diabetes: '/images/datapoints/diabetes.jpg',
  skin: '/images/datapoints/skin.jpg',
  cellular: '/images/datapoints/cellular.jpg',
} as const

export const DOCTOR_IMAGES = {
  scrubs: '/images/dr-yokesh-scrubs.png',
  desk: '/images/dr-yokesh-desk.png',
} as const

export const PROTOCOL_PILLS = [
  {
    theme: 'navy' as PillTheme,
    label: 'Cellular',
    title: 'Cellular Longevity',
    desc: 'Telomere tracking and mitochondrial function.',
    image: PROTOCOL_IMAGES.cellular,
    fill: 68,
    share: 22,
    color: '#2a3560',
  },
  {
    theme: 'blue' as PillTheme,
    label: 'Metabolic',
    title: 'Metabolic Health',
    desc: 'Insulin sensitivity and metabolic age.',
    image: PROTOCOL_IMAGES.metabolic,
    fill: 72,
    share: 20,
    color: '#3a5090',
  },
  {
    theme: 'cream' as PillTheme,
    label: 'Neural',
    title: 'Neural Vitality',
    desc: 'Cognitive performance and sleep architecture.',
    image: PROTOCOL_IMAGES.neural,
    fill: 58,
    share: 18,
    color: '#6b7aa0',
  },
  {
    theme: 'mid' as PillTheme,
    label: 'Hormonal',
    title: 'Hormonal Balance',
    desc: 'Full endocrine and thyroid cascade.',
    image: PROTOCOL_IMAGES.hormonal,
    fill: 64,
    share: 20,
    color: '#506090',
  },
  {
    theme: 'pale' as PillTheme,
    label: 'Vascular',
    title: 'Vascular Integrity',
    desc: 'Arterial stiffness and cardiovascular risk.',
    image: PROTOCOL_IMAGES.vascular,
    fill: 70,
    share: 20,
    color: '#9c8f76',
  },
] as const

/** Build a conic-gradient string from protocol share percentages */
export function buildPieGradient(active = 1): string {
  let cursor = 0
  const stops: string[] = []

  PROTOCOL_PILLS.forEach((pill, i) => {
    const start = cursor
    cursor += pill.share * 3.6
    const tone = i + 1 <= active ? pill.color : `${pill.color}55`
    stops.push(`${tone} ${start}deg ${cursor}deg`)
  })

  return `conic-gradient(from -90deg, ${stops.join(', ')})`
}
