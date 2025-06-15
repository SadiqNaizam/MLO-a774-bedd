import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { User, Languages, Bell, Settings2, LifeBuoy, LogOut, ChevronRight, Edit3 } from 'lucide-react';

interface SettingsItemProps {
  icon: React.ElementType;
  label: string;
  description?: string;
  actionType: 'navigation' | 'toggle' | 'select';
  onClick?: () => void;
  isToggled?: boolean;
  onToggleChange?: (checked: boolean) => void;
  selectOptions?: { value: string; label: string }[];
  currentSelectValue?: string;
  onSelectChange?: (value: string) => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon: Icon,
  label,
  description,
  actionType,
  onClick,
  isToggled,
  onToggleChange,
  selectOptions,
  currentSelectValue,
  onSelectChange,
}) => {
  return (
    <div className="flex items-center justify-between py-3 hover:bg-muted/50 px-2 -mx-2 rounded-md transition-colors">
      <div className="flex items-center space-x-3">
        <Icon className="h-5 w-5 text-primary" />
        <div>
          <p className="font-medium text-sm">{label}</p>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      </div>
      {actionType === 'navigation' && onClick && (
        <Button variant="ghost" size="icon" onClick={onClick} aria-label={`Navigate to ${label}`}>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Button>
      )}
      {actionType === 'toggle' && onToggleChange && (
        <Switch checked={isToggled} onCheckedChange={onToggleChange} aria-label={label} />
      )}
      {actionType === 'select' && selectOptions && currentSelectValue && onSelectChange && (
        <Select value={currentSelectValue} onValueChange={onSelectChange}>
          <SelectTrigger className="w-[180px] text-xs h-8">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {selectOptions.map(option => (
              <SelectItem key={option.value} value={option.value} className="text-xs">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

interface SettingsOptionsProps {
  className?: string;
  onLogout?: () => void;
}

const SettingsOptions: React.FC<SettingsOptionsProps> = ({ className, onLogout }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState<boolean>(false); // Assuming a theme toggle
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  const languageOptions = [
    { value: 'en', label: 'English' as const },
    { value: 'es', label: 'Español' as const },
    { value: 'fr', label: 'Français' as const },
  ];

  const handleProfileClick = () => console.log('Navigate to profile');
  const handleCustomerServiceClick = () => console.log('Navigate to customer service');

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader>
        <CardTitle className="text-2xl">Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <SettingsItem
          icon={User}
          label="Account Holder"
          description="Manage your profile information"
          actionType="navigation"
          onClick={handleProfileClick}
        />
        <Separator />
        <SettingsItem
          icon={Languages}
          label="Preferred Language"
          actionType="select"
          selectOptions={languageOptions}
          currentSelectValue={selectedLanguage}
          onSelectChange={setSelectedLanguage}
        />
        <Separator />
        <SettingsItem
          icon={Bell}
          label="Transaction Alerts"
          description="Receive alerts for transactions"
          actionType="toggle"
          isToggled={notificationsEnabled}
          onToggleChange={setNotificationsEnabled}
        />
        <Separator />
        <SettingsItem
          icon={Settings2} // Using Settings2 as App Preferences
          label="App Preferences"
          description="Customize your app experience"
          actionType="navigation" // Can lead to another page or dialog
          onClick={() => console.log('App preferences clicked')}
        />
        <Separator />
         <SettingsItem
          icon={Edit3} // Example: could be 'Dark Mode' or similar appearance setting
          label="Dark Mode"
          description="Toggle dark theme for the app"
          actionType="toggle"
          isToggled={darkModeEnabled}
          onToggleChange={setDarkModeEnabled}
        />
        <Separator />
        <SettingsItem
          icon={LifeBuoy}
          label="Customer Service"
          description="Get help and support"
          actionType="navigation"
          onClick={handleCustomerServiceClick}
        />
        <Separator />
        {onLogout && (
          <Button variant="destructive" className="w-full mt-4" onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SettingsOptions;
