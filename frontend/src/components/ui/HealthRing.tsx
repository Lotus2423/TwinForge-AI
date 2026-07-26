import { healthColor, healthLabel } from '@/utils/health'

interface Props { score: number; size?: number }

export function HealthRing({ score, size = 120 }: Props) {
  const r = (size / 2) - 10
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - score / 100)
  const color = healthColor(score)

  return (
    <div className="flex flex-col items-center">
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1e2330" strokeWidth="10" />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="10"
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className="text-2xl font-bold tabular-nums" style={{ color }}>{score.toFixed(0)}%</div>
          <div className="text-[10px] text-[#4a5568] uppercase tracking-wider">health</div>
        </div>
      </div>
      <div className="mt-3 text-xs font-semibold px-3 py-1 rounded-full border"
        style={{ color, background: color + '15', borderColor: color + '30' }}>
        {healthLabel(score)}
      </div>
    </div>
  )
}
