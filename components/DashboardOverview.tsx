
import React, { useState, useEffect } from 'react';
import { SKILLS, ACTIVE_TASKS, COUNTRIES } from '../constants';
import { Language } from '../types';
import { translations } from '../translations';
import { 
  Zap, Target, Globe, DollarSign, Flame, ShieldCheck, Activity, TrendingUp, AlertOctagon
} from 'lucide-react';

export const DashboardOverview: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  const [liveProfit, setLiveProfit] = useState(8240);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveProfit(prev => prev + Math.floor(Math.random() * 5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* STATUS HEADER BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 md:gap-6 bg-blue-900/10 border border-blue-500/20 p-4 md:p-6 rounded-2xl md:rounded-[2rem] backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <AlertOctagon className="w-20 h-20 text-blue-500 rotate-12" />
        </div>
        <div className="flex items-center gap-4">
          <Flame className="w-5 h-5 md:w-6 md:h-6 text-orange-500 animate-pulse" />
          <div>
            <div className="text-[8px] md:text-[9px] mono opacity-40 uppercase font-black">Tactical Status</div>
            <div className="text-xs md:text-sm font-black uppercase text-orange-400">{t.dashboard.active}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 border-l border-white/5 pl-6">
          <Zap className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
          <div>
            <div className="text-[8px] md:text-[9px] mono opacity-40 uppercase font-black">Agents Active</div>
            <div className="text-xs md:text-sm font-black uppercase text-green-400">43 / 50</div>
          </div>
        </div>
        <div className="flex items-center gap-4 border-l border-white/5 pl-6">
          <Activity className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
          <div>
            <div className="text-[8px] md:text-[9px] mono opacity-40 uppercase font-black">Traffic Speed</div>
            <div className="text-xs md:text-sm font-black uppercase text-cyan-400">1.2 TB/S</div>
          </div>
        </div>
        <div className="flex items-center gap-4 border-l border-white/5 pl-6">
          <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-white" />
          <div>
            <div className="text-[8px] md:text-[9px] mono opacity-40 uppercase font-black">Encryption</div>
            <div className="text-xs md:text-sm font-black uppercase text-white">AES-256-GCM</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* SKILLS ARSENAL */}
        <div className="col-span-1 lg:col-span-8 bg-[#0c1322] border border-white/5 p-6 md:p-10 rounded-[2.5rem] shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Zap className="w-6 h-6 text-cyan-400" />
              <h3 className="text-lg font-black uppercase tracking-[0.2em] text-white">{t.dashboard.skillsTitle}</h3>
            </div>
            <span className="text-[10px] mono bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/30">32 TOTAL</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {SKILLS.slice(0, 16).map(skill => (
              <div key={skill.id} className="flex items-center gap-3 group cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-all">
                <div className="w-5 h-5 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-3 h-3 text-cyan-400" />
                </div>
                <span className="text-[10px] md:text-[11px] mono text-slate-400 group-hover:text-cyan-300 transition-colors uppercase truncate font-bold">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* NUCLEAR PROFIT */}
        <div className="col-span-1 lg:col-span-4 bg-gradient-to-br from-green-900/20 to-[#0c1322] border border-green-500/20 p-6 md:p-10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between">
           <div>
              <div className="flex items-center gap-4 mb-2">
                <DollarSign className="w-8 h-8 text-green-400" />
                <h3 className="text-xl font-black uppercase tracking-tighter text-white">{t.dashboard.profitTitle}</h3>
              </div>
              <p className="text-[10px] mono text-slate-500 uppercase tracking-widest font-black">Live Tracking · 2.5s Latency</p>
           </div>
           
           <div className="my-8">
              <div className="text-[10px] mono text-green-500/60 uppercase font-black mb-1">Current Balance</div>
              <div className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">
                ${liveProfit.toLocaleString()} <span className="text-green-500">USD</span>
              </div>
              <div className="flex items-center gap-2 text-green-400 mt-2 text-xs font-black">
                <TrendingUp className="w-4 h-4" /> +12% vs Yesterday
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                <div className="text-[8px] mono text-slate-500 uppercase font-black">{t.dashboard.cierres}</div>
                <div className="text-lg font-black text-white">432</div>
              </div>
              <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                <div className="text-[8px] mono text-slate-500 uppercase font-black">Avg. Ticket</div>
                <div className="text-lg font-black text-white">$1.2K</div>
              </div>
           </div>
        </div>

        {/* OPERATIONS LOG */}
        <div className="col-span-1 lg:col-span-6 bg-[#0c1322] border border-white/5 p-6 md:p-10 rounded-[2.5rem] shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <Target className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-black uppercase tracking-[0.2em] text-white">{t.dashboard.tasksTitle}</h3>
          </div>
          <div className="space-y-4">
            {ACTIVE_TASKS.map((task, i) => (
              <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className="text-xl">{task.icon}</span>
                  <span className="text-xs md:text-sm mono text-slate-100 uppercase font-black tracking-tight truncate max-w-[200px]">{task.name}</span>
                </div>
                <span className={`text-[10px] font-black uppercase ${task.color} bg-black/40 px-3 py-1 rounded-full border border-white/5`}>{task.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* EMPIRE MAP STATS */}
        <div className="col-span-1 lg:col-span-6 bg-[#0c1322] border border-white/5 p-6 md:p-10 rounded-[2.5rem] shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <Globe className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-black uppercase tracking-[0.2em] text-white">{t.dashboard.empireTitle}</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {COUNTRIES.map((c, i) => (
              <div key={i} className="flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-white/5 group hover:border-purple-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{c.flag}</span>
                  <span className="text-[10px] font-black text-slate-400">{c.name}</span>
                </div>
                <span className="text-base font-black text-white">{c.count}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
