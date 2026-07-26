import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMachines } from '@/hooks/useMachines'
import { HealthRing } from '@/components/ui/HealthRing'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { fmt } from '@/utils/format'
import type { Machine, MachineStatus } from '@/types/machine.types'

const STATUS_FILTERS: { label: string; value: MachineStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Critical', value: 'critical' },
  { label: 'Warning', value: 'warning' },
  { label: 'Healthy', value: 'healthy' },
  { label: 'Offline', value: 'offline' },
]

function MachineCard({ machine }: { machine: Machine }) {
  const nav = useNavigate()
  return (
    <div onClick={() => nav(`/machines/${machine.id}`)}
      className="bg-[#111318] border border-[#1e2330] rounded-xl p-4 cursor-pointer hover:border-[#2a3040] transition-all hover:bg-[#13161e]">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-sm font-semibold text-[#e8eaf0]">{machine.name}</div>
          <div className="text-xs text-[#4a5568] mt-0.5">{machine.machineType.replace('_', ' ')} · {machine.locationBay}</div>
        </div>
        <Badge variant={machine.status === 'healthy' ? 'healthy' : machine.status === 'warning' ? 'warning' : machine.status === 'critical' ? 'critical' : machine.status === 'risk' ? 'risk' : 'offline'}>
          {machine.status}
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <HealthRing score={machine.healthScore} size={80} />
        <div className="flex-1 space-y-1.5">
          {machine.manufacturer && <div className="text-xs text-[#4a5568]">Manufacturer: <span className="text-[#8892a4]">{machine.manufacturer}</span></div>}
          {machine.ratedPowerKw && <div className="text-xs text-[#4a5568]">Rated power: <span className="text-[#8892a4]">{machine.ratedPowerKw} kW</span></div>}
          {machine.ratedRpm && <div className="text-xs text-[#4a5568]">Rated RPM: <span className="text-[#8892a4]">{machine.ratedRpm}</span></div>}
          {machine.lastSeen && <div className="text-xs text-[#4a5568]">Last seen: <span className="text-[#8892a4]">{fmt.ago(machine.lastSeen)}</span></div>}
        </div>
      </div>
    </div>
  )
}

export function MachinesPage() {
  const { data: machines = [], isLoading } = useMachines()
  const [filter, setFilter] = useState<MachineStatus | 'all'>('all')
  const [search, setSearch] = useState('')

  const filtered = machines.filter(m => {
    const matchFilter = filter === 'all' || m.status === filter
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      (m.locationBay ?? '').toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#e8eaf0] tracking-tight">Machines</h1>
          <p className="text-xs text-[#4a5568] mt-0.5">{machines.length} registered · {machines.filter(m => m.isActive).length} active</p>
        </div>
        <Button variant="primary" size="sm">+ Register machine</Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-5 flex-wrap">
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search machines…"
          className="bg-[#111318] border border-[#2a3040] rounded-lg px-3 py-1.5 text-sm text-[#e8eaf0] placeholder:text-[#4a5568] outline-none focus:border-[#3b82f6] w-52" />
        <div className="flex gap-1">
          {STATUS_FILTERS.map(f => (
            <button key={f.value} onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f.value ? 'bg-[#1d3a6b] text-[#3b82f6] border border-[#3b82f640]' : 'bg-[#111318] text-[#8892a4] border border-[#1e2330] hover:text-[#e8eaf0]'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-sm text-[#4a5568] py-8 text-center">Loading machines…</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
          {filtered.map(m => <MachineCard key={m.id} machine={m} />)}
        </div>
      )}
    </div>
  )
}
