import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'
import * as commands from '@uiw/react-md-editor/commands'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })
const EditorMarkdown = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })
const Markdown = dynamic(() => import('@uiw/react-markdown-preview'), { ssr: false })
export { MDEditor, EditorMarkdown, Markdown }
