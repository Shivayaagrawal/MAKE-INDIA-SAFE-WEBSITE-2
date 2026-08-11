import RotatingText from './rotating-text'

const DATE_TEXTS = ['1 August 2026', '1 Aug 2026', 'Save the date']

type SessionDateHighlightProps = {
  className?: string
  size?: 'lg' | 'md'
}

export function SessionDateHighlight({
  className = '',
  size = 'lg',
}: SessionDateHighlightProps) {
  return (
    <RotatingText
      texts={DATE_TEXTS}
      mainClassName={`date-highlight date-highlight--${size} ${className}`.trim()}
      staggerFrom="last"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-120%' }}
      staggerDuration={0.025}
      splitLevelClassName="overflow-hidden pb-0.5"
      transition={{ type: 'spring', damping: 30, stiffness: 400 }}
      rotationInterval={2200}
      splitBy="characters"
      auto
      loop
    />
  )
}
