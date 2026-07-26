import { api } from '../api'
import type { Alert } from '@/types/machine.types'
import { MOCK_ALERTS } from '@/utils/mockData'

const USE_MOCK = true

export const alertsApi = {
  list: async (): Promise<Alert[]> => {
    if (USE_MOCK) return MOCK_ALERTS
    const { data } = await api.get<Alert[]>('/alerts')
    return data
  },
  acknowledge: async (id: string): Promise<void> => {
    if (USE_MOCK) return
    await api.patch(`/alerts/${id}/acknowledge`)
  },
}
