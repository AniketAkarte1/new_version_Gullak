import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from 'react-router-dom';

export const useAudioGuide = () => {
  const [isActive, setIsActive] = useState(false);
  const [explainedScreens, setExplainedScreens] = useState<string[]>([]);
  const { t, language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const audioGuideActive = localStorage.getItem('gullak-audio-guide');
    const explained = localStorage.getItem('gullak-explained-screens');
    if (audioGuideActive === 'true') {
      setIsActive(true);
    }
    if (explained) {
      setExplainedScreens(JSON.parse(explained));
    }
  }, []);

  useEffect(() => {
    // Auto-explain screen only once when user visits for the first time
    if (isActive && !explainedScreens.includes(location.pathname)) {
      const timer = setTimeout(() => {
        explainScreen(location.pathname);
      }, 1500); // Delay to let page load
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, isActive, explainedScreens]);

  const explainScreen = (pathname: string) => {
    let screenExplanation = '';
    
    switch (pathname) {
      case '/login':
        screenExplanation = t('audioLoginScreenDetailed');
        break;
      case '/register':
        screenExplanation = t('audioRegisterScreenDetailed');
        break;
      case '/dashboard':
        screenExplanation = t('audioDashboardScreenDetailed');
        break;
      default:
        return;
    }
    
    speak(screenExplanation);
    
    // Mark screen as explained
    const newExplained = [...explainedScreens, pathname];
    setExplainedScreens(newExplained);
    localStorage.setItem('gullak-explained-screens', JSON.stringify(newExplained));
  };
  const toggleAudioGuide = () => {
    const newState = !isActive;
    setIsActive(newState);
    localStorage.setItem('gullak-audio-guide', newState.toString());
    
    if (newState) {
      speak(t('audioGuideActive'));
    }
  };

  const speak = (text: string) => {
    if (isActive && 'speechSynthesis' in window) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 
                      language === 'es' ? 'es-ES' : 
                      language === 'mr' ? 'mr-IN' : 
                      language === 'bho' ? 'hi-IN' : 
                      language === 'de' ? 'de-DE' : 'en-US';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const announceElement = (description: string) => {
    if (isActive) {
      speak(description);
    }
  };

  const announceAction = (action: string) => {
    if (isActive) {
      speak(t('actionCompleted') + ': ' + action);
    }
  };

  const resetExplainedScreens = () => {
    setExplainedScreens([]);
    localStorage.removeItem('gullak-explained-screens');
  };
  return {
    isActive,
    toggleAudioGuide,
    speak,
    announceElement,
    announceAction,
    resetExplainedScreens,
    explainScreen,
  };
};