import { Message, Room } from '@/types/chat.type'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { createWithEqualityFn } from 'zustand/traditional'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface ThemeState {
  rooms: { [key: string]: Message[] }
  appendMessage: (message: Message) => void
  loadMessages: (roomId: string, messages: Message[]) => void
}

export const useMessageStore = createWithEqualityFn<ThemeState>()(
  immer((set) => ({
    rooms: {},
    appendMessage: (message: Message) =>
      set((state) => {
        const room = message.room
        if (state.rooms[room]) {
          state.rooms[room].push(message)
        } else {
          state.rooms[room] = [message]
        }
      }),
    loadMessages: (roomId, messages: Message[]) =>
      set((state) => {
        state.rooms[roomId] = messages
      }),
  })),
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Message', useMessageStore)
}
