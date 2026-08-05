import { ArrowRight } from 'lucide-react'
import Reveal from './shared/Reveal'
import Button from './ui/Button'

const PHONE_DISPLAY = '+91 98499 90061'
const PHONE_HREF = 'tel:+919849990061'
const ENQUIRY_HREF = 'mailto:info@geeceechem.com?subject=Project%20Enquiry'

/**
 * Lovable CTABand — ported for category / product detail routes.
 */
export default function CTABand({
  title = "Tell us what you're building.",
  body = 'Share your specification, drawings or site conditions. Our technical team will recommend the right system — and the dosage to go with it.',
}) {
  return (
    <section className="section-y">
      <div className="shell">
        <Reveal className="relative overflow-hidden rounded-[2rem] [background-image:var(--gradient-blue)] px-8 py-16 lg:px-20 lg:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-[28rem] rounded-full bg-white/10 blur-3xl"
          />
          <div className="relative max-w-2xl">
            <h2 className="display-lg text-primary-foreground">{title}</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/80">
              {body}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="glass">
                <a href={ENQUIRY_HREF}>
                  Start an enquiry <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <a href={PHONE_HREF}>
                  Call {PHONE_DISPLAY}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
