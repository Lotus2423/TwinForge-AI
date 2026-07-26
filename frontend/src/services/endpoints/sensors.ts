import { api } from '../api'
import type { SensorReading } from '@/types/machine.types'
import { MOCK_SENSOR_HISTORY } from '@/utils/mockData'

const USE_MOCK = true

export const sensorsApi = {
  history: async (machineId: string, hours = 168): Promise<SensorReading[]> => {
    if (USE_MOCK) return MOCK_SENSOR_HISTORY
    const { data } = await api.get<SensorReading[]>(`/sensors/${machineId}/history`, {
      params: { hours },
    })
    return data
  },

  latest: async (machineId: string): Promise<SensorReading | null> => {
    if (USE_MOCK) return MOCK_SENSOR_HISTORY[MOCK_SENSOR_HISTORY.length - 1]
    const { data } = await api.get<SensorReading>(`/sensors/${machineId}/latest`)
    return data
  },
}
