'use client'

import useEditor from '@/hooks/useEditor'
import React, { useEffect, useMemo, useState } from 'react'
import EditorWithChildren from '../../EditorWithChildren'
import { Avatar, Button, Input, Tab, Tabs, Textarea, Tooltip } from '@nextui-org/react'
import { MdDeleteOutline } from 'react-icons/md'
import moment from 'moment'
import * as Y from 'yjs'
import { MonacoBinding } from 'y-monaco'
import { WebsocketProvider } from 'y-websocket'
import { socket } from '@/configs/socketIO'
import { useUserStore } from '@/store/useUserStore'
import { User } from '@/types/user.type'
import { DevMessage } from '@/types/dev.type'
import { IoSend } from 'react-icons/io5'
import classNames from 'classnames'
import Call from '@/app/call/Call'

const LiveRoom = ({ params }: { params: any }) => {
  const id = params.id

  const [participants, setParticipants] = useState<User[]>([])
  const [messages, setMessages] = useState<DevMessage[]>([])
  const [msg, setMsg] = useState('')
  const user = useUserStore((state) => state.user)
  const [ws, setWs] = useState<WebSocket | null>(null)
  const editor = useEditor(false, (innerEditor, monaco) => {
    const doc = new Y.Doc()
    const provider = new WebsocketProvider('ws://localhost/live', id, doc, {})
    const type = doc.getText('monaco')
    const binding = new MonacoBinding(type, innerEditor.getModel(), new Set([innerEditor]), provider.awareness)

    if (user) {
      socket.emit('joinRoomDev', {
        user: user,
        room: id,
      })
    }

    ;(provider.ws as WebSocket)?.addEventListener('open', () => {
      if (provider) {
        setWs(provider.ws as WebSocket)
        const ws = provider.ws as WebSocket

        ws.addEventListener('message', (e) => {
          if (e.data) {
            try {
              const str = new TextDecoder().decode(e.data)
              const payload = JSON.parse(str)
              switch (payload.type) {
                case 'change-language':
                  console.log('change-language', payload)
                  editor.setCurrLan(new Set([payload.data.language]))
                  break
                case 'updateUsersInRoom':
                  console.log('new user joined', payload)
                  break
                default:
                  break
              }
            } catch (_) {}
          }
        })
      }
    })
  })

  useEffect(() => {
    const getRoomParticipants = (data: any) => {
      console.log('joinRoomDevResponse', data)
      setParticipants(Object.values(data[id])?.map((o: any) => o.user) || [])
    }
    const handleMessageResponse = (data: { message: DevMessage; type: 'append' | 'update' }) => {
      if (!data?.message?.body) {
        return
      }

      console.log('received dev message', data.message)
      setMessages((prev) => [...prev, data.message])
    }

    socket.on('joinRoomDevResponse', getRoomParticipants)
    socket.on('messageResponse', handleMessageResponse)
    return () => {
      socket.off('joinRoomDevResponse', getRoomParticipants)
      socket.off('messageResponse', handleMessageResponse)
    }
  }, [id])

  const onChangeLanguage = (keys: Set<string>) => {
    if (ws) {
      ws.send(JSON.stringify({ type: 'change-language', data: { language: keys.values().next().value } }))
    }
  }

  const sendMessage = async () => {
    socket.emit('message', {
      kind: 'dev',
      room: id,
      body: msg,
      from: user,
      createdAt: moment.now(),
    })
    setMsg('')
  }

  return (
    <EditorWithChildren outerOnChangeLang={onChangeLanguage} participants={participants} title={id} {...editor}>
      <div className="h-full w-full flex-1">
        <div className="small-scrollbar h-[calc(50%-4px)] flex-1 overflow-y-auto rounded-xl bg-dark-6 p-2">
          <Tabs
            onSelectionChange={(value) => editor.setTab(value as string)}
            selectedKey={editor.tab}
            key={'underlined'}
            variant={'underlined'}
            classNames={{
              panel: 'h-[calc(100%-40px)]',
            }}
            aria-label="Tabs variants"
          >
            <Tab key="Input" title={<span className="text-[13px]">Input</span>}>
              <Textarea
                value={editor.input}
                onChange={(e) => editor.setInput(e.target.value)}
                style={{ fontSize: editor.options.fontSize }}
                className="mx-1"
                fullWidth
              />
            </Tab>
            <Tab
              key="Console"
              title={
                <div className="flex items-center gap-2 text-[13px]">
                  Console
                  <MdDeleteOutline
                    onClick={() => editor.setResults([])}
                    className="cursor-pointer text-lg text-default-400 hover:text-default-700"
                  />
                </div>
              }
            >
              <div className="space-y-3">
                {editor.results.map((o) => (
                  <div key={o.token}>
                    <p className="mb-1 text-right text-xs font-light">
                      {o.time}ms on {moment(o.executed_time).format('DD/MM, hh:mm:ss')}
                    </p>
                    <Textarea
                      value={o.stdout || o.compile_output || o.stderr || ''}
                      className="small-scrollbar mx-1"
                      style={{ fontSize: editor.options.fontSize }}
                      fullWidth
                    />
                  </div>
                ))}
              </div>
            </Tab>
          </Tabs>

          <div className="h-12" />
        </div>

        <div className="h-2" />

        <div className="flex h-[calc(50%-4px)] flex-1 gap-2">
          <div className="flex h-full flex-1 flex-col justify-between rounded-xl bg-dark-6 p-2">
            <h1 className="ml-3 mt-3 pb-2">Chat</h1>
            <div className="flex  flex-1 flex-col gap-2 overflow-y-auto p-3">
              {messages.map((m) => (
                <div
                  className={classNames('flex items-center gap-2', m.from.username === user?.username && 'justify-end')}
                  key={m.createdAt.toString()}
                >
                  {m.from.username !== user?.username && (
                    <Tooltip content={m.from.username}>
                      <Avatar className="flex-shrink-0" size="sm" src={m.from.avatar || '/gray.png'} />
                    </Tooltip>
                  )}
                  <Tooltip content={moment(m.createdAt).format('DD/MM/YY hh:mm')}>
                    <div className="min-w-0 max-w-[75%] rounded-lg bg-dark-7 px-2 py-1"> {m.body}</div>
                  </Tooltip>
                </div>
              ))}
            </div>
            <div className="flex gap-3 px-3 pb-3 pt-2">
              <Textarea
                maxRows={3}
                minRows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    sendMessage()
                    e.preventDefault()
                  }
                  // handleTypingx()
                }}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                fullWidth
                size="sm"
                placeholder="message"
                labelPlacement="outside"
              />
              <Button
                onClick={sendMessage}
                isDisabled={msg.length === 0}
                isIconOnly
                radius="full"
                size="sm"
                color="primary"
              >
                <IoSend />
              </Button>
            </div>
          </div>

          <div className="relative flex h-full flex-1 flex-col items-center rounded-xl bg-dark-6 p-2">
            <h1 className="ml-3 mt-3 w-full pb-2">Voice</h1>
            <div className="absolute top-0 h-full">
              <Call channel={id} allowVideo={false} askToJoin />
            </div>
          </div>
        </div>
      </div>
    </EditorWithChildren>
  )
}

export default LiveRoom
