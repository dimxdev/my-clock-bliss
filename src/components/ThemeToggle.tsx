
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Toggle } from '@/components/ui/toggle';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Toggle 
      aria-label="Toggle theme" 
      pressed={theme === 'dark'} 
      onPressedChange={toggleTheme}
      className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {theme === 'dark' ? (
        <Moon className="h-5 w-5 text-gray-400" />
      ) : (
        <Sun className="h-5 w-5 text-gray-600" />
      )}
    </Toggle>
  );
};

export default ThemeToggle;
