export default function CommunityDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="m-auto max-w-7xl pl-3">{children}</div>
    </section>
  )
}
