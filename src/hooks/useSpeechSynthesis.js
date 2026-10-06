import { useCallback } from 'react';

export const useSpeechSynthesis = () => {
  const speak = useCallback((input) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      if (synth.speaking) {
        synth.cancel();
      }
      const utterance = typeof input === 'string' ? new SpeechSynthesisUtterance(input) : input;
      synth.speak(utterance);
    } else {
      console.warn('Speech synthesis is not supported in this browser.');
    }
  }, []);

  const cancelSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  return { speak, cancelSpeech };
};

export default useSpeechSynthesis;
