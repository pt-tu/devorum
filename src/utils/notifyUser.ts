import { Message } from '@/types/chat.type'
import { User } from '@/types/user.type'

export default function checkPageStatus(message: Message, user: User) {
  if (message.from !== user.username) {
    if (!('Notification' in window)) {
      alert('This browser does not support system notifications!')
    } else if (Notification.permission === 'granted') {
      sendNotification(message, message.from)
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission((permission) => {
        if (permission === 'granted') {
          sendNotification(message, message.from)
        }
      })
    }
  }
}

function sendNotification(message: Message, username: string) {
  if (document.hidden) {
    new Notification('New message from devorum', {
      body: `@${username}: ${message.mediaUrl ? 'Sent a media' : message.body}`,
    })
  }
}
