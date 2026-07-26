import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { SensorReading } from '@/types/machine.types'
import { fmt } from '@/utils/format'

type Metric = 'temperatureC' | 'vibrationMms' | 'currentA' | 'rpm'

const CONFIG: Record<Metric, { label: string; color: string; unit: string; format: (v: number) => string }> = {
  temperatureC: { label: 'Temperature', color: '#f59e0b', unit: '°C', format: v => `${v.toFixed(1)}°C` },
  vibrationMms: { label: 'Vibration', color: '#ef4444', unit: 'mm/s', format: v => `${v.toFixed(2)} mm/s` },
  currentA: { label: 'Current', color: '#3b82f6', unit: 'A', format: v => `${v.toFixed(1)} A` },
  rpm: { label: 'RPM', color: '#10b981', unit: 'rpm', format: v => `${v.toFixed(0)} rpm` },
}

interface Props {
  data: SensorReading[]
  metric: Metric
  height?: number
}

export function SensorChart({ data, metric, height = 160 }: Props) {
  const cfg = CONFIG[metric]
  const chartData = data.slice(-48).map(r => ({
    time: fmt.time(r.recordedAt),
    value: r[metric] as number,
  }))

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-[#4a5568] uppercase tracking-wider">{cfg.label} — 48h</span>
        {chartData.length > 0 && (
          <span className="text-xs font-semibold tabular-nums" style={{ color: cfg.color }}>
            {cfg.format(chartData[chartData.length - 1].value)}
          </span>
        )}
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`grad-${metric}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={cfg.color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={cfg.color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" tick={{ fill: '#4a5568', fontSize: 10 }} tickLine={false} axisLine={false}
            interval={Math.floor(chartData.length / 4)} />
          <YAxis tick={{ fill: '#4a5568', fontSize: 10 }} tickLine={false} axisLine={false}
            tickFormatter={(v) => `${v.toFixed(0)}`} width={36} />
          <Tooltip
            contentStyle={{ background: '#111318', border: '1px solid #2a3040', borderRadius: 6, fontSize: 12 }}
            labelStyle={{ color: '#8892a4' }}
            itemStyle={{ color: cfg.color }}
            formatter={(v: number) => [cfg.format(v), cfg.label]}
          />
          <Area type="monotone" dataKey="value" stroke={cfg.color} strokeWidth={2}
            fill={`url(#grad-${metric})`} dot={false} activeDot={{ r: 4, fill: cfg.color }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
