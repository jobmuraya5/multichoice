import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { 
  BarChart2, 
  LayoutDashboard, 
  Users, 
  FileText, 
  PieChart,
  Settings,
  HelpCircle,
  Menu
} from "lucide-react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Finaswift STK Dashboard",
  description: "Real-time STK Push Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-slate-50 flex h-screen overflow-hidden`}>
        
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col h-full shadow-sm z-10">
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold italic">
              F
            </div>
            <span className="font-bold text-xl text-slate-800 tracking-tight">Finaswift</span>
          </div>

          <div className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Directories
          </div>
          <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
            <NavItem icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" active />
            <NavItem icon={<BarChart2 className="w-5 h-5" />} label="Stats" />
            <NavItem icon={<Users className="w-5 h-5" />} label="Users" />
            <NavItem icon={<FileText className="w-5 h-5" />} label="Invoices" />
            
            <div className="pt-6 pb-2 px-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Reports
            </div>
            <NavItem icon={<PieChart className="w-5 h-5" />} label="Transactions" />
          </nav>

          <div className="p-4 border-t border-slate-100">
            <NavItem icon={<Settings className="w-5 h-5" />} label="Settings" />
            <NavItem icon={<HelpCircle className="w-5 h-5" />} label="Help" />
            
            <div className="mt-4 flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
                <Users className="w-4 h-4 text-slate-500" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-slate-700">Admin User</p>
                <p className="text-xs text-slate-400">admin@finaswift</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Mobile Header */}
          <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold italic">
                F
              </div>
              <span className="font-bold text-lg text-slate-800">Finaswift</span>
            </div>
            <button className="text-slate-500">
              <Menu className="w-6 h-6" />
            </button>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50">
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      active 
        ? "bg-slate-100 text-blue-600 shadow-sm" 
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
    }`}>
      {icon}
      {label}
    </a>
  )
}
