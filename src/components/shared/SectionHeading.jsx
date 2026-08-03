import Reveal from './Reveal'
import { cn } from '../../lib/utils'

export default function SectionHeading({
  kicker,
  title,
  body,
  align = 'left',
  className,
  titleId,
}) {
  return (
    <Reveal
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center [&_p]:mx-auto',
        className,
      )}
    >
      {kicker ? <p className="kicker mb-4">{kicker}</p> : null}
      <h2 id={titleId} className="display-lg text-foreground whitespace-pre-line">
        {title}
      </h2>
      {body ? <p className="lede mt-5">{body}</p> : null}
    </Reveal>
  )
}
