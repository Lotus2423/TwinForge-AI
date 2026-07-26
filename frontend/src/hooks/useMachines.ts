import { useQuery } from '@tanstack/react-query'
import { machinesApi } from '@/services/endpoints/machines'

export const useMachines = () =>
  useQuery({ queryKey: ['machines'], queryFn: machinesApi.list, refetchInterval: 30_000 })

export const useMachine = (id: string) =>
  useQuery({ queryKey: ['machine', id], queryFn: () => machinesApi.get(id), enabled: !!id })

export const useFleet = () =>
  useQuery({ queryKey: ['fleet'], queryFn: machinesApi.fleet, refetchInterval: 15_000 })
