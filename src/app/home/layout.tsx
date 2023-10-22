import { Header, HorizontalNav } from "@/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header />
      <div className="flex flex-row flex-1">
        <HorizontalNav />
        {children}
      </div>
    </section>
  );
}
