interface Props { label: string; value: number; color?: string }
export function FeatureBar({ label, value, color = '#8b5cf6' }: Props) {
  const pct = (value * 100).toFixed(0)
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-[#8892a4] capitalize">{label.replace(/_/g, ' ')}</span>
        <span className="tabular-nums font-semibold" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-1.5 bg-[#1e2330] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}
