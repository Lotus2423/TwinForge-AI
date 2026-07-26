import { Suspense } from 'react'
import { useLatestPrediction } from '@/hooks/usePrediction'
import { useSensorHistory } from '@/hooks/useSensorData'
import { MotorTwin3D } from '@/components/twin/MotorTwin3D'
import { HealthRing } from '@/components/ui/HealthRing'
import { Badge } from '@/components/ui/Badge'
import { Card, CardHeader } from '@/components/ui/Card'
import { fmt } from '@/utils/format'
import { healthLabel } from '@/utils/health'

export function DigitalTwinPage() {
  const { data: prediction } = useLatestPrediction('motor-01')
  const { data: history = [] } = useSensorHistory('motor-01')
  const latest = history[history.length - 1]
  const score = prediction?.healthScore ?? 100

  return (
    <div>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#e8eaf0] tracking-tight">Digital Twin</h1>
          <p className="text-xs text-[#4a5568] mt-0.5">Motor-01 · Live 3D visualization · Three.js</p>
        </div>
        <Badge variant="live" showDot>Synchronized</Badge>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* 3D Twin viewer */}
        <div className="col-span-2 bg-[#111318] border border-[#1e2330] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e2330]">
            <div>
              <div className="text-sm font-semibold text-[#e8eaf0]">Motor-01 · 3D Digital Twin</div>
              <div className="text-xs text-[#4a5568]">
                {prediction?.failureType ? `Detected: ${prediction.failureType.replace('_', ' ')}` : 'All systems nominal'}
              </div>
            </div>
            {prediction && (
              <Badge variant={score < 30 ? 'critical' : score < 60 ? 'warning' : 'healthy'}>
                {healthLabel(score)}
              </Badge>
            )}
          </div>

          <Suspense fallback={
            <div className="h-96 flex items-center justify-center text-sm text-[#4a5568]">
              Loading 3D model…
            </div>
          }>
            <MotorTwin3D
              healthScore={score}
              failureType={prediction?.failureType}
              rpm={latest?.rpm}
              height={400}
            />
          </Suspense>

          {/* Health legend */}
          <div className="px-4 py-3 border-t border-[#1e2330] grid grid-cols-4 gap-2">
            {[
              { label: '🟢 Healthy', desc: '80–100%', color: '#10b981' },
              { label: '🟡 Warning', desc: '60–79%', color: '#f59e0b' },
              { label: '🟠 High risk', desc: '30–59%', color: '#f97316' },
              { label: '🔴 Critical', desc: '0–29%', color: '#ef4444' },
            ].map(l => (
              <div key={l.label} className="bg-[#181c23] rounded-lg p-2 text-center border border-[#2a3040]">
                <div className="text-xs font-medium" style={{ color: l.color }}>{l.label}</div>
                <div className="text-[10px] text-[#4a5568]">{l.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Side panel */}
        <div className="flex flex-col gap-4">
          {prediction && (
            <Card noPad>
              <CardHeader title="Health status" />
              <div className="p-4 flex flex-col items-center">
                <HealthRing score={score} size={110} />
                <div className="w-full mt-4 space-y-2.5">
                  {[
                    ['Failure probability', fmt.pct(prediction.failureProbability), '#ef4444'],
                    ['Remaining useful life', fmt.rul(prediction.rulDays), '#f59e0b'],
                    ['Failure type', prediction.failureType.replace('_', ' '), '#f59e0b'],
                    ['AI confidence', fmt.pct(prediction.confidence), '#10b981'],
                  ].map(([l, v, c]) => (
                    <div key={l} className="flex justify-between text-xs">
                      <span className="text-[#4a5568]">{l}</span>
                      <span className="font-semibold" style={{ color: c }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {latest && (
            <Card noPad>
              <CardHeader title="Live telemetry" right={<Badge variant="live" showDot>Live</Badge>} />
              <div className="p-4 space-y-2.5">
                {[
                  ['Temperature', fmt.temp(latest.temperatureC)],
                  ['Vibration', fmt.vib(latest.vibrationMms)],
                  ['Current', fmt.amp(latest.currentA)],
                  ['RPM', fmt.rpm(latest.rpm)],
                  ['Last update', fmt.ago(latest.recordedAt)],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between text-xs">
                    <span className="text-[#4a5568]">{l}</span>
                    <span className="font-medium tabular-nums text-[#e8eaf0]">{v}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card noPad>
            <CardHeader title="Twin controls" />
            <div className="p-4 space-y-2">
              {['Auto-rotate', 'Show fault overlay', 'Animate vibration', 'Show sensor heatmap'].map(ctrl => (
                <label key={ctrl} className="flex items-center gap-2.5 cursor-pointer">
                  <div className="w-8 h-4 bg-[#3b82f6] rounded-full relative flex-shrink-0">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
                  </div>
                  <span className="text-xs text-[#8892a4]">{ctrl}</span>
                </label>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
