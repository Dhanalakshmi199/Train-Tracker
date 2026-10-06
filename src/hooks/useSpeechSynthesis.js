import { useCallback } from 'react';

export const useSpeechSynthesis = () => {
  const speak = useCallback((utterance) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      // Cancel previous speech if speaking
      if (synth.speaking) {
        synth.cancel();
      }
      synth.speak(utterance);
    } else {
      console.warn('Speech synthesis is not supported in this browser.');
    }
  }, []);

  return { speak };
};

export default useSpeechSynthesis;
