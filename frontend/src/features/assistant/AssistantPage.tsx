import { useState, useRef, useEffect } from 'react'
import { useAssistant } from '@/hooks/useAssistant'
import { useMachines } from '@/hooks/useMachines'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { fmt } from '@/utils/format'

const QUICK = [
  'Why is Motor-01 showing critical health?',
  'Which machine needs maintenance most urgently?',
  'Explain the bearing wear failure chain',
  'What action should I take today?',
]

export function AssistantPage() {
  const [selectedMachine, setSelectedMachine] = useState<string | undefined>('motor-01')
  const { data: machines = [] } = useMachines()
  const { messages, loading, send, clear } = useAssistant(selectedMachine)
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const handleSend = () => { if (input.trim()) { send(input); setInput('') } }
  const handleKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }

  return (
    <div className="h-full flex flex-col" style={{ maxHeight: 'calc(100vh - 110px)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-[#e8eaf0] tracking-tight">Factory Assistant</h1>
          <p className="text-xs text-[#4a5568] mt-0.5">Ask anything about your machines · English & Hindi supported</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Machine context selector */}
          <select value={selectedMachine ?? ''} onChange={e => setSelectedMachine(e.target.value || undefined)}
            className="bg-[#111318] border border-[#2a3040] rounded-lg px-3 py-1.5 text-xs text-[#e8eaf0] outline-none focus:border-[#8b5cf6]">
            <option value="">No machine selected</option>
            {machines.filter(m => m.isActive).map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          <Badge variant="ai" showDot>AI powered</Badge>
          {messages.length > 0 && <Button size="sm" onClick={clear}>Clear chat</Button>}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 bg-[#111318] border border-[#1e2330] rounded-xl flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="w-12 h-12 bg-[#1e1040] border border-[#8b5cf630] rounded-xl flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 2C6 2 3 5 3 8.5c0 2 1.1 3.8 2.8 4.8L6 16l3-1.5h1c4 0 7-2.8 7-6C17 5 14 2 10 2z" />
                </svg>
              </div>
              <div className="text-sm font-semibold text-[#e8eaf0] mb-2">TwinForge Factory Assistant</div>
              <div className="text-xs text-[#4a5568] text-center mb-6 max-w-sm">
                Ask me about machine health, sensor trends, failure predictions, or maintenance recommendations.
              </div>
              <div className="grid grid-cols-2 gap-2 w-full max-w-lg">
                {QUICK.map(q => (
                  <button key={q} onClick={() => send(q)}
                    className="text-left text-xs bg-[#181c23] border border-[#2a3040] rounded-lg p-3 text-[#8892a4] hover:border-[#8b5cf640] hover:text-[#e8eaf0] transition-all">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className="text-[10px] text-[#4a5568] uppercase tracking-wider px-1">
                {msg.role === 'user' ? 'You' : 'TwinForge AI'} · {fmt.time(msg.timestamp)}
              </div>
              <div className={`max-w-[80%] px-4 py-3 rounded-xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#1d3a6b] border border-[#3b82f630] text-[#c8d6f0]'
                  : 'bg-[#1e1040] border border-[#8b5cf630] text-[#e8eaf0]'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-3">
              <div className="bg-[#1e1040] border border-[#8b5cf630] rounded-xl px-4 py-3">
                <div className="flex gap-1">
                  {[0, 0.2, 0.4].map((d, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-bounce"
                      style={{ animationDelay: `${d}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-[#1e2330] p-4 flex gap-3">
          <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
            placeholder="Ask about machine health, sensor trends, maintenance…"
            rows={2}
            className="flex-1 bg-[#181c23] border border-[#2a3040] rounded-lg px-3 py-2 text-sm text-[#e8eaf0] placeholder:text-[#4a5568] outline-none focus:border-[#8b5cf6] resize-none" />
          <button onClick={handleSend} disabled={!input.trim() || loading}
            className="flex-shrink-0 px-4 py-2 bg-[#8b5cf6] rounded-lg text-white text-sm font-medium disabled:opacity-40 hover:bg-[#7c3aed] transition-colors">
            Send ↗
          </button>
        </div>
      </div>
    </div>
  )
}
