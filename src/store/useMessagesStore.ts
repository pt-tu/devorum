import { Message, Room } from '@/types/chat.type'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { createWithEqualityFn } from 'zustand/traditional'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { User } from '@/types/user.type'

export interface MessageState {
  rooms: {
    [key: string]: {
      messages: Message[]
    }
  }
  appendMessage: (message: Message, type?: 'append' | 'update') => void
  loadMessages: (roomId: string, messages: Message[]) => void
}

export const useMessageStore = createWithEqualityFn<MessageState>()(
  immer((set) => ({
    rooms: {},
    appendMessage: (message: Message, type = 'append') =>
      set((state) => {
        const room = message.room
        if (type === 'append') {
          if (!state.rooms[room]) {
            state.rooms[room] = {
              messages: [],
            }
          }

          state.rooms[room].messages.push(message)
        } else {
          const needUpdatedMessage = state.rooms[room].messages.find((m) => m._id === message._id)
          if (needUpdatedMessage) {
            console.log('trigger needUpdatedMessage')
            needUpdatedMessage.likes = message.likes
            needUpdatedMessage.seen = message.seen
          }
        }
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
