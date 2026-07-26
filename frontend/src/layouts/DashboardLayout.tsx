import { Outlet } from 'react-router-dom'
import { Topbar } from '@/components/layout/Topbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { useAlerts } from '@/hooks/useAlerts'
import { useWebSocket } from '@/hooks/useWebSocket'

export function DashboardLayout() {
  const { data: alerts = [] } = useAlerts()
  useWebSocket()

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gridTemplateRows: '48px 1fr', height: '100vh', overflow: 'hidden' }}>
      <div style={{ gridColumn: '1/-1' }}>
        <Topbar alerts={alerts} />
      </div>
      <Sidebar alerts={alerts} />
      <main className="overflow-auto bg-[#0a0b0d] p-6">
        <Outlet />
      </main>
    </div>
  )
}
