'use client'

import dynamic from 'next/dynamic'

import { createPostService } from '@/services/postSevice'
import { Button, Input, Textarea } from '@nextui-org/react'
import React, { useEffect, useMemo, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css' // Or any other style you prefer
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/useUserStore'

hljs.configure({
  languages: ['javascript', 'ruby', 'python', 'java'], // Specify the languages you want to highlight
})

const NewPost = () => {
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('')
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const user = useUserStore((state) => state.user)
  const router = useRouter()

  const isValid = useMemo(() => {
    try {
      if (tag === '') return true
      const tags = tag.split(', ').map((tag) => tag.trim())
      if (tags.length > 4) return false
      for (let i = 0; i < tags.length; i++) {
        if (tags[i][0] !== '#') return false
      }
      return true
    } catch (error) {
      return false
    }
  }, [tag])

  const onPublish = async () => {
    try {
      setLoading(true)
      const tags = tag.split(', ').map((tag) => tag.trim())
      await createPostService({
        content: value,
        title: title,
        tags: tags,
      })
      router.push(`/p/${user?.username}`)
    } catch (error) {
      console.log('publish error:', error)
    } finally {
      setLoading(false)
    }
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
      ['code-block'],
    ],
  }

  return (
    <div className="py-8">
      <Textarea
        minRows={1}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        size="lg"
        placeholder="Post title"
        classNames={{
          input: 'my-4 mx-3 text-4xl font-semibold',
        }}
        maxLength={120}
      />
      <Input
        isInvalid={!isValid}
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        fullWidth
        className="mt-4"
        placeholder="Tags, each separate by comma. Up to 4 tags. Eg: #hello, #test"
        classNames={{
          input: 'm-2',
        }}
      ></Input>
      <div className="h-4" />
      <ReactQuill
        modules={modules}
        className="h-[calc(100vh-440px)] max-h-[calc(100vh-440px)]"
        theme="snow"
        value={value}
        onChange={setValue}
      />
      <Button
        isLoading={loading}
        onClick={onPublish}
        isDisabled={!isValid || !title || !value}
        color="primary"
        className="mt-16"
      >
        Publish
      </Button>
    </div>
  )
}

export default NewPost
