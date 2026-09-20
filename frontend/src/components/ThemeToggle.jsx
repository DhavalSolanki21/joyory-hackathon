import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button 
            onClick={toggleTheme} 
            className="flex items-center justify-center p-2 rounded-full hover:bg-bg-secondary transition-colors"
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? (
                <Moon size={20} className="text-text-secondary" />
            ) : (
                <Sun size={20} className="text-text-secondary" />
            )}
        </button>
    );
};

export default ThemeToggle;
