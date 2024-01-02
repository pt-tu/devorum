'use client'

import dynamic from 'next/dynamic'

import { createPostService, getPostService, updatePostService } from '@/services/postSevice'
import { Avatar, Button, Card, CardBody, Input, Textarea } from '@nextui-org/react'
import React, { useEffect, useMemo, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css' // Or any other style you prefer
import { useParams, useRouter } from 'next/navigation'
import { useUserStore } from '@/store/useUserStore'
import { Community } from '@/types/community.type'
import { Post } from '@/types/post.type'

hljs.configure({
  languages: ['javascript', 'ruby', 'python', 'java'], // Specify the languages you want to highlight
})

type Props = {
  data?: Community
}

const NewPostEditor = ({ data }: Props) => {
  const [title, setTitle] = useState('')
  const [oldData, setOldData] = useState<Post | undefined>(undefined)
  const { id } = useParams()
  const [tag, setTag] = useState('')
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const user = useUserStore((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    if (oldData) {
      setTitle(oldData.title)
      setValue(oldData.content)
      setTag(oldData.tags.join(', '))
    } else {
      setTitle('')
      setValue('')
      setTag('')
    }
  }, [oldData])

  useEffect(() => {
    ;(async () => {
      try {
        if (id) {
          const post = await getPostService(id as string)
          setOldData(post.data)
          if (user?._id !== post.data.user._id) {
            router.push('/not-found')
          }
        } else {
          setOldData(undefined)
        }
      } catch (error) {
        console.log('get post error:', error)
      }
    })()
  }, [id, router, user?._id])

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
      const postData: Partial<Post> = {
        content: value,
        title: title,
        tags: tags,
      }
      if (data) {
        postData.community = data.name
      }
      if (!oldData) {
        await createPostService(postData)
      } else {
        await updatePostService({ ...oldData, ...postData })
      }
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
    <>
      {data && (
        <Card className="mb-4 px-4 py-2">
          <CardBody className="flex flex-row items-center gap-6">
            <Avatar src={data.photo || '/gray.png'} />
            <h1 className="">Post in {data.name} community</h1>
          </CardBody>
        </Card>
      )}
      <Textarea
        minRows={1}
        variant="flat"
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
    </>
  )
}

export default NewPostEditor
