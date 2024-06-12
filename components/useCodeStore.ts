import create from "zustand"

interface CodeStore {
    instructions: string
    code: string
    language: "javascript" | "typescript" | "python" | "c" | "cpp" | "java" | "csharp" | "go" | "rust"
    setCode: (code: string) => void
    setInstructions: (instructions: string) => void
    setLanguage: (language: "javascript" | "typescript" | "python" | "c" | "cpp" | "java" | "csharp" | "go" | "rust") => void
}
const useCodeStore = create<CodeStore>((set) => ({
    instructions: "",
    code: "",
    language: "javascript",
    setCode: (code) => set({ code }),
    setInstructions: (instructions) => set({ instructions }),
    setLanguage: (language) => set({ language })
}))
export default useCodeStore