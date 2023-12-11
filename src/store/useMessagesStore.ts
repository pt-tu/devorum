import { Message, Room } from '@/types/chat.type'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { createWithEqualityFn } from 'zustand/traditional'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { User } from '@/types/user.type'

interface ThemeState {
  rooms: {
    [key: string]: {
      messages: Message[]
    }
  }
  appendMessage: (message: Message) => void
  loadMessages: (roomId: string, messages: Message[]) => void
}

export const useMessageStore = createWithEqualityFn<ThemeState>()(
  immer((set) => ({
    rooms: {},
    appendMessage: (message: Message) =>
      set((state) => {
        const room = message.room
        if (!state.rooms[room]) {
          state.rooms[room] = {
            messages: [],
          }
        }

        state.rooms[room].messages.push(message)
      }),
    loadMessages: (roomId, messages: Message[]) =>
      set((state) => {
        state.rooms[roomId] = {
          messages,
        }
      }),
  })),
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Message', useMessageStore)
}
