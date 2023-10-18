import { Header } from "@/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header />
      <nav></nav>

      {children}
    </section>
  );
}
