
import { Message } from '@/components/chatAssistant'
import {create} from 'zustand'

interface MessageStore {
    messages: Message[]
    setMessage: (m:Message) => void
}

const useMessagetStore = create<MessageStore>((set) => ({
    messages: [],
    setMessage: (message) => set((state) => ({messages: [ message, ...state.messages]}))
}))

export default useMessagetStore