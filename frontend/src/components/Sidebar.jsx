import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest border-r border-border-color z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.05)]">
            <div className="flex flex-col">
                {/* Branding Header */}
                <div className="h-16 px-gutter flex items-center gap- space-sm border-b border-border-color/50">
                    <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold shadow-md">
                        <span className="material-symbols-outlined text-[22px]">psychology</span>
                    </div>
                    <div className="flex flex-col ml-2">
                        <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface font-bold leading-none">Upteky</span>
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold mt-1">MindBase AI</span>
                    </div>
                </div>

                {/* Main Navigation */}
                <div className="px-gutter-sm mt-space-md">
                    <span className="px-space-md font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">Enterprise Console</span>
                    <nav className="mt-space-xs flex flex-col gap-1.5">
                        <NavLink
                            to="/"
                            className={({ isActive }) => `flex items-center gap-space-md px-space-md py-3 rounded-xl transition-all font-body-md text-body-md ${isActive ? 'bg-primary text-on-primary font-semibold shadow-md' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
                        >
                            <span className="material-symbols-outlined text-[20px]">chat_spark</span>
                            <span>Company Chatbot</span>
                        </NavLink>
                        
                        <NavLink
                            to="/upload"
                            className={({ isActive }) => `flex items-center gap-space-md px-space-md py-3 rounded-xl transition-all font-body-md text-body-md ${isActive ? 'bg-primary text-on-primary font-semibold shadow-md' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
                        >
                            <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
                            <span>Document Ingestion</span>
                        </NavLink>

                        <NavLink
                            to="/documents"
                            className={({ isActive }) => `flex items-center gap-space-md px-space-md py-3 rounded-xl transition-all font-body-md text-body-md ${isActive ? 'bg-primary text-on-primary font-semibold shadow-md' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
                        >
                            <span className="material-symbols-outlined text-[20px]">folder_open</span>
                            <span>Company Data Directory</span>
                        </NavLink>

                        <NavLink
                            to="/compare"
                            className={({ isActive }) => `flex items-center gap-space-md px-space-md py-3 rounded-xl transition-all font-body-md text-body-md ${isActive ? 'bg-primary text-on-primary font-semibold shadow-md' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
                        >
                            <span className="material-symbols-outlined text-[20px]">difference</span>
                            <span>Compare Documents</span>
                        </NavLink>
                    </nav>
                </div>
            </div>
            
            {/* Footer Telemetry Widget */}
            <div className="p-gutter-sm flex flex-col gap-space-sm border-t border-border-color/50">
                <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-xs border border-border-color">
                    <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-on-surface font-semibold">Groq LLM Engine</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-status-success-bg text-status-success font-bold text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-ping"></span>
                            ACTIVE
                        </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        Semantic indexing & document Q&A operational
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
