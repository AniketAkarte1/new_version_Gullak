import React from 'react';
import { Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAudioGuide } from '../hooks/useAudioGuide';
import { useVoiceCommands } from '../hooks/useVoiceCommands';

const AccessibilityBar: React.FC = () => {
  const { t } = useLanguage();
  const { isActive: audioActive, toggleAudioGuide } = useAudioGuide();
  const { isListening, isSupported, startListening, stopListening } = useVoiceCommands();

  return (
    <div className="fixed top-0 right-0 z-50 flex items-center space-x-2 bg-gray-800 text-white p-2 rounded-bl-lg">
      <button
        onClick={toggleAudioGuide}
        className="p-2 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={audioActive ? 'Disable audio guide' : 'Enable audio guide'}
        title={audioActive ? 'Disable audio guide' : 'Enable audio guide'}
      >
        {audioActive ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
      
      {isSupported && (
        <button
          onClick={isListening ? stopListening : startListening}
          className={`p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isListening ? 'bg-red-600 hover:bg-red-700' : 'hover:bg-gray-700'
          }`}
          aria-label={isListening ? 'Stop voice commands' : 'Start voice commands'}
          title={isListening ? 'Stop voice commands' : 'Start voice commands'}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
      )}
      
      <span className="text-xs px-2 py-1 bg-gray-700 rounded-md" role="status">
        {t('audioGuideActive')}
      </span>
    </div>
  );
};

export default AccessibilityBar;