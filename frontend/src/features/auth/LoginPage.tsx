/**
 * TwinForge AI — Login Page
 * JWT authentication entry point.
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

export function LoginPage() {
  const [email, setEmail] = useState('engineer@factory.com')
  const [password, setPassword] = useState('demo1234')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      // Phase 3: replace with real API call
      // const res = await api.post('/auth/login', { email, password })
      // login(res.data.access_token, res.data.user)
      await new Promise(r => setTimeout(r, 600))
      login('demo-token', { id: '1', name: 'Arjun Kumar', email, role: 'engineer' })
      navigate('/')
    } catch {
      setError('Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0b0d] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-[#3b82f6] rounded-xl flex items-center justify-center mb-4">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="4" />
              <path d="M11 2v3M11 17v3M2 11h3M17 11h3M4.9 4.9l2.1 2.1M15 15l2.1 2.1M4.9 17.1l2.1-2.1M15 7l2.1-2.1" />
            </svg>
          </div>
          <div className="text-xl font-semibold text-[#e8eaf0]">TwinForge AI</div>
          <div className="text-xs text-[#4a5568] mt-1">Industry 4.0 Platform</div>
        </div>

        {/* Card */}
        <div className="bg-[#111318] border border-[#1e2330] rounded-xl p-6">
          <div className="text-sm font-semibold text-[#e8eaf0] mb-1">Sign in</div>
          <div className="text-xs text-[#4a5568] mb-6">Access your factory dashboard</div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-[#8892a4] mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full bg-[#181c23] border border-[#2a3040] rounded-lg px-3 py-2 text-sm text-[#e8eaf0] outline-none focus:border-[#3b82f6] transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-[#8892a4] mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                className="w-full bg-[#181c23] border border-[#2a3040] rounded-lg px-3 py-2 text-sm text-[#e8eaf0] outline-none focus:border-[#3b82f6] transition-colors" />
            </div>

            {error && <div className="text-xs text-[#ef4444] bg-[#2d0e0e] border border-[#ef444430] rounded-lg px-3 py-2">{error}</div>}

            <button type="submit" disabled={loading}
              className="w-full bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-50 text-white font-medium text-sm py-2.5 rounded-lg transition-colors">
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-[#1e2330] text-center">
            <div className="text-xs text-[#4a5568]">Demo credentials pre-filled above</div>
          </div>
        </div>

        <div className="text-center mt-6 text-[10px] text-[#4a5568]">
          TwinForge AI v0.1.0-MVP · Industry 4.0
        </div>
      </div>
    </div>
  )
}
