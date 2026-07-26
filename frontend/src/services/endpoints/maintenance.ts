import { api } from '../api'
import type { MaintenanceTask } from '@/types/machine.types'
import { MOCK_TASKS } from '@/utils/mockData'

const USE_MOCK = true

export const maintenanceApi = {
  list: async (): Promise<MaintenanceTask[]> => {
    if (USE_MOCK) return MOCK_TASKS
    const { data } = await api.get<MaintenanceTask[]>('/maintenance')
    return data
  },
  complete: async (id: string): Promise<void> => {
    if (USE_MOCK) return
    await api.patch(`/maintenance/${id}/complete`)
  },
}
