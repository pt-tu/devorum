import PrivateLayout from '@/components/layouts/PrivateLayout'

export default function PrivateProtectedLayout({ children }: { children: React.ReactNode }) {
  return <PrivateLayout>{children}</PrivateLayout>
}
