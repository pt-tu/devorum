'use client'
import React, { Dispatch, SetStateAction } from 'react'
import Editor from '@monaco-editor/react'
import { useThemeStore } from '@/store/useThemeStore'
import { Button, Select, SelectItem, Tooltip } from '@nextui-org/react'
import { SiPrettier } from 'react-icons/si'

import Header from './Header'
import { Options, SubmissionResponse } from '@/types/dev.type'
import { Value } from 'classnames'

type Props = {
  children: React.ReactNode
  code: string
  setCode: Dispatch<SetStateAction<string>>
  processing: boolean
  setProcessing: Dispatch<SetStateAction<boolean>>
  input: string
  setInput: Dispatch<SetStateAction<string>>
  results: SubmissionResponse[]
  currLan: Set<string>
  setCurrLan: Dispatch<SetStateAction<Set<string>>>
  tab: string
  setTab: Dispatch<SetStateAction<string>>
  options: Options
  setOptions: Dispatch<SetStateAction<Options>>
  languageOptions: {
    [key: number]: {
      id: number
      name: string
      label: string
      value: string
    }
  }
  handleEditorDidMount: (editor: any, monaco: any) => void
  handleCodeChange: (v: Value) => void
  changeOptions: (value: Options) => void
  submit: () => Promise<void>
  format: () => void
}

const EditorWithChildren = ({
  children,
  code,
  submit,
  processing,
  options,
  changeOptions,
  setCurrLan,
  currLan,
  languageOptions,
  format,
  handleCodeChange,
  handleEditorDidMount,
}: Props) => {
  const theme = useThemeStore((state) => state.theme)

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
        <div className="flex h-full flex-col gap-2">{children}</div>
      </div>
    </>
  )
}

export default EditorWithChildren
