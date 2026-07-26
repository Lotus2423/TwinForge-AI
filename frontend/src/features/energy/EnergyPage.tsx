export function EnergyPage() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-[#e8eaf0] tracking-tight">Energy</h1>
        <p className="text-xs text-[#4a5568] mt-0.5">Power consumption · Efficiency · Anomaly detection</p>
      </div>
      <div className="bg-[#111318] border border-[#1e2330] rounded-xl p-12 text-center">
        <div className="text-4xl mb-4">⚡</div>
        <div className="text-sm font-semibold text-[#e8eaf0] mb-2">Energy AI — Phase 2</div>
        <div className="text-xs text-[#4a5568] max-w-sm mx-auto">
          Power consumption monitoring, power factor analysis, and efficiency optimization will be available in Phase 2.
          Requires voltage sensors to be added to the ESP32 hardware.
        </div>
      </div>
    </div>
  )
}
