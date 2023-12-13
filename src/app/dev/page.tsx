'use client'
import React, { useEffect, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import { useThemeStore } from '@/store/useThemeStore'
import { Button, Select, SelectItem, Tab, Tabs, Tooltip, user } from '@nextui-org/react'
import { SiPrettier } from 'react-icons/si'

import { Value } from 'classnames'
import Header from './Header'

const languages = ['python', 'javascript', 'typescript', 'java', 'c++', 'c#', 'go']

const Dev = () => {
  const theme = useThemeStore((state) => state.theme)
  const [code, setCode] = useState('')
  const [currLan, setCurrLan] = useState<Set<string>>(new Set(['javascript']))
  const [options, setOptions] = useState({
    fontSize: '13px',
    fontFamily: 'Fira Code',
    tabSize: 2,
    formatOnSave: false,
  })
  const formatOnSave = useRef<boolean>(true)
  const editorRef = useRef<any>(null)

  const format = () => {
    editorRef.current?.getAction('editor.action.formatDocument').run()
  }

  useEffect(() => {
    formatOnSave.current = options.formatOnSave
  }, [options])

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor
    // Save
    editor.onKeyDown((e: any) => {
      if ((navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) && e.keyCode === 49) {
        if (formatOnSave.current) editor.getAction('editor.action.formatDocument').run()
        e.preventDefault()
      }
    })
  }

  useEffect(() => {
    setCode(localStorage.getItem('code') || '')
    setOptions(JSON.parse(localStorage.getItem('code-options') || '{}'))
  }, [])

  const handleCodeChange = (v: Value) => {
    setCode(v as string)
    localStorage.setItem('code', v as string)
  }

  const changeOptions = (value: typeof options) => {
    setOptions(value)
    localStorage.setItem('code-options', JSON.stringify(value))
  }

  return (
    <div
      className="bg-dark-7 grid h-screen grid-cols-2 gap-2 overflow-hidden p-2 text-[13px]"
      style={
        {
          '--code-font-family': options.fontFamily,
        } as React.CSSProperties
      }
    >
      <Header options={options} setOptions={changeOptions} />

      <div className="dev bg-dark-6 rounded-xl p-2">
        <div className="mx-2 mb-2 mt-1 flex justify-between">
          <Select
            variant="underlined"
            labelPlacement="outside"
            size="sm"
            onSelectionChange={(keys) => setCurrLan(keys as Set<string>)}
            placeholder="Select an animal"
            value="javascript"
            defaultSelectedKeys={currLan}
            className="max-w-[120px]"
          >
            {languages.map((lan) => (
              <SelectItem key={lan} value={lan}>
                {lan}
              </SelectItem>
            ))}
          </Select>
          <Tooltip content="Format Code">
            <Button onClick={format} size="sm" radius="full" variant="light" isIconOnly>
              <SiPrettier />
            </Button>
          </Tooltip>
        </div>
        <Editor
          value={code}
          onChange={handleCodeChange}
          options={options}
          onMount={handleEditorDidMount}
          className="h-[calc(100vh-120px)]"
          language={currLan.values().next().value}
          defaultLanguage="javascript"
          theme={theme === 'dark' ? 'vs-dark' : theme}
        />
      </div>
      <div className="dev bg-dark-6 h-full rounded-xl p-2">
        <Tabs key={'underlined'} variant={'underlined'} aria-label="Tabs variants">
          <Tab key="Console" title={<span className="text-[13px]">Console</span>} />
          <Tab key="Shell" title={<span className="text-[13px]">Shell</span>} />
        </Tabs>
      </div>
    </div>
  )
}

export default Dev
