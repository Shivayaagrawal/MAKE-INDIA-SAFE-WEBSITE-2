import type { BookCfg } from '@/components/ui/books-showcase'

function book(
  partial: Pick<BookCfg, 'id' | 'title' | 'desc' | 'spineBg' | 'chapters'> & {
    image?: string
  },
): BookCfg {
  const { image, ...rest } = partial
  return {
    author: 'Make India Safe',
    year: '',
    stars: 0,
    spineInk: '#ffffff',
    spineFont: '700 36px Georgia',
    backBg: rest.spineBg,
    backInk: '255,255,255',
    edge: '#eee4cf',
    images: image ? { front: image } : undefined,
    ...rest,
  }
}

/** Everyday complaints as issue books — validating, not diagnostic. */
export const PROBLEM_BOOKS: BookCfg[] = [
  book({
    id: 'stress',
    title: 'Stress',
    spineBg: '#1c4d6e',
    image: '/images/carousel/desk-stress.jpg',
    desc: 'Stress can change gut motility and sensitivity. That is part of why anxious weeks often arrive with an unsettled stomach — not just a busy mind.',
    chapters: ['How stress reaches the gut', 'Motility and sensitivity', 'What actually helps recovery'],
  }),
  book({
    id: 'poor-sleep',
    title: 'Poor sleep',
    spineBg: '#243044',
    image: '/images/carousel/sleep.jpg',
    desc: 'Tiredness and sleep quality are not the same thing. Late-night routines, blood sugar swings and stress hormones can all interfere with rest that actually restores you.',
    chapters: ['Tired versus unrested', 'Night routines', 'Sleep and metabolism'],
  }),
  book({
    id: 'constant-tiredness',
    title: 'Constant tiredness',
    spineBg: '#3a4654',
    image: '/images/carousel/tiredness.jpg',
    desc: 'Feeling drained most days is often treated as a character flaw. Energy is downstream of sleep, food, stress and gut function — not willpower.',
    chapters: ['Energy is a system', 'Why “just rest” fails', 'Where to look first'],
  }),
  book({
    id: 'bloating',
    title: 'Bloating',
    spineBg: '#2f4a3c',
    image: '/images/carousel/yogurt-gut.jpg',
    desc: 'Bloating is one of the most common everyday complaints we hear. It is a signal worth understanding, not a punchline or a cleanse target.',
    chapters: ['What bloating can mean', 'Food, fibre and timing', 'When to see a doctor'],
  }),
  book({
    id: 'constipation',
    title: 'Constipation',
    spineBg: '#3d5346',
    image: '/images/carousel/grains.jpg',
    desc: 'Bowel habits are a core gut-health lever. Constipation is common, often dismissed, and usually more useful to understand than to “fix” with a trend.',
    chapters: ['Bowel habits as a signal', 'Fibre, water, movement', 'What to discuss clinically'],
  }),
  book({
    id: 'ibs-like',
    title: 'IBS-like discomfort',
    spineBg: '#1e3a32',
    image: '/images/carousel/abdomen.jpg',
    desc: 'Unsettled digestion that comes and goes can feel mysterious. We talk about patterns, triggers and evidence — without turning every ache into a label.',
    chapters: ['Pattern, not panic', 'Gut–brain links', 'Evidence versus internet advice'],
  }),
  book({
    id: 'pcos',
    title: 'PCOS',
    spineBg: '#4a2c3a',
    image: '/images/carousel/wellness.jpg',
    desc: 'Diet, movement, sleep and stress can influence insulin resistance, which plays a role in many PCOS symptoms. That is a conversation, not a cure claim.',
    chapters: ['Insulin and hormones', 'Lifestyle that has evidence', 'Where medical care begins'],
  }),
  book({
    id: 'hair-fall',
    title: 'Hair fall',
    spineBg: '#5a4033',
    image: '/images/carousel/hair.jpg',
    desc: 'Hair fall is often listed next to stress, sleep and nutrition for a reason. It is not always “just genetics,” and it is not a miracle-oil problem either.',
    chapters: ['Stress, sleep, nutrition', 'What we will not claim', 'Useful next questions'],
  }),
  book({
    id: 'belly-fat',
    title: 'Stubborn belly fat',
    spineBg: '#2c3d32',
    image: '/images/carousel/walking.jpg',
    desc: 'Weight around the middle is downstream of sleep, stress, gut health and metabolism — not just calories in and out.',
    chapters: ['Why one-variable advice fails', 'Sleep and stress', 'Practical levers'],
  }),
  book({
    id: 'losing-weight',
    title: 'Difficulty losing weight',
    spineBg: '#31453a',
    image: '/images/questions/q-lifestyle.jpg',
    desc: 'Keeping weight off is hard because the system is connected. We unpack why isolated hacks keep failing, without turning this into a diet programme.',
    chapters: ['Downstream, not just intake', 'Routines that last', 'Medical context'],
  }),
  book({
    id: 'low-mood',
    title: 'Low mood',
    spineBg: '#3d3a5c',
    image: '/images/carousel/low-mood.jpg',
    desc: 'Mood is not “all in the gut,” and it is not “all in the head.” Digestion, sleep and stress can shape how you feel — hedged, not overclaimed.',
    chapters: ['Gut–brain, carefully', 'Sleep and stress', 'When to get help'],
  }),
  book({
    id: 'irregular-eating',
    title: 'Irregular eating',
    spineBg: '#6b5344',
    image: '/images/carousel/indian-meal.jpg',
    desc: 'Irregular, convenience eating has become a new normal. Meal timing and food quality matter more than another conflicting headline.',
    chapters: ['Then versus now', 'Convenience patterns', 'Practical eating'],
  }),
  book({
    id: 'late-night-scrolling',
    title: 'Late-night scrolling',
    spineBg: '#1a2740',
    image: '/images/carousel/phone-night.jpg',
    desc: 'Screens at night quietly cut into rest. Sleep quality, then energy, mood and appetite, often follow — a routine, not a moral failure.',
    chapters: ['Light, sleep, appetite', 'Why it sticks', 'Smaller changes'],
  }),
  book({
    id: 'low-energy',
    title: 'Low energy',
    spineBg: '#1c4d6e',
    image: '/images/carousel/coffee.jpg',
    desc: 'Low energy shows up as the body asking for a clearer system: food, gut, sleep and stress. We start there, without miracle claims.',
    chapters: ['Energy as a signal', 'The gut lever', 'What the session covers'],
  }),
]
