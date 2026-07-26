import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function SettingsPage() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-[#e8eaf0] tracking-tight">Settings</h1>
        <p className="text-xs text-[#4a5568] mt-0.5">Platform configuration · Thresholds · Notifications</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card noPad>
          <CardHeader title="Alert thresholds" subtitle="Per-sensor trigger values" />
          <div className="p-4 space-y-4">
            {[
              { label: 'Temperature warning', value: '75°C', unit: '°C' },
              { label: 'Temperature critical', value: '90°C', unit: '°C' },
              { label: 'Vibration warning', value: '5.0 mm/s', unit: 'mm/s' },
              { label: 'Vibration critical', value: '8.0 mm/s', unit: 'mm/s' },
              { label: 'Health warning', value: '60%', unit: '%' },
              { label: 'Health critical', value: '30%', unit: '%' },
            ].map(t => (
              <div key={t.label} className="flex items-center justify-between">
                <span className="text-sm text-[#8892a4]">{t.label}</span>
                <span className="text-sm font-semibold tabular-nums text-[#e8eaf0]">{t.value}</span>
              </div>
            ))}
            <Button size="sm" className="mt-2">Edit thresholds</Button>
          </div>
        </Card>
        <Card noPad>
          <CardHeader title="System info" />
          <div className="p-4 space-y-3 text-xs">
            {[
              ['Platform', 'TwinForge AI'],
              ['Version', '0.1.0-MVP'],
              ['Backend', 'http://localhost:8000'],
              ['WebSocket', 'ws://localhost:8000/ws'],
              ['AI Model', 'Random Forest + LLM'],
              ['Database', 'PostgreSQL 16'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-[#4a5568]">{k}</span>
                <span className="text-[#8892a4] font-mono">{v}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
