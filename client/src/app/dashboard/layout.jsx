import Header from "@/components/header/page";

export default function DashboardLayout({ children }) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
