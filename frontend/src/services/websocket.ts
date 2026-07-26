/**
 * WebSocket connection manager.
 * Singleton that auto-reconnects and dispatches typed events.
 */
import type { WSEvent } from '@/types/machine.types'

type WSHandler = (event: WSEvent) => void

class WebSocketManager {
  private ws: WebSocket | null = null
  private handlers: Set<WSHandler> = new Set()
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null
  private clientId = `client-${Math.random().toString(36).slice(2, 9)}`

  get url() {
    const base = import.meta.env.VITE_WS_URL ?? 'ws://localhost:8000'
    return `${base}/ws/${this.clientId}`
  }

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return

    this.ws = new WebSocket(this.url)

    this.ws.onopen = () => {
      console.log('[TwinForge WS] Connected')
      if (this.reconnectTimer) clearTimeout(this.reconnectTimer)
    }

    this.ws.onmessage = (e) => {
      try {
        const event: WSEvent = JSON.parse(e.data)
        this.handlers.forEach((h) => h(event))
      } catch {
        console.warn('[TwinForge WS] Could not parse event:', e.data)
      }
    }

    this.ws.onclose = () => {
      console.log('[TwinForge WS] Disconnected — reconnecting in 3s')
      this.reconnectTimer = setTimeout(() => this.connect(), 3000)
    }

    this.ws.onerror = () => {
      this.ws?.close()
    }
  }

  disconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer)
    this.ws?.close()
    this.ws = null
  }

  subscribe(handler: WSHandler) {
    this.handlers.add(handler)
    return () => this.handlers.delete(handler)
  }

  send(data: unknown) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    }
  }
}

export const wsManager = new WebSocketManager()
