import { Header } from '@/components'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Header />
      <div className="relative">
        <div className="h-20" />
        {children}
      </div>
      <div className="h-16" />
    </section>
  )
}

export default MainLayout
