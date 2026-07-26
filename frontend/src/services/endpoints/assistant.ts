import { api } from '../api'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface ChatRequest {
  message: string
  machineId?: string
  conversationHistory: ChatMessage[]
}

const USE_MOCK = true

export const assistantApi = {
  chat: async (req: ChatRequest): Promise<string> => {
    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 1200))
      const responses: Record<string, string> = {
        'motor': 'Motor-01 mein abhi bearing wear ka high risk hai. Vibration 7.4 mm/s hai — ISO Zone D ke andar aa gayi hai. Pichhle 7 din mein 42% increase hua hai. Temperature bhi 78°C tak pahunchi hai. AI prediction: 91% failure probability, estimated 5 din mein. Aaj hi bearing inspect karein.',
        'health': 'Motor-01 ka health score sirf 34% hai — critical zone mein. Main contributors: vibration trend (54% weight) aur temperature trend (31% weight). Ye pattern bearing wear se match karta hai jab cooling fan partially blocked hota hai.',
        'maintenance': 'Recommended action: (1) Aaj hi bearing inspect karein. (2) Cooling fan check karein blade damage ke liye. (3) Lubrication check karein. (4) Friday production shift se pehle maintenance complete karein. Estimated downtime: 4-6 hours.',
        'default': 'Main TwinForge Factory Assistant hoon. Aap Motor-01, Pump-02, ya kisi bhi machine ke baare mein pooch sakte hain — health status, sensor trends, failure predictions, ya maintenance recommendations ke liye.',
      }
      const lower = req.message.toLowerCase()
      if (lower.includes('motor') || lower.includes('bearing') || lower.includes('vibration')) return responses['motor']
      if (lower.includes('health') || lower.includes('score')) return responses['health']
      if (lower.includes('maintenance') || lower.includes('repair') || lower.includes('fix')) return responses['maintenance']
      return responses['default']
    }
    const { data } = await api.post<{ reply: string }>('/assistant/chat', req)
    return data.reply
  },
}
