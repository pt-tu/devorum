import { LeftMenu, RightMenu } from '@/components'
import { useMenuStore } from '@/store/useMenuStore'

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex w-full items-center justify-center py-8">
      <div className="w-full max-w-xl">
        <title>Search</title>
        {children}
      </div>
    </section>
  )
}
