"use client";
import { useEffect, useState } from "react";
import { ArrowRightLeft, CheckCircle2, Clock, XCircle, Power, Plus, Activity, Download } from "lucide-react";
import { clsx } from "clsx";
import BatchPaymentModal from "@/components/BatchPaymentModal";

export default function Dashboard() {
  const [autoProcess, setAutoProcess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.auto_process_enabled !== undefined) {
          setAutoProcess(data.auto_process_enabled);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch settings", err);
        setLoading(false);
      });
  }, []);

  const toggleAutomation = async () => {
    const newState = !autoProcess;
    setAutoProcess(newState);

    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auto_process_enabled: newState }),
      });
    } catch (err) {
      console.error("Failed to update settings", err);
      setAutoProcess(!newState);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
      
      {/* Center Main Content */}
      <div className="flex-1 flex flex-col gap-6">
        
        {/* Header / Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl card-shadow border border-slate-100">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">STK Overview</h1>
            <p className="text-sm text-slate-500 mt-1">Manage and track your STK pushes</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleAutomation}
              disabled={loading}
              className={clsx(
                "px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors border",
                autoProcess 
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100" 
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              )}
            >
              <Power className="w-4 h-4" />
              Automation: {autoProcess ? "ON" : "OFF"}
            </button>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Batch Push
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl p-6 card-shadow border border-slate-100 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Recent Transactions</h2>
            <button className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold">Reference</th>
                  <th className="py-3 px-4 font-semibold">MSISDN</th>
                  <th className="py-3 px-4 font-semibold">Amount</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Time</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 text-slate-500 italic" colSpan={5}>No transactions yet</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Right Column Metrics */}
      <div className="w-full lg:w-72 flex flex-col gap-4 shrink-0">
        <MetricCard 
          title="Total Revenue" 
          value="KES 0.00" 
          trend="+0.00%" 
          trendPositive={true}
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />} 
        />
        <MetricCard 
          title="Pending Requests" 
          value="0" 
          trend="Waiting to process" 
          trendPositive={true}
          icon={<Clock className="w-5 h-5 text-blue-500" />} 
        />
        <MetricCard 
          title="Failed Transactions" 
          value="0" 
          trend="-0.00%" 
          trendPositive={false}
          icon={<XCircle className="w-5 h-5 text-rose-500" />} 
        />
        <MetricCard 
          title="Total Processed" 
          value="0" 
          trend="+0.00%" 
          trendPositive={true}
          icon={<Activity className="w-5 h-5 text-indigo-500" />} 
        />
      </div>

      <BatchPaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => {
          alert("Batch successfully queued!");
        }}
      />
    </div>
  );
}

function MetricCard({ title, value, trend, trendPositive, icon }: { title: string; value: string; trend: string; trendPositive: boolean; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-5 card-shadow border border-slate-100 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <h3 className="text-slate-500 font-medium text-sm">{title}</h3>
        <div className="p-1.5 bg-slate-50 rounded-lg">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className={clsx(
            "text-xs font-semibold px-2 py-0.5 rounded-full",
            trendPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          )}>
            {trend}
          </span>
          <span className="text-xs text-slate-400">Since last month</span>
        </div>
      </div>
    </div>
  );
}
