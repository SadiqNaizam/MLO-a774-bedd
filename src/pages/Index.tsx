import React, { useState, useCallback } from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import WelcomeCard from '../components/Welcome/WelcomeCard';
import OnboardingSteps from '../components/Onboarding/OnboardingSteps';
import AccountSummary from '../components/AccountOverview/AccountSummary';
import TransactionDetails, { type TransactionData, type TransactionStatus } from '../components/AccountOverview/TransactionDetails';
import SettingsOptions from '../components/Settings/SettingsOptions';
import SupportFAQ from '../components/Support/SupportFAQ';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type AppScreen = 'WELCOME' | 'ONBOARDING' | 'ACCOUNT_OVERVIEW' | 'TRANSACTION_DETAILS' | 'SETTINGS' | 'SUPPORT_FAQ';

const IndexPage: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('WELCOME');
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [onboardingSelections, setOnboardingSelections] = useState<string[]>([]);

  const handleGetStarted = useCallback(() => {
    setCurrentScreen('ONBOARDING');
  }, []);

  const handleOnboardingComplete = useCallback((selections: string[]) => {
    setOnboardingSelections(selections);
    setCurrentScreen('ACCOUNT_OVERVIEW');
  }, []);

  const handleSkipOnboarding = useCallback(() => {
    setCurrentScreen('ACCOUNT_OVERVIEW');
  }, []);

  const handleViewTransactions = useCallback(() => {
    const sampleTx: TransactionData = {
      id: 'txn_generic_001',
      amount: 125.50,
      currency: 'USD',
      date: new Date(2023, 9, 28, 10, 30, 0).toISOString(), // Oct 28, 2023
      description: 'Software Subscription Renewal',
      status: 'completed' as const,
      fromAccount: { name: 'My Primary Checking', accountType: 'Checking Account (...1234)' },
      toAccount: { name: 'SaaS Company Inc.', accountType: 'Merchant' },
      transactionType: 'payment' as const,
      referenceNumber: 'INV2023-10-789',
      notes: 'Annual subscription for design software.',
    };
    setSelectedTransaction(sampleTx);
    setCurrentScreen('TRANSACTION_DETAILS');
  }, []);

  const handlePayBills = useCallback(() => {
    const sampleBillPaymentTx: TransactionData = {
      id: 'txn_billpay_002',
      amount: 78.99,
      currency: 'USD',
      date: new Date(2023, 10, 1, 14, 0, 0).toISOString(), // Nov 1, 2023
      description: 'Electricity Bill Payment',
      status: 'processing' as const,
      fromAccount: { name: 'My Primary Checking', accountType: 'Checking Account (...1234)' },
      toAccount: { name: 'City Electric Utilities', accountType: 'Utility Provider' },
      transactionType: 'payment' as const,
      referenceNumber: 'BILLPAY-ELEC-112023',
      notes: 'Scheduled payment for October electricity usage.',
    };
    setSelectedTransaction(sampleBillPaymentTx);
    setCurrentScreen('TRANSACTION_DETAILS');
  }, []);

  const handleLogout = useCallback(() => {
    console.log('User logged out');
    setCurrentScreen('WELCOME');
    // Potentially clear other user-related state here
  }, []);

  const handleContactSupport = useCallback(() => {
    console.log('Contact support requested');
    setCurrentScreen('SUPPORT_FAQ'); 
  }, []);

  const handleCancelTransaction = useCallback((transactionId?: string) => {
    console.log('Cancel transaction requested for:', transactionId || selectedTransaction?.id);
    // Add logic to handle cancellation, possibly update transaction status
    if (selectedTransaction) {
      setSelectedTransaction(prev => prev ? { ...prev, status: 'failed' as TransactionStatus } : null); // Example: update status
    }
  }, [selectedTransaction]);

  const handleViewHistory = useCallback(() => {
    console.log('View history requested');
    setCurrentScreen('ACCOUNT_OVERVIEW'); // Navigate to a general history or account overview page
  }, []);
  

  const getPageTitle = (screen: AppScreen): string => {
    switch (screen) {
      case 'WELCOME': return 'Welcome to BankEase';
      case 'ONBOARDING': return 'Onboarding - Select Features';
      case 'ACCOUNT_OVERVIEW': return 'Account Overview';
      case 'TRANSACTION_DETAILS': return 'Transaction Details';
      case 'SETTINGS': return 'Application Settings';
      case 'SUPPORT_FAQ': return 'Support & FAQ';
      default:
        const exhaustiveCheck: never = screen;
        return exhaustiveCheck;
    }
  };

  const showMainNavigation = ['ACCOUNT_OVERVIEW', 'TRANSACTION_DETAILS', 'SETTINGS', 'SUPPORT_FAQ'].includes(currentScreen);

  return (
    <MainAppLayout title={getPageTitle(currentScreen)}>
      <div className="flex flex-col flex-1 w-full items-center">
        {showMainNavigation && currentScreen !== 'TRANSACTION_DETAILS' && (
          <div className="mb-8 flex flex-wrap justify-center gap-2 w-full max-w-2xl">
            <Button 
              variant={(currentScreen === 'ACCOUNT_OVERVIEW' || currentScreen === 'TRANSACTION_DETAILS') ? 'default' : 'outline'}
              onClick={() => setCurrentScreen('ACCOUNT_OVERVIEW')}
              className="flex-grow sm:flex-grow-0"
            >
              Account
            </Button>
            <Button 
              variant={currentScreen === 'SETTINGS' ? 'default' : 'outline'}
              onClick={() => setCurrentScreen('SETTINGS')}
              className="flex-grow sm:flex-grow-0"
            >
              Settings
            </Button>
            <Button 
              variant={currentScreen === 'SUPPORT_FAQ' ? 'default' : 'outline'}
              onClick={() => setCurrentScreen('SUPPORT_FAQ')}
              className="flex-grow sm:flex-grow-0"
            >
              Support
            </Button>
          </div>
        )}

        {currentScreen === 'WELCOME' && (
          <WelcomeCard onGetStarted={handleGetStarted} />
        )}
        {currentScreen === 'ONBOARDING' && (
          <OnboardingSteps onNextStep={handleOnboardingComplete} onSkip={handleSkipOnboarding} />
        )}
        {currentScreen === 'ACCOUNT_OVERVIEW' && (
          <AccountSummary 
            onViewTransactions={handleViewTransactions} 
            onPayBills={handlePayBills} 
          />
        )}
        {currentScreen === 'TRANSACTION_DETAILS' && selectedTransaction && (
          <div className="w-full max-w-lg mx-auto">
            <Button variant="outline" onClick={() => setCurrentScreen('ACCOUNT_OVERVIEW')} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Overview
            </Button>
            <TransactionDetails 
              transaction={selectedTransaction} 
              onContactSupport={handleContactSupport}
              onCancelTransaction={selectedTransaction.status === 'processing' || selectedTransaction.status === 'pending' ? () => handleCancelTransaction() : undefined}
              onViewHistory={handleViewHistory}
            />
          </div>
        )}
        {currentScreen === 'SETTINGS' && (
          <SettingsOptions onLogout={handleLogout} />
        )}
        {currentScreen === 'SUPPORT_FAQ' && (
          <SupportFAQ onContactSupport={handleContactSupport}/>
        )}
      </div>
    </MainAppLayout>
  );
};

export default IndexPage;
