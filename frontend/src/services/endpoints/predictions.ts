import { api } from '../api'
import type { Prediction } from '@/types/machine.types'
import { MOCK_PREDICTION } from '@/utils/mockData'

const USE_MOCK = true

export const predictionsApi = {
  latest: async (machineId: string): Promise<Prediction> => {
    if (USE_MOCK) return MOCK_PREDICTION
    const { data } = await api.get<Prediction>(`/predictions/${machineId}/latest`)
    return data
  },
  history: async (machineId: string): Promise<Prediction[]> => {
    if (USE_MOCK) return [MOCK_PREDICTION]
    const { data } = await api.get<Prediction[]>(`/predictions/${machineId}/history`)
    return data
  },
}
