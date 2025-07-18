import React from 'react';
import { Outlet } from 'react-router-dom';
import AccessibilityBar from './AccessibilityBar';
import { useLanguage } from '../contexts/LanguageContext';

const Layout: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <AccessibilityBar />
      
      {/* Skip to main content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
      
      <main id="main-content" className="pt-16">
        <Outlet />
      </main>
      
      {/* Screen reader status */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {t('screenReaderOptimized')}
      </div>
      
      {/* Keyboard navigation hint */}
      <div className="fixed bottom-4 left-4 text-xs text-gray-500 bg-white px-2 py-1 rounded-md shadow-sm">
        {t('keyboardNavigationTip')}
      </div>
    </div>
  );
};

export default Layout;