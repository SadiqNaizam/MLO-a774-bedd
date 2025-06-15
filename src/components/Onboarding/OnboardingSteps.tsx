import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface OnboardingStepsProps {
  onNextStep: (selectedFeatures: string[]) => void;
  onSkip?: () => void;
  className?: string;
}

const bankingFeatures = [
  { id: 'account_opening', label: 'Account Opening' as const },
  { id: 'spending_tracker', label: 'Spending Tracker' as const },
  { id: 'investment_tools', label: 'Investment Tools' as const },
  { id: 'easy_payments', label: 'Easy Payments' as const },
  { id: 'savings_goals', label: 'Savings Goals' as const },
  { id: 'budgeting_aids', label: 'Budgeting Aids' as const },
  { id: 'transaction_history', label: 'Transaction History' as const },
  { id: 'security_alerts', label: 'Security Alerts' as const },
  { id: 'rewards_program', label: 'Rewards Program' as const },
  { id: 'loan_application', label: 'Loan Application' as const },
  { id: 'financial_planning', label: 'Financial Planning' as const },
  { id: 'personal_finance_edu', label: 'Personal Finance Education' as const },
];

const OnboardingSteps: React.FC<OnboardingStepsProps> = ({
  onNextStep,
  onSkip,
  className,
}) => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const handleFeatureToggle = useCallback((values: string[]) => {
    setSelectedFeatures(values);
  }, []);

  const handleNext = useCallback(() => {
    onNextStep(selectedFeatures);
  }, [onNextStep, selectedFeatures]);

  const handleSkip = useCallback(() => {
    if (onSkip) {
      onSkip();
    }
  }, [onSkip]);

  return (
    <Card className={cn("w-full max-w-lg mx-auto", className)}>
      <CardHeader>
        <CardTitle className="text-2xl">Choose Your Banking Features</CardTitle>
        <CardDescription>
          Select the features you're most interested in. You can change this later.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ToggleGroup
          type="multiple"
          variant="outline"
          value={selectedFeatures}
          onValueChange={handleFeatureToggle}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2"
        >
          {bankingFeatures.map((feature) => (
            <ToggleGroupItem key={feature.id} value={feature.id} aria-label={feature.label} className="h-auto py-2 px-3 text-sm flex-grow whitespace-normal text-center">
              {feature.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <p className="text-xs text-muted-foreground mt-4">
          *Select one or more features to personalize your experience.
        </p>
        <div className="mt-4 p-3 bg-accent rounded-md border border-primary/20">
            <p className="text-sm font-medium text-primary">UPGRADE PLAN</p>
            <p className="text-xs text-primary/80">Unlock premium features by upgrading your plan.</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-2">
        {onSkip && (
          <Button variant="ghost" onClick={handleSkip} className="w-full sm:w-auto">
            Skip
          </Button>
        )}
        <Button onClick={handleNext} className="w-full sm:w-auto" disabled={selectedFeatures.length === 0}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OnboardingSteps;
