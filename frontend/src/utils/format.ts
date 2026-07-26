export const fmt = {
  temp: (v: number) => `${v.toFixed(1)}°C`,
  vib:  (v: number) => `${v.toFixed(2)} mm/s`,
  amp:  (v: number) => `${v.toFixed(1)} A`,
  rpm:  (v: number) => v.toLocaleString(),
  pct:  (v: number) => `${(v * 100).toFixed(0)}%`,
  score:(v: number) => `${v.toFixed(0)}%`,
  rul:  (v: number) => v < 1 ? `<1 day` : `${v.toFixed(0)} days`,
  time: (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  },
  date: (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  },
  ago: (iso: string) => {
    const sec = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
    if (sec < 60) return `${sec}s ago`
    if (sec < 3600) return `${Math.floor(sec/60)}m ago`
    if (sec < 86400) return `${Math.floor(sec/3600)}h ago`
    return `${Math.floor(sec/86400)}d ago`
  },
}
