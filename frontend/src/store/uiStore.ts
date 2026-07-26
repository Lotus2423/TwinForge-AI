import { create } from 'zustand'

interface UIState {
  sidebarOpen: boolean
  selectedMachineId: string | null
  setSidebarOpen: (v: boolean) => void
  setSelectedMachine: (id: string | null) => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  selectedMachineId: 'motor-01',
  setSidebarOpen: (v) => set({ sidebarOpen: v }),
  setSelectedMachine: (id) => set({ selectedMachineId: id }),
}))
