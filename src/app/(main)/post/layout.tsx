import { LeftMenu, RightMenu } from '@/components'
import { useMenuStore } from '@/store/useMenuStore'

export default function PostDetailLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>
}
