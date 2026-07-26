import { useState, useCallback } from 'react'
import { assistantApi, type ChatMessage } from '@/services/endpoints/assistant'

export const useAssistant = (machineId?: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)

  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading) return

    const userMsg: ChatMessage = { role: 'user', content: text, timestamp: new Date().toISOString() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const reply = await assistantApi.chat({
        message: text,
        machineId,
        conversationHistory: [...messages, userMsg],
      })
      setMessages(prev => [...prev, { role: 'assistant', content: reply, timestamp: new Date().toISOString() }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Assistant temporarily unavailable. Please try again.',
        timestamp: new Date().toISOString(),
      }])
    } finally {
      setLoading(false)
    }
  }, [messages, machineId, loading])

  const clear = () => setMessages([])

  return { messages, loading, send, clear }
}
