import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PiggyBank, 
  TrendingUp, 
  Target, 
  Award, 
  Plus, 
  LogOut, 
  Calendar,
  BarChart3,
  Settings,
  Home,
  DollarSign
} from 'lucide-react';
import { CreditCard } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useAudioGuide } from '../hooks/useAudioGuide';
import { useVoiceCommands } from '../hooks/useVoiceCommands';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user, logout, updateSavings } = useAuth();
  const { announceElement, announceAction } = useAudioGuide();
  const navigate = useNavigate();
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [showGoals, setShowGoals] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [addAmount, setAddAmount] = useState('');
  
  const { isListening, isSupported, startListening, stopListening } = useVoiceCommands(
    () => setShowAddMoney(true),
    () => setShowGoals(true),
    () => setShowPayments(true)
  );

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  const handleLogout = () => {
    announceAction('Signing out of your account');
    logout();
  };

  const handleAddMoney = () => {
    if (addAmount && !isNaN(Number(addAmount))) {
      updateSavings(Number(addAmount));
      announceAction(`Successfully added ${addAmount} rupees to your savings`);
      setAddAmount('');
      setShowAddMoney(false);
    }
  };

  const handleOpenPayments = () => {
    navigate('/payments');
    announceAction('Navigating to payment options screen');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getGrowthData = () => {
    const savings = user?.totalSavings || 0;
    return {
      daily: Math.floor(savings * 0.02),
      weekly: Math.floor(savings * 0.05),
      yearly: Math.floor(savings * 0.12),
    };
  };

  const growth = getGrowthData();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
                <PiggyBank className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {t('dashboardTitle')}
                </h1>
                <p className="text-gray-600">Welcome back, {user.name}!</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              onMouseEnter={() => announceElement(t('menuSignOutExplain'))}
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Savings */}
          <div 
            className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-200"
            role="region"
            aria-label={t('audioSavingsCard')}
            onMouseEnter={() => announceElement(`${t('menuSavingsCardExplain')} ${t('currentSavingsValue')} ${formatCurrency(user.totalSavings)}`)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('totalSavings')}</p>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(user.totalSavings)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Daily Growth */}
          <div 
            className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-200"
            onMouseEnter={() => announceElement(`${t('menuGrowthCardExplain')} ${t('dailyGrowthValue')} ${formatCurrency(growth.daily)}`)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('dailyGrowth')}</p>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(growth.daily)}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Current Goal */}
          <div 
            className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-200"
            role="region"
            aria-label={t('audioGoalCard')}
            onMouseEnter={() => announceElement(`${t('menuGoalCardExplain')} ${t('currentGoalValue')} ${user.goals.length > 0 ? formatCurrency(user.goals[0].targetAmount) : formatCurrency(0)}`)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('currentGoal')}</p>
                <p className="text-2xl font-bold text-gray-800">
                  {user.goals.length > 0 ? formatCurrency(user.goals[0].targetAmount) : formatCurrency(0)}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Reward Points */}
          <div 
            className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-200"
            role="region"
            aria-label={t('audioRewardCard')}
            onMouseEnter={() => announceElement(`${t('menuRewardCardExplain')} ${t('rewardPointsValue')} ${user.rewardPoints} ${t('rewardPointsUnit')}`)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('rewardPoints')}</p>
                <p className="text-2xl font-bold text-gray-800">{user.rewardPoints}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Growth Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
              {t('statistics')}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('dailyGrowth')}</span>
                <span className="font-semibold text-green-600">+{formatCurrency(growth.daily)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('weeklyGrowth')}</span>
                <span className="font-semibold text-green-600">+{formatCurrency(growth.weekly)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t('yearlyGrowth')}</span>
                <span className="font-semibold text-green-600">+{formatCurrency(growth.yearly)}</span>
              </div>
            </div>
          </div>

          {/* Goals Progress */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Target className="w-6 h-6 mr-2 text-orange-600" />
              {t('savingsGoal')}
            </h3>
            {user.goals.length > 0 ? (
              <div className="space-y-4">
                {user.goals.map((goal) => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium">{goal.title}</span>
                      <span className="text-sm text-gray-500">
                        {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{formatCurrency(goal.currentAmount)}</span>
                      <span>{formatCurrency(goal.targetAmount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No goals set yet. Create your first goal!</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <button
            onClick={() => setShowAddMoney(true)}
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onMouseEnter={() => announceElement(t('menuAddMoneyExplain'))}
          >
            <div className="flex items-center justify-center space-x-2">
              <Plus className="w-6 h-6" />
              <span className="text-lg font-semibold">{t('addMoney')}</span>
            </div>
          </button>

          <button
            onClick={() => setShowGoals(true)}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-xl shadow-lg hover:from-orange-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            onMouseEnter={() => announceElement(t('menuViewGoalsExplain'))}
          >
            <div className="flex items-center justify-center space-x-2">
              <Target className="w-6 h-6" />
              <span className="text-lg font-semibold">{t('viewGoals')}</span>
            </div>
          </button>

          <button
            onClick={handleOpenPayments}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onMouseEnter={() => announceElement('Payment Options button - Click to open payment screen with multiple payment methods including UPI, bank transfer, and card payments')}
          >
            <div className="flex items-center justify-center space-x-2">
              <CreditCard className="w-6 h-6" />
              <span className="text-lg font-semibold">Payments</span>
            </div>
          </button>

          <button
            onClick={() => announceElement('Settings feature coming soon')}
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-xl shadow-lg hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            onMouseEnter={() => announceElement(t('menuSettingsExplain'))}
          >
            <div className="flex items-center justify-center space-x-2">
              <Settings className="w-6 h-6" />
              <span className="text-lg font-semibold">Settings</span>
            </div>
          </button>
        </div>

        {/* Add Money Modal */}
        {showAddMoney && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {t('addMoney')}
              </h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter amount"
                    min="1"
                    onFocus={() => announceElement('Amount input field - Enter the amount you want to add to your savings account')}
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleAddMoney}
                    className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onMouseEnter={() => announceElement('Confirm add money button - Click to add the entered amount to your savings')}
                  >
                    {t('addMoney')}
                  </button>
                  <button
                    onClick={() => setShowAddMoney(false)}
                    className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    onMouseEnter={() => announceElement('Cancel button - Click to close this dialog without adding money')}
                  >
                    {t('cancel')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Goals Modal */}
        {showGoals && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {t('viewGoals')}
              </h3>
              <div className="space-y-4">
                {user.goals.length > 0 ? (
                  user.goals.map((goal) => (
                    <div key={goal.id} className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold text-gray-800">{goal.title}</h4>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                          style={{ width: `${Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">No goals created yet. Start by setting your first savings goal!</p>
                )}
                <button
                  onClick={() => {
                    setShowGoals(false);
                    announceAction('Goals dialog closed');
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onMouseEnter={() => announceElement('Close goals dialog button')}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;