import type { FleetSummary } from '@/types/machine.types'

interface KpiProps { label: string; value: string | number; sub: string; accent: string }
function Kpi({ label, value, sub, accent }: KpiProps) {
  return (
    <div className="bg-[#111318] border border-[#1e2330] rounded-xl p-4 relative overflow-hidden">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: accent }} />
      <div className="text-[10px] uppercase tracking-widest text-[#4a5568] mb-2">{label}</div>
      <div className="text-3xl font-bold tabular-nums" style={{ color: accent }}>{value}</div>
      <div className="text-xs text-[#4a5568] mt-1">{sub}</div>
    </div>
  )
}

export function KpiRow({ fleet }: { fleet: FleetSummary }) {
  return (
    <div className="grid grid-cols-4 gap-3 mb-5">
      <Kpi label="Machines online" value={`${fleet.online}/${fleet.totalMachines}`} sub={`${((fleet.online/fleet.totalMachines)*100).toFixed(0)}% availability`} accent="#10b981" />
      <Kpi label="Active warnings" value={fleet.warning} sub="Machines need attention" accent="#f59e0b" />
      <Kpi label="Critical alerts" value={fleet.critical} sub="Immediate action required" accent="#ef4444" />
      <Kpi label="Avg fleet health" value={`${fleet.avgHealthScore}%`} sub="Across all machines" accent="#8b5cf6" />
    </div>
  )
}
