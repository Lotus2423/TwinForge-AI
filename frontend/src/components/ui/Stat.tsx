interface StatProps {
  label: string
  value: string | number
  delta?: string
  deltaUp?: boolean
  color?: string
}
export function Stat({ label, value, delta, deltaUp, color }: StatProps) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-[#4a5568] mb-1">{label}</div>
      <div className="text-2xl font-bold tabular-nums" style={{ color: color ?? '#e8eaf0' }}>{value}</div>
      {delta && (
        <div className="text-xs mt-0.5" style={{ color: deltaUp ? '#10b981' : '#ef4444' }}>
          {deltaUp ? '↑' : '↓'} {delta}
        </div>
      )}
    </div>
  )
}
