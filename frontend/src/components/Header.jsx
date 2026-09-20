import React, { useEffect, useState } from 'react';

const Header = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
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
        <header className="fixed top-0 left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl z-40 flex items-center justify-between px-gutter shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-space-sm text-on-surface-variant">
                <span className="font-body-sm text-body-sm text-outline">Workspace</span>
                <span className="material-symbols-outlined text-[16px] text-outline-variant">chevron_right</span>
                <span className="font-title-md text-title-md text-on-surface font-semibold tracking-tight">Intelligence Console</span>
            </div>
            <div className="flex items-center gap-gutter-sm">
                <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-space-md text-outline text-[18px]">search</span>
                    <input 
                        className="h-10 w-72 pl-10 pr-space-md bg-surface-container-lowest rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary-container transition-all shadow-[0_1px_6px_rgba(0,0,0,0.02)]" 
                        placeholder="Search clauses, entities, digests..." 
                        type="text" 
                    />
                </div>
                <button 
                    aria-label="Toggle theme" 
                    className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" 
                    onClick={toggleTheme}
                    type="button"
                >
                    {!isDark && <span className="material-symbols-outlined text-[20px]">dark_mode</span>}
                    {isDark && <span className="material-symbols-outlined text-[20px]">light_mode</span>}
                </button>
                <button 
                    aria-label="Notifications" 
                    className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" 
                    type="button"
                >
                    <span className="material-symbols-outlined text-[20px]">notifications</span>
                </button>
                <div className="flex items-center gap-space-sm pl-space-xs">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
