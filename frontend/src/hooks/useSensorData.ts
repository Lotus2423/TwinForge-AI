import { useQuery } from '@tanstack/react-query'
import { sensorsApi } from '@/services/endpoints/sensors'

export const useSensorHistory = (machineId: string, hours = 168) =>
  useQuery({
    queryKey: ['sensors', machineId, hours],
    queryFn: () => sensorsApi.history(machineId, hours),
    enabled: !!machineId,
    refetchInterval: 10_000,
  })

export const useLatestSensor = (machineId: string) =>
  useQuery({
    queryKey: ['sensor-latest', machineId],
    queryFn: () => sensorsApi.latest(machineId),
    enabled: !!machineId,
    refetchInterval: 5_000,
  })
