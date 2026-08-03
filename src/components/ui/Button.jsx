import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium cursor-pointer transition-all duration-500 [transition-timing-function:var(--ease-cine)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-float-hover)] hover:-translate-y-0.5',
        hero: 'text-primary-foreground bg-[linear-gradient(135deg,oklch(0.632_0.176_249)_0%,oklch(0.46_0.14_254)_100%)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-float-hover)] hover:-translate-y-0.5',
        outlineBlue:
          'border border-primary/25 bg-transparent text-blue-deep hover:bg-blue-soft hover:border-primary/45',
        glass:
          'bg-white/70 backdrop-blur-md border border-white text-foreground hover:border-primary/35 hover:-translate-y-0.5 shadow-[var(--shadow-soft)]',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-7 text-[0.95rem]',
        xl: 'h-14 px-9 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export default function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  )
}

export { buttonVariants }
