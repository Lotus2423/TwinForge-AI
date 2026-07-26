import { useParams, Link } from 'react-router-dom'
import { useMachine } from '@/hooks/useMachines'
import { useLatestPrediction } from '@/hooks/usePrediction'
import { useSensorHistory } from '@/hooks/useSensorData'
import { HealthRing } from '@/components/ui/HealthRing'
import { SensorChart } from '@/components/charts/SensorChart'
import { FeatureBar } from '@/components/charts/FeatureBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { fmt } from '@/utils/format'
import { SensorValue } from '@/components/ui/SensorValue'

export function MachineDetailPage() {
  const { id = 'motor-01' } = useParams<{ id: string }>()
  const { data: machine } = useMachine(id)
  const { data: prediction } = useLatestPrediction(id)
  const { data: history = [] } = useSensorHistory(id)
  const latest = history[history.length - 1]

  if (!machine) return <div className="text-sm text-[#4a5568] p-8">Loading…</div>

  return (
    <div>
      {/* Breadcrumb + header */}
      <div className="mb-5">
        <div className="text-xs text-[#4a5568] mb-1">
          <Link to="/machines" className="hover:text-[#3b82f6]">Machines</Link> / {machine.name}
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-[#e8eaf0]">{machine.name}</h1>
          <Badge variant={machine.status === 'healthy' ? 'healthy' : machine.status === 'critical' ? 'critical' : 'warning'}>
            {machine.status}
          </Badge>
        </div>
        <p className="text-xs text-[#4a5568] mt-0.5">{machine.manufacturer} {machine.modelNumber} · {machine.locationBay}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Left 2 cols */}
        <div className="col-span-2 space-y-4">
          {/* Machine specs */}
          <Card noPad>
            <CardHeader title="Machine specifications" />
            <div className="p-4 grid grid-cols-3 gap-3 text-xs">
              {[
                ['Rated power', machine.ratedPowerKw ? `${machine.ratedPowerKw} kW` : '—'],
                ['Rated voltage', machine.ratedVoltageV ? `${machine.ratedVoltageV} V` : '—'],
                ['Rated current', machine.ratedCurrentA ? `${machine.ratedCurrentA} A` : '—'],
                ['Rated RPM', machine.ratedRpm ? fmt.rpm(machine.ratedRpm) : '—'],
                ['Machine type', machine.machineType.replace('_', ' ')],
                ['Location', machine.locationBay ?? '—'],
              ].map(([label, value]) => (
                <div key={label} className="bg-[#181c23] rounded-lg p-3">
                  <div className="text-[#4a5568] mb-1">{label}</div>
                  <div className="text-[#e8eaf0] font-medium">{value}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Live sensors */}
          {latest && (
            <Card noPad>
              <CardHeader title="Live sensor readings" subtitle={`Last update: ${fmt.ago(latest.recordedAt)}`} right={<Badge variant="live" showDot>Live</Badge>} />
              <div className="p-4 grid grid-cols-2 gap-3">
                <SensorValue label="Temperature" value={fmt.temp(latest.temperatureC)}
                  status={latest.temperatureC > 85 ? 'crit' : latest.temperatureC > 72 ? 'warn' : 'ok'}
                  bar={(latest.temperatureC / 100) * 100} />
                <SensorValue label="Vibration" value={fmt.vib(latest.vibrationMms)}
                  status={latest.vibrationMms > 7 ? 'crit' : latest.vibrationMms > 4.5 ? 'warn' : 'ok'}
                  bar={(latest.vibrationMms / 10) * 100} />
                <SensorValue label="Current" value={fmt.amp(latest.currentA)}
                  bar={(latest.currentA / 50) * 100} />
                <SensorValue label="RPM" value={fmt.rpm(latest.rpm)} bar={(latest.rpm / 1500) * 100} />
              </div>
            </Card>
          )}

          {/* Sensor charts */}
          {history.length > 0 && (
            <Card noPad>
              <CardHeader title="Sensor trends" subtitle="48-hour history" />
              <div className="p-4 grid grid-cols-2 gap-6">
                <SensorChart data={history} metric="temperatureC" height={120} />
                <SensorChart data={history} metric="vibrationMms" height={120} />
                <SensorChart data={history} metric="currentA" height={120} />
                <SensorChart data={history} metric="rpm" height={120} />
              </div>
            </Card>
          )}
        </div>

        {/* Right 1 col */}
        <div className="space-y-4">
          <Card noPad>
            <CardHeader title="AI Health prediction" subtitle="Updated 5min ago" />
            <div className="p-4 flex flex-col items-center">
              {prediction ? (
                <>
                  <HealthRing score={prediction.healthScore} size={110} />
                  <div className="w-full mt-4 space-y-2.5">
                    {[
                      ['Failure probability', fmt.pct(prediction.failureProbability), '#ef4444'],
                      ['Remaining useful life', fmt.rul(prediction.rulDays), '#f59e0b'],
                      ['Failure type', prediction.failureType.replace('_', ' '), '#f59e0b'],
                      ['Confidence', fmt.pct(prediction.confidence), '#10b981'],
                    ].map(([label, value, color]) => (
                      <div key={label} className="flex justify-between text-xs">
                        <span className="text-[#4a5568]">{label}</span>
                        <span className="font-semibold tabular-nums" style={{ color }}>{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="w-full mt-4 pt-4 border-t border-[#1e2330]">
                    <div className="text-xs text-[#4a5568] mb-2 uppercase tracking-wider">XAI Feature weights</div>
                    {Object.entries(prediction.featureImportance).map(([k, v]) => (
                      <FeatureBar key={k} label={k} value={v} />
                    ))}
                  </div>
                  <div className="w-full mt-4 pt-4 border-t border-[#1e2330]">
                    <div className="text-xs text-[#4a5568] mb-2 uppercase tracking-wider">AI Explanation</div>
                    <p className="text-xs text-[#8892a4] leading-relaxed">{prediction.explanation}</p>
                  </div>
                </>
              ) : (
                <div className="text-sm text-[#4a5568] py-8">No prediction available</div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
