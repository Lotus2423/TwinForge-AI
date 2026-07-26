import { api } from '../api'
import type { Machine, FleetSummary } from '@/types/machine.types'
import { MOCK_MACHINES, MOCK_FLEET } from '@/utils/mockData'

const USE_MOCK = true // Toggle false when backend is ready

export const machinesApi = {
  list: async (): Promise<Machine[]> => {
    if (USE_MOCK) return MOCK_MACHINES
    const { data } = await api.get<Machine[]>('/machines')
    return data
  },

  get: async (id: string): Promise<Machine> => {
    if (USE_MOCK) return MOCK_MACHINES.find(m => m.id === id) ?? MOCK_MACHINES[0]
    const { data } = await api.get<Machine>(`/machines/${id}`)
    return data
  },

  fleet: async (): Promise<FleetSummary> => {
    if (USE_MOCK) return MOCK_FLEET
    const { data } = await api.get<FleetSummary>('/machines/fleet/summary')
    return data
  },

  register: async (payload: Partial<Machine>): Promise<Machine> => {
    const { data } = await api.post<Machine>('/machines', payload)
    return data
  },
}
