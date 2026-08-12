import RotatingText from './rotating-text'
import { getMasterclassDateTexts } from '@/lib/masterclass'

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
      texts={getMasterclassDateTexts()}
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
