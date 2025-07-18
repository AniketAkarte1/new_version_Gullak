import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'es' | 'mr' | 'bho' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Common
    welcome: 'Welcome to Gullak',
    continue: 'Continue',
    back: 'Back',
    next: 'Next',
    save: 'Save',
    cancel: 'Cancel',
    loading: 'Loading...',
    error: 'Error occurred',
    success: 'Success!',
    
    // Login Screen
    loginTitle: 'Welcome Back!',
    loginSubtitle: 'Sign in to continue your savings journey',
    signInWithGoogle: 'Sign in with Google',
    dontHaveAccount: "Don't have an account?",
    createAccount: 'Create Account',
    chooseLanguage: 'Choose Your Language',
    languageHint: 'Select your preferred language to continue',
    
    // Registration Screen
    registerTitle: 'Create Your Account',
    registerSubtitle: 'Start your financial journey with Gullak',
    fullName: 'Full Name',
    email: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    upiId: 'UPI ID (Optional)',
    upiPlaceholder: 'your-upi@bank',
    createAccountBtn: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    signIn: 'Sign In',
    
    // Dashboard
    dashboardTitle: 'Your Savings Dashboard',
    totalSavings: 'Total Savings',
    dailyGrowth: 'Daily Growth',
    weeklyGrowth: 'Weekly Growth',
    yearlyGrowth: 'Yearly Growth',
    currentGoal: 'Current Goal',
    rewardPoints: 'Reward Points',
    achievements: 'Achievements',
    savingsGoal: 'Savings Goal',
    progress: 'Progress',
    addMoney: 'Add Money',
    viewGoals: 'View Goals',
    statistics: 'Statistics',
    
    // Voice Commands
    voiceWelcome: 'Voice commands are active. Say "help" to hear available commands.',
    voiceHelp: 'Available commands: Navigate to dashboard, Add money, View goals, Open payments, Change language, Sign out',
    voiceNavigating: 'Navigating to',
    voiceNotUnderstood: 'Sorry, I did not understand that command. Try saying "help" for available options.',
    
    // Accessibility
    audioGuideActive: 'Audio guide is active',
    screenReaderOptimized: 'Screen reader optimized',
    keyboardNavigationTip: 'Use Tab to navigate, Enter to select',
    
    // Audio Descriptions
    audioLoginScreen: 'You are on the login screen. Choose your language and sign in with Google to continue.',
    audioRegisterScreen: 'You are on the registration screen. Fill in your details to create your Gullak account.',
    audioDashboardScreen: 'You are on your savings dashboard. Here you can view your savings growth, goals, and rewards.',
    audioLoginScreenDetailed: 'Welcome to Gullak login screen. This screen allows you to select your preferred language and sign in using Google authentication. You can use voice commands like "sign in with Google" or navigate using Tab key. The language selector is at the top, followed by the Google sign-in button.',
    audioRegisterScreenDetailed: 'You are on the Gullak registration screen. Here you can create a new account by filling in your full name, email address, password, and optionally your UPI ID for payments. All fields except UPI ID are required. You can use voice commands like "fill name" or navigate using Tab key.',
    audioDashboardScreenDetailed: 'Welcome to your Gullak savings dashboard. This is your main control center showing your total savings, daily weekly and yearly growth, current goals, and reward points. You can add money, view goals, or access settings. Use voice commands like "add money", "view goals", or navigate using Tab key.',
    audioLanguageSelector: 'Language selector. Use arrow keys to choose your preferred language.',
    audioGoogleSignIn: 'Google sign in button. Click to authenticate with your Google account.',
    audioSavingsCard: 'Savings summary card showing your total savings and growth statistics.',
    audioGoalCard: 'Goal tracking card showing your current savings goal and progress.',
    audioRewardCard: 'Rewards card displaying your earned points and achievements.',
    actionCompleted: 'Action completed',
    
    // Detailed Menu Explanations
    menuAddMoneyExplain: 'Add Money button - Click to open a dialog where you can add funds to your savings account. You can enter any amount and it will be added to your total savings.',
    menuViewGoalsExplain: 'View Goals button - Click to see all your savings goals, track progress, and create new financial targets.',
    menuSettingsExplain: 'Settings button - Access app preferences, account settings, language options, and accessibility features.',
    menuSignOutExplain: 'Sign Out button - Click to safely log out of your Gullak account and return to the login screen.',
    menuSavingsCardExplain: 'Total Savings card - Shows your current total savings amount with growth indicators.',
    menuGrowthCardExplain: 'Growth Statistics card - Displays your daily, weekly, and yearly savings growth patterns.',
    menuGoalCardExplain: 'Current Goal card - Shows progress toward your active savings goal with completion percentage.',
    menuRewardCardExplain: 'Reward Points card - Displays points earned through consistent saving habits and achievements.',
    menuLanguageSelectorExplain: 'Language selector - Choose your preferred language from English, Hindi, or Spanish.',
    menuGoogleSignInExplain: 'Google Sign In button - Authenticate securely using your Google account credentials.',
    menuCreateAccountExplain: 'Create Account link - Navigate to registration screen to create a new Gullak account.',
    
    // Payment Screen
    paymentTitle: 'Payment Options',
    paymentSubtitle: 'Choose your preferred payment method',
    upiPayment: 'UPI Payment',
    bankTransfer: 'Bank Transfer',
    cardPayment: 'Card Payment',
    upiDescription: 'Pay instantly using your UPI ID',
    bankDescription: 'Transfer directly from your bank account',
    cardDescription: 'Pay securely with your credit or debit card',
    selectPaymentMethod: 'Select Payment Method',
    proceedToPay: 'Proceed to Pay',
    paymentAmount: 'Payment Amount',
    
    // Menu Value Explanations
    currentSavingsValue: 'Your current total savings amount is',
    dailyGrowthValue: 'Your daily growth amount is',
    weeklyGrowthValue: 'Your weekly growth amount is',
    yearlyGrowthValue: 'Your yearly growth amount is',
    currentGoalValue: 'Your current goal target is',
    rewardPointsValue: 'You have earned',
    rewardPointsUnit: 'reward points',
  },
  mr: {
    // Common
    welcome: 'गुल्लकमध्ये आपले स्वागत आहे',
    continue: 'पुढे चला',
    back: 'मागे',
    next: 'पुढे',
    save: 'जतन करा',
    cancel: 'रद्द करा',
    loading: 'लोड होत आहे...',
    error: 'त्रुटी झाली',
    success: 'यशस्वी!',
    
    // Login Screen
    loginTitle: 'परत आपले स्वागत आहे!',
    loginSubtitle: 'आपला बचत प्रवास सुरू ठेवण्यासाठी साइन इन करा',
    signInWithGoogle: 'Google सह साइन इन करा',
    dontHaveAccount: 'खाते नाही?',
    createAccount: 'खाते तयार करा',
    chooseLanguage: 'आपली भाषा निवडा',
    languageHint: 'पुढे जाण्यासाठी आपली आवडती भाषा निवडा',
    
    // Registration Screen
    registerTitle: 'आपले खाते तयार करा',
    registerSubtitle: 'गुल्लकसह आपला आर्थिक प्रवास सुरू करा',
    fullName: 'पूर्ण नाव',
    email: 'ईमेल पत्ता',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्डची पुष्टी करा',
    upiId: 'UPI ID (पर्यायी)',
    upiPlaceholder: 'तुमचा-upi@bank',
    createAccountBtn: 'खाते तयार करा',
    alreadyHaveAccount: 'आधीच खाते आहे?',
    signIn: 'साइन इन करा',
    
    // Dashboard
    dashboardTitle: 'तुमचा बचत डॅशबोर्ड',
    totalSavings: 'एकूण बचत',
    dailyGrowth: 'दैनिक वाढ',
    weeklyGrowth: 'साप्ताहिक वाढ',
    yearlyGrowth: 'वार्षिक वाढ',
    currentGoal: 'सध्याचे लक्ष्य',
    rewardPoints: 'बक्षीस गुण',
    achievements: 'यश',
    savingsGoal: 'बचत लक्ष्य',
    progress: 'प्रगती',
    addMoney: 'पैसे जोडा',
    viewGoals: 'लक्ष्ये पहा',
    statistics: 'आकडेवारी',
    
    // Voice Commands
    voiceWelcome: 'आवाज आदेश सक्रिय आहेत. उपलब्ध आदेश ऐकण्यासाठी "मदत" म्हणा.',
    voiceHelp: 'उपलब्ध आदेश: डॅशबोर्डवर जा, पैसे जोडा, लक्ष्ये पहा, पेमेंट उघडा, भाषा बदला, साइन आउट करा',
    voiceNavigating: 'येथे जात आहे',
    voiceNotUnderstood: 'माफ करा, मला तो आदेश समजला नाही. उपलब्ध पर्यायांसाठी "मदत" म्हणून पहा.',
    
    // Accessibility
    audioGuideActive: 'ऑडिओ मार्गदर्शक सक्रिय आहे',
    screenReaderOptimized: 'स्क्रीन रीडर अनुकूलित',
    keyboardNavigationTip: 'नेव्हिगेट करण्यासाठी Tab, निवडण्यासाठी Enter वापरा',
    
    // Audio Descriptions
    audioLoginScreen: 'तुम्ही लॉगिन स्क्रीनवर आहात. तुमची भाषा निवडा आणि पुढे जाण्यासाठी Google सह साइन इन करा.',
    audioRegisterScreen: 'तुम्ही नोंदणी स्क्रीनवर आहात. तुमचे गुल्लक खाते तयार करण्यासाठी तुमची माहिती भरा.',
    audioDashboardScreen: 'तुम्ही तुमच्या बचत डॅशबोर्डवर आहात. येथे तुम्ही तुमची बचत वाढ, लक्ष्ये आणि बक्षिसे पाहू शकता.',
    audioLoginScreenDetailed: 'गुल्लक लॉगिन स्क्रीनमध्ये आपले स्वागत आहे. ही स्क्रीन तुम्हाला तुमची आवडती भाषा निवडण्याची आणि Google प्रमाणीकरण वापरून साइन इन करण्याची परवानगी देते.',
    audioRegisterScreenDetailed: 'तुम्ही गुल्लक नोंदणी स्क्रीनवर आहात. येथे तुम्ही तुमचे पूर्ण नाव, ईमेल पत्ता, पासवर्ड आणि पर्यायी म्हणून पेमेंटसाठी तुमची UPI ID भरून नवीन खाते तयार करू शकता.',
    audioDashboardScreenDetailed: 'तुमच्या गुल्लक बचत डॅशबोर्डमध्ये आपले स्वागत आहे. हे तुमचे मुख्य नियंत्रण केंद्र आहे जे तुमची एकूण बचत, दैनिक साप्ताहिक आणि वार्षिक वाढ, सध्याची लक्ष्ये आणि बक्षीस गुण दाखवते.',
    audioLanguageSelector: 'भाषा निवडकर्ता. तुमची आवडती भाषा निवडण्यासाठी arrow keys वापरा.',
    audioGoogleSignIn: 'Google साइन इन बटण. तुमच्या Google खात्यासह प्रमाणीकरणासाठी क्लिक करा.',
    audioSavingsCard: 'बचत सारांश कार्ड जे तुमची एकूण बचत आणि वाढ आकडेवारी दाखवते.',
    audioGoalCard: 'लक्ष्य ट्रॅकिंग कार्ड जे तुमचे सध्याचे बचत लक्ष्य आणि प्रगती दाखवते.',
    audioRewardCard: 'बक्षीस कार्ड जे तुमचे मिळवलेले गुण आणि यश प्रदर्शित करते.',
    actionCompleted: 'कार्य पूर्ण',
    
    // Detailed Menu Explanations
    menuAddMoneyExplain: 'पैसे जोडा बटण - तुमच्या बचत खात्यात पैसे जोडण्यासाठी डायलॉग उघडण्यासाठी क्लिक करा.',
    menuViewGoalsExplain: 'लक्ष्ये पहा बटण - तुमची सर्व बचत लक्ष्ये पाहण्यासाठी आणि प्रगती ट्रॅक करण्यासाठी क्लिक करा.',
    menuSettingsExplain: 'सेटिंग्ज बटण - अॅप प्राधान्ये, खाते सेटिंग्ज, भाषा पर्याय अॅक्सेस करा.',
    menuSignOutExplain: 'साइन आउट बटण - तुमच्या गुल्लक खात्यातून सुरक्षितपणे लॉग आउट करण्यासाठी क्लिक करा.',
    menuSavingsCardExplain: 'एकूण बचत कार्ड - वाढ सूचकांसह तुमची सध्याची एकूण बचत रक्कम दाखवते.',
    menuGrowthCardExplain: 'वाढ आकडेवारी कार्ड - तुमचे दैनिक, साप्ताहिक आणि वार्षिक बचत वाढ पॅटर्न प्रदर्शित करते.',
    menuGoalCardExplain: 'सध्याचे लक्ष्य कार्ड - पूर्णता टक्केवारीसह तुमच्या सक्रिय बचत लक्ष्याची प्रगती दाखवते.',
    menuRewardCardExplain: 'बक्षीस गुण कार्ड - सातत्यपूर्ण बचत सवयी आणि यशांद्वारे मिळवलेले गुण प्रदर्शित करते.',
    menuLanguageSelectorExplain: 'भाषा निवडकर्ता - इंग्रजी, हिंदी, स्पॅनिश, मराठी, भोजपुरी किंवा जर्मनमधून तुमची आवडती भाषा निवडा.',
    menuGoogleSignInExplain: 'Google साइन इन बटण - तुमच्या Google खाते क्रेडेंशियल वापरून सुरक्षितपणे प्रमाणीकरण करा.',
    menuCreateAccountExplain: 'खाते तयार करा लिंक - नवीन गुल्लक खाते तयार करण्यासाठी नोंदणी स्क्रीनवर जा.',
    
    // Payment Screen
    paymentTitle: 'पेमेंट पर्याय',
    paymentSubtitle: 'तुमची आवडती पेमेंट पद्धत निवडा',
    upiPayment: 'UPI पेमेंट',
    bankTransfer: 'बँक ट्रान्सफर',
    cardPayment: 'कार्ड पेमेंट',
    upiDescription: 'तुमची UPI ID वापरून तत्काळ पेमेंट करा',
    bankDescription: 'तुमच्या बँक खात्यातून थेट ट्रान्सफर करा',
    cardDescription: 'तुमच्या क्रेडिट किंवा डेबिट कार्डसह सुरक्षित पेमेंट करा',
    selectPaymentMethod: 'पेमेंट पद्धत निवडा',
    proceedToPay: 'पेमेंटसाठी पुढे जा',
    paymentAmount: 'पेमेंट रक्कम',
    
    // Menu Value Explanations
    currentSavingsValue: 'तुमची सध्याची एकूण बचत रक्कम आहे',
    dailyGrowthValue: 'तुमची दैनिक वाढ रक्कम आहे',
    weeklyGrowthValue: 'तुमची साप्ताहिक वाढ रक्कम आहे',
    yearlyGrowthValue: 'तुमची वार्षिक वाढ रक्कम आहे',
    currentGoalValue: 'तुमचे सध्याचे लक्ष्य आहे',
    rewardPointsValue: 'तुम्ही मिळवले आहे',
    rewardPointsUnit: 'बक्षीस गुण',
  },
  bho: {
    // Common
    welcome: 'गुल्लक में राउर स्वागत बा',
    continue: 'आगे बढ़ीं',
    back: 'पाछे',
    next: 'अगिला',
    save: 'सेव करीं',
    cancel: 'रद्द करीं',
    loading: 'लोड हो रहल बा...',
    error: 'गलती भइल',
    success: 'सफल!',
    
    // Login Screen
    loginTitle: 'वापस राउर स्वागत बा!',
    loginSubtitle: 'अपना बचत के यात्रा जारी रखे खातिर साइन इन करीं',
    signInWithGoogle: 'Google से साइन इन करीं',
    dontHaveAccount: 'खाता नइखे?',
    createAccount: 'खाता बनाईं',
    chooseLanguage: 'अपना भाषा चुनीं',
    languageHint: 'आगे बढ़े खातिर अपना पसंदीदा भाषा चुनीं',
    
    // Registration Screen
    registerTitle: 'अपना खाता बनाईं',
    registerSubtitle: 'गुल्लक के साथ अपना आर्थिक यात्रा शुरू करीं',
    fullName: 'पूरा नाम',
    email: 'ईमेल पता',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड के पुष्टि करीं',
    upiId: 'UPI ID (वैकल्पिक)',
    upiPlaceholder: 'राउर-upi@bank',
    createAccountBtn: 'खाता बनाईं',
    alreadyHaveAccount: 'पहिले से खाता बा?',
    signIn: 'साइन इन करीं',
    
    // Dashboard
    dashboardTitle: 'राउर बचत डैशबोर्ड',
    totalSavings: 'कुल बचत',
    dailyGrowth: 'दैनिक बढ़ोतरी',
    weeklyGrowth: 'साप्ताहिक बढ़ोतरी',
    yearlyGrowth: 'सालाना बढ़ोतरी',
    currentGoal: 'मौजूदा लक्ष्य',
    rewardPoints: 'इनाम अंक',
    achievements: 'उपलब्धि',
    savingsGoal: 'बचत लक्ष्य',
    progress: 'प्रगति',
    addMoney: 'पइसा जोड़ीं',
    viewGoals: 'लक्ष्य देखीं',
    statistics: 'आंकड़ा',
    
    // Voice Commands
    voiceWelcome: 'आवाज़ कमांड सक्रिय बा। उपलब्ध कमांड सुने खातिर "मदद" कहीं।',
    voiceHelp: 'उपलब्ध कमांड: डैशबोर्ड पर जाईं, पइसा जोड़ीं, लक्ष्य देखीं, भुगतान खोलीं, भाषा बदलीं, साइन आउट करीं',
    voiceNavigating: 'एहिजा जा रहल बानी',
    voiceNotUnderstood: 'माफ करीं, हमरा ऊ कमांड ना समझ आइल। उपलब्ध विकल्प खातिर "मदद" कहे के कोशिश करीं।',
    
    // Accessibility
    audioGuideActive: 'ऑडियो गाइड सक्रिय बा',
    screenReaderOptimized: 'स्क्रीन रीडर अनुकूलित',
    keyboardNavigationTip: 'नेविगेट करे खातिर Tab, चुने खातिर Enter के इस्तेमाल करीं',
    
    // Audio Descriptions
    audioLoginScreen: 'रउआ लॉगिन स्क्रीन पर बानी। अपना भाषा चुनीं आ आगे बढ़े खातिर Google से साइन इन करीं।',
    audioRegisterScreen: 'रउआ पंजीकरण स्क्रीन पर बानी। अपना गुल्लक खाता बनावे खातिर अपना जानकारी भरीं।',
    audioDashboardScreen: 'रउआ अपना बचत डैशबोर्ड पर बानी। एहिजा रउआ अपना बचत बढ़ोतरी, लक्ष्य आ इनाम देख सकत बानी।',
    audioLoginScreenDetailed: 'गुल्लक लॉगिन स्क्रीन में राउर स्वागत बा। ई स्क्रीन रउआके अपना पसंदीदा भाषा चुने आ Google प्रमाणीकरण के इस्तेमाल करके साइन इन करे के अनुमति देत बा।',
    audioRegisterScreenDetailed: 'रउआ गुल्लक पंजीकरण स्क्रीन पर बानी। एहिजा रउआ अपना पूरा नाम, ईमेल पता, पासवर्ड, आ वैकल्पिक रूप से भुगतान खातिर अपना UPI ID भरके नया खाता बना सकत बानी।',
    audioDashboardScreenDetailed: 'राउर गुल्लक बचत डैशबोर्ड में स्वागत बा। ई राउर मुख्य नियंत्रण केंद्र बा जे राउर कुल बचत, दैनिक साप्ताहिक आ सालाना बढ़ोतरी, मौजूदा लक्ष्य आ इनाम अंक देखावेत बा।',
    audioLanguageSelector: 'भाषा चयनकर्ता। अपना पसंदीदा भाषा चुने खातिर arrow keys के इस्तेमाल करीं।',
    audioGoogleSignIn: 'Google साइन इन बटन। अपना Google खाता से प्रमाणीकरण खातिर क्लिक करीं।',
    audioSavingsCard: 'बचत सारांश कार्ड जे राउर कुल बचत आ बढ़ोतरी आंकड़ा देखावेत बा।',
    audioGoalCard: 'लक्ष्य ट्रैकिंग कार्ड जे राउर मौजूदा बचत लक्ष्य आ प्रगति देखावेत बा।',
    audioRewardCard: 'इनाम कार्ड जे राउर कमाइल अंक आ उपलब्धि प्रदर्शित करेत बा।',
    actionCompleted: 'काम पूरा',
    
    // Detailed Menu Explanations
    menuAddMoneyExplain: 'पइसा जोड़ीं बटन - अपना बचत खाता में पइसा जोड़े खातिर डायलॉग खोले खातिर क्लिक करीं।',
    menuViewGoalsExplain: 'लक्ष्य देखीं बटन - अपना सब बचत लक्ष्य देखे आ प्रगति ट्रैक करे खातिर क्लिक करीं।',
    menuSettingsExplain: 'सेटिंग्स बटन - ऐप प्राथमिकता, खाता सेटिंग्स, भाषा विकल्प एक्सेस करीं।',
    menuSignOutExplain: 'साइन आउट बटन - अपना गुल्लक खाता से सुरक्षित रूप से लॉग आउट करे खातिर क्लिक करीं।',
    menuSavingsCardExplain: 'कुल बचत कार्ड - बढ़ोतरी संकेतक के साथ राउर मौजूदा कुल बचत रकम देखावेत बा।',
    menuGrowthCardExplain: 'बढ़ोतरी आंकड़ा कार्ड - राउर दैनिक, साप्ताहिक आ सालाना बचत बढ़ोतरी पैटर्न प्रदर्शित करेत बा।',
    menuGoalCardExplain: 'मौजूदा लक्ष्य कार्ड - पूर्णता प्रतिशत के साथ राउर सक्रिय बचत लक्ष्य के प्रगति देखावेत बा।',
    menuRewardCardExplain: 'इनाम अंक कार्ड - निरंतर बचत आदत आ उपलब्धि के माध्यम से कमाइल अंक प्रदर्शित करेत बा।',
    menuLanguageSelectorExplain: 'भाषा चयनकर्ता - अंग्रेजी, हिंदी, स्पेनिश, मराठी, भोजपुरी या जर्मन से अपना पसंदीदा भाषा चुनीं।',
    menuGoogleSignInExplain: 'Google साइन इन बटन - अपना Google खाता क्रेडेंशियल के इस्तेमाल करके सुरक्षित रूप से प्रमाणीकरण करीं।',
    menuCreateAccountExplain: 'खाता बनाईं लिंक - नया गुल्लक खाता बनावे खातिर पंजीकरण स्क्रीन पर जाईं।',
    
    // Payment Screen
    paymentTitle: 'भुगतान विकल्प',
    paymentSubtitle: 'अपना पसंदीदा भुगतान तरीका चुनीं',
    upiPayment: 'UPI भुगतान',
    bankTransfer: 'बैंक ट्रांसफर',
    cardPayment: 'कार्ड भुगतान',
    upiDescription: 'अपना UPI ID के इस्तेमाल करके तुरंत भुगतान करीं',
    bankDescription: 'अपना बैंक खाता से सीधे ट्रांसफर करीं',
    cardDescription: 'अपना क्रेडिट या डेबिट कार्ड से सुरक्षित भुगतान करीं',
    selectPaymentMethod: 'भुगतान तरीका चुनीं',
    proceedToPay: 'भुगतान खातिर आगे बढ़ीं',
    paymentAmount: 'भुगतान रकम',
    
    // Menu Value Explanations
    currentSavingsValue: 'राउर मौजूदा कुल बचत रकम बा',
    dailyGrowthValue: 'राउर दैनिक बढ़ोतरी रकम बा',
    weeklyGrowthValue: 'राउर साप्ताहिक बढ़ोतरी रकम बा',
    yearlyGrowthValue: 'राउर सालाना बढ़ोतरी रकम बा',
    currentGoalValue: 'राउर मौजूदा लक्ष्य बा',
    rewardPointsValue: 'रउआ कमाइले बानी',
    rewardPointsUnit: 'इनाम अंक',
  },
  de: {
    // Common
    welcome: 'Willkommen bei Gullak',
    continue: 'Weiter',
    back: 'Zurück',
    next: 'Weiter',
    save: 'Speichern',
    cancel: 'Abbrechen',
    loading: 'Lädt...',
    error: 'Fehler aufgetreten',
    success: 'Erfolgreich!',
    
    // Login Screen
    loginTitle: 'Willkommen zurück!',
    loginSubtitle: 'Melden Sie sich an, um Ihre Sparreise fortzusetzen',
    signInWithGoogle: 'Mit Google anmelden',
    dontHaveAccount: 'Haben Sie kein Konto?',
    createAccount: 'Konto erstellen',
    chooseLanguage: 'Wählen Sie Ihre Sprache',
    languageHint: 'Wählen Sie Ihre bevorzugte Sprache, um fortzufahren',
    
    // Registration Screen
    registerTitle: 'Erstellen Sie Ihr Konto',
    registerSubtitle: 'Beginnen Sie Ihre finanzielle Reise mit Gullak',
    fullName: 'Vollständiger Name',
    email: 'E-Mail-Adresse',
    password: 'Passwort',
    confirmPassword: 'Passwort bestätigen',
    upiId: 'UPI ID (Optional)',
    upiPlaceholder: 'ihre-upi@bank',
    createAccountBtn: 'Konto erstellen',
    alreadyHaveAccount: 'Haben Sie bereits ein Konto?',
    signIn: 'Anmelden',
    
    // Dashboard
    dashboardTitle: 'Ihr Spar-Dashboard',
    totalSavings: 'Gesamtersparnisse',
    dailyGrowth: 'Tägliches Wachstum',
    weeklyGrowth: 'Wöchentliches Wachstum',
    yearlyGrowth: 'Jährliches Wachstum',
    currentGoal: 'Aktuelles Ziel',
    rewardPoints: 'Belohnungspunkte',
    achievements: 'Erfolge',
    savingsGoal: 'Sparziel',
    progress: 'Fortschritt',
    addMoney: 'Geld hinzufügen',
    viewGoals: 'Ziele anzeigen',
    statistics: 'Statistiken',
    
    // Voice Commands
    voiceWelcome: 'Sprachbefehle sind aktiv. Sagen Sie "Hilfe", um verfügbare Befehle zu hören.',
    voiceHelp: 'Verfügbare Befehle: Zum Dashboard navigieren, Geld hinzufügen, Ziele anzeigen, Zahlungen öffnen, Sprache ändern, Abmelden',
    voiceNavigating: 'Navigiere zu',
    voiceNotUnderstood: 'Entschuldigung, ich habe diesen Befehl nicht verstanden. Versuchen Sie "Hilfe" für verfügbare Optionen zu sagen.',
    
    // Accessibility
    audioGuideActive: 'Audio-Leitfaden ist aktiv',
    screenReaderOptimized: 'Bildschirmleser optimiert',
    keyboardNavigationTip: 'Verwenden Sie Tab zum Navigieren, Enter zum Auswählen',
    
    // Audio Descriptions
    audioLoginScreen: 'Sie befinden sich auf dem Anmeldebildschirm. Wählen Sie Ihre Sprache und melden Sie sich mit Google an, um fortzufahren.',
    audioRegisterScreen: 'Sie befinden sich auf dem Registrierungsbildschirm. Füllen Sie Ihre Daten aus, um Ihr Gullak-Konto zu erstellen.',
    audioDashboardScreen: 'Sie befinden sich auf Ihrem Spar-Dashboard. Hier können Sie Ihr Sparwachstum, Ziele und Belohnungen einsehen.',
    audioLoginScreenDetailed: 'Willkommen auf dem Gullak-Anmeldebildschirm. Dieser Bildschirm ermöglicht es Ihnen, Ihre bevorzugte Sprache auszuwählen und sich mit Google-Authentifizierung anzumelden. Sie können Sprachbefehle wie "Mit Google anmelden" verwenden.',
    audioRegisterScreenDetailed: 'Sie befinden sich auf dem Gullak-Registrierungsbildschirm. Hier können Sie ein neues Konto erstellen, indem Sie Ihren vollständigen Namen, E-Mail-Adresse, Passwort und optional Ihre UPI-ID für Zahlungen eingeben.',
    audioDashboardScreenDetailed: 'Willkommen auf Ihrem Gullak-Spar-Dashboard. Dies ist Ihr Hauptkontrollzentrum, das Ihre Gesamtersparnisse, tägliches wöchentliches und jährliches Wachstum, aktuelle Ziele und Belohnungspunkte anzeigt.',
    audioLanguageSelector: 'Sprachauswahl. Verwenden Sie die Pfeiltasten, um Ihre bevorzugte Sprache auszuwählen.',
    audioGoogleSignIn: 'Google-Anmelde-Schaltfläche. Klicken Sie, um sich mit Ihrem Google-Konto zu authentifizieren.',
    audioSavingsCard: 'Spar-Zusammenfassungskarte, die Ihre Gesamtersparnisse und Wachstumsstatistiken anzeigt.',
    audioGoalCard: 'Ziel-Tracking-Karte, die Ihr aktuelles Sparziel und Fortschritt anzeigt.',
    audioRewardCard: 'Belohnungskarte, die Ihre verdienten Punkte und Erfolge anzeigt.',
    actionCompleted: 'Aktion abgeschlossen',
    
    // Detailed Menu Explanations
    menuAddMoneyExplain: 'Geld hinzufügen-Schaltfläche - Klicken Sie, um einen Dialog zu öffnen, in dem Sie Geld zu Ihrem Sparkonto hinzufügen können.',
    menuViewGoalsExplain: 'Ziele anzeigen-Schaltfläche - Klicken Sie, um alle Ihre Sparziele anzuzeigen und den Fortschritt zu verfolgen.',
    menuSettingsExplain: 'Einstellungen-Schaltfläche - Zugriff auf App-Einstellungen, Kontoeinstellungen, Sprachoptionen.',
    menuSignOutExplain: 'Abmelden-Schaltfläche - Klicken Sie, um sich sicher von Ihrem Gullak-Konto abzumelden.',
    menuSavingsCardExplain: 'Gesamtersparnisse-Karte - Zeigt Ihren aktuellen Gesamtsparbetrag mit Wachstumsindikatoren an.',
    menuGrowthCardExplain: 'Wachstumsstatistik-Karte - Zeigt Ihre täglichen, wöchentlichen und jährlichen Sparwachstumsmuster an.',
    menuGoalCardExplain: 'Aktuelles Ziel-Karte - Zeigt den Fortschritt zu Ihrem aktiven Sparziel mit Vollendungsprozentsatz an.',
    menuRewardCardExplain: 'Belohnungspunkte-Karte - Zeigt durch konsistente Spargewohnheiten und Erfolge verdiente Punkte an.',
    menuLanguageSelectorExplain: 'Sprachauswahl - Wählen Sie Ihre bevorzugte Sprache aus Englisch, Hindi, Spanisch, Marathi, Bhojpuri oder Deutsch.',
    menuGoogleSignInExplain: 'Google-Anmelde-Schaltfläche - Authentifizieren Sie sich sicher mit Ihren Google-Konto-Anmeldedaten.',
    menuCreateAccountExplain: 'Konto erstellen-Link - Navigieren Sie zum Registrierungsbildschirm, um ein neues Gullak-Konto zu erstellen.',
    
    // Payment Screen
    paymentTitle: 'Zahlungsoptionen',
    paymentSubtitle: 'Wählen Sie Ihre bevorzugte Zahlungsmethode',
    upiPayment: 'UPI-Zahlung',
    bankTransfer: 'Banküberweisung',
    cardPayment: 'Kartenzahlung',
    upiDescription: 'Zahlen Sie sofort mit Ihrer UPI-ID',
    bankDescription: 'Überweisen Sie direkt von Ihrem Bankkonto',
    cardDescription: 'Zahlen Sie sicher mit Ihrer Kredit- oder Debitkarte',
    selectPaymentMethod: 'Zahlungsmethode auswählen',
    proceedToPay: 'Zur Zahlung fortfahren',
    paymentAmount: 'Zahlungsbetrag',
    
    // Menu Value Explanations
    currentSavingsValue: 'Ihr aktueller Gesamtsparbetrag beträgt',
    dailyGrowthValue: 'Ihr täglicher Wachstumsbetrag beträgt',
    weeklyGrowthValue: 'Ihr wöchentlicher Wachstumsbetrag beträgt',
    yearlyGrowthValue: 'Ihr jährlicher Wachstumsbetrag beträgt',
    currentGoalValue: 'Ihr aktuelles Ziel ist',
    rewardPointsValue: 'Sie haben verdient',
    rewardPointsUnit: 'Belohnungspunkte',
  },
  hi: {
    // Common
    welcome: 'गुल्लक में आपका स्वागत है',
    continue: 'जारी रखें',
    back: 'वापस',
    next: 'अगला',
    save: 'सेव करें',
    cancel: 'रद्द करें',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि हुई',
    success: 'सफल!',
    
    // Login Screen
    loginTitle: 'वापस आपका स्वागत है!',
    loginSubtitle: 'अपनी बचत यात्रा जारी रखने के लिए साइन इन करें',
    signInWithGoogle: 'Google से साइन इन करें',
    dontHaveAccount: 'खाता नहीं है?',
    createAccount: 'खाता बनाएं',
    chooseLanguage: 'अपनी भाषा चुनें',
    languageHint: 'जारी रखने के लिए अपनी पसंदीदा भाषा चुनें',
    
    // Registration Screen
    registerTitle: 'अपना खाता बनाएं',
    registerSubtitle: 'गुल्लक के साथ अपनी वित्तीय यात्रा शुरू करें',
    fullName: 'पूरा नाम',
    email: 'ईमेल पता',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    upiId: 'UPI ID (वैकल्पिक)',
    upiPlaceholder: 'आपका-upi@bank',
    createAccountBtn: 'खाता बनाएं',
    alreadyHaveAccount: 'पहले से खाता है?',
    signIn: 'साइन इन करें',
    
    // Dashboard
    dashboardTitle: 'आपका बचत डैशबोर्ड',
    totalSavings: 'कुल बचत',
    dailyGrowth: 'दैनिक वृद्धि',
    weeklyGrowth: 'साप्ताहिक वृद्धि',
    yearlyGrowth: 'वार्षिक वृद्धि',
    currentGoal: 'वर्तमान लक्ष्य',
    rewardPoints: 'पुरस्कार अंक',
    achievements: 'उपलब्धियां',
    savingsGoal: 'बचत लक्ष्य',
    progress: 'प्रगति',
    addMoney: 'पैसे जोड़ें',
    viewGoals: 'लक्ष्य देखें',
    statistics: 'सांख्यिकी',
    
    // Voice Commands
    voiceWelcome: 'आवाज़ कमांड सक्रिय हैं। उपलब्ध कमांड सुनने के लिए "मदद" कहें।',
    voiceHelp: 'उपलब्ध कमांड: डैशबोर्ड पर जाएं, पैसे जोड़ें, लक्ष्य देखें, भुगतान खोलें, भाषा बदलें, साइन आउट करें',
    voiceNavigating: 'इस पर जा रहे हैं',
    voiceNotUnderstood: 'माफ़ करें, मैं उस कमांड को नहीं समझा। उपलब्ध विकल्पों के लिए "मदद" कहने की कोशिश करें।',
    
    // Accessibility
    audioGuideActive: 'ऑडियो गाइड सक्रिय है',
    screenReaderOptimized: 'स्क्रीन रीडर अनुकूलित',
    keyboardNavigationTip: 'नेविगेट करने के लिए Tab, चुनने के लिए Enter का उपयोग करें',
    
    // Audio Descriptions
    audioLoginScreen: 'आप लॉगिन स्क्रीन पर हैं। अपनी भाषा चुनें और जारी रखने के लिए Google से साइन इन करें।',
    audioRegisterScreen: 'आप पंजीकरण स्क्रीन पर हैं। अपना गुल्लक खाता बनाने के लिए अपनी जानकारी भरें।',
    audioDashboardScreen: 'आप अपने बचत डैशबोर्ड पर हैं। यहां आप अपनी बचत वृद्धि, लक्ष्य और पुरस्कार देख सकते हैं।',
    audioLoginScreenDetailed: 'गुल्लक लॉगिन स्क्रीन में आपका स्वागत है। यह स्क्रीन आपको अपनी पसंदीदा भाषा चुनने और Google प्रमाणीकरण का उपयोग करके साइन इन करने की अनुमति देती है। आप "Google से साइन इन करें" जैसे आवाज़ कमांड का उपयोग कर सकते हैं।',
    audioRegisterScreenDetailed: 'आप गुल्लक पंजीकरण स्क्रीन पर हैं। यहां आप अपना पूरा नाम, ईमेल पता, पासवर्ड, और वैकल्पिक रूप से भुगतान के लिए अपनी UPI ID भरकर नया खाता बना सकते हैं।',
    audioDashboardScreenDetailed: 'आपके गुल्लक बचत डैशबोर्ड में आपका स्वागत है। यह आपका मुख्य नियंत्रण केंद्र है जो आपकी कुल बचत, दैनिक साप्ताहिक और वार्षिक वृद्धि, वर्तमान लक्ष्य और पुरस्कार अंक दिखाता है।',
    audioLanguageSelector: 'भाषा चयनकर्ता। अपनी पसंदीदा भाषा चुनने के लिए arrow keys का उपयोग करें।',
    audioGoogleSignIn: 'Google साइन इन बटन। अपने Google खाते से प्रमाणीकरण के लिए क्लिक करें।',
    audioSavingsCard: 'बचत सारांश कार्ड जो आपकी कुल बचत और वृद्धि सांख्यिकी दिखाता है।',
    audioGoalCard: 'लक्ष्य ट्रैकिंग कार्ड जो आपका वर्तमान बचत लक्ष्य और प्रगति दिखाता है।',
    audioRewardCard: 'पुरस्कार कार्ड जो आपके अर्जित अंक और उपलब्धियां प्रदर्शित करता है।',
    actionCompleted: 'कार्य पूर्ण',
    
    // Detailed Menu Explanations
    menuAddMoneyExplain: 'पैसे जोड़ें बटन - अपने बचत खाते में धन जोड़ने के लिए एक डायलॉग खोलने के लिए क्लिक करें।',
    menuViewGoalsExplain: 'लक्ष्य देखें बटन - अपने सभी बचत लक्ष्य देखने, प्रगति ट्रैक करने के लिए क्लिक करें।',
    menuSettingsExplain: 'सेटिंग्स बटन - ऐप प्राथमिकताएं, खाता सेटिंग्स, भाषा विकल्प एक्सेस करें।',
    menuSignOutExplain: 'साइन आउट बटन - अपने गुल्लक खाते से सुरक्षित रूप से लॉग आउट करने के लिए क्लिक करें।',
    menuSavingsCardExplain: 'कुल बचत कार्ड - वृद्धि संकेतकों के साथ आपकी वर्तमान कुल बचत राशि दिखाता है।',
    menuGrowthCardExplain: 'वृद्धि सांख्यिकी कार्ड - आपकी दैनिक, साप्ताहिक और वार्षिक बचत वृद्धि पैटर्न प्रदर्शित करता है।',
    menuGoalCardExplain: 'वर्तमान लक्ष्य कार्ड - पूर्णता प्रतिशत के साथ आपके सक्रिय बचत लक्ष्य की प्रगति दिखाता है।',
    menuRewardCardExplain: 'पुरस्कार अंक कार्ड - निरंतर बचत आदतों और उपलब्धियों के माध्यम से अर्जित अंक प्रदर्शित करता है।',
    menuLanguageSelectorExplain: 'भाषा चयनकर्ता - अंग्रेजी, हिंदी या स्पेनिश से अपनी पसंदीदा भाषा चुनें।',
    menuGoogleSignInExplain: 'Google साइन इन बटन - अपने Google खाता क्रेडेंशियल का उपयोग करके सुरक्षित रूप से प्रमाणीकरण करें।',
    menuCreateAccountExplain: 'खाता बनाएं लिंक - नया गुल्लक खाता बनाने के लिए पंजीकरण स्क्रीन पर जाएं।',
    
    // Payment Screen
    paymentTitle: 'भुगतान विकल्प',
    paymentSubtitle: 'अपना पसंदीदा भुगतान तरीका चुनें',
    upiPayment: 'UPI भुगतान',
    bankTransfer: 'बैंक ट्रांसफर',
    cardPayment: 'कार्ड भुगतान',
    upiDescription: 'अपनी UPI ID का उपयोग करके तुरंत भुगतान करें',
    bankDescription: 'अपने बैंक खाते से सीधे ट्रांसफर करें',
    cardDescription: 'अपने क्रेडिट या डेबिट कार्ड से सुरक्षित भुगतान करें',
    selectPaymentMethod: 'भुगतान तरीका चुनें',
    proceedToPay: 'भुगतान के लिए आगे बढ़ें',
    paymentAmount: 'भुगतान राशि',
    
    // Menu Value Explanations
    currentSavingsValue: 'आपकी वर्तमान कुल बचत राशि है',
    dailyGrowthValue: 'आपकी दैनिक वृद्धि राशि है',
    weeklyGrowthValue: 'आपकी साप्ताहिक वृद्धि राशि है',
    yearlyGrowthValue: 'आपकी वार्षिक वृद्धि राशि है',
    currentGoalValue: 'आपका वर्तमान लक्ष्य है',
    rewardPointsValue: 'आपने अर्जित किए हैं',
    rewardPointsUnit: 'पुरस्कार अंक',
  },
  es: {
    // Common
    welcome: 'Bienvenido a Gullak',
    continue: 'Continuar',
    back: 'Atrás',
    next: 'Siguiente',
    save: 'Guardar',
    cancel: 'Cancelar',
    loading: 'Cargando...',
    error: 'Error ocurrido',
    success: '¡Éxito!',
    
    // Login Screen
    loginTitle: '¡Bienvenido de nuevo!',
    loginSubtitle: 'Inicia sesión para continuar tu viaje de ahorro',
    signInWithGoogle: 'Iniciar sesión con Google',
    dontHaveAccount: '¿No tienes cuenta?',
    createAccount: 'Crear Cuenta',
    chooseLanguage: 'Elige tu idioma',
    languageHint: 'Selecciona tu idioma preferido para continuar',
    
    // Registration Screen
    registerTitle: 'Crea tu cuenta',
    registerSubtitle: 'Comienza tu viaje financiero con Gullak',
    fullName: 'Nombre completo',
    email: 'Correo electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña',
    upiId: 'UPI ID (Opcional)',
    upiPlaceholder: 'tu-upi@banco',
    createAccountBtn: 'Crear cuenta',
    alreadyHaveAccount: '¿Ya tienes cuenta?',
    signIn: 'Iniciar sesión',
    
    // Dashboard
    dashboardTitle: 'Tu panel de ahorros',
    totalSavings: 'Ahorros totales',
    dailyGrowth: 'Crecimiento diario',
    weeklyGrowth: 'Crecimiento semanal',
    yearlyGrowth: 'Crecimiento anual',
    currentGoal: 'Meta actual',
    rewardPoints: 'Puntos de recompensa',
    achievements: 'Logros',
    savingsGoal: 'Meta de ahorro',
    progress: 'Progreso',
    addMoney: 'Agregar dinero',
    viewGoals: 'Ver metas',
    statistics: 'Estadísticas',
    
    // Voice Commands
    voiceWelcome: 'Los comandos de voz están activos. Di "ayuda" para escuchar los comandos disponibles.',
    voiceHelp: 'Comandos disponibles: Ir al panel, Agregar dinero, Ver metas, Abrir pagos, Cambiar idioma, Cerrar sesión',
    voiceNavigating: 'Navegando a',
    voiceNotUnderstood: 'Lo siento, no entendí ese comando. Intenta decir "ayuda" para las opciones disponibles.',
    
    // Accessibility
    audioGuideActive: 'La guía de audio está activa',
    screenReaderOptimized: 'Optimizado para lector de pantalla',
    keyboardNavigationTip: 'Usa Tab para navegar, Enter para seleccionar',
    
    // Audio Descriptions
    audioLoginScreen: 'Estás en la pantalla de inicio de sesión. Elige tu idioma e inicia sesión con Google para continuar.',
    audioRegisterScreen: 'Estás en la pantalla de registro. Completa tus datos para crear tu cuenta de Gullak.',
    audioDashboardScreen: 'Estás en tu panel de ahorros. Aquí puedes ver tu crecimiento de ahorros, metas y recompensas.',
    audioLoginScreenDetailed: 'Bienvenido a la pantalla de inicio de sesión de Gullak. Esta pantalla te permite seleccionar tu idioma preferido e iniciar sesión usando autenticación de Google. Puedes usar comandos de voz como "iniciar sesión con Google".',
    audioRegisterScreenDetailed: 'Estás en la pantalla de registro de Gullak. Aquí puedes crear una nueva cuenta completando tu nombre completo, dirección de correo electrónico, contraseña y opcionalmente tu ID UPI para pagos.',
    audioDashboardScreenDetailed: 'Bienvenido a tu panel de ahorros de Gullak. Este es tu centro de control principal que muestra tus ahorros totales, crecimiento diario semanal y anual, metas actuales y puntos de recompensa.',
    audioLanguageSelector: 'Selector de idioma. Usa las flechas para elegir tu idioma preferido.',
    audioGoogleSignIn: 'Botón de inicio de sesión de Google. Haz clic para autenticarte con tu cuenta de Google.',
    audioSavingsCard: 'Tarjeta de resumen de ahorros que muestra tus ahorros totales y estadísticas de crecimiento.',
    audioGoalCard: 'Tarjeta de seguimiento de metas que muestra tu meta de ahorro actual y progreso.',
    audioRewardCard: 'Tarjeta de recompensas que muestra tus puntos ganados y logros.',
    actionCompleted: 'Acción completada',
    
    // Detailed Menu Explanations
    menuAddMoneyExplain: 'Botón Agregar Dinero - Haz clic para abrir un diálogo donde puedes agregar fondos a tu cuenta de ahorros.',
    menuViewGoalsExplain: 'Botón Ver Metas - Haz clic para ver todas tus metas de ahorro y rastrear el progreso.',
    menuSettingsExplain: 'Botón Configuración - Accede a preferencias de la app, configuración de cuenta, opciones de idioma.',
    menuSignOutExplain: 'Botón Cerrar Sesión - Haz clic para cerrar sesión de forma segura de tu cuenta Gullak.',
    menuSavingsCardExplain: 'Tarjeta Ahorros Totales - Muestra tu cantidad actual de ahorros totales con indicadores de crecimiento.',
    menuGrowthCardExplain: 'Tarjeta Estadísticas de Crecimiento - Muestra tus patrones de crecimiento de ahorros diarios, semanales y anuales.',
    menuGoalCardExplain: 'Tarjeta Meta Actual - Muestra el progreso hacia tu meta de ahorro activa con porcentaje de finalización.',
    menuRewardCardExplain: 'Tarjeta Puntos de Recompensa - Muestra puntos ganados a través de hábitos de ahorro consistentes y logros.',
    menuLanguageSelectorExplain: 'Selector de idioma - Elige tu idioma preferido entre inglés, hindi o español.',
    menuGoogleSignInExplain: 'Botón Iniciar Sesión con Google - Autentícate de forma segura usando las credenciales de tu cuenta de Google.',
    menuCreateAccountExplain: 'Enlace Crear Cuenta - Navega a la pantalla de registro para crear una nueva cuenta Gullak.',
    
    // Payment Screen
    paymentTitle: 'Opciones de Pago',
    paymentSubtitle: 'Elige tu método de pago preferido',
    upiPayment: 'Pago UPI',
    bankTransfer: 'Transferencia Bancaria',
    cardPayment: 'Pago con Tarjeta',
    upiDescription: 'Paga instantáneamente usando tu ID UPI',
    bankDescription: 'Transfiere directamente desde tu cuenta bancaria',
    cardDescription: 'Paga de forma segura con tu tarjeta de crédito o débito',
    selectPaymentMethod: 'Seleccionar Método de Pago',
    proceedToPay: 'Proceder al Pago',
    paymentAmount: 'Monto del Pago',
    
    // Menu Value Explanations
    currentSavingsValue: 'Tu cantidad total actual de ahorros es',
    dailyGrowthValue: 'Tu cantidad de crecimiento diario es',
    weeklyGrowthValue: 'Tu cantidad de crecimiento semanal es',
    yearlyGrowthValue: 'Tu cantidad de crecimiento anual es',
    currentGoalValue: 'Tu meta actual es',
    rewardPointsValue: 'Has ganado',
    rewardPointsUnit: 'puntos de recompensa',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('gullak-language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('gullak-language', lang);
    
    // Update document language attribute for accessibility
    document.documentElement.lang = lang === 'mr' ? 'mr' : lang === 'bho' ? 'bho' : lang === 'de' ? 'de' : lang === 'hi' ? 'hi' : lang === 'es' ? 'es' : 'en';
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[Language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};