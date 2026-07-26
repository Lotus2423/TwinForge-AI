import { useMachines } from '@/hooks/useMachines'
import { useLatestPrediction } from '@/hooks/usePrediction'
import { HealthRing } from '@/components/ui/HealthRing'
import { FeatureBar } from '@/components/charts/FeatureBar'
import { Card, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { fmt } from '@/utils/format'
import { healthColor } from '@/utils/health'

function PredictionCard({ machineId, machineName }: { machineId: string; machineName: string }) {
  const { data: pred, isLoading } = useLatestPrediction(machineId)
  if (isLoading) return <Card><div className="text-xs text-[#4a5568] py-4 text-center">Loading…</div></Card>
  if (!pred) return null

  return (
    <Card noPad>
      <CardHeader
        title={machineName}
        subtitle={pred.failureType.replace('_', ' ')}
        right={<Badge variant={pred.healthScore < 30 ? 'critical' : pred.healthScore < 60 ? 'warning' : 'healthy'}>
          {pred.healthScore < 30 ? 'Critical' : pred.healthScore < 60 ? 'Warning' : 'Healthy'}
        </Badge>}
      />
      <div className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <HealthRing score={pred.healthScore} size={90} />
          <div className="flex-1 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#4a5568]">Failure probability</span>
              <span className="font-bold tabular-nums" style={{ color: healthColor(100 - pred.failureProbability * 100) }}>
                {fmt.pct(pred.failureProbability)}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#4a5568]">Remaining useful life</span>
              <span className="font-semibold text-[#f59e0b] tabular-nums">{fmt.rul(pred.rulDays)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#4a5568]">Model confidence</span>
              <span className="font-semibold text-[#10b981] tabular-nums">{fmt.pct(pred.confidence)}</span>
            </div>
          </div>
        </div>
        <div className="pt-3 border-t border-[#1e2330]">
          {Object.entries(pred.featureImportance).map(([k, v]) => (
            <FeatureBar key={k} label={k} value={v} />
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-[#1e2330]">
          <p className="text-xs text-[#8892a4] leading-relaxed">{pred.explanation}</p>
        </div>
      </div>
    </Card>
  )
}

export function PredictionsPage() {
  const { data: machines = [] } = useMachines()
  const active = machines.filter(m => m.isActive).sort((a, b) => a.healthScore - b.healthScore)

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-[#e8eaf0] tracking-tight">AI Predictions</h1>
        <p className="text-xs text-[#4a5568] mt-0.5">Prediction AI · Explainable AI · Remaining useful life</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {active.map(m => <PredictionCard key={m.id} machineId={m.id} machineName={m.name} />)}
      </div>
    </div>
  )
}
