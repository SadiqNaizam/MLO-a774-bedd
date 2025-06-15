import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRightLeft, CreditCard, TrendingUp, DollarSign, FileText } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface AccountSummaryProps {
  className?: string;
  onViewTransactions?: () => void;
  onPayBills?: () => void;
}

const totalBalance = 12345.67;

const spendingData = [
  { name: 'Jan', spending: 1200, income: 1500 },
  { name: 'Feb', spending: 1900, income: 1300 },
  { name: 'Mar', spending: 1300, income: 2200 },
  { name: 'Apr', spending: 2780, income: 2000 },
  { name: 'May', spending: 1890, income: 2181 },
  { name: 'Jun', spending: 2390, income: 2500 },
  { name: 'Jul', spending: 1490, income: 1900 },
  { name: 'Aug', spending: 2800, income: 3200 },
  { name: 'Sep', spending: 1700, income: 2100 },
  { name: 'Oct', spending: 3100, income: 2800 },
  { name: 'Nov', spending: 2000, income: 2400 },
  { name: 'Dec', spending: 2500, income: 3000 },
];

interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'debit' | 'credit';
}

const recentTransactions: Transaction[] = [
  { id: '1', description: 'Grocery Store', amount: -45.00, date: 'Oct 28', type: 'debit' as const },
  { id: '2', description: 'Salary Deposit', amount: 2500.00, date: 'Oct 27', type: 'credit' as const },
  { id: '3', description: 'Online Subscription', amount: -15.99, date: 'Oct 26', type: 'debit' as const },
  { id: '4', description: 'Restaurant Bill', amount: -72.50, date: 'Oct 25', type: 'debit' as const },
];

const AccountSummary: React.FC<AccountSummaryProps> = ({
  className,
  onViewTransactions,
  onPayBills,
}) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">Account Overview</CardTitle>
          <DollarSign className="text-primary" size={28} />
        </div>
        <CardDescription>Your financial snapshot.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <p className="text-sm text-primary font-medium">Total Balance</p>
            <p className="text-4xl font-bold text-primary">
              ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button variant="outline" onClick={onViewTransactions} className="w-full">
            <ArrowRightLeft className="mr-2 h-4 w-4" /> View Transactions
          </Button>
          <Button onClick={onPayBills} className="w-full">
            <CreditCard className="mr-2 h-4 w-4" /> Pay Bills
          </Button>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" /> Spending Trends
          </h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={spendingData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                  </linearGradient>
                   <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--secondary-foreground))" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="hsl(var(--secondary-foreground))" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} stroke="hsl(var(--border))" />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} stroke="hsl(var(--border))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))'}}
                />
                <Area type="monotone" dataKey="spending" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorSpending)" name="Spending" />
                <Area type="monotone" dataKey="income" stroke="hsl(var(--secondary-foreground))" fillOpacity={1} fill="url(#colorIncome)" name="Income" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <FileText className="mr-2 h-5 w-5 text-primary" /> Recent Transactions
          </h3>
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-md border border-border">
                <div>
                  <p className="font-medium">{tx.description}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
                <p className={cn(
                  "font-semibold",
                  tx.type === 'credit' ? 'text-success' : 'text-destructive-foreground dark:text-destructive'
                )}>
                  {tx.type === 'credit' ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSummary;
