import { TagButton } from '@/components'
import { Tag } from '@/types/post.type'
import classNames from 'classnames'
import React, { LegacyRef, useRef, useState } from 'react'

const TagInput = () => {
  const [value, setValue] = useState('value')
  const [newTags, setNewTags] = useState<Tag[]>([
    {
      _id: '65872e66ea2ba120a78d579a',
      name: 'tailwind',
      author_id: '65872df0a87fdb16e80435a3',
      deleted: false,
      post_ref: ['65872e75ea2ba120a78d579e'],
    },
  ])
  const check = () => (value !== null && value !== '') || newTags.length > 0

  return (
    <div className="my-5 flex w-full flex-col" data-has-elements="true" data-has-value="true">
      <div
        className={classNames(
          'relative inline-flex h-16 min-h-unit-10 w-full cursor-text flex-col items-start justify-center gap-0 rounded-medium bg-default-100 px-3 py-2 shadow-sm outline-none !duration-150 tap-highlight-transparent transition-background hover:bg-default-200 motion-reduce:transition-none',
          'focus-visible:ring-offset-2v focus:bg-default-100 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-background',
        )}
      >
        <label
          className={classNames(
            'pointer-events-none absolute z-10 block max-w-full origin-top-left cursor-text overflow-hidden text-ellipsis pe-2 text-small text-foreground-500 subpixel-antialiased',
            'transition-[transform,color,left,opacity] !duration-200 !ease-out will-change-auto motion-reduce:transition-none',
            check() &&
              'pointer-events-auto -translate-y-[calc(50%_+_theme(fontSize.small)/2_-_4px)] scale-85 !text-default-600',
          )}
        >
          Tags
        </label>
        <div
          className={classNames('box-border inline-flex h-full w-full items-center pb-0.5', check() && '!items-end')}
        >
          <div className="flex w-full flex-row gap-1">
            {newTags.map((item, index) => (
              <TagButton tag={item} key={index} editing />
            ))}
            <input
              className={classNames(
                'w-full bg-transparent text-small font-normal !outline-none',
                'placeholder:text-foreground-500 focus-visible:outline-none',
                check() && 'text-default-foreground',
              )}
              aria-label="Tags"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TagInput
