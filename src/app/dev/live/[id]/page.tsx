'use client'

import useEditor from '@/hooks/useEditor'
import React from 'react'
import EditorWithChildren from '../../EditorWithChildren'
import { Tab, Tabs, Textarea } from '@nextui-org/react'
import { MdDeleteOutline } from 'react-icons/md'
import moment from 'moment'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { MonacoBinding } from 'y-monaco'

const LiveRoom = ({ params }: { params: any }) => {
  const id = params.id
  const editor = useEditor(false, (editor, monaco) => {
    const doc = new Y.Doc()
    const provider = new WebsocketProvider('ws://localhost:8102', 'monaco', doc)
    const type = doc.getText('monaco')
    console.log('editor.getModel()', editor.getModel())
    console.log('editor', editor)
    const binding = new MonacoBinding(type, editor.getModel(), new Set([editor]), provider.awareness)
    console.log('biding', binding)
    console.log(provider.awareness)
  })

  return (
    <EditorWithChildren title={id} {...editor}>
      <div className="small-scrollbar flex-1 overflow-y-auto rounded-xl bg-dark-6 p-2">
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
      <div className="flex flex-1 gap-2 ">
        <div className="h-full flex-1 rounded-xl bg-dark-6 p-2"></div>
        <div className="h-full flex-1 rounded-xl bg-dark-6 p-2"></div>
      </div>
    </EditorWithChildren>
  )
}

export default LiveRoom
