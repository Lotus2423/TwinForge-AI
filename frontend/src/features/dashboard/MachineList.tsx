import { useNavigate } from 'react-router-dom'
import type { Machine } from '@/types/machine.types'
import { healthColor, healthLabel } from '@/utils/health'
import { Badge } from '@/components/ui/Badge'
import { fmt } from '@/utils/format'

export function MachineList({ machines }: { machines: Machine[] }) {
  const nav = useNavigate()
  return (
    <div className="divide-y divide-[#1e2330]">
      {machines.map(m => (
        <div key={m.id} onClick={() => nav(`/machines/${m.id}`)}
          className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#181c23] transition-colors">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: healthColor(m.healthScore) }} />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-[#e8eaf0]">{m.name}</div>
            <div className="text-xs text-[#4a5568]">{m.locationBay} · {m.machineType.replace('_', ' ')}</div>
          </div>
          {m.lastSeen && <div className="text-xs text-[#4a5568] hidden sm:block">{fmt.ago(m.lastSeen)}</div>}
          <div className="text-sm font-bold tabular-nums w-10 text-right" style={{ color: healthColor(m.healthScore) }}>
            {m.status === 'offline' ? '—' : `${m.healthScore}%`}
          </div>
          <Badge variant={m.status === 'healthy' ? 'healthy' : m.status === 'warning' ? 'warning' : m.status === 'critical' ? 'critical' : m.status === 'risk' ? 'risk' : 'offline'}>
            {healthLabel(m.healthScore) || 'Offline'}
          </Badge>
        </div>
      ))}
    </div>
  )
}
