
import React, { useState, useEffect } from 'react';
import { Mic, Volume2, Sparkles, Headphones } from 'lucide-react';
import { feminineVoices, FeminineVoiceEngine } from '../lib/voiceFeminine';
import { findRelevance } from '../lib/documentationRAG';
import { Language } from '../types';

export const VoiceAgent: React.FC<{ lang: Language }> = ({ lang }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceEngine] = useState(() => new FeminineVoiceEngine());
  const [currentVoice, setCurrentVoice] = useState(feminineVoices[0]);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    voiceEngine.initialize();
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = true;
      rec.onresult = (e: any) => {
        const text = Array.from(e.results).map((res: any) => res[0].transcript).join('');
        setTranscript(text);
        if (e.results[0].isFinal) handleVoiceCommand(text);
      };
      rec.onend = () => setIsListening(false);
      setRecognition(rec);
    }
  }, []);

  const handleVoiceCommand = (text: string) => {
    const cmd = text.toLowerCase();
    const doc = findRelevance(cmd);
    
    if (doc) {
      voiceEngine.speak(doc.content);
    } else if (cmd.includes('hola') || cmd.includes('hello')) {
      const greeting = lang === Language.ES 
        ? `Hola jefe, soy ${currentVoice.name}. ¿Qué necesitas hoy?`
        : `Hey Neil, I'm ${currentVoice.name}. Ready to work?`;
      voiceEngine.speak(greeting);
    } else {
      voiceEngine.speak(lang === Language.ES 
        ? "Procesando audio en el núcleo local..."
        : "Processing audio in local core...");
    }
    
    const memory = JSON.parse(localStorage.getItem('claw_memory') || '[]');
    memory.push({ t: new Date().toISOString(), cmd: text });
    localStorage.setItem('claw_memory', JSON.stringify(memory.slice(-50)));
  };

  const toggleListen = () => {
    if (isListening) recognition?.stop();
    else {
      setTranscript('');
      recognition?.start();
      setIsListening(true);
    }
  };

  return (
    <div className="bg-[#0c1322] border border-pink-500/20 rounded-[2rem] p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles className="w-8 h-8 text-pink-500" />
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 md:gap-6">
          <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-2 transition-all ${isListening ? 'border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.4)] scale-105' : 'border-white/5'}`}>
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-xl md:text-2xl font-black text-white shadow-lg">
              {currentVoice.name[0]}
            </div>
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <h3 className="text-lg md:text-2xl font-black text-white uppercase tracking-tighter">{currentVoice.name}</h3>
              <span className="hidden xs:inline-block bg-pink-500/10 text-pink-400 text-[8px] md:text-[10px] font-black px-3 py-1 rounded-full border border-pink-500/20 uppercase tracking-widest">{currentVoice.accent}</span>
            </div>
            <p className="text-[10px] md:text-xs mono text-slate-500 mt-1 italic max-w-[200px] truncate">"{currentVoice.style}"</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex gap-1.5 md:gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
            {feminineVoices.map(v => (
              <button 
                key={v.id} 
                onClick={() => { setCurrentVoice(v); voiceEngine.setVoice(v.id); }}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl border flex items-center justify-center text-[8px] md:text-[10px] font-black transition-all ${currentVoice.id === v.id ? 'bg-pink-500 border-pink-400 text-black shadow-lg shadow-pink-500/20' : 'bg-slate-900 border-white/5 text-slate-500 hover:border-pink-500/40'}`}
              >
                {v.name.substring(0, 2)}
              </button>
            ))}
          </div>
          
          <button 
            onClick={toggleListen}
            className={`w-full sm:w-auto flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black uppercase transition-all shadow-xl ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-pink-600 text-white hover:bg-pink-500'}`}
          >
            {isListening ? <Headphones className="w-4 h-4 md:w-5 md:h-5" /> : <Mic className="w-4 h-4 md:w-5 md:h-5" />}
            <span className="text-[10px] md:text-xs">{isListening ? (lang === Language.ES ? 'Escuchando' : 'Listening') : (lang === Language.ES ? 'Hablar' : 'Speak')}</span>
          </button>
        </div>
      </div>

      {transcript && (
        <div className="mt-6 p-4 md:p-6 bg-black/40 border border-white/5 rounded-2xl font-mono text-xs md:text-sm text-cyan-400">
          <div className="flex items-center gap-2 opacity-30 mb-2 uppercase text-[8px] md:text-[10px] font-black tracking-widest">
            <Volume2 className="w-3 h-3 md:w-4 md:h-4" /> {lang === Language.ES ? 'Transcripción de Audio' : 'Audio Transcript'}
          </div>
          <p className="italic leading-relaxed">"{transcript}"</p>
        </div>
      )}
    </div>
  );
};
