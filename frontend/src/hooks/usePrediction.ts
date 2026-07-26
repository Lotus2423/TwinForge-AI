import { useQuery } from '@tanstack/react-query'
import { predictionsApi } from '@/services/endpoints/predictions'

export const useLatestPrediction = (machineId: string) =>
  useQuery({
    queryKey: ['prediction', machineId],
    queryFn: () => predictionsApi.latest(machineId),
    enabled: !!machineId,
    refetchInterval: 30_000,
  })
