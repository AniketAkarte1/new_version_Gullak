import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useAudioGuide } from './useAudioGuide';

export const useVoiceCommands = (onAddMoney?: () => void, onViewGoals?: () => void, onOpenPayments?: () => void) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [commandNotUnderstoodCount, setCommandNotUnderstoodCount] = useState(0);
  const recognitionRef = useRef<any>(null);
  const { t, language } = useLanguage();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { announceAction } = useAudioGuide();

  useEffect(() => {
    // Check if speech recognition is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 
                                   language === 'es' ? 'es-ES' : 
                                   language === 'mr' ? 'mr-IN' : 
                                   language === 'bho' ? 'hi-IN' : 
                                   language === 'de' ? 'de-DE' : 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        const lastResult = event.results[event.results.length - 1];
        const transcript = lastResult[0].transcript.toLowerCase().trim();
        
        handleVoiceCommand(transcript);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [language]);

  const handleVoiceCommand = (command: string) => {
    const commands = {
      en: {
        'dashboard': () => {
          navigate('/dashboard');
          announceAction('Navigated to dashboard');
        },
        'home': () => {
          navigate('/dashboard');
          announceAction('Navigated to home dashboard');
        },
        'add money': () => {
          if (onAddMoney) {
            onAddMoney();
            announceAction('Opened add money dialog');
          }
        },
        'view goals': () => {
          if (onViewGoals) {
            onViewGoals();
            announceAction('Opened goals view');
          }
        },
        'goals': () => {
          if (onViewGoals) {
            onViewGoals();
            announceAction('Opened goals view');
          }
        },
        'payments': () => {
          if (onOpenPayments) {
            onOpenPayments();
            announceAction('Opened payment options');
          }
        },
        'pay': () => {
          if (onOpenPayments) {
            onOpenPayments();
            announceAction('Opened payment screen');
          }
        },
        'help': () => speak(t('voiceHelp')),
        'sign out': () => {
          logout();
          announceAction('Signed out successfully');
        },
        'logout': () => {
          logout();
          announceAction('Logged out successfully');
        },
        'change language': () => {
          announceAction('Language change feature available in settings');
        },
      },
      hi: {
        'डैशबोर्ड': () => {
          navigate('/dashboard');
          announceAction('डैशबोर्ड पर गए');
        },
        'होम': () => {
          navigate('/dashboard');
          announceAction('होम डैशबोर्ड पर गए');
        },
        'पैसे जोड़ें': () => {
          if (onAddMoney) {
            onAddMoney();
            announceAction('पैसे जोड़ने का डायलॉग खोला');
          }
        },
        'लक्ष्य देखें': () => {
          if (onViewGoals) {
            onViewGoals();
            announceAction('लक्ष्य देखने का विकल्प खोला');
          }
        },
        'लक्ष्य': () => {
          if (onViewGoals) {
            onViewGoals();
            announceAction('लक्ष्य देखने का विकल्प खोला');
          }
        },
        'भुगतान': () => {
          if (onOpenPayments) {
            onOpenPayments();
            announceAction('भुगतान विकल्प खोले गए');
          }
        },
        'पेमेंट': () => {
          if (onOpenPayments) {
            onOpenPayments();
            announceAction('पेमेंट स्क्रीन खोली गई');
          }
        },
        'मदद': () => speak(t('voiceHelp')),
        'साइन आउट': () => {
          logout();
          announceAction('सफलतापूर्वक साइन आउट हो गए');
        },
        'भाषा बदलें': () => {
          announceAction('भाषा बदलने का विकल्प सेटिंग्स में उपलब्ध है');
        },
      },
      es: {
        'panel': () => {
          navigate('/dashboard');
          announceAction('Navegado al panel');
        },
        'inicio': () => {
          navigate('/dashboard');
          announceAction('Navegado al panel de inicio');
        },
        'agregar dinero': () => {
          if (onAddMoney) {
            onAddMoney();
            announceAction('Abierto diálogo para agregar dinero');
          }
        },
        'ver metas': () => {
          if (onViewGoals) {
            onViewGoals();
            announceAction('Abierta vista de metas');
          }
        },
        'metas': () => {
          if (onViewGoals) {
            onViewGoals();
            announceAction('Abierta vista de metas');
          }
        },
        'pagos': () => {
          if (onOpenPayments) {
            onOpenPayments();
            announceAction('Abiertas opciones de pago');
          }
        },
        'pagar': () => {
          if (onOpenPayments) {
            onOpenPayments();
            announceAction('Abierta pantalla de pagos');
          }
        },
        'ayuda': () => speak(t('voiceHelp')),
        'cerrar sesión': () => {
          logout();
          announceAction('Sesión cerrada exitosamente');
        },
        'cambiar idioma': () => {
          announceAction('Opción de cambio de idioma disponible en configuración');
        },
      },
      mr: {
        'डॅशबोर्ड': () => {
          navigate('/dashboard');
          announceAction('डॅशबोर्डवर गेलो');
        },
        'होम': () => {
          navigate('/dashboard');
          announceAction('होम डॅशबोर्डवर गेलो');
        },
        'पैसे जोडा': () => {
          if (onAddMoney) {
            onAddMoney();
            announceAction('पैसे जोडण्याचा डायलॉग उघडला');
          }
        },
        'लक्ष्ये पहा': () => {
          if (onViewGoals) {
            onViewGoals();
            announceAction('लक्ष्ये पाहण्याचा पर्याय उघडला');
          }
        },
        'लक्ष्ये': () => {
          if (onViewGoals) {
            onViewGoals();
            announceAction('लक्ष्ये पाहण्याचा पर्याय उघडला');
          }
        },
        'पेमेंट': () => {
          if (onOpenPayments) {
            onOpenPayments();
            announceAction('पेमेंट पर्याय उघडले गेले');
          }
        },
        'भुगतान': () => {
          if (onOpenPayments) {
            onOpenPayments();
            announceAction('भुगतान स्क्रीन उघडली गेली');
          }
        },
        'मदत': () => speak(t('voiceHelp')),
        'साइन आउट': () => {
          logout();
          announceAction('यशस्वीपणे साइन आउट झालो');
        },
        'भाषा बदला': () => {
          announceAction('भाषा बदलण्याचा पर्याय सेटिंग्जमध्ये उपलब्ध आहे');
        },
      },
      bho: {
        'डैशबोर्ड': () => {
          navigate('/dashboard');
          announceAction('डैशबोर्ड पर गइनी');
        },
        'होम': () => {
          navigate('/dashboard');
          announceAction('होम डैशबोर्ड पर गइनी');
        },
        'पइसा जोड़ीं': () => {
          if (onAddMoney) {
            onAddMoney();
            announceAction('पइसा जोड़े के डायलॉग खुलल');
          }
        },
        'लक्ष्य देखीं': () => {
          if (onViewGoals) {
            onViewGoals();
            announceAction('लक्ष्य देखे के विकल्प खुलल');
          }
        },
        'लक्ष्य': () => {
          if (onViewGoals) {
            onViewGoals();
            announceAction('लक्ष्य देखे के विकल्प खुलल');
          }
        },
        'भुगतान': () => {
          if (onOpenPayments) {
            onOpenPayments();
            announceAction('भुगतान विकल्प खुल गइल');
          }
        },
        'पेमेंट': () => {
          if (onOpenPayments) {
            onOpenPayments();
            announceAction('पेमेंट स्क्रीन खुल गइल');
          }
        },
        'मदद': () => speak(t('voiceHelp')),
        'साइन आउट': () => {
          logout();
          announceAction('सफलतापूर्वक साइन आउट हो गइनी');
        },
        'भाषा बदलीं': () => {
          announceAction('भाषा बदले के विकल्प सेटिंग्स में उपलब्ध बा');
        },
      },
      de: {
        'dashboard': () => {
          navigate('/dashboard');
          announceAction('Zum Dashboard navigiert');
        },
        'startseite': () => {
          navigate('/dashboard');
          announceAction('Zur Startseite navigiert');
        },
        'geld hinzufügen': () => {
          if (onAddMoney) {
            onAddMoney();
            announceAction('Geld hinzufügen Dialog geöffnet');
          }
        },
        'ziele anzeigen': () => {
          if (onViewGoals) {
            onViewGoals();
            announceAction('Ziele-Ansicht geöffnet');
          }
        },
        'ziele': () => {
          if (onViewGoals) {
            onViewGoals();
            announceAction('Ziele-Ansicht geöffnet');
          }
        },
        'zahlungen': () => {
          if (onOpenPayments) {
            onOpenPayments();
            announceAction('Zahlungsoptionen geöffnet');
          }
        },
        'bezahlen': () => {
          if (onOpenPayments) {
            onOpenPayments();
            announceAction('Zahlungsbildschirm geöffnet');
          }
        },
        'hilfe': () => speak(t('voiceHelp')),
        'abmelden': () => {
          logout();
          announceAction('Erfolgreich abgemeldet');
        },
        'sprache ändern': () => {
          announceAction('Sprachänderungsoption in den Einstellungen verfügbar');
        },
      },
    };

    const languageCommands = commands[language];
    const commandHandler = languageCommands[command];
    
    if (commandHandler) {
      setCommandNotUnderstoodCount(0); // Reset counter on successful command
      commandHandler();
    } else {
      setCommandNotUnderstoodCount(prev => prev + 1);
      if (commandNotUnderstoodCount === 0) {
        speak(t('voiceNotUnderstood'));
      }
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 
                      language === 'es' ? 'es-ES' : 
                      language === 'mr' ? 'mr-IN' : 
                      language === 'bho' ? 'hi-IN' : 
                      language === 'de' ? 'de-DE' : 'en-US';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && isSupported) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const announceScreen = (screenName: string) => {
    speak(t(screenName));
  };

  return {
    isListening,
    isSupported,
    startListening,
    stopListening,
    speak,
    announceScreen,
  };
};