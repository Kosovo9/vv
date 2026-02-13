
import React, { useState } from 'react';
import { 
  Package, Shield, Code, ChevronRight, Check, DollarSign, Download, 
  Loader2, Sparkles, Smartphone, Tablet, Monitor, Key, Eye, FileText, Folder
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

export const CommercialHub: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  const [packingId, setPackingId] = useState<string | null>(null);
  const [packProgress, setPackProgress] = useState(0);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [showExplorer, setShowExplorer] = useState<string | null>(null);

  const startPacking = (id: string) => {
    setPackingId(id);
    setPackProgress(0);
    setGeneratedKey(null);
    const interval = setInterval(() => {
      setPackProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          const key = `C10X-${id.toUpperCase().substring(0,3)}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
          setGeneratedKey(key);
          setTimeout(() => setPackingId(null), 3000);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const structures = {
    whitelabel: [
      { name: 'LICENSE.txt', type: 'file' },
      { name: 'README.md', type: 'file' },
      { name: 'source/', type: 'folder', children: ['core/', 'skills/', 'agents/', 'scripts/'] },
      { name: 'panel/', type: 'folder', children: ['dashboard.html', 'assets/'] },
      { name: 'docs/', type: 'folder' },
      { name: 'extras/', type: 'folder' }
    ],
    offline: [
      { name: 'install.ps1', type: 'file' },
      { name: 'clawzeneger.exe', type: 'file' },
      { name: 'models/', type: 'folder', children: ['qwen2.5-coder-7b.gguf'] },
      { name: 'skills/', type: 'folder' },
      { name: 'heartbeat/', type: 'folder' }
    ],
    enterprise: [
      { name: 'LICENSE (MIT)', type: 'file' },
      { name: 'src/', type: 'folder' },
      { name: 'skills/', type: 'folder' },
      { name: 'examples/', type: 'folder' },
      { name: 'docs/', type: 'folder' }
    ]
  };

  const models = [
    {
      id: 'whitelabel',
      name: t.commercial.model1,
      price: t.commercial.pricing.m1,
      type: lang === Language.ES ? 'VENTA ÚNICA' : 'ONE-TIME SALE',
      target: t.commercial.targetAgencies,
      icon: Package,
      features: lang === Language.ES 
        ? ['Código fuente completo (ZIP)', 'Re-branding total (White Label)', '50 Skills 10X activos', 'Doc de instalación + Guía ventas']
        : ['Full source code (ZIP)', 'Full White Label branding', '50 Active 10X Skills', 'Install Docs + Sales Guide'],
      color: 'border-blue-500/40 text-blue-400 bg-blue-900/10',
    },
    {
      id: 'offline',
      name: t.commercial.model2,
      price: t.commercial.pricing.m2,
      type: lang === Language.ES ? 'RENTA MENSUAL' : 'MONTHLY RENT',
      target: t.commercial.targetPymes,
      icon: Shield,
      features: lang === Language.ES
        ? ['Instalador .EXE (pkg)', 'Modelo Qwen local (3.5GB)', 'Offline total (Sin internet)', 'Heartbeat de licencia local']
        : ['.EXE Installer (pkg)', 'Local Qwen model (3.5GB)', 'Total Offline (No internet)', 'Local license heartbeat'],
      color: 'border-green-500/40 text-green-400 bg-green-900/10',
    },
    {
      id: 'enterprise',
      name: t.commercial.model3,
      price: t.commercial.pricing.m3,
      type: lang === Language.ES ? 'SUSCRIPCIÓN ANUAL' : 'ANNUAL SUBSCRIPTION',
      target: t.commercial.targetDevs,
      icon: Code,
      features: lang === Language.ES
        ? ['Repositorio privado GitHub', 'Licencia Comercial MIT', 'Actualizaciones mensuales', 'Comunidad de scripts Discord']
        : ['Private GitHub Repo', 'Commercial MIT License', 'Monthly updates', 'Discord script community'],
      color: 'border-purple-500/40 text-purple-400 bg-purple-900/10',
    }
  ];

  return (
    <div className="space-y-8 pb-40 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-10 bg-slate-900/40 border border-white/5 rounded-[2.5rem] backdrop-blur-2xl">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500/10 rounded-3xl border border-green-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.15)]">
            <DollarSign className="w-8 h-8 md:w-10 md:h-10 text-green-400" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">{t.commercial.title}</h2>
            <p className="text-[10px] md:text-xs text-slate-500 mono uppercase tracking-[0.4em] font-black mt-2">{t.commercial.subtitle}</p>
          </div>
        </div>
        <div className="flex gap-4 items-center bg-black/40 px-6 py-4 rounded-3xl border border-white/10">
          <Monitor className="w-4 h-4 text-cyan-400 opacity-40"/>
          <Tablet className="w-4 h-4 text-cyan-400 opacity-40"/>
          <Smartphone className="w-4 h-4 text-cyan-400 opacity-40"/>
          <span className="text-[10px] font-black text-cyan-400 mono">UNIVERSAL_BRIDGE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {models.map(m => (
          <div key={m.id} className={`relative group flex flex-col p-8 md:p-10 rounded-[3rem] border-2 transition-all duration-500 ${m.color} hover:scale-[1.02] shadow-2xl active:scale-[0.98]`}>
            <div className="flex justify-between items-start mb-8">
              <div className="p-5 bg-slate-900/90 rounded-[1.75rem] border border-white/10">
                <m.icon className="w-8 h-8" />
              </div>
              <div className="text-right">
                <div className="text-[10px] mono uppercase font-black opacity-40 mb-1">{m.type}</div>
                <div className="text-2xl font-black text-white italic">{m.price}</div>
              </div>
            </div>

            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">{m.name}</h3>
            <p className="text-[11px] mono text-slate-500 font-bold uppercase mb-8">{m.target}</p>

            <ul className="space-y-4 mb-10 flex-1">
              {m.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-[12px] text-slate-300 font-medium">
                  <Check className="w-4 h-4 text-green-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <button 
                onClick={() => setShowExplorer(showExplorer === m.id ? null : m.id)}
                className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase text-white hover:bg-white/10 flex items-center justify-center gap-2"
              >
                <Eye className="w-3 h-3" /> {lang === Language.ES ? 'Explorar Estructura' : 'Explore ZIP'}
              </button>
              
              <button 
                onClick={() => startPacking(m.id)}
                disabled={packingId !== null}
                className="w-full py-5 rounded-[2rem] bg-white text-black text-xs font-black uppercase hover:bg-cyan-400 transition-all flex items-center justify-center gap-3"
              >
                {packingId === m.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                {t.commercial.generate}
              </button>
            </div>

            {/* Simulated Explorer */}
            {showExplorer === m.id && (
              <div className="mt-6 p-4 bg-black/60 rounded-3xl border border-white/10 animate-in slide-in-from-top-4">
                <div className="flex items-center gap-2 mb-4 text-[9px] mono text-cyan-400 uppercase font-black">
                   <Folder className="w-3 h-3"/> ZIP_ROOT: CLAWZENEGER_{m.id.toUpperCase()}
                </div>
                <div className="space-y-2">
                   {structures[m.id as keyof typeof structures].map((item, i) => (
                     <div key={i} className="flex items-center gap-3 text-[10px] mono text-slate-400">
                        {item.type === 'folder' ? <Folder className="w-3.5 h-3.5 text-blue-500"/> : <FileText className="w-3.5 h-3.5 text-slate-500"/>}
                        {item.name}
                     </div>
                   ))}
                </div>
              </div>
            )}

            {/* Simulated Packaging UI */}
            {packingId === m.id && (
              <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center p-10 z-50 rounded-[3rem] animate-in fade-in">
                {generatedKey ? (
                  <div className="text-center space-y-6 animate-in zoom-in">
                    <div className="p-4 bg-green-500/20 rounded-2xl border border-green-500/50">
                      <Key className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <div className="text-[10px] mono text-green-400 uppercase font-black">License Generated</div>
                    </div>
                    <div className="text-xl mono text-white font-black tracking-widest bg-slate-900 p-4 rounded-xl border border-white/10">
                      {generatedKey}
                    </div>
                    <button 
                      onClick={() => setGeneratedKey(null)}
                      className="text-[9px] mono text-slate-500 uppercase underline"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <div className="w-full space-y-6">
                    <div className="flex justify-between text-xs mono text-cyan-400 uppercase font-black">
                        <span>Packing {m.id}...</span>
                        <span>{packProgress}%</span>
                    </div>
                    <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
                        <div className="h-full bg-cyan-500 shadow-[0_0_20px_#06b6d4]" style={{ width: `${packProgress}%` }}></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
