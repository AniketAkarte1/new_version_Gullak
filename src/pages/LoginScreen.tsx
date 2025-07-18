import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, PiggyBank } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useAudioGuide } from '../hooks/useAudioGuide';
import LanguageSelector from '../components/LanguageSelector';

const LoginScreen: React.FC = () => {
  const { t } = useLanguage();
  const { login, isAuthenticated } = useAuth();
  const { announceElement, speak, announceAction } = useAudioGuide();
  const navigate = useNavigate();
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    announceElement('Signing in with Google...');
    
    // Simulate Google OAuth (in a real app, this would use Google OAuth SDK)
    setTimeout(() => {
      const mockUser = {
        id: 'google-user-123',
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        totalSavings: 2500,
        rewardPoints: 120,
        goals: [
          {
            id: '1',
            title: 'Emergency Fund',
            targetAmount: 10000,
            currentAmount: 2500,
            deadline: '2024-12-31',
            isCompleted: false,
          },
        ],
        achievements: [
          {
            id: '1',
            title: 'First Login',
            description: 'Welcome to Gullak!',
            icon: '🎉',
            unlockedAt: new Date().toISOString(),
          },
        ],
      };
      
      login(mockUser);
      speak(t('success'));
      announceAction('Successfully signed in with Google');
      setIsLoading(false);
    }, 2000);
  };

  const handleContinueToLogin = () => {
    setShowLanguageSelector(false);
    announceAction('Language selected, proceeding to login options');
  };

  if (showLanguageSelector) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
                <PiggyBank className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {t('welcome')}
            </h1>
          </div>
          
          <LanguageSelector />
          
          <button
            onClick={handleContinueToLogin}
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onMouseEnter={() => announceElement('Continue button - Click to proceed to login screen after selecting your preferred language')}
          >
            {t('continue')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
              <PiggyBank className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {t('loginTitle')}
          </h1>
          <p className="text-gray-600">
            {t('loginSubtitle')}
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-300 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t('audioGoogleSignIn')}
            onMouseEnter={() => announceElement(t('menuGoogleSignInExplain'))}
          >
            <div className="flex items-center justify-center space-x-3">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              ) : (
                <LogIn className="w-5 h-5" />
              )}
              <span>{isLoading ? t('loading') : t('signInWithGoogle')}</span>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            {t('dontHaveAccount')}{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:text-blue-700 font-semibold focus:outline-none focus:underline"
              onMouseEnter={() => announceElement(t('menuCreateAccountExplain'))}
            >
              {t('createAccount')}
            </button>
          </p>
        </div>

        <button
          onClick={() => setShowLanguageSelector(true)}
          className="w-full mt-4 text-gray-500 hover:text-gray-700 text-sm focus:outline-none focus:underline"
          onMouseEnter={() => announceElement(t('menuLanguageSelectorExplain'))}
        >
          {t('chooseLanguage')}
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;