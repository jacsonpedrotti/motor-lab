import PainelNav from "@/components/painel/PainelNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-deep">
      <PainelNav />
      <div className="container-painel py-5 md:py-8 print:max-w-none print:p-0">{children}</div>
    </div>
  );
}
