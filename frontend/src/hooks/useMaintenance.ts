import { useQuery } from '@tanstack/react-query'
import { maintenanceApi } from '@/services/endpoints/maintenance'

export const useMaintenance = () =>
  useQuery({ queryKey: ['maintenance'], queryFn: maintenanceApi.list })
