import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Building2, Smartphone, ArrowLeft, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useAudioGuide } from '../hooks/useAudioGuide';

const PaymentScreen: React.FC = () => {
  const { t } = useLanguage();
  const { user, updateSavings } = useAuth();
  const { announceElement, announceAction } = useAudioGuide();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'upi',
      name: t('upiPayment'),
      description: t('upiDescription'),
      icon: Smartphone,
      logo: '🇮🇳', // Indian flag as UPI representation
      color: 'from-green-500 to-blue-600'
    },
    {
      id: 'bank',
      name: t('bankTransfer'),
      description: t('bankDescription'),
      icon: Building2,
      logo: '🏦', // Deutsche Bank representation
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'card',
      name: t('cardPayment'),
      description: t('cardDescription'),
      icon: CreditCard,
      logo: '💳', // Mastercard representation
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    const method = paymentMethods.find(m => m.id === methodId);
    announceAction(`Selected ${method?.name} as payment method`);
  };

  const handlePayment = async () => {
    if (!selectedMethod || !amount || isNaN(Number(amount))) {
      announceElement('Please select a payment method and enter a valid amount');
      return;
    }

    setIsProcessing(true);
    announceElement('Processing your payment...');

    // Simulate payment processing
    setTimeout(() => {
      updateSavings(Number(amount));
      announceAction(`Payment of ${amount} rupees completed successfully using ${paymentMethods.find(m => m.id === selectedMethod)?.name}`);
      setIsProcessing(false);
      navigate('/dashboard');
    }, 3000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2"
              onMouseEnter={() => announceElement('Back to dashboard button - Click to return to your savings dashboard')}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800">
                {t('paymentTitle')}
              </h1>
              <p className="text-gray-600">
                {t('paymentSubtitle')}
              </p>
            </div>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Methods */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {t('selectPaymentMethod')}
            </h2>
            
            <div className="space-y-4">
              {paymentMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => handlePaymentMethodSelect(method.id)}
                    className={`w-full p-6 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                    onMouseEnter={() => announceElement(`${method.name} - ${method.description}. Click to select this payment method.`)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`bg-gradient-to-r ${method.color} p-3 rounded-full`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {method.name}
                          </h3>
                          <span className="text-2xl">{method.logo}</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {method.description}
                        </p>
                      </div>
                      {selectedMethod === method.id && (
                        <div className="bg-green-500 rounded-full p-1">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Payment Details
            </h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('paymentAmount')} (₹)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg"
                  placeholder="Enter amount"
                  min="1"
                  onFocus={() => announceElement('Payment amount input field - Enter the amount you want to add to your savings account')}
                />
              </div>

              {selectedMethod && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Selected Method:</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">
                      {paymentMethods.find(m => m.id === selectedMethod)?.logo}
                    </span>
                    <span className="text-gray-700">
                      {paymentMethods.find(m => m.id === selectedMethod)?.name}
                    </span>
                  </div>
                </div>
              )}

              {amount && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Payment Summary:</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-semibold">{formatCurrency(Number(amount))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Fee:</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-blue-600">{formatCurrency(Number(amount))}</span>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={!selectedMethod || !amount || isProcessing}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                onMouseEnter={() => announceElement('Proceed to pay button - Click to complete your payment and add money to your savings account')}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Payment...</span>
                  </div>
                ) : (
                  t('proceedToPay')
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Current Savings Display */}
        {user && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Current Savings Balance
              </h3>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(user.totalSavings)}
              </p>
              <p className="text-gray-600 mt-2">
                Reward Points: <span className="font-semibold text-purple-600">{user.rewardPoints}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentScreen;