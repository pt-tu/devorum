'use client'
import { useThemeStore } from '@/store/useThemeStore'
import React, { CSSProperties, useEffect, useRef } from 'react'
import Terminal from 'react-bash'

type Props = {
  fontSize: string
}

const Shell = ({ fontSize = '13px' }: Props) => {
  const theme = useThemeStore((state) => state.theme)
  const extensions = {
    sudo: {
      exec: ({ structure, history, cwd }: any) => {
        return { structure, cwd, history: history.concat({ value: 'Nice try... (ಠ(ಠ(ಠ_ಠ)ಠ)ಠ)' }) }
      },
    },
    clear: {
      exec: ({ structure, cwd, history }: any) => {
        return { structure, cwd, history: history.concat({ value: 'Nice try... (ಠ(ಠ(ಠ_ಠ)ಠ)ಠ)' }) }
      },
    },
  }

  const history = [{ value: 'Hackers will be high-fived. ( ‘-’)人(ﾟ_ﾟ )' }, { value: 'Type `help` to begin' }]

  const structure = {
    '.hidden': {
      file1: { content: 'The is the content for file1 in the <.hidden> directory.' },
      file2: { content: 'The is the content for file2 in the <.hidden> directory.' },
      dir2: {
        file: { content: 'The is the content for <file> in the <.hidden> directory.' },
      },
      '.secrets': { content: "I'm still afraid of the dark..." },
    },
    public: {
      file1: { content: 'The is the content for file1 in the <public> directory.' },
      file2: { content: 'The is the content for file2 in the <public> directory.' },
      file3: { content: 'The is the content for file3 in the <public> directory.' },
    },
    'README.md': {
      content:
        "✌⊂(✰‿✰)つ✌ Thanks for checking out the tool! There is a lot that you can do with react-bash and I'm excited to see all of the fun commands and projects build on top of it!",
    },
  }
  return (
    <>
      <div
        className="override-font-size rounded-xl px-2"
        style={
          {
            '--custom-font-size': fontSize,
          } as CSSProperties
        }
      >
        <Terminal
          prefix="devorum@default"
          history={history}
          structure={structure}
          extensions={extensions}
          theme={theme}
        />
      </div>
    </>
  )
}

export default Shell
