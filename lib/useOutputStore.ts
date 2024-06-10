import {create} from 'zustand'
interface OutputStore {
    output: string[]
    language: string
    setOutput: (newOutput: string) => void
    setLanguage: (language: string) => void
}
const useOutputStore = create<OutputStore>((set) => ({
    output: [] as string[],
    language: 'js',
    setOutput: (newOutput: string) => set((state) => { return {output: [...state.output, newOutput]} }),
    setLanguage: (language: string) => set({language})
    }))

export default useOutputStore