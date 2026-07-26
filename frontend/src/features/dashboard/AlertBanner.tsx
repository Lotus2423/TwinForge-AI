import { Link } from 'react-router-dom'
import type { Alert } from '@/types/machine.types'

export function AlertBanner({ alerts }: { alerts: Alert[] }) {
  const crit = alerts.filter(a => a.severity === 'critical' && !a.isAcknowledged)
  if (crit.length === 0) return null
  const top = crit[0]
  return (
    <div className="flex items-start gap-3 px-4 py-3 bg-[#2d0e0e] border border-[#ef444430] rounded-xl mb-5">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#ef4444" strokeWidth="1.5" className="flex-shrink-0 mt-0.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2l6 10H2L8 2zM8 6v3M8 10.5v.5" />
      </svg>
      <div className="flex-1 min-w-0">
        <span className="text-[#ef4444] font-semibold text-sm">{top.title}</span>
        <span className="text-[#8892a4] text-xs ml-2">{top.message}</span>
      </div>
      {crit.length > 1 && <span className="text-xs text-[#4a5568] flex-shrink-0">+{crit.length - 1} more</span>}
      <Link to="/alerts" className="text-xs text-[#3b82f6] flex-shrink-0 hover:underline">View all</Link>
    </div>
  )
}
