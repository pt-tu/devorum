'use client'
import React from 'react'
import { Tab, Tabs, Textarea } from '@nextui-org/react'

import { MdDeleteOutline } from 'react-icons/md'
import moment from 'moment'
import Shell from './Shell'
import EditorWithChildren from '../EditorWithChildren'
import useEditor from '@/hooks/useEditor'

const Play = () => {
  const editor = useEditor()

  return (
    <EditorWithChildren {...editor}>
      <title>Play With Code</title>
      <div className="dev h-full flex-[2] flex-shrink-0 rounded-xl bg-dark-6 p-2">
        <Tabs key={'underlined'} variant={'underlined'} aria-label="Tabs variants">
          <Tab key="Input" title={<span className="text-[13px]">Input</span>}>
            <Textarea
              value={editor.input}
              onChange={(e) => editor.setInput(e.target.value)}
              style={{ fontSize: editor.options.fontSize }}
              className="mx-1"
              fullWidth
            />
          </Tab>
        </Tabs>
      </div>
      <div className="dev small-scrollbar relative flex-[3] overflow-y-auto rounded-xl bg-dark-6 p-2">
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
            <div className="h-12" />
          </Tab>
          <Tab key="Shell" title={<p className="h-full text-[13px]">Shell</p>}>
            <Shell fontSize={editor.options.fontSize} />
          </Tab>
        </Tabs>
      </div>
    </EditorWithChildren>
  )
}

export default Play
