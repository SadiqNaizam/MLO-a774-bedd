import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertCircle, CheckCircle2, ImageIcon, Loader2, MessageSquare, Ban, History, User } from 'lucide-react';

export type TransactionStatus = 'processing' | 'completed' | 'failed' | 'pending';

interface TransactionParty {
  name: string;
  accountType?: string;
  avatarUrl?: string;
}

interface TransactionData {
  id: string;
  amount: number;
  currency: string;
  date: string;
  description: string;
  status: TransactionStatus;
  fromAccount: TransactionParty;
  toAccount?: TransactionParty;
  transactionType: 'payment' | 'transfer' | 'deposit' | 'withdrawal';
  referenceNumber?: string;
  notes?: string;
}

interface TransactionDetailsProps {
  transaction: TransactionData;
  onContactSupport?: () => void;
  onCancelTransaction?: () => void;
  onViewHistory?: () => void;
  className?: string;
}

const StatusIcon: React.FC<{ status: TransactionStatus }> = ({ status }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="h-5 w-5 text-success" />;
    case 'failed':
      return <AlertCircle className="h-5 w-5 text-destructive" />;
    case 'processing':
      return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
    case 'pending':
      return <Loader2 className="h-5 w-5 text-yellow-500 animate-spin" />;
    default:
      return null;
  }
};

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  transaction,
  onContactSupport,
  onCancelTransaction,
  onViewHistory,
  className,
}) => {
  const { 
    amount, currency, date, description, status, 
    fromAccount, toAccount, transactionType, referenceNumber, notes
  } = transaction;

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);

  return (
    <Card className={cn("w-full max-w-lg mx-auto", className)}>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-xl">Transaction Details</CardTitle>
                <CardDescription>Information about your transaction.</CardDescription>
            </div>
            <StatusIcon status={status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 p-4 rounded-lg border border-border flex items-center justify-center h-40">
            <ImageIcon size={48} className="text-muted-foreground" /> 
            {/* Placeholder for image shown in "Order Status" screen */} 
        </div>

        <div className="text-center">
            <p className="text-lg font-semibold">
                {status === 'processing' && 'Your payment is processing!'}
                {status === 'completed' && 'Payment Completed Successfully!'}
                {status === 'failed' && 'Payment Failed.'}
                {status === 'pending' && 'Payment Pending Confirmation.'}
            </p>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium">Amount</p>
            <p className="text-lg font-bold text-primary">{formattedAmount}</p>
          </div>
          <div>
            <p className="font-medium">Date</p>
            <p>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div>
            <p className="font-medium">Status</p>
            <p className="capitalize">{status}</p>
          </div>
          <div>
            <p className="font-medium">Type</p>
            <p className="capitalize">{transactionType}</p>
          </div>
        </div>
        
        <div className="space-y-2">
            <h4 className="font-medium text-sm">Parties Involved:</h4>
            <div className="flex items-center space-x-2 p-2 border rounded-md bg-background">
                <Avatar className="h-8 w-8">
                    {fromAccount.avatarUrl && <AvatarImage src={fromAccount.avatarUrl} alt={fromAccount.name} />}
                    <AvatarFallback><User size={16} /></AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-xs font-semibold">From: {fromAccount.name}</p>
                    {fromAccount.accountType && <p className="text-xs text-muted-foreground">{fromAccount.accountType}</p>}
                </div>
            </div>
            {toAccount && (
                 <div className="flex items-center space-x-2 p-2 border rounded-md bg-background">
                    <Avatar className="h-8 w-8">
                        {toAccount.avatarUrl && <AvatarImage src={toAccount.avatarUrl} alt={toAccount.name} />}
                        <AvatarFallback><User size={16}/></AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-xs font-semibold">To: {toAccount.name}</p>
                        {toAccount.accountType && <p className="text-xs text-muted-foreground">{toAccount.accountType}</p>}
                    </div>
                </div>
            )}
        </div>

        {referenceNumber && (
          <div>
            <p className="font-medium text-sm">Reference Number</p>
            <p className="text-xs text-muted-foreground">{referenceNumber}</p>
          </div>
        )}

        {notes && (
          <div>
            <p className="font-medium text-sm">Notes</p>
            <p className="text-xs text-muted-foreground italic">{notes}</p>
          </div>
        )}

        <Separator />

        <div className="flex flex-col sm:flex-row sm:justify-around space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
          {onContactSupport && (
            <Button variant="outline" onClick={onContactSupport} className="flex-1">
              <MessageSquare className="mr-2 h-4 w-4" /> Contact Support
            </Button>
          )}
          {status === 'processing' && onCancelTransaction && (
            <Button variant="destructive" onClick={onCancelTransaction} className="flex-1">
              <Ban className="mr-2 h-4 w-4" /> Cancel Transaction
            </Button>
          )}
          {onViewHistory && (
            <Button variant="secondary" onClick={onViewHistory} className="flex-1">
              <History className="mr-2 h-4 w-4" /> View History
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionDetails;
