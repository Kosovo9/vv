
import React from 'react';
import { Bell, AlertTriangle, AlertCircle, Info, ChevronRight } from 'lucide-react';
import { SYSTEM_ALERTS } from '../constants';

export const AlertsPanel: React.FC = () => {
  return (
    <div className="bg-red-900/10 border border-red-500/20 rounded-3xl p-8">
       <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
             <Bell className="w-6 h-6 text-red-500 animate-bounce" />
             <h3 className="text-base font-black uppercase tracking-widest text-red-500">Centro de Alertas · {SYSTEM_ALERTS.length} Pendientes</h3>
          </div>
          <button className="text-[10px] font-black text-slate-500 hover:text-white uppercase underline">Limpiar Historial</button>
       </div>
       <div className="space-y-4">
          {SYSTEM_ALERTS.map((alert, i) => (
            <div key={i} className="flex justify-between items-center bg-black/40 p-5 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all group">
               <div className="flex items-center gap-6">
                  <div className={`p-2 rounded-lg ${alert.level === 'CRÍTICA' ? 'bg-red-500/20' : 'bg-slate-800'}`}>
                    {alert.level === 'CRÍTICA' ? <AlertTriangle className="w-4 h-4 text-red-500" /> : <AlertCircle className="w-4 h-4 text-yellow-500" />}
                  </div>
                  <div className="text-xs">
                     <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${alert.level === 'CRÍTICA' ? 'bg-red-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                           {alert.level}
                        </span>
                        <span className="font-bold text-slate-100 uppercase tracking-tighter">{alert.source}</span>
                     </div>
                     <div className="text-slate-400 mt-1">{alert.message}</div>
                  </div>
               </div>
               <button className="flex items-center gap-2 text-[10px] font-black uppercase text-blue-400 group-hover:text-cyan-400 transition-all">
                  {alert.action} <ChevronRight className="w-3 h-3" />
               </button>
            </div>
          ))}
       </div>
    </div>
  );
};
