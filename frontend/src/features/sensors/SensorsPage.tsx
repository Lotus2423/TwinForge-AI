import { useState } from 'react'
import { useMachines } from '@/hooks/useMachines'
import { useSensorHistory } from '@/hooks/useSensorData'
import { SensorChart } from '@/components/charts/SensorChart'
import { SensorValue } from '@/components/ui/SensorValue'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { fmt } from '@/utils/format'

const METRICS = ['temperatureC', 'vibrationMms', 'currentA', 'rpm'] as const

export function SensorsPage() {
  const { data: machines = [] } = useMachines()
  const [selectedId, setSelectedId] = useState('motor-01')
  const { data: history = [] } = useSensorHistory(selectedId)
  const latest = history[history.length - 1]
  const selected = machines.find(m => m.id === selectedId)

  return (
    <div>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#e8eaf0] tracking-tight">Sensor Monitor</h1>
          <p className="text-xs text-[#4a5568] mt-0.5">Real-time + historical sensor readings</p>
        </div>
        <Badge variant="live" showDot>Live · 5s refresh</Badge>
      </div>

      {/* Machine selector */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {machines.filter(m => m.isActive).map(m => (
          <button key={m.id} onClick={() => setSelectedId(m.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              selectedId === m.id
                ? 'bg-[#1d3a6b] text-[#3b82f6] border-[#3b82f640]'
                : 'bg-[#111318] text-[#8892a4] border-[#1e2330] hover:text-[#e8eaf0]'
            }`}>
            {m.name}
          </button>
        ))}
      </div>

      {selected && (
        <div className="text-xs text-[#4a5568] mb-4">
          {selected.manufacturer} {selected.modelNumber} · {selected.locationBay}
          {latest && <span> · Last reading: {fmt.ago(latest.recordedAt)}</span>}
        </div>
      )}

      {/* Live values */}
      {latest && (
        <div className="grid grid-cols-4 gap-3 mb-5">
          <SensorValue label="Temperature" value={fmt.temp(latest.temperatureC)}
            status={latest.temperatureC > 85 ? 'crit' : latest.temperatureC > 72 ? 'warn' : 'ok'}
            bar={(latest.temperatureC / 100) * 100} />
          <SensorValue label="Vibration" value={fmt.vib(latest.vibrationMms)}
            status={latest.vibrationMms > 7 ? 'crit' : latest.vibrationMms > 4.5 ? 'warn' : 'ok'}
            bar={(latest.vibrationMms / 10) * 100} />
          <SensorValue label="Current" value={fmt.amp(latest.currentA)}
            bar={(latest.currentA / 50) * 100} />
          <SensorValue label="RPM" value={fmt.rpm(latest.rpm)} bar={(latest.rpm / 1600) * 100} />
        </div>
      )}

      {/* Charts grid */}
      <div className="grid grid-cols-2 gap-4">
        {METRICS.map(metric => (
          <Card key={metric} noPad>
            <div className="p-4">
              <SensorChart data={history} metric={metric} height={180} />
            </div>
          </Card>
        ))}
      </div>

      {/* ISO reference */}
      <Card className="mt-4">
        <div className="text-xs text-[#4a5568] mb-3 uppercase tracking-wider">ISO 10816-3 Vibration severity reference</div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { zone: 'Zone A', range: '< 2.3 mm/s', label: 'New machine', color: '#10b981' },
            { zone: 'Zone B', range: '2.3–4.5 mm/s', label: 'Acceptable', color: '#3b82f6' },
            { zone: 'Zone C', range: '4.5–7.1 mm/s', label: 'Alert', color: '#f59e0b' },
            { zone: 'Zone D', range: '> 7.1 mm/s', label: 'Danger', color: '#ef4444' },
          ].map(z => (
            <div key={z.zone} className="bg-[#181c23] border border-[#2a3040] rounded-lg p-3">
              <div className="text-[10px] font-bold mb-0.5" style={{ color: z.color }}>{z.zone}</div>
              <div className="text-xs text-[#e8eaf0] tabular-nums">{z.range}</div>
              <div className="text-[10px] text-[#4a5568] mt-0.5">{z.label}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
