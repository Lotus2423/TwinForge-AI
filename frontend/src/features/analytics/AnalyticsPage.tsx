import { useMachines } from '@/hooks/useMachines'
import { useSensorHistory } from '@/hooks/useSensorData'
import { SensorChart } from '@/components/charts/SensorChart'
import { Card, CardHeader } from '@/components/ui/Card'
import { healthColor } from '@/utils/health'

export function AnalyticsPage() {
  const { data: machines = [] } = useMachines()
  const { data: history = [] } = useSensorHistory('motor-01')

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-[#e8eaf0] tracking-tight">Analytics</h1>
        <p className="text-xs text-[#4a5568] mt-0.5">Historical trends · Fleet health · Failure patterns</p>
      </div>

      {/* Fleet health bar chart */}
      <Card noPad className="mb-4">
        <CardHeader title="Fleet health scores" subtitle="All machines · Current" />
        <div className="p-4 space-y-3">
          {machines.map(m => (
            <div key={m.id} className="flex items-center gap-3">
              <div className="text-xs text-[#8892a4] w-28 flex-shrink-0">{m.name}</div>
              <div className="flex-1 h-6 bg-[#181c23] rounded-lg overflow-hidden">
                <div className="h-full rounded-lg transition-all flex items-center pl-2"
                  style={{ width: `${m.healthScore}%`, background: healthColor(m.healthScore) + '40', borderRight: `2px solid ${healthColor(m.healthScore)}` }}>
                </div>
              </div>
              <div className="text-xs font-bold tabular-nums w-12 text-right" style={{ color: healthColor(m.healthScore) }}>
                {m.status === 'offline' ? '—' : `${m.healthScore}%`}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Sensor trend charts for motor-01 */}
      <div className="grid grid-cols-2 gap-4">
        {(['temperatureC', 'vibrationMms', 'currentA', 'rpm'] as const).map(metric => (
          <Card key={metric} noPad>
            <div className="p-4">
              <SensorChart data={history} metric={metric} height={160} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
