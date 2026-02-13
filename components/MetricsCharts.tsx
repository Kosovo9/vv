
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Activity, Thermometer, Cpu } from 'lucide-react';

const mockData = Array.from({ length: 20 }).map((_, i) => ({
  time: `${i}:00`,
  node1: 50 + Math.random() * 20,
  node2: 40 + Math.random() * 15,
  node3: 30 + Math.random() * 10,
}));

export const MetricsCharts: React.FC = () => {
  const [data, setData] = useState(mockData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const next = [...prev.slice(1), {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          node1: 50 + Math.random() * 20,
          node2: 40 + Math.random() * 15,
          node3: 30 + Math.random() * 10,
        }];
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        {/* TEMPERATURE LOG */}
        <div className="bg-[#0c1322] border border-white/5 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Thermometer className="w-5 h-5 text-red-500" />
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-200">Registros de Temperatura</h3>
            </div>
            <span className="text-[9px] mono text-green-500 uppercase">Estable · 3 Nodos</span>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#040712', border: '1px solid #1e3a8a', borderRadius: '12px', fontSize: '10px' }} 
                  itemStyle={{ color: '#06b6d4' }}
                />
                <Line type="monotone" dataKey="node1" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="node2" stroke="#06b6d4" strokeWidth={2} dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="node3" stroke="#10b981" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CPU USAGE */}
        <div className="bg-[#0c1322] border border-white/5 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Cpu className="w-5 h-5 text-blue-500" />
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-200">Carga de Procesadores</h3>
            </div>
            <span className="text-[9px] mono text-blue-400 uppercase">Pico 58%</span>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis hide domain={[0, 100]} />
                <Area type="monotone" dataKey="node1" stroke="#3b82f6" fill="#3b82f620" strokeWidth={2} isAnimationActive={false} />
                <Area type="monotone" dataKey="node2" stroke="#06b6d4" fill="#06b6d420" strokeWidth={2} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* PROFIT PROJECTION BAR */}
      <div className="bg-gradient-to-br from-[#0c1322] to-[#040712] border border-blue-500/10 rounded-3xl p-6">
         <div className="flex items-center gap-3 mb-6">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-black uppercase tracking-widest text-white">Eficiencia de Flota · ROI Mensual</h3>
         </div>
         <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Semana 1', value: 4000 },
                { name: 'Semana 2', value: 3000 },
                { name: 'Semana 3', value: 2000 },
                { name: 'Semana 4', value: 2780 },
              ]}>
                <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                <XAxis dataKey="name" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#040712', border: '1px solid #1e3a8a', borderRadius: '12px' }} />
              </BarChart>
            </ResponsiveContainer>
         </div>
      </div>
    </div>
  );
};
