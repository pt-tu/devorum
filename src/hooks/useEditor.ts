import { Options, SubmissionResponse } from '@/types/dev.type'
import { useEffect, useRef, useState } from 'react'
import { languageOptions as langData } from '@/constants/languageOptions'
import configs from '@/configs/configs'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'
import moment from 'moment'
import { Value } from 'classnames'

const useEditor = (persist = true, outerEditorDidMount?: (editor: any, monaco: any) => void) => {
  const [code, setCode] = useState('')
  const [processing, setProcessing] = useState(false)
  const [input, setInput] = useState('')
  const [results, setResults] = useState<SubmissionResponse[]>([])
  const [currLan, setCurrLan] = useState<Set<string>>(new Set(['63']))
  const [tab, setTab] = useState('Console')
  const [options, setOptions] = useState<Options>({
    fontSize: '13px',
    fontFamily: 'Fira Code',
    tabSize: 2,
    formatOnSave: false,
  } as unknown as Options)
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
    outerEditorDidMount && outerEditorDidMount(editor, monaco)
  }

  useEffect(() => {
    if (persist) {
      setCode(localStorage.getItem('code') || '')
    }
    setOptions(JSON.parse(localStorage.getItem('code-options') || '{}'))
  }, [persist])

  const handleCodeChange = (v: Value) => {
    setCode(v as string)
    if (persist) {
      localStorage.setItem('code', v as string)
    }
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

  return {
    code,
    setCode,
    processing,
    setProcessing,
    input,
    setInput,
    results,
    setResults,
    currLan,
    setCurrLan,
    tab,
    setTab,
    options,
    setOptions,
    languageOptions,
    handleEditorDidMount,
    handleCodeChange,
    changeOptions,
    submit,
    editorRef,
    format,
  }
}

export default useEditor
