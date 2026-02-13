
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Minimize2, Maximize2, Trash2, Download, ChevronRight, Wifi } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface LogEntry {
  id: string;
  timestamp: Date;
  node_id: string;
  level: 'info' | 'success' | 'warning' | 'error' | 'critical';
  message: string;
  metadata?: any;
}

export const TerminalFloating: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const channel = supabase
      .channel('system_logs')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'system_logs' }, (payload) => {
        const newLog: LogEntry = {
          id: payload.new.id,
          timestamp: new Date(payload.new.created_at),
          node_id: payload.new.node_id || 'system',
          level: payload.new.level,
          message: payload.new.message,
          metadata: payload.new.metadata
        };
        setLogs(prev => [newLog, ...prev].slice(0, 100));
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-400';
      case 'error': return 'text-red-500';
      case 'warning': return 'text-yellow-400';
      case 'success': return 'text-green-400';
      default: return 'text-cyan-400';
    }
  };

  const filteredLogs = filter === 'all' ? logs : logs.filter(l => l.level === filter);

  return (
    <div className={`
      fixed bottom-4 right-4 left-4 md:left-auto md:right-8 md:bottom-24 md:w-[600px] bg-black/95 border border-cyan-500/30 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col z-[100] overflow-hidden backdrop-blur-3xl transition-all duration-300
      ${isMinimized ? 'h-12 md:h-14' : 'h-[350px] md:h-[400px]'}
    `}>
      <div className="p-3 md:p-4 border-b border-white/10 flex justify-between items-center bg-slate-900/50">
        <div className="flex items-center gap-2 md:gap-3">
          <Terminal className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
          <span className="text-[8px] md:text-[10px] font-black uppercase mono text-cyan-400">Shell Control</span>
          <div className="hidden sm:flex items-center gap-1 ml-4">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[9px] text-green-500 mono">LIVE</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/10 rounded-lg">
            {isMinimized ? <Maximize2 className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" /> : <Minimize2 className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />}
          </button>
          <button onClick={onClose} className="p-1 hover:bg-red-500/20 rounded-lg transition-colors"><X className="w-4 h-4 md:w-5 md:h-5 text-red-500" /></button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-white/5 bg-black/20 overflow-x-auto no-scrollbar">
            <span className="text-[8px] mono text-slate-500 uppercase shrink-0">Filter:</span>
            {['all', 'critical', 'error', 'warning', 'info'].map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`text-[8px] mono uppercase px-1.5 py-0.5 rounded shrink-0 ${filter === f ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-600 hover:text-slate-400'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div ref={terminalRef} className="flex-1 overflow-y-auto p-4 md:p-6 mono text-[10px] md:text-[11px] space-y-1.5 md:space-y-2 custom-scrollbar bg-black/40">
            {filteredLogs.length === 0 ? (
              <div className="text-slate-700 animate-pulse">Wait for events...</div>
            ) : (
              filteredLogs.map((log, i) => (
                <div key={i} className="group border-l border-slate-800 pl-3 md:pl-4 py-0.5 hover:border-cyan-500/50 transition-all">
                  <div className="flex flex-wrap items-center gap-2 md:gap-4">
                    <span className="text-slate-600">[{log.timestamp.toLocaleTimeString()}]</span>
                    <span className={`font-bold uppercase text-[8px] md:text-[9px] ${getLevelColor(log.level)}`}>{log.level}</span>
                    <span className="text-purple-500 font-bold">&lt;{log.node_id}&gt;</span>
                    <span className="text-slate-300 flex-1 truncate">{log.message}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-2 md:p-3 bg-slate-900/80 border-t border-white/5 flex justify-between items-center text-[8px] md:text-[9px] mono text-slate-500">
             <div className="flex items-center gap-2 md:gap-4">
                <span className="flex items-center gap-1 text-green-500"><Wifi className="w-2 h-2 md:w-3 md:h-3" /> ROG</span>
                <span>PID: 273</span>
             </div>
             <div className="text-cyan-500 animate-pulse uppercase">Secure Bridge</div>
          </div>
        </>
      )}
    </div>
  );
};
