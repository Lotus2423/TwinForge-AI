import { NavLink } from 'react-router-dom'
import { cn } from '@/utils/cn'
import type { Alert } from '@/types/machine.types'

interface NavItem { to: string; label: string; icon: React.ReactNode; dot?: 'red' | 'amber' }

const Icon = ({ d }: { d: string }) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d={d} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

interface Props { alerts: Alert[] }

export function Sidebar({ alerts }: Props) {
  const critCount = alerts.filter(a => a.severity === 'critical' && !a.isAcknowledged).length
  const warnCount = alerts.filter(a => a.severity === 'warning' && !a.isAcknowledged).length

  const sections: { heading: string; items: NavItem[] }[] = [
    {
      heading: 'Overview',
      items: [
        { to: '/', label: 'Dashboard', icon: <Icon d="M1 1h5v5H1zM9 1h5v5H9zM1 9h5v5H1zM9 9h5v5H9z" /> },
        { to: '/machines', label: 'Machines', icon: <Icon d="M2 3h11v9H2zM5 3V2M10 3V2" />, dot: critCount > 0 ? 'red' : undefined },
        { to: '/sensors', label: 'Sensor Monitor', icon: <Icon d="M1 11L5 7l3 3 5-6" /> },
      ],
    },
    {
      heading: 'Intelligence',
      items: [
        { to: '/predictions', label: 'Predictions', icon: <Icon d="M7.5 1v13M1 7.5h13" />, dot: 'amber' },
        { to: '/analytics', label: 'Analytics', icon: <Icon d="M2 12l3-3 2 2 3-3 3 3M1 4h13" /> },
        { to: '/twin', label: 'Digital Twin', icon: <Icon d="M7.5 1v2M7.5 12v2M1 7.5h2M12 7.5h2M3.5 3.5l1.5 1.5M10 10l1.5 1.5M3.5 11.5L5 10M10 5l1.5-1.5" /> },
      ],
    },
    {
      heading: 'Operations',
      items: [
        { to: '/maintenance', label: 'Maintenance', icon: <Icon d="M2 4h11M2 8h8M2 12h5" /> },
        { to: '/alerts', label: 'Alerts', icon: <Icon d="M7.5 2L13 11H2L7.5 2zM7.5 6v3M7.5 10.5v.5" />, dot: critCount > 0 ? 'red' : warnCount > 0 ? 'amber' : undefined },
        { to: '/energy', label: 'Energy', icon: <Icon d="M2 10.5l3-5 3 3.5 2-2.5 3 4" /> },
      ],
    },
    {
      heading: 'AI',
      items: [
        { to: '/assistant', label: 'Factory Assistant', icon: <Icon d="M2 11V5a1 1 0 011-1h9a1 1 0 011 1v6M1 11h13M5 11V7h5v4" /> },
      ],
    },
  ]

  return (
    <nav className="bg-[#111318] border-r border-[#1e2330] flex flex-col py-3 px-2 overflow-y-auto">
      {sections.map(sec => (
        <div key={sec.heading}>
          <div className="text-[10px] uppercase tracking-widest text-[#4a5568] px-2 py-2 mt-2">{sec.heading}</div>
          {sec.items.map(item => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}
              className={({ isActive }) => cn(
                'flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] transition-all mb-0.5 border',
                isActive
                  ? 'bg-[#1d3a6b] text-[#3b82f6] border-[#3b82f640]'
                  : 'text-[#8892a4] border-transparent hover:bg-[#181c23] hover:text-[#e8eaf0]'
              )}>
              <span className="opacity-80">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.dot && (
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: item.dot === 'red' ? '#ef4444' : '#f59e0b' }} />
              )}
            </NavLink>
          ))}
        </div>
      ))}
      <div className="mt-auto pt-3 border-t border-[#1e2330]">
        <NavLink to="/settings"
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] text-[#8892a4] hover:bg-[#181c23] hover:text-[#e8eaf0] border border-transparent transition-all">
          <Icon d="M7.5 5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM1.5 7.5h1M13 7.5h1M7.5 1.5v1M7.5 13v1M3.5 3.5l.7.7M11.3 11.3l.7.7M3.5 11.5l.7-.7M11.3 4.2l.7-.7" />
          Settings
        </NavLink>
      </div>
    </nav>
  )
}
