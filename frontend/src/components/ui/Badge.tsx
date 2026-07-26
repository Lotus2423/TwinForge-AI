import { cn } from '@/utils/cn'

type Variant = 'healthy' | 'warning' | 'risk' | 'critical' | 'offline' | 'info' | 'ai' | 'live'

const styles: Record<Variant, string> = {
  healthy:  'bg-[#052e1c] text-[#10b981] border border-[#10b98130]',
  warning:  'bg-[#2d1f00] text-[#f59e0b] border border-[#f59e0b30]',
  risk:     'bg-[#2d1800] text-[#f97316] border border-[#f9731630]',
  critical: 'bg-[#2d0e0e] text-[#ef4444] border border-[#ef444430]',
  offline:  'bg-[#1a1a22] text-[#4a5568] border border-[#2a3040]',
  info:     'bg-[#1d3a6b] text-[#3b82f6] border border-[#3b82f630]',
  ai:       'bg-[#1e1040] text-[#8b5cf6] border border-[#8b5cf630]',
  live:     'bg-[#052e1c] text-[#10b981] border border-[#10b98130]',
}

const dots: Record<Variant, string> = {
  healthy: '●', warning: '⚠', risk: '⚠', critical: '⚠',
  offline: '○', info: '●', ai: '◆', live: '●',
}

interface Props {
  variant: Variant
  children: React.ReactNode
  showDot?: boolean
  className?: string
}

export function Badge({ variant, children, showDot, className }: Props) {
  return (
    <span className={cn('inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded', styles[variant], className)}>
      {showDot && <span className="text-[8px]">{dots[variant]}</span>}
      {children}
    </span>
  )
}
