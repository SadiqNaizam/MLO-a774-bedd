import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Search, HelpCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FAQItemData {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
}

const faqData: FAQItemData[] = [
  {
    id: 'faq1',
    question: 'How do I reset my password?',
    answer: "To reset your password, go to the login screen and click 'Forgot Password'. Follow the instructions sent to your registered email. If you still face issues, contact support.",
    keywords: ['password', 'reset', 'forgot', 'login', 'account'],
  },
  {
    id: 'faq2',
    question: 'How can I contact support?',
    answer: 'You can contact our support team via the chat link provided below, email us at support@bankease.com, or call us at 1-800-123-4567 during business hours.',
    keywords: ['contact', 'support', 'help', 'customer service', 'phone', 'email'],
  },
  {
    id: 'faq3',
    question: 'What is the minimum account balance?',
    answer: 'The minimum account balance for standard savings accounts is $100. For checking accounts, there is no minimum balance requirement. Premium accounts may have different terms.',
    keywords: ['minimum balance', 'account', 'savings', 'checking', 'fee'],
  },
  {
    id: 'faq4',
    question: 'How do I report a fraudulent transaction?',
    answer: "If you suspect a fraudulent transaction, please contact us immediately through the app's secure messaging, or call our fraud department at 1-800-FRAUD-00. It's important to act quickly.",
    keywords: ['fraud', 'transaction', 'report', 'unauthorized', 'security'],
  },
  {
    id: 'faq5',
    question: 'Are my deposits insured?',
    answer: 'Yes, BankEase is a member of the FDIC. Your eligible deposits are insured up to $250,000 per depositor, for each account ownership category.',
    keywords: ['fdic', 'insured', 'deposits', 'security', 'protection'],
  },
];

interface SupportFAQProps {
  className?: string;
  onContactSupport?: () => void;
}

const SupportFAQ: React.FC<SupportFAQProps> = ({ className, onContactSupport }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredFAQs = useMemo(() => {
    if (!searchTerm.trim()) {
      return faqData;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return faqData.filter(
      (item) =>
        item.question.toLowerCase().includes(lowerSearchTerm) ||
        item.answer.toLowerCase().includes(lowerSearchTerm) ||
        item.keywords.some(keyword => keyword.toLowerCase().includes(lowerSearchTerm))
    );
  }, [searchTerm]);

  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)}>
      <CardHeader>
        <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
        <CardDescription>
          Find answers to common questions about our services.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search FAQs... (e.g., password, balance)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            aria-label="Search FAQs"
          />
        </div>

        {filteredFAQs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.map((item) => (
              <AccordionItem value={item.id} key={item.id}>
                <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                        {item.question}
                    </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-center text-muted-foreground py-4">
            No FAQs found matching your search criteria.
          </p>
        )}

        {onContactSupport && (
            <div className="mt-8 pt-6 border-t border-border text-center">
                <h3 className="text-lg font-semibold mb-2">Can't find what you're looking for?</h3>
                <p className="text-muted-foreground mb-4">Our support team is here to help you with any questions.</p>
                <Button onClick={onContactSupport}>
                    <MessageCircle className="mr-2 h-4 w-4" /> Contact Support
                </Button>
            </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SupportFAQ;
