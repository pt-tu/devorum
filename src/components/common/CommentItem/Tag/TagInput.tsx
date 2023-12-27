import { TagButton } from '@/components'
import useTagsData from '@/hooks/useTagsData'
import { listTagService } from '@/services/tagService'
import { usePostStore } from '@/store/usePostStore'
import { Tag } from '@/types/post.type'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'

const formatData = (list: Tag[], available: Tag[], chunk: number) => {
  const names = available.map((tag) => tag.name)
  const newList = list.filter((tag) => !tag.deleted && !names.includes(tag.name))
  let result: Tag[][] = []
  for (let i = 0; i < list.length; i += chunk) {
    result.push(newList.slice(i, i + chunk))
  }
  return result
}

const TagInput = () => {
  const [value, setValue] = useState<string>('')
  const { data, isLoading } = useTagsData([], value)
  const { selected, updateSelected } = usePostStore()

  if (!selected) return

  const check = () => (value !== null && value !== '') || selected.tags.length > 0
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (value === '' && e.key === 'Backspace' && selected.tags.length > 0) {
      updateSelected({ tags: selected.tags.slice(0, -1) })
    }
    if (value !== '' && [' ', 'Enter'].includes(e.key)) {
      const newTag = {
        _id: '-1',
        name: value,
      } as Tag
      updateSelected({ tags: selected.tags.concat(newTag) })
      setValue('')
    }
  }
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const handleSelectTag = (tag: Tag) => {
    updateSelected({ tags: selected.tags.concat(tag) })
    setValue('')
  }

  return (
    <div className="my-5 flex w-full flex-col" data-has-elements="true" data-has-value="true">
      <div
        className={classNames(
          'min-h-16 relative inline-flex w-full cursor-text flex-col items-start justify-center gap-0 rounded-medium bg-default-100 px-3 py-2 shadow-sm outline-none !duration-150 tap-highlight-transparent transition-background hover:bg-default-200 motion-reduce:transition-none',
          'focus-visible:ring-offset-2v focus:bg-default-100 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-background',
        )}
      >
        {/* <label
          className={classNames(
            'pointer-events-none absolute z-10 block max-w-full origin-top-left cursor-text overflow-hidden text-ellipsis pe-2 text-small text-foreground-500 subpixel-antialiased',
            'transition-[transform,color,left,opacity] !duration-200 !ease-out will-change-auto motion-reduce:transition-none',
            check() &&
              'pointer-events-auto -translate-y-[calc(50%_+_theme(fontSize.small)/2_-_4px)] scale-85 !text-default-600',
          )}
        >
          Tags
        </label> */}
        <div
          className={classNames('box-border inline-flex h-full w-full items-center py-0.5', check() && '!items-end')}
        >
          <div className="flex w-full flex-row flex-wrap gap-1">
            {selected.tags.map((item, index) => (
              <TagButton tag={item} key={index} editing />
            ))}
            <input
              className={classNames(
                'flex-1 bg-transparent text-small font-normal !outline-none',
                'placeholder:text-foreground-500 focus-visible:outline-none',
                check() && 'text-default-foreground',
              )}
              aria-label="Tags"
              type="text"
              value={value}
              placeholder={selected.tags.length === 0 ? 'Tags' : ''}
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
      {data && !isLoading && value !== '' && (
        <div className="-top-1 w-full overflow-hidden rounded-lg p-2 shadow-md">
          {formatData(data, selected.tags, 3).map((row, index) => (
            <div key={index} className="my-1 flex w-full flex-row">
              {row.map((tag) => (
                <div
                  key={tag._id}
                  onClick={() => handleSelectTag(tag)}
                  className="mx-1 my-1 h-20 w-1/3 rounded-md p-1 hover:bg-default-100"
                >
                  <div className="flex flex-row items-center">
                    <TagButton tag={tag} />
                    <label className="pointer-events-none ml-2 block origin-top-left cursor-text overflow-hidden text-ellipsis text-xs font-medium text-foreground-500 subpixel-antialiased">
                      {tag.post_ref.length}
                    </label>
                  </div>
                  <textarea
                    rows={3}
                    className="pointer-events-none m-1 block max-h-16 w-full origin-top-left cursor-text resize-none overflow-hidden text-ellipsis bg-transparent text-xs font-light text-foreground-500 subpixel-antialiased"
                    value={tag.desc}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TagInput
