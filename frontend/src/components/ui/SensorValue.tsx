interface Props { label: string; value: string; status?: 'ok' | 'warn' | 'crit'; bar?: number }
export function SensorValue({ label, value, status = 'ok', bar }: Props) {
  const color = status === 'crit' ? '#ef4444' : status === 'warn' ? '#f59e0b' : '#e8eaf0'
  const barColor = status === 'crit' ? '#ef4444' : status === 'warn' ? '#f59e0b' : '#10b981'
  return (
    <div className="bg-[#181c23] border border-[#2a3040] rounded-lg p-3">
      <div className="text-[10px] uppercase tracking-wider text-[#4a5568] mb-1.5">{label}</div>
      <div className="text-xl font-bold tabular-nums" style={{ color }}>{value}</div>
      {bar !== undefined && (
        <div className="mt-2 h-[3px] bg-[#2a3040] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(bar, 100)}%`, background: barColor }} />
        </div>
      )}
    </div>
  )
}
