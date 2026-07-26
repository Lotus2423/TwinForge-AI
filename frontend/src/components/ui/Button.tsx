import { cn } from '@/utils/cn'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'danger' | 'ghost'
  size?: 'sm' | 'md'
}

const variants = {
  default: 'bg-[#181c23] border border-[#2a3040] text-[#e8eaf0] hover:border-[#3b82f6] hover:text-[#3b82f6]',
  primary: 'bg-[#3b82f6] border border-[#3b82f6] text-white hover:bg-[#2563eb]',
  danger:  'bg-[#2d0e0e] border border-[#ef444430] text-[#ef4444] hover:border-[#ef4444]',
  ghost:   'bg-transparent border border-transparent text-[#8892a4] hover:text-[#e8eaf0]',
}
const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm' }

export function Button({ variant = 'default', size = 'md', className, children, ...rest }: Props) {
  return (
    <button className={cn('inline-flex items-center gap-1.5 rounded-md font-medium transition-all', variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  )
}
