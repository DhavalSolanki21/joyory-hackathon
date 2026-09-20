import React, { useEffect, useState } from 'react';

const Header = () => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        }
    }, []);

    const toggleTheme = () => {
        const nextTheme = !isDark ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', !isDark);
        localStorage.setItem('theme', nextTheme);
        setIsDark(!isDark);
    };

    return (
        <header className="fixed top-0 left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl border-b border-border-color z-40 flex items-center justify-between px-gutter shadow-sm">
            <div className="flex items-center gap-space-sm text-on-surface-variant">
                <span className="font-body-sm text-body-sm text-outline font-medium">Upteky MindBase</span>
                <span className="material-symbols-outlined text-[16px] text-outline-variant">chevron_right</span>
                <span className="font-title-md text-title-md text-on-surface font-semibold tracking-tight">Enterprise Knowledge Assistant</span>
            </div>
            
            <div className="flex items-center gap-space-md">
                {/* Engine Pill */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low border border-border-color text-on-surface-variant text-xs">
                    <span className="w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
                    <span>Groq LLaMA-3.3 Active</span>
                </div>

                {/* Dark Mode Toggle */}
                <button 
                    aria-label="Toggle theme" 
                    className="w-10 h-10 rounded-xl bg-surface-container-low border border-border-color flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" 
                    onClick={toggleTheme}
                    type="button"
                    title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {isDark ? (
                        <span className="material-symbols-outlined text-[20px] text-amber-400">light_mode</span>
                    ) : (
                        <span className="material-symbols-outlined text-[20px] text-indigo-400">dark_mode</span>
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;
