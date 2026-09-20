import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
            <div className="flex flex-col">
                <div className="h-16 px-gutter flex items-center gap-space-sm">
                    <div className="w-9 h-9 rounded-xl bg-secondary-fixed flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[20px]">auto_stories</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-headline-sm text-headline-sm tracking-tight text-primary leading-none">Velum</span>
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-medium mt-0.5">Intelligence</span>
                    </div>
                </div>
                <div className="px-gutter-sm mt-space-md">
                    <span className="px-space-md font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Workspace</span>
                    <nav className="mt-space-xs flex flex-col gap-1">
                        <NavLink
                            to="/"
                            className={({ isActive }) => `flex items-center gap-space-md px-space-md py-2.5 rounded-xl transition-colors font-body-md text-body-md ${isActive ? 'bg-secondary-fixed text-on-secondary-fixed font-semibold' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
                        >
                            <span className="material-symbols-outlined text-[20px]">folder_open</span>
                            <span>Document Library</span>
                        </NavLink>
                        <NavLink
                            to="/upload"
                            className={({ isActive }) => `flex items-center gap-space-md px-space-md py-2.5 rounded-xl transition-colors font-body-md text-body-md ${isActive ? 'bg-secondary-fixed text-on-secondary-fixed font-semibold' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
                        >
                            <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
                            <span>Upload Document</span>
                        </NavLink>
                        <NavLink
                            to="/document/1"
                            className={({ isActive }) => `flex items-center gap-space-md px-space-md py-2.5 rounded-xl transition-colors font-body-md text-body-md ${isActive ? 'bg-secondary-fixed text-on-secondary-fixed font-semibold' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
                        >
                            <span className="material-symbols-outlined text-[20px]">insights</span>
                            <span>Document & AI Analysis</span>
                        </NavLink>
                        <NavLink
                            to="/document/1/ask"
                            className={({ isActive }) => `flex items-center gap-space-md px-space-md py-2.5 rounded-xl transition-colors font-body-md text-body-md ${isActive ? 'bg-secondary-fixed text-on-secondary-fixed font-semibold' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
                        >
                            <span className="material-symbols-outlined text-[20px]">forum</span>
                            <span>Interactive Q&A</span>
                        </NavLink>
                        <NavLink
                            to="/compare"
                            className={({ isActive }) => `flex items-center gap-space-md px-space-md py-2.5 rounded-xl transition-colors font-body-md text-body-md ${isActive ? 'bg-secondary-fixed text-on-secondary-fixed font-semibold' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
                        >
                            <span className="material-symbols-outlined text-[20px]">difference</span>
                            <span>Document Comparison</span>
                        </NavLink>
                    </nav>
                </div>
            </div>
            
            <div className="p-gutter-sm flex flex-col gap-space-sm">
                <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-on-surface font-semibold">Monthly Quota</span>
                        <span className="font-label-sm text-label-sm text-primary font-bold">84%</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full w-[84%]"></div>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">42 of 50 legal analyses indexed</span>
                </div>
                <nav>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) => `flex items-center gap-space-md px-space-md py-2.5 rounded-xl transition-colors font-body-md text-body-md ${isActive ? 'bg-secondary-fixed text-on-secondary-fixed font-semibold' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
                    >
                        <span className="material-symbols-outlined text-[20px]">settings</span>
                        <span>Settings</span>
                    </NavLink>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
