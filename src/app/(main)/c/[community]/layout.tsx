import PrivateLayout from '@/components/layouts/PrivateLayout'

export default function CommunityDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateLayout>
      <section>
        <div className="m-auto max-w-7xl pl-3">{children}</div>
      </section>
    </PrivateLayout>
  )
}
