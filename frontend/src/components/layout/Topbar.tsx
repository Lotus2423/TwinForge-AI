import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { Alert } from '@/types/machine.types'

interface Props { alerts: Alert[] }

export function Topbar({ alerts }: Props) {
  const [time, setTime] = useState(new Date())
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t) }, [])

  const unacked = alerts.filter(a => !a.isAcknowledged).length
  const critCount = alerts.filter(a => a.severity === 'critical' && !a.isAcknowledged).length

  return (
    <header className="bg-[#111318] border-b border-[#1e2330] flex items-center px-5 gap-4 h-12 flex-shrink-0">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mr-auto">
        <div className="w-7 h-7 bg-[#3b82f6] rounded-lg flex items-center justify-center flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <circle cx="7" cy="7" r="2.5" />
            <path d="M7 1v2M7 11v2M1 7h2M11 7h2M3.2 3.2l1.4 1.4M9.4 9.4l1.4 1.4M3.2 10.8l1.4-1.4M9.4 4.6l1.4-1.4" />
          </svg>
        </div>
        <div>
          <div className="text-sm font-semibold text-[#e8eaf0] leading-none">TwinForge</div>
          <div className="text-[10px] text-[#4a5568] uppercase tracking-widest leading-none mt-0.5">AI Platform</div>
        </div>
      </Link>

      {/* Status */}
      <div className="flex items-center gap-1 text-[11px] bg-[#052e1c] text-[#10b981] border border-[#10b98130] px-2.5 py-1 rounded">
        <span className="text-[8px]">●</span> Live
      </div>

      {/* Alerts bell */}
      {unacked > 0 && (
        <Link to="/alerts" className="relative flex items-center">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={critCount > 0 ? '#ef4444' : '#f59e0b'} strokeWidth="1.5">
            <path d="M9 2a6 6 0 016 6v3l1.5 2H1.5L3 11V8a6 6 0 016-6zM7 14a2 2 0 004 0" strokeLinecap="round" />
          </svg>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
            style={{ background: critCount > 0 ? '#ef4444' : '#f59e0b', color: '#fff' }}>
            {unacked}
          </span>
        </Link>
      )}

      {/* Clock */}
      <div className="text-xs text-[#4a5568] tabular-nums hidden sm:block">
        {time.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' })}
        {' · '}
        {time.toLocaleTimeString('en-GB', { hour12: false })}
      </div>

      {/* Avatar */}
      <div className="w-7 h-7 rounded-full bg-[#1d3a6b] border border-[#3b82f6] flex items-center justify-center text-[11px] font-semibold text-[#3b82f6]">
        AK
      </div>
    </header>
  )
}
