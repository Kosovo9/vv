
import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, Cpu, MessageSquare, Zap, Send, Wifi, Terminal, 
  Monitor, Globe, X, ChevronRight, Menu, Home, ShoppingBag, 
  Server, MessageCircle, Mic, Headphones, Volume2, MicOff, Square
} from 'lucide-react';
import { executePowerShell, CommandLog } from './backendService';
import { chatWithPro } from './geminiService';
import { Language } from './types';
import { translations } from './translations';
import { TerminalFloating } from './components/TerminalFloating';
import { VoiceAgent } from './components/VoiceAgent';
import { DashboardOverview } from './components/DashboardOverview';
import { CommercialHub } from './components/CommercialHub';
import { FeminineVoiceEngine, feminineVoices } from './lib/voiceFeminine';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.ES);
  const [chatMessage, setChatMessage] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeHub, setActiveHub] = useState<'dashboard' | 'commercial' | 'none' | 'skills' | 'systems'>('dashboard');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [chatHistory, setChatHistory] = useState<{role: 'user'|'bot', text: string, time: string, isAudio?: boolean}[]>([]);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [voiceEngine] = useState(() => new FeminineVoiceEngine());
  const recognitionRef = useRef<any>(null);
  const t = translations[lang];

  // Logic to initialize and manage Web Speech API
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const currentText = (finalTranscript || interimTranscript).toLowerCase();

        // 🛑 EMERGENCY STOP COMMANDS
        if (currentText.includes('cállate') || currentText.includes('silencio') || currentText.includes('stop') || currentText.includes('para') || currentText.includes('basta')) {
          voiceEngine.stop();
          setChatMessage("");
          if (isListening) {
             recognitionRef.current.stop();
             setIsListening(false);
          }
          return;
        }

        // 🔊 VOLUME COMMANDS
        if (currentText.includes('volumen')) {
          const match = currentText.match(/\d+/);
          if (match) {
            const vol = parseInt(match[0]);
            voiceEngine.setVolume(vol);
          }
        }

        // 🎭 AGENT SWITCH COMMANDS
        feminineVoices.forEach(v => {
          if (currentText.includes(v.name.toLowerCase())) {
            voiceEngine.setVoice(v.id);
          }
        });

        if (interimTranscript || finalTranscript) {
          setChatMessage(finalTranscript || interimTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Sync Recognition Language with the UI toggle
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = lang === Language.ES ? 'es-MX' : 'en-US';
    }
  }, [lang]);

  useEffect(() => {
    voiceEngine.initialize();
    setChatHistory(prev => {
      const hasWelcome = prev.some(m => m.text === t.chat.welcome);
      if (hasWelcome) return prev;
      return [...prev, { 
        role: 'bot', 
        text: t.chat.welcome, 
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ` • ${t.chat.nuclear}` 
      }];
    });
  }, [lang]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, activeHub]);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Browser does not support Speech Recognition.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      if (chatMessage.trim()) {
        handleSendMessage(chatMessage, true);
      }
    } else {
      voiceEngine.stop();
      setChatMessage("");
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSendMessage = async (forcedMsg?: string, fromVoice: boolean = false) => {
    const msgToProcess = forcedMsg || chatMessage;
    if (!msgToProcess.trim()) return;
    
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }

    const userMsg = msgToProcess;
    const now = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ` • ${t.chat.local}`;
    setChatMessage("");
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg, time: now, isAudio: fromVoice }]);
    setIsAiLoading(true);

    try {
      const reply = await chatWithPro(userMsg);
      // Clean pendejadas (excessive symbols/formatting) aggressively
      const cleanReply = reply 
        ? reply.replace(/[\*\_\#]/g, '')
               .replace(/VECTORES|PROTOCOLOS|OBJETIVO:|IDENTIFICACIÓN:|ESTADO:|ZONA:|SISTEMA:/gi, '')
               .trim()
        : "Node Processed.";
      
      setChatHistory(prev => [...prev, { 
        role: 'bot', 
        text: cleanReply, 
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ` • ${t.chat.nuclear}` 
      }]);
      
      voiceEngine.speak(cleanReply);
    } catch (err) {
      setChatHistory(prev => [...prev, { role: 'bot', text: "Error: Local Logic Failed.", time: now }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const HubButton = ({ id, icon: Icon, label, color }: any) => (
    <button 
      onClick={() => { setActiveHub(id); setIsSidebarOpen(false); }}
      className={`group w-full flex items-center gap-4 p-5 lg:p-4 rounded-2xl transition-all duration-300 ${activeHub === id ? 'bg-blue-600/20 neon-border scale-[1.02]' : 'hover:bg-white/5 border border-transparent'}`}>
      <div className={`p-3 rounded-xl bg-slate-900 border border-white/5 group-hover:scale-110 transition-transform ${color}`}>
        <Icon className="w-5 h-5 lg:w-4 lg:h-4" />
      </div>
      <div className="text-left">
        <div className={`text-[12px] lg:text-[11px] font-black uppercase tracking-widest ${activeHub === id ? 'text-white' : 'text-slate-400'}`}>{label}</div>
      </div>
      <ChevronRight className={`w-4 h-4 ml-auto transition-transform duration-300 ${activeHub === id ? 'rotate-90 text-cyan-400' : 'opacity-20'}`} />
    </button>
  );

  return (
    <div className="h-screen bg-[#040712] text-slate-200 flex flex-col overflow-hidden relative selection:bg-cyan-500 selection:text-black">
      <div className="scanline z-[100] pointer-events-none opacity-5"></div>

      <header className="bg-[#080d1a] border-b border-blue-500/20 px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between z-50 shadow-2xl backdrop-blur-3xl">
        <div className="flex items-center gap-2 lg:gap-8">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-3 lg:hidden hover:bg-white/5 rounded-2xl text-slate-400 active:scale-90 touch-manipulation">
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-900/40 rounded-xl lg:rounded-2xl border border-blue-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <Cpu className="w-6 h-6 lg:w-7 lg:h-7 text-cyan-400" />
            </div>
            <div className="hidden xs:block">
              <h1 className="text-lg lg:text-2xl font-black italic tracking-tighter text-white uppercase leading-none">CLAW<span className="text-cyan-400">10X</span></h1>
              <div className="text-[7px] lg:text-[9px] mono text-blue-500 font-bold tracking-[0.2em] uppercase mt-1">{t.header.core}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4 bg-slate-900/80 p-1 lg:p-1.5 rounded-[1.5rem] border border-white/10 shadow-inner">
          <div className="flex gap-1 border-r border-white/10 pr-2 lg:pr-3">
            <button 
              onClick={() => setLang(Language.ES)} 
              className={`px-3 lg:px-5 py-2 lg:py-2.5 rounded-xl text-[10px] font-black uppercase transition-all active:scale-95 ${lang === Language.ES ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'text-slate-500 hover:text-slate-300'}`}
              title="Spanish"
            >
              ESP
            </button>
            <button 
              onClick={() => setLang(Language.EN)} 
              className={`px-3 lg:px-5 py-2 lg:py-2.5 rounded-xl text-[10px] font-black uppercase transition-all active:scale-95 ${lang === Language.EN ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'text-slate-500 hover:text-slate-300'}`}
              title="English"
            >
              ENG
            </button>
          </div>
          <div className="flex gap-1.5 lg:gap-3 px-1">
            <button title="WhatsApp" className="w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-xl bg-green-500/20 border border-green-500/40 text-green-400 hover:bg-green-500 hover:text-black transition-all active:scale-90 shadow-xl">
              <MessageCircle className="w-5 h-5" />
            </button>
            <button title="Telegram" className="w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 hover:bg-blue-500 hover:text-white transition-all active:scale-90 shadow-xl">
              <Send className="w-5 h-5 rotate-[-15deg]" />
            </button>
          </div>
          <button onClick={() => setTerminalOpen(!terminalOpen)} className="ml-1 p-2.5 hover:bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20 active:scale-90">
            <Terminal className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        <aside className={`fixed lg:static inset-y-0 left-0 z-[60] w-72 bg-[#060b16] border-r border-white/5 p-6 flex flex-col gap-2 shadow-2xl transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="mb-8 lg:hidden flex justify-between items-center">
            <div className="text-cyan-500 font-black italic tracking-tighter uppercase text-xs">Navigation</div>
            <button onClick={() => setIsSidebarOpen(false)} className="p-3 bg-white/5 rounded-2xl active:scale-90"><X className="w-6 h-6" /></button>
          </div>
          
          <HubButton id="dashboard" icon={Home} label={t.sidebar.mando} color="text-white" />
          <HubButton id="none" icon={MessageSquare} label={t.sidebar.chat} color="text-yellow-400" />
          <HubButton id="commercial" icon={ShoppingBag} label={t.sidebar.whitePages} color="text-green-400" />
          <HubButton id="skills" icon={Zap} label={t.sidebar.skills} color="text-cyan-400" />
          <HubButton id="systems" icon={Server} label={t.sidebar.infra} color="text-blue-400" />
          
          <div className="mt-auto p-6 bg-slate-900/40 rounded-3xl border border-white/5 shadow-inner">
            <div className="text-[10px] mono opacity-40 uppercase mb-3 tracking-widest font-black">{t.sidebar.load}</div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500 w-[58%] shadow-[0_0_15px_#06b6d4]"></div>
            </div>
            <div className="mt-4 flex justify-between items-center text-[10px] mono text-slate-500 font-black">
              <span className="flex items-center gap-1"><Wifi className="w-3 h-3 text-green-500"/> STABLE</span>
              <span className="text-cyan-400">1.2 TB/S</span>
            </div>
          </div>
        </aside>

        <section className="flex-1 flex flex-col relative dotted-bg bg-[#040712] overflow-y-auto custom-scrollbar touch-pan-y">
          {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-md z-[55] lg:hidden animate-in fade-in duration-300"></div>}
          
          <div className="max-w-[1400px] mx-auto w-full px-4 lg:px-12 py-8 lg:py-16">
            {activeHub === 'dashboard' && <DashboardOverview lang={lang} />}
            {activeHub === 'commercial' && <CommercialHub lang={lang} />}
            {activeHub === 'none' && (
              <div className="flex-1 flex flex-col min-h-[calc(100vh-200px)]">
                <div className="mb-12"><VoiceAgent lang={lang} /></div>

                <div className="flex-1 space-y-6 pb-48">
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-4 duration-500`}>
                      <div className={`relative max-w-[95%] lg:max-w-[80%] p-6 lg:p-8 rounded-[2.5rem] transition-all shadow-2xl ${
                        msg.role === 'user' ? 'bg-blue-600/10 border border-blue-500/20 text-white rounded-br-none shadow-[0_0_30px_rgba(37,99,235,0.1)]' : 'bg-slate-900/90 border border-white/5 text-slate-100 rounded-bl-none backdrop-blur-3xl'
                      }`}>
                        {msg.isAudio && (
                          <div className="flex items-center gap-2 mb-4 text-[10px] text-cyan-400 mono uppercase font-black tracking-widest">
                            <Volume2 className="w-4 h-4 animate-pulse" /> 
                            {lang === Language.ES ? 'Protocolo de Voz' : 'Voice Protocol'}
                          </div>
                        )}
                        <p className="text-sm lg:text-lg font-medium leading-relaxed tracking-tight">{msg.text}</p>
                        <div className="mt-6 flex items-center justify-between opacity-30 text-[9px] lg:text-[10px] mono font-black uppercase tracking-[0.2em]">
                           <span>{msg.role === 'user' ? 'SUPREME_CMD' : 'CLAW_NEIL_10X'}</span>
                           <span>{msg.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isAiLoading && (
                    <div className="flex items-center gap-4 text-cyan-400 mono text-[11px] lg:text-[12px] uppercase font-black tracking-[0.3em] px-6">
                      <div className="flex gap-1.5 items-end h-7">
                        {[1,2,3,4,5].map(b => <div key={b} className="w-1.5 bg-cyan-500 audio-bar rounded-full shadow-[0_0_10px_#06b6d4]" style={{animationDelay: `${b*0.1}s`}}></div>)}
                      </div>
                      {t.chat.thinking}
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="fixed bottom-12 lg:bottom-16 left-0 right-0 lg:left-72 px-4 lg:px-12 z-40">
                  <div className="max-w-5xl mx-auto bg-slate-900/95 backdrop-blur-[50px] border border-white/10 p-2 lg:p-3 rounded-[3.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.8)] flex items-center gap-2 lg:gap-3 group/input">
                    <button 
                      onClick={toggleMic}
                      className={`w-14 h-14 lg:w-20 lg:h-20 rounded-full flex items-center justify-center transition-all shadow-inner border border-white/5 active:scale-90 ${isListening ? 'bg-red-500 text-white animate-pulse shadow-[0_0_40px_rgba(239,68,68,0.5)]' : 'bg-slate-800 hover:bg-slate-700 text-pink-400'}`}
                      title={isListening ? "Stop listening" : "Start Voice Control"}
                    >
                      {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7 lg:w-9 lg:h-9" />}
                    </button>
                    
                    <button 
                      onClick={() => {
                        voiceEngine.stop();
                        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
                      }}
                      className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center text-red-500 hover:bg-red-500/20 active:scale-90 transition-all shadow-inner"
                      title="Cállate / Stop"
                    >
                      <Square className="w-4 h-4 lg:w-6 lg:h-6 fill-current" />
                    </button>

                    <input 
                      type="text" 
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder={isListening ? (lang === Language.ES ? "DICTANDO..." : "DICTATING...") : t.chat.placeholder}
                      className={`flex-1 bg-transparent border-none py-4 px-3 lg:px-6 text-base lg:text-xl outline-none font-bold placeholder-slate-800 transition-all ${isListening ? 'text-pink-400 italic' : 'text-white'}`}
                    />
                    
                    <button 
                      onClick={() => handleSendMessage()} 
                      className="bg-cyan-600 text-black w-14 h-14 lg:w-20 lg:h-20 rounded-full flex items-center justify-center hover:bg-cyan-400 hover:scale-105 transition-all shadow-xl active:scale-95 group-hover/input:shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                    >
                      <Send className="w-7 h-7 lg:w-10 lg:h-10" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        {terminalOpen && <TerminalFloating onClose={() => setTerminalOpen(false)} />}
      </main>

      <footer className="bg-[#080d1a] border-t border-white/5 px-6 lg:px-12 py-4 z-50 flex items-center justify-between text-[10px] lg:text-[12px] mono text-slate-700 font-black uppercase tracking-[0.4em]">
        <div className="flex items-center gap-8">
          <span className="flex items-center gap-2 text-cyan-400/50"><Wifi className="w-5 h-5" /> UNIVERSAL_NODE_STABLE</span>
          <span className="hidden md:inline text-slate-800">ENCRYPTION: AES-256-GCM</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-900/30 text-blue-400 border border-blue-500/20">{lang}</span>
        </div>
        <span className="text-cyan-400/20">CLAW 10X · {t.header.version}</span>
      </footer>
    </div>
  );
};

export default App;
