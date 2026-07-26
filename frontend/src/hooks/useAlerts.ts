import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { alertsApi } from '@/services/endpoints/alerts'

export const useAlerts = () =>
  useQuery({ queryKey: ['alerts'], queryFn: alertsApi.list, refetchInterval: 15_000 })

export const useAcknowledgeAlert = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: alertsApi.acknowledge,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['alerts'] }),
  })
}
