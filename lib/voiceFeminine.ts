
export interface Voice {
  id: string;
  name: string;
  lang: string;
  lang2?: string;
  gender: 'female';
  age: number;
  style: string;
  rate: number;
  pitch: number;
  volume: number;
  voiceURI: string;
  accent: string;
}

export const feminineVoices: Voice[] = [
  {
    id: 'lucia',
    name: 'Lucía',
    lang: 'es-MX',
    gender: 'female',
    age: 24,
    style: 'Cálido, cercano, ligeramente coqueto',
    rate: 0.95,
    pitch: 1.15,
    volume: 1.0,
    voiceURI: 'Microsoft Sabina - Spanish (Mexico)',
    accent: 'Mexicana'
  },
  {
    id: 'valentina',
    name: 'Valentina',
    lang: 'es-CO',
    gender: 'female',
    age: 22,
    style: 'Dulce, pausado, acento paisa',
    rate: 0.9,
    pitch: 1.2,
    volume: 1.0,
    voiceURI: 'Google español de Estados Unidos',
    accent: 'Colombiana'
  },
  {
    id: 'sofia',
    name: 'Sofía',
    lang: 'es-AR',
    gender: 'female',
    age: 23,
    style: 'Suave, melódico, cheto accesible',
    rate: 0.92,
    pitch: 1.18,
    volume: 1.0,
    voiceURI: 'Google español',
    accent: 'Argentina'
  },
  {
    id: 'emma',
    name: 'Emma',
    lang: 'en-US',
    gender: 'female',
    age: 21,
    style: 'Fresh, energetic, Californian',
    rate: 1.0,
    pitch: 1.25,
    volume: 1.0,
    voiceURI: 'Google US English',
    accent: 'Americana'
  },
  {
    id: 'olivia',
    name: 'Olivia',
    lang: 'en-GB',
    gender: 'female',
    age: 25,
    style: 'Sophisticated, elegant, slightly playful',
    rate: 0.94,
    pitch: 1.22,
    volume: 1.0,
    voiceURI: 'Google UK English Female',
    accent: 'Británica'
  },
  {
    id: 'isabella',
    name: 'Isabella',
    lang: 'es-MX',
    lang2: 'en-US',
    gender: 'female',
    age: 22,
    style: 'Professional, warm, bilingual fluid',
    rate: 0.96,
    pitch: 1.2,
    volume: 1.0,
    voiceURI: 'Microsoft Sabina - Spanish (Mexico)',
    accent: 'Mexicana Bilingüe'
  }
];

export class FeminineVoiceEngine {
  private currentVoice: Voice;
  private voices: SpeechSynthesisVoice[] = [];
  private isInitialized = false;
  private volumeMultiplier = 1.0;

  constructor() {
    this.currentVoice = feminineVoices[0];
  }

  async initialize() {
    return new Promise<void>((resolve) => {
      const loadVoices = () => {
        this.voices = window.speechSynthesis.getVoices();
        this.isInitialized = true;
        resolve();
      };
      if (window.speechSynthesis.getVoices().length > 0) {
        loadVoices();
      } else {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    });
  }

  setVoice(voiceId: string) {
    const voice = feminineVoices.find(v => v.id === voiceId);
    if (voice) this.currentVoice = voice;
  }

  setVolume(level: number) {
    // level 0-100 to 0.0-1.0
    this.volumeMultiplier = Math.max(0, Math.min(100, level)) / 100;
  }

  stop() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  speak(text: string) {
    if (!this.isInitialized) return;
    this.stop();
    
    // Clean text from asterisks and pendejadas for speech
    const cleanText = text.replace(/\*/g, '').replace(/VECTORES|PROTOCOLOS/gi, '');
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = this.currentVoice.lang;
    utterance.rate = this.currentVoice.rate;
    utterance.pitch = this.currentVoice.pitch;
    utterance.volume = this.currentVoice.volume * this.volumeMultiplier;
    
    const exactVoice = this.voices.find(v => v.name === this.currentVoice.voiceURI);
    if (exactVoice) utterance.voice = exactVoice;
    
    window.speechSynthesis.speak(utterance);
  }
}
