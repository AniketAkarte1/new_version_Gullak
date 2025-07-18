import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { useAudioGuide } from '../hooks/useAudioGuide';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { announceElement } = useAudioGuide();

  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'hi' as Language, name: 'हिंदी', flag: '🇮🇳' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
    { code: 'mr' as Language, name: 'मराठी', flag: '🇮🇳' },
    { code: 'bho' as Language, name: 'भोजपुरी', flag: '🇮🇳' },
    { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
  ];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    announceElement(`Language changed to ${languages.find(l => l.code === lang)?.name}`);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-center mb-4">
        <Globe className="w-6 h-6 mr-2 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">
          {t('chooseLanguage')}
        </h2>
      </div>
      
      <p className="text-center text-gray-600 mb-6">
        {t('languageHint')}
      </p>
      
      <div 
        className="space-y-3"
        role="radiogroup"
        aria-label={t('audioLanguageSelector')}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              language === lang.code
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            role="radio"
            aria-checked={language === lang.code}
            aria-label={`Select ${lang.name} language`}
            onMouseEnter={() => announceElement(`${lang.name} language option - Click to set ${lang.name} as your preferred language for the entire application`)}
          >
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">{lang.flag}</span>
              <span className="text-lg font-medium">{lang.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;