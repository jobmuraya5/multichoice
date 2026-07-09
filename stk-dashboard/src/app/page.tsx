import { ArrowRightLeft, CheckCircle2, Clock, XCircle } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen p-8 lg:p-12">
      <header className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            Finaswift STK
          </h1>
          <p className="text-slate-400 mt-2">Real-time STK Push Dashboard</p>
        </div>
        <div className="glass px-4 py-2 rounded-full flex items-center gap-3 text-sm text-slate-300 shadow-lg">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="font-medium tracking-wide">Cron Active (2 min)</span>
        </div>
      </header>

      <main className="flex-1 space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Total Revenue" 
            value="KES 0.00" 
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-400" />} 
          />
          <MetricCard 
            title="Pending Requests" 
            value="0" 
            icon={<Clock className="w-5 h-5 text-amber-400" />} 
          />
          <MetricCard 
            title="Failed Transactions" 
            value="0" 
            icon={<XCircle className="w-5 h-5 text-rose-400" />} 
          />
          <MetricCard 
            title="Total Processed" 
            value="0" 
            icon={<ArrowRightLeft className="w-5 h-5 text-blue-400" />} 
          />
        </section>

        <section className="glass rounded-2xl p-6 hover-lift">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            Recent Transactions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-sm">
                  <th className="py-4 px-4 font-medium">Reference</th>
                  <th className="py-4 px-4 font-medium">MSISDN</th>
                  <th className="py-4 px-4 font-medium">Amount</th>
                  <th className="py-4 px-4 font-medium">Status</th>
                  <th className="py-4 px-4 font-medium">Time</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {/* Fallback empty state for now */}
                <tr className="border-b border-white/5 transition-colors hover:bg-white/5">
                  <td className="py-4 px-4 text-slate-400 italic">No transactions yet</td>
                  <td className="py-4 px-4 text-slate-500">--</td>
                  <td className="py-4 px-4 text-slate-500">--</td>
                  <td className="py-4 px-4 text-slate-500">--</td>
                  <td className="py-4 px-4 text-slate-500">--</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

function MetricCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-6 flex flex-col justify-between hover-lift">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-slate-400 font-medium text-sm">{title}</h3>
        <div className="p-2 bg-white/5 rounded-xl shadow-inner shadow-white/5 border border-white/5">
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">{value}</p>
    </div>
  );
}
