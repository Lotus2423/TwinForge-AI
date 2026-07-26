import type { Machine, SensorReading, Prediction, Alert, MaintenanceTask, FleetSummary } from '@/types/machine.types'

export const MOCK_MACHINES: Machine[] = [
  {
    id: 'motor-01', name: 'Motor-01', machineType: 'induction_motor',
    modelNumber: 'ABB-M3BP-132', manufacturer: 'ABB',
    ratedPowerKw: 11, ratedVoltageV: 415, ratedCurrentA: 22, ratedRpm: 1500,
    locationBay: 'Bay 3', isActive: true, healthScore: 34,
    status: 'critical', latestAlertSeverity: 'critical',
    lastSeen: new Date(Date.now() - 12000).toISOString(), createdAt: '2026-01-15T00:00:00Z',
  },
  {
    id: 'pump-02', name: 'Pump-02', machineType: 'pump',
    modelNumber: 'KSB-Etanorm-50', manufacturer: 'KSB',
    ratedPowerKw: 5.5, ratedVoltageV: 415, ratedCurrentA: 11, ratedRpm: 2900,
    locationBay: 'Bay 1', isActive: true, healthScore: 61,
    status: 'warning', latestAlertSeverity: 'warning',
    lastSeen: new Date(Date.now() - 8000).toISOString(), createdAt: '2026-01-20T00:00:00Z',
  },
  {
    id: 'comp-01', name: 'Compressor-01', machineType: 'compressor',
    modelNumber: 'Atlas-GA-11', manufacturer: 'Atlas Copco',
    ratedPowerKw: 11, ratedVoltageV: 415, ratedCurrentA: 22, ratedRpm: 1450,
    locationBay: 'Bay 5', isActive: true, healthScore: 68,
    status: 'warning', latestAlertSeverity: 'warning',
    lastSeen: new Date(Date.now() - 15000).toISOString(), createdAt: '2026-02-01T00:00:00Z',
  },
  {
    id: 'motor-03', name: 'Motor-03', machineType: 'induction_motor',
    modelNumber: 'Siemens-1LA7-132', manufacturer: 'Siemens',
    ratedPowerKw: 7.5, ratedVoltageV: 415, ratedCurrentA: 15, ratedRpm: 1500,
    locationBay: 'Bay 2', isActive: true, healthScore: 91,
    status: 'healthy', lastSeen: new Date(Date.now() - 5000).toISOString(), createdAt: '2026-02-10T00:00:00Z',
  },
  {
    id: 'fan-01', name: 'Fan-01', machineType: 'fan',
    modelNumber: 'Crompton-AxF-560', manufacturer: 'Crompton',
    ratedPowerKw: 3, ratedVoltageV: 415, ratedCurrentA: 6.2, ratedRpm: 960,
    locationBay: 'Bay 4', isActive: true, healthScore: 88,
    status: 'healthy', lastSeen: new Date(Date.now() - 9000).toISOString(), createdAt: '2026-02-15T00:00:00Z',
  },
  {
    id: 'motor-02', name: 'Motor-02', machineType: 'induction_motor',
    modelNumber: 'WEG-W22-90', manufacturer: 'WEG',
    ratedPowerKw: 2.2, ratedVoltageV: 415, ratedCurrentA: 5, ratedRpm: 1440,
    locationBay: 'Bay 6', isActive: true, healthScore: 76,
    status: 'warning', lastSeen: new Date(Date.now() - 20000).toISOString(), createdAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'cnc-01', name: 'CNC-01', machineType: 'cnc',
    manufacturer: 'Haas', locationBay: 'Bay 7',
    isActive: false, healthScore: 0, status: 'offline',
    lastSeen: new Date(Date.now() - 7200000).toISOString(), createdAt: '2026-03-10T00:00:00Z',
  },
  {
    id: 'pump-03', name: 'Pump-03', machineType: 'pump',
    modelNumber: 'Grundfos-CM-10', manufacturer: 'Grundfos',
    ratedPowerKw: 1.5, ratedVoltageV: 415, ratedCurrentA: 3.2, ratedRpm: 2850,
    locationBay: 'Bay 1', isActive: true, healthScore: 83,
    status: 'healthy', lastSeen: new Date(Date.now() - 6000).toISOString(), createdAt: '2026-03-15T00:00:00Z',
  },
]

export const MOCK_FLEET: FleetSummary = {
  totalMachines: 8, online: 7, healthy: 3, warning: 3, critical: 1, offline: 1,
  avgHealthScore: 68, activeAlerts: 4,
}

// Generate 7-day sensor history for motor-01
const now = Date.now()
export const MOCK_SENSOR_HISTORY: SensorReading[] = Array.from({ length: 168 }, (_, i) => {
  const hoursAgo = 168 - i
  const progress = i / 168
  return {
    id: i + 1, machineId: 'motor-01',
    temperatureC: 64 + progress * 16 + (Math.random() - 0.5) * 1.5,
    vibrationMms: 4.2 + progress * 3.8 + (Math.random() - 0.5) * 0.3,
    currentA: 37.5 + (Math.random() - 0.5) * 2,
    rpm: 1500 - Math.floor(progress * 25) + Math.floor((Math.random() - 0.5) * 10),
    recordedAt: new Date(now - hoursAgo * 3600000).toISOString(),
  }
})

export const MOCK_PREDICTION: Prediction = {
  id: 'pred-001', machineId: 'motor-01',
  healthScore: 34, failureProbability: 0.91,
  failureType: 'bearing_wear', rulDays: 5.2,
  confidence: 0.87,
  explanation: 'Motor-01 ke vibration readings pichhle 7 din mein continuously increase ho rahe hain — aaj 7.4 mm/s tak pahunch gaye, jo 42% zyada hai last week se. Saath hi temperature bhi 64°C se 78°C ho gayi hai. Dono trends mil kar bearing wear pattern indicate karte hain. Fan damage → Cooling decrease → Temperature rise → Bearing degradation chain detect hua hai.',
  featureImportance: { vibration_trend: 0.54, temperature_trend: 0.31, current_variation: 0.10, rpm_deviation: 0.05 },
  recommendedAction: 'Bearing inspect karein aaj hi. Friday production shift se pehle maintenance schedule karein.',
  predictedAt: new Date(Date.now() - 300000).toISOString(),
}

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'alert-001', machineId: 'motor-01', machineName: 'Motor-01',
    severity: 'critical', alertType: 'bearing_failure_predicted',
    title: 'Bearing failure risk: 91%',
    message: 'Vibration increased 42% over 7 days. Immediate inspection required before Friday shift.',
    isAcknowledged: false, createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: 'alert-002', machineId: 'pump-02', machineName: 'Pump-02',
    severity: 'warning', alertType: 'temperature_rising',
    title: 'Temperature trending upward',
    message: 'Temperature has risen 8°C over 3 days. Monitor closely.',
    isAcknowledged: false, createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'alert-003', machineId: 'comp-01', machineName: 'Compressor-01',
    severity: 'warning', alertType: 'vibration_elevated',
    title: 'Vibration above threshold',
    message: 'Vibration at 5.2 mm/s — above ISO Zone B limit of 4.5 mm/s.',
    isAcknowledged: true, createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'alert-004', machineId: 'motor-02', machineName: 'Motor-02',
    severity: 'warning', alertType: 'health_declining',
    title: 'Health score declining',
    message: 'Health dropped from 88% to 76% this week.',
    isAcknowledged: false, createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
]

export const MOCK_TASKS: MaintenanceTask[] = [
  {
    id: 'task-001', machineId: 'motor-01', machineName: 'Motor-01',
    title: 'Bearing inspection and replacement',
    description: 'Inspect bearing condition. Replace if wear > 30%. Lubricate shaft seal.',
    priority: 'urgent', status: 'pending',
    scheduledFor: new Date(Date.now() + 2 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: 'task-002', machineId: 'pump-02', machineName: 'Pump-02',
    title: 'Cooling system inspection',
    description: 'Check cooling fins for blockage. Clean fan blades. Measure airflow.',
    priority: 'high', status: 'pending',
    scheduledFor: new Date(Date.now() + 7 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'task-003', machineId: 'motor-03', machineName: 'Motor-03',
    title: 'Quarterly preventive maintenance',
    description: 'Standard quarterly service: lubrication, electrical connections, insulation resistance test.',
    priority: 'medium', status: 'in_progress',
    scheduledFor: new Date(Date.now() + 14 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
]
