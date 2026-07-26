export type MachineType = 'induction_motor' | 'pump' | 'compressor' | 'fan' | 'conveyor' | 'cnc'
export type MachineStatus = 'healthy' | 'warning' | 'risk' | 'critical' | 'offline'
export type AlertSeverity = 'info' | 'warning' | 'critical'

export interface Machine {
  id: string
  name: string
  machineType: MachineType
  modelNumber?: string
  manufacturer?: string
  ratedPowerKw?: number
  ratedVoltageV?: number
  ratedCurrentA?: number
  ratedRpm?: number
  locationBay?: string
  isActive: boolean
  healthScore: number
  status: MachineStatus
  latestAlertSeverity?: AlertSeverity
  lastSeen?: string
  createdAt: string
}

export interface SensorReading {
  id: number
  machineId: string
  temperatureC: number
  vibrationMms: number
  currentA: number
  rpm: number
  recordedAt: string
}

export interface Prediction {
  id: string
  machineId: string
  healthScore: number
  failureProbability: number
  failureType: string
  rulDays: number
  confidence: number
  explanation: string
  featureImportance: Record<string, number>
  recommendedAction: string
  predictedAt: string
}

export interface Alert {
  id: string
  machineId: string
  machineName: string
  severity: AlertSeverity
  alertType: string
  title: string
  message: string
  isAcknowledged: boolean
  createdAt: string
}

export interface MaintenanceTask {
  id: string
  machineId: string
  machineName: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  scheduledFor?: string
  completedAt?: string
  createdAt: string
}

export interface FleetSummary {
  totalMachines: number
  online: number
  healthy: number
  warning: number
  critical: number
  offline: number
  avgHealthScore: number
  activeAlerts: number
}

export interface WSEvent {
  type: 'sensor_update' | 'prediction_update' | 'alert_created' | 'machine_status_change'
  machineId: string
  data: unknown
  timestamp: string
}
