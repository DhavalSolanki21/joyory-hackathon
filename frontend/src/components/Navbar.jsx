import React from 'react';
import ThemeToggle from './ThemeToggle';
import { useLocation } from 'react-router-dom';

const Navbar = ({ onMenuClick }) => {
    const location = useLocation();
    
    // Simple logic to determine page title from path
    const getPageTitle = () => {
        const path = location.pathname;
        if (path === '/') return 'Document Library';
        if (path === '/upload') return 'Upload Document';
        if (path === '/compare') return 'Compare Documents';
        if (path.includes('/ask')) return 'Document Research Assistant';
        if (path.includes('/document/')) return 'Document Details';
        return 'Document Intelligence';
    };

    return (
        <header className="h-16 border-b border-border-color bg-bg-card flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <button 
                    onClick={onMenuClick}
                    className="md:hidden p-2 text-text-secondary hover:text-text-primary"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
                <h1 className="text-xl font-semibold text-text-primary hidden sm:block">{getPageTitle()}</h1>
            </div>
            
            <div className="flex items-center gap-4">
                <ThemeToggle />
                <div className="w-8 h-8 rounded-full bg-color-lavender-soft border border-border-color flex items-center justify-center">
                    <span className="text-color-purple font-medium text-sm">US</span>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
