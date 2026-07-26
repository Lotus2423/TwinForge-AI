import type { MachineStatus, AlertSeverity } from '@/types/machine.types'

export function healthToStatus(score: number): MachineStatus {
  if (score >= 80) return 'healthy'
  if (score >= 60) return 'warning'
  if (score >= 30) return 'risk'
  return 'critical'
}

export function healthColor(score: number): string {
  if (score >= 80) return '#10b981'
  if (score >= 60) return '#f59e0b'
  if (score >= 30) return '#f97316'
  return '#ef4444'
}

export function healthLabel(score: number): string {
  if (score >= 80) return 'Healthy'
  if (score >= 60) return 'Warning'
  if (score >= 30) return 'High Risk'
  return 'Critical'
}

export function severityColor(s: AlertSeverity): string {
  return s === 'critical' ? '#ef4444' : s === 'warning' ? '#f59e0b' : '#3b82f6'
}

export function severityBg(s: AlertSeverity): string {
  return s === 'critical' ? '#2d0e0e' : s === 'warning' ? '#2d1f00' : '#1d3a6b'
}

export function priorityColor(p: string): string {
  if (p === 'urgent') return '#ef4444'
  if (p === 'high') return '#f97316'
  if (p === 'medium') return '#f59e0b'
  return '#8892a4'
}
