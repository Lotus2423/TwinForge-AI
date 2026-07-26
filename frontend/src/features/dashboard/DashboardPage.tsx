import { useFleet } from '@/hooks/useMachines'
import { useMachines } from '@/hooks/useMachines'
import { useAlerts } from '@/hooks/useAlerts'
import { useLatestPrediction } from '@/hooks/usePrediction'
import { useSensorHistory } from '@/hooks/useSensorData'
import { KpiRow } from './KpiRow'
import { AlertBanner } from './AlertBanner'
import { MachineList } from './MachineList'
import { HealthRing } from '@/components/ui/HealthRing'
import { SensorValue } from '@/components/ui/SensorValue'
import { SensorChart } from '@/components/charts/SensorChart'
import { FeatureBar } from '@/components/charts/FeatureBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { fmt } from '@/utils/format'
import { Link } from 'react-router-dom'

const FOCUS_MACHINE = 'motor-01'

export function DashboardPage() {
  const { data: fleet } = useFleet()
  const { data: machines = [] } = useMachines()
  const { data: alerts = [] } = useAlerts()
  const { data: prediction } = useLatestPrediction(FOCUS_MACHINE)
  const { data: sensorHistory = [] } = useSensorHistory(FOCUS_MACHINE)
  const latest = sensorHistory[sensorHistory.length - 1]

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#e8eaf0] tracking-tight">Plant Overview</h1>
          <p className="text-xs text-[#4a5568] mt-0.5">Unit 3 · Sector B · Live dashboard</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm">Export report</Button>
          <Link to="/machines">
            <Button size="sm" variant="primary">+ Add machine</Button>
          </Link>
        </div>
      </div>

      {fleet && <KpiRow fleet={fleet} />}
      <AlertBanner alerts={alerts} />

      {/* Main grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* LEFT: 2 columns */}
        <div className="col-span-2 flex flex-col gap-4">

          {/* Sensor panel */}
          <Card noPad>
            <CardHeader
              title="Motor-01 · Live sensors"
              subtitle="3-Phase Induction Motor · Bay 3"
              right={<Badge variant="live" showDot>Live</Badge>}
            />
            <div className="p-4">
              {latest ? (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <SensorValue label="Temperature" value={fmt.temp(latest.temperatureC)}
                    status={latest.temperatureC > 85 ? 'crit' : latest.temperatureC > 72 ? 'warn' : 'ok'}
                    bar={(latest.temperatureC / 100) * 100} />
                  <SensorValue label="Vibration" value={fmt.vib(latest.vibrationMms)}
                    status={latest.vibrationMms > 7 ? 'crit' : latest.vibrationMms > 4.5 ? 'warn' : 'ok'}
                    bar={(latest.vibrationMms / 10) * 100} />
                  <SensorValue label="Current" value={fmt.amp(latest.currentA)}
                    status={latest.currentA > 45 ? 'crit' : latest.currentA > 38 ? 'warn' : 'ok'}
                    bar={(latest.currentA / 50) * 100} />
                  <SensorValue label="RPM" value={fmt.rpm(latest.rpm)}
                    bar={(latest.rpm / 1500) * 100} />
                </div>
              ) : (
                <div className="text-sm text-[#4a5568] py-4 text-center">Loading sensor data…</div>
              )}
              {sensorHistory.length > 0 && <SensorChart data={sensorHistory} metric="vibrationMms" height={140} />}
            </div>
          </Card>

          {/* Fleet list */}
          <Card noPad>
            <CardHeader
              title="All machines"
              subtitle={`${machines.length} registered`}
              right={<Link to="/machines"><span className="text-xs text-[#3b82f6] hover:underline">View all →</span></Link>}
            />
            <MachineList machines={machines} />
          </Card>
        </div>

        {/* RIGHT: 1 column */}
        <div className="flex flex-col gap-4">
          {/* Health ring */}
          <Card noPad>
            <CardHeader
              title="Motor-01 health"
              subtitle="AI Prediction Engine"
              right={prediction && <Badge variant={prediction.healthScore < 30 ? 'critical' : 'warning'}>
                {prediction.healthScore < 30 ? 'Critical' : 'Warning'}
              </Badge>}
            />
            <div className="p-4 flex flex-col items-center">
              {prediction ? (
                <>
                  <HealthRing score={prediction.healthScore} size={120} />
                  <div className="w-full mt-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#4a5568]">Failure probability</span>
                      <span className="font-semibold text-[#ef4444] tabular-nums">{fmt.pct(prediction.failureProbability)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#4a5568]">Remaining useful life</span>
                      <span className="font-semibold text-[#f59e0b] tabular-nums">{fmt.rul(prediction.rulDays)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#4a5568]">Failure type</span>
                      <span className="font-semibold text-[#f59e0b]">{prediction.failureType.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#4a5568]">Model confidence</span>
                      <span className="font-semibold text-[#10b981] tabular-nums">{fmt.pct(prediction.confidence)}</span>
                    </div>
                  </div>
                  <div className="w-full mt-4 pt-4 border-t border-[#1e2330]">
                    <div className="text-xs text-[#4a5568] mb-2 uppercase tracking-wider">Feature importance (XAI)</div>
                    {Object.entries(prediction.featureImportance).map(([k, v]) => (
                      <FeatureBar key={k} label={k} value={v} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-sm text-[#4a5568] py-8">Loading prediction…</div>
              )}
            </div>
          </Card>

          {/* Quick action */}
          {prediction && prediction.healthScore < 40 && (
            <div className="bg-[#2d0e0e] border border-[#ef444430] rounded-xl p-4">
              <div className="text-xs font-semibold text-[#ef4444] mb-2">⚡ Recommended action</div>
              <div className="text-xs text-[#8892a4] leading-relaxed">{prediction.recommendedAction}</div>
              <Link to="/maintenance">
                <Button variant="danger" size="sm" className="mt-3 w-full justify-center">Schedule maintenance</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
