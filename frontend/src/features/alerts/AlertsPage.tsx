import { useAlerts, useAcknowledgeAlert } from '@/hooks/useAlerts'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { fmt } from '@/utils/format'
import type { AlertSeverity } from '@/types/machine.types'

const SEV_MAP: Record<AlertSeverity, 'critical' | 'warning' | 'info'> = {
  critical: 'critical', warning: 'warning', info: 'info',
}

export function AlertsPage() {
  const { data: alerts = [] } = useAlerts()
  const { mutate: ack } = useAcknowledgeAlert()
  const unacked = alerts.filter(a => !a.isAcknowledged)
  const acked = alerts.filter(a => a.isAcknowledged)

  return (
    <div>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#e8eaf0] tracking-tight">Alerts</h1>
          <p className="text-xs text-[#4a5568] mt-0.5">{unacked.length} active · {acked.length} acknowledged</p>
        </div>
        {unacked.length > 0 && (
          <Button size="sm" onClick={() => unacked.forEach(a => ack(a.id))}>Acknowledge all</Button>
        )}
      </div>

      {unacked.length === 0 && (
        <div className="bg-[#052e1c] border border-[#10b98130] rounded-xl p-6 text-center mb-5">
          <div className="text-2xl mb-2">✓</div>
          <div className="text-sm font-medium text-[#10b981]">All clear</div>
          <div className="text-xs text-[#4a5568] mt-1">No active alerts at this time</div>
        </div>
      )}

      {unacked.length > 0 && (
        <div className="mb-6">
          <div className="text-xs text-[#4a5568] uppercase tracking-wider mb-3">Active alerts</div>
          <div className="space-y-2">
            {unacked.map(alert => (
              <div key={alert.id} className="bg-[#111318] border border-[#1e2330] rounded-xl p-4 flex gap-4 items-start">
                <Badge variant={SEV_MAP[alert.severity]}>{alert.severity}</Badge>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#e8eaf0]">{alert.title}</div>
                  <div className="text-xs text-[#8892a4] mt-1">{alert.message}</div>
                  <div className="text-xs text-[#4a5568] mt-1">{alert.machineName} · {fmt.ago(alert.createdAt)}</div>
                </div>
                <Button size="sm" onClick={() => ack(alert.id)}>Acknowledge</Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {acked.length > 0 && (
        <div>
          <div className="text-xs text-[#4a5568] uppercase tracking-wider mb-3">Acknowledged</div>
          <div className="space-y-2 opacity-60">
            {acked.map(alert => (
              <div key={alert.id} className="bg-[#111318] border border-[#1e2330] rounded-xl p-4 flex gap-4 items-start">
                <Badge variant={SEV_MAP[alert.severity]}>{alert.severity}</Badge>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[#e8eaf0] line-through">{alert.title}</div>
                  <div className="text-xs text-[#4a5568] mt-0.5">{alert.machineName} · {fmt.ago(alert.createdAt)}</div>
                </div>
                <Badge variant="healthy">Acknowledged</Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
