import React from 'react';
import { cn } from '@/lib/utils';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string; // Optional: for setting document title or an H1 tag if needed
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className, title }) => {
  React.useEffect(() => {
    const baseTitle = "BankEase Prototype";
    if (title) {
      document.title = `${title} | ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }
  }, [title]);

  // Layout Requirements:
  // overall.type: "Grid"
  // overall.definition: "grid-cols-1 grid-rows-[auto_1fr] gap-y-6"
  // overall.sizing.mainContent: "flex-1" (achieved by 1fr row in the grid)
  // mainContent.layout: "Vertical flex layout" (applied to the content container div)
  // mainContent.container: "Container centering content with padding (p-6) and responsive width."
  return (
    <div
      className={cn(
        "min-h-screen bg-background text-foreground",
        "grid grid-cols-1 grid-rows-[auto_1fr] gap-y-6", // Overall grid structure
        className
      )}
    >
      <Header />
      
      {/* This main element represents the second row (1fr) of the grid. */}
      <main className="overflow-y-auto"> 
        <div className="container mx-auto p-6 h-full flex flex-col">
          {/* Optional: Render a title if provided and applicable for the page context */} 
          {/* {title && <h1 className="text-2xl font-bold mb-4 sr-only">{title}</h1>} */} 
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
