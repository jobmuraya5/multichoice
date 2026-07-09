"use client";

import { useState, useRef } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BatchPaymentModal({ isOpen, onClose, onSuccess }: Props) {
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");
  const [rawNumbers, setRawNumbers] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setRawNumbers((prev) => (prev ? prev + "\n" + text : text));
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const parsedNumbers = rawNumbers
      .split(/[\n, ]+/)
      .map(n => n.trim())
      .filter(n => n.length > 0);

    if (parsedNumbers.length === 0) {
      setError("Please provide at least one phone number.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/payments/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          reference,
          email,
          numbers: parsedNumbers,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to queue batch");

      setAmount("");
      setReference("");
      setEmail("");
      setRawNumbers("");
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">New Batch Push</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form id="batch-form" onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 text-sm font-medium">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Amount (KES)</label>
                <input 
                  type="number" 
                  required
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g. 1"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Reference</label>
                <input 
                  type="text" 
                  required
                  value={reference}
                  onChange={e => setReference(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g. Monthly Sub"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="admin@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Phone Numbers</label>
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs flex items-center gap-1 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  <UploadCloud className="w-3 h-3" />
                  Upload CSV/TXT
                </button>
                <input 
                  type="file" 
                  accept=".csv,.txt"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
              <textarea 
                required
                value={rawNumbers}
                onChange={e => setRawNumbers(e.target.value)}
                className="w-full h-32 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                placeholder="Paste numbers here, separated by commas or newlines...&#10;0712345678&#10;254711223344"
              />
              <p className="text-xs text-slate-500">
                You can paste hundreds of numbers at once. Duplicates are allowed.
              </p>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="batch-form"
            disabled={isSubmitting}
            className="px-6 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition-colors flex items-center justify-center min-w-[120px]"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Queue Batch"}
          </button>
        </div>
      </div>
    </div>
  );
}
