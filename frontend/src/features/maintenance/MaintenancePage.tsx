import { useMaintenance } from '@/hooks/useMaintenance'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { fmt } from '@/utils/format'
import { priorityColor } from '@/utils/health'
import type { MaintenanceTask } from '@/types/machine.types'

function TaskCard({ task }: { task: MaintenanceTask }) {
  const pColor = priorityColor(task.priority)
  return (
    <div className="bg-[#111318] border border-[#1e2330] rounded-xl p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 mr-3">
          <div className="text-sm font-semibold text-[#e8eaf0]">{task.title}</div>
          <div className="text-xs text-[#4a5568] mt-0.5">{task.machineName}</div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ color: pColor, background: pColor + '15', border: `1px solid ${pColor}30` }}>
            {task.priority.toUpperCase()}
          </span>
          <Badge variant={task.status === 'completed' ? 'healthy' : task.status === 'in_progress' ? 'info' : task.status === 'pending' ? 'warning' : 'offline'}>
            {task.status.replace('_', ' ')}
          </Badge>
        </div>
      </div>
      <p className="text-xs text-[#8892a4] leading-relaxed mb-3">{task.description}</p>
      <div className="flex items-center justify-between">
        <div className="text-xs text-[#4a5568]">
          {task.scheduledFor ? `Scheduled: ${fmt.date(task.scheduledFor)}` : 'Not scheduled'}
        </div>
        {task.status !== 'completed' && (
          <div className="flex gap-2">
            {task.status === 'pending' && <Button size="sm">Start work</Button>}
            {task.status === 'in_progress' && <Button size="sm" variant="primary">Mark complete</Button>}
          </div>
        )}
      </div>
    </div>
  )
}

export function MaintenancePage() {
  const { data: tasks = [] } = useMaintenance()
  const pending = tasks.filter(t => t.status === 'pending')
  const inProgress = tasks.filter(t => t.status === 'in_progress')
  const completed = tasks.filter(t => t.status === 'completed')

  return (
    <div>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-semibold text-[#e8eaf0] tracking-tight">Maintenance</h1>
          <p className="text-xs text-[#4a5568] mt-0.5">{pending.length} pending · {inProgress.length} in progress</p>
        </div>
        <Button variant="primary" size="sm">+ New task</Button>
      </div>

      {/* Kanban-style columns */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
            <span className="text-xs text-[#4a5568] uppercase tracking-wider">Pending ({pending.length})</span>
          </div>
          <div className="space-y-3">{pending.map(t => <TaskCard key={t.id} task={t} />)}</div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
            <span className="text-xs text-[#4a5568] uppercase tracking-wider">In progress ({inProgress.length})</span>
          </div>
          <div className="space-y-3">{inProgress.map(t => <TaskCard key={t.id} task={t} />)}</div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
            <span className="text-xs text-[#4a5568] uppercase tracking-wider">Completed ({completed.length})</span>
          </div>
          <div className="space-y-3">{completed.map(t => <TaskCard key={t.id} task={t} />)}</div>
        </div>
      </div>
    </div>
  )
}
