'use client'
import { Button } from '@nextui-org/react'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import { Listbox, ListboxItem } from '@nextui-org/react'
import Link from 'next/link'

const Sidebar = () => {
  const list = ['Settings', 'Profile', 'Notifications']
  const pathname = usePathname()

  const getHref = (item: string) => {
    if (item !== 'Settings') {
      return '/settings/' + item.toLowerCase()
    }
    return '/settings'
  }

  return (
    <div className="col-span-3 h-fit rounded-xl bg-dark-2">
      <Listbox aria-label="Actions" className="" variant="flat">
        {list.map((item) => (
          <ListboxItem
            as={Link}
            href={getHref(item)}
            key={item}
            className={classNames(pathname.endsWith(item.toLowerCase()) && 'bg-dark-1', 'h-12 px-4 text-base')}
          >
            <p
              className={classNames(pathname.endsWith(item.toLowerCase()) ? 'font-medium' : 'font-normal', 'text-base')}
            >
              {item}
            </p>
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  )
}

export default Sidebar
