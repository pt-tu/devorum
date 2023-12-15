'use client'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import { useThemeStore } from '@/store/useThemeStore'
import { Button, Select, SelectItem, Tab, Tabs, Textarea, Tooltip, user } from '@nextui-org/react'
import { SiPrettier } from 'react-icons/si'

import { Value } from 'classnames'
import Header from '../Header'
import { languageOptions as langData } from '@/constants/languageOptions'
import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'
import { getSubmissionResponse, submitCode } from '@/services/devService'
import configs from '@/configs/configs'
import { MdDeleteOutline } from 'react-icons/md'
import moment from 'moment'
import { SubmissionResponse } from '@/types/dev.type'
import Shell from './Shell'

const Play = () => {
  const theme = useThemeStore((state) => state.theme)
  const [code, setCode] = useState('')
  const [processing, setProcessing] = useState(false)
  const [input, setInput] = useState('')
  const [results, setResults] = useState<SubmissionResponse[]>([])
  const [currLan, setCurrLan] = useState<Set<string>>(new Set(['63']))
  const [tab, setTab] = useState('Console')
  const [options, setOptions] = useState({
    fontSize: '13px',
    fontFamily: 'Fira Code',
    tabSize: 2,
    formatOnSave: false,
  })
  const formatOnSave = useRef<boolean>(true)
  const editorRef = useRef<any>(null)
  const languageOptions = langData.reduce(
    (acc, curr) => {
      acc[curr.id] = curr
      return acc
    },
    {} as { [key: number]: (typeof langData)[0] },
  )

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

  const submit = async () => {
    try {
      setProcessing(true)

      const formData = new FormData()
      formData.append('language_id', String(currLan.values().next().value))
      formData.append('source_code', code)
      formData.append('stdin', input)

      const response = await fetch(configs.BACKEND_URL + 'compiler/submissions?', {
        method: 'POST',
        body: formData,
      }).then((res) => res.json())

      checkResult(response.token)
      // await submitCode(data)
    } catch (error) {
      if (isAxiosError(error)) toast.error(error.response?.data?.message || error.message)
      else toast.error(String(error))
    }
  }

  const checkResult = async (token: string) => {
    try {
      const response = await fetch(configs.BACKEND_URL + `compiler/submissions/${token}?fields=*`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())

      let statusId = response.status?.id

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkResult(token)
        }, 2000)
        return
      } else {
        setTab('Console')
        setResults((prev) => [
          ...prev,
          {
            ...response,
            executed_time: moment(),
          },
        ])
        setProcessing(false)
        return
      }
    } catch (error) {
      if (isAxiosError(error)) toast.error(error.response?.data?.message || error.message)
      else toast.error(String(error))
      setProcessing(false)
    }
  }

  return (
    <>
      <Header submit={submit} processing={processing} options={{ ...options }} setOptions={changeOptions} />

      <div
        className="grid h-[calc(100vh-48px)] grid-cols-2 gap-2 overflow-hidden bg-dark-7 px-2 pb-2 text-[13px]"
        style={
          {
            '--code-font-family': options.fontFamily,
          } as React.CSSProperties
        }
      >
        <div className="dev rounded-xl bg-dark-6 p-2">
          <div className="mx-2 mb-2 mt-1 flex justify-between">
            <Select
              variant="underlined"
              labelPlacement="outside"
              size="sm"
              onSelectionChange={(keys) => setCurrLan(keys as Set<string>)}
              defaultSelectedKeys={currLan}
              className="max-w-[320px]"
            >
              {Object.values(languageOptions)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((lan) => (
                  <SelectItem key={lan.id} value={lan.id}>
                    {lan.name}
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
            options={{ ...options, wordWrap: 'true' }}
            onMount={handleEditorDidMount}
            className="h-[calc(100vh-120px)]"
            language={languageOptions[currLan.values().next().value]?.value || 'javascript'}
            defaultLanguage="javascript"
            theme={theme === 'dark' ? 'vs-dark' : theme}
          />
        </div>
        <div className="flex h-full flex-col gap-2">
          <div className="dev h-full flex-[2] flex-shrink-0 rounded-xl bg-dark-6 p-2">
            <Tabs key={'underlined'} variant={'underlined'} aria-label="Tabs variants">
              <Tab key="Input" title={<span className="text-[13px]">Input</span>}>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  style={{ fontSize: options.fontSize }}
                  className="mx-1"
                  fullWidth
                />
              </Tab>
            </Tabs>
          </div>
          <div className="dev small-scrollbar relative flex-[3] overflow-y-auto rounded-xl bg-dark-6 p-2">
            <Tabs
              onSelectionChange={(value) => setTab(value as string)}
              selectedKey={tab}
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
                      onClick={() => setResults([])}
                      className="cursor-pointer text-lg text-default-400 hover:text-default-700"
                    />
                  </div>
                }
              >
                <div className="space-y-3">
                  {results.map((o) => (
                    <div key={o.token}>
                      <p className="mb-1 text-right text-xs font-light">
                        {o.time}ms on {moment(o.executed_time).format('DD/MM, hh:mm:ss')}
                      </p>
                      <Textarea
                        value={o.stdout || o.compile_output || o.stderr || ''}
                        className="small-scrollbar mx-1"
                        style={{ fontSize: options.fontSize }}
                        fullWidth
                      />
                    </div>
                  ))}
                </div>
              </Tab>
              <Tab key="Shell" title={<p className="h-full text-[13px]">Shell</p>}>
                <Shell fontSize={options.fontSize} />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}

export default Play
