import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, TrendingUp, Sparkles } from 'lucide-react';

interface WelcomeCardProps {
  onGetStarted: () => void;
  className?: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ onGetStarted, className }) => {
  return (
    <Card className={cn("w-full max-w-md mx-auto text-center", className)}>
      <CardHeader>
        <div className="mx-auto bg-secondary p-4 rounded-full w-fit mb-4">
          <Smartphone size={48} className="text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold">BankEase</CardTitle>
        <CardDescription className="text-muted-foreground">
          Your banking, simplified.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <div className="flex space-x-4 text-primary">
          <TrendingUp size={32} />
          <Sparkles size={32} />
        </div>
        <p className="text-sm text-muted-foreground px-4">
          Join BankEase today and experience a seamless and secure way to manage your finances. Get started in minutes!
        </p>
        <Button onClick={onGetStarted} size="lg" className="w-full sm:w-auto">
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
