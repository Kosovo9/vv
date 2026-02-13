
export const initVoiceEngine = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
  }
};

export const speak = (text: string, lang: string = 'es-MX', voice: SpeechSynthesisVoice | null = null) => {
  if (!('speechSynthesis' in window)) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;
  utterance.pitch = 1.1;

  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
