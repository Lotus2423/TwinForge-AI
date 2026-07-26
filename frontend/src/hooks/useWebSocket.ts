import { useEffect, useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { wsManager } from '@/services/websocket'
import type { WSEvent } from '@/types/machine.types'

export const useWebSocket = () => {
  const qc = useQueryClient()

  const handleEvent = useCallback((event: WSEvent) => {
    switch (event.type) {
      case 'sensor_update':
      case 'prediction_update':
        qc.invalidateQueries({ queryKey: ['sensors', event.machineId] })
        qc.invalidateQueries({ queryKey: ['prediction', event.machineId] })
        qc.invalidateQueries({ queryKey: ['machine', event.machineId] })
        break
      case 'alert_created':
        qc.invalidateQueries({ queryKey: ['alerts'] })
        qc.invalidateQueries({ queryKey: ['fleet'] })
        break
      case 'machine_status_change':
        qc.invalidateQueries({ queryKey: ['machines'] })
        qc.invalidateQueries({ queryKey: ['fleet'] })
        break
    }
  }, [qc])

  useEffect(() => {
    wsManager.connect()
    const unsub = wsManager.subscribe(handleEvent)
    return () => { unsub(); wsManager.disconnect() }
  }, [handleEvent])
}
