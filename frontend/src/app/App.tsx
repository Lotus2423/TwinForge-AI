/**
 * TwinForge AI — Root Application Component
 * All routes defined here. DashboardLayout wraps every authenticated page.
 */
import { Routes, Route, Navigate } from 'react-router-dom'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { DashboardPage } from '@/features/dashboard/DashboardPage'
import { MachinesPage } from '@/features/machines/MachinesPage'
import { MachineDetailPage } from '@/features/machines/MachineDetailPage'
import { SensorsPage } from '@/features/sensors/SensorsPage'
import { PredictionsPage } from '@/features/predictions/PredictionsPage'
import { AlertsPage } from '@/features/alerts/AlertsPage'
import { MaintenancePage } from '@/features/maintenance/MaintenancePage'
import { AnalyticsPage } from '@/features/analytics/AnalyticsPage'
import { EnergyPage } from '@/features/energy/EnergyPage'
import { DigitalTwinPage } from '@/features/twin/DigitalTwinPage'
import { AssistantPage } from '@/features/assistant/AssistantPage'
import { SettingsPage } from '@/pages/SettingsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/"              element={<DashboardPage />} />
        <Route path="/machines"      element={<MachinesPage />} />
        <Route path="/machines/:id"  element={<MachineDetailPage />} />
        <Route path="/sensors"       element={<SensorsPage />} />
        <Route path="/predictions"   element={<PredictionsPage />} />
        <Route path="/alerts"        element={<AlertsPage />} />
        <Route path="/maintenance"   element={<MaintenancePage />} />
        <Route path="/analytics"     element={<AnalyticsPage />} />
        <Route path="/energy"        element={<EnergyPage />} />
        <Route path="/twin"          element={<DigitalTwinPage />} />
        <Route path="/assistant"     element={<AssistantPage />} />
        <Route path="/settings"      element={<SettingsPage />} />
        <Route path="*"              element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
