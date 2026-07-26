import { cn } from '@/utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  noPad?: boolean
}
export function Card({ children, className, noPad }: CardProps) {
  return (
    <div className={cn('bg-[#111318] border border-[#1e2330] rounded-xl overflow-hidden', className)}>
      {noPad ? children : <div className="p-4">{children}</div>}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  subtitle?: string
  right?: React.ReactNode
}
export function CardHeader({ title, subtitle, right }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between px-4 py-3 border-b border-[#1e2330]">
      <div>
        <div className="text-sm font-semibold text-[#e8eaf0]">{title}</div>
        {subtitle && <div className="text-xs text-[#4a5568] mt-0.5">{subtitle}</div>}
      </div>
      {right}
    </div>
  )
}
