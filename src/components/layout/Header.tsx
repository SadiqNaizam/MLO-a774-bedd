import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  // This component occupies the 'auto' height row in the MainAppLayout's grid.
  // Per Layout Requirements: "No header component visible; top navigation is minimal."
  // It renders no content by default. The `auto` row height will be 0 if there's no content.
  // The 'gap-y-6' in MainAppLayout will provide spacing below this conceptual row,
  // effectively acting as top margin for the main content area.
  return (
    <header className={cn(className)} role="banner">
      {/* Content intentionally omitted to reflect "No header component visible" */}
    </header>
  );
};

export default Header;
