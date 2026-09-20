import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';

const RawTextViewer = ({ text }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!text) return null;

    return (
        <div className="card mt-8">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-2 group"
            >
                <div className="flex items-center gap-3">
                    <FileText className="text-color-purple" size={20} />
                    <h3 className="text-lg font-semibold text-text-primary font-serif group-hover:text-color-purple transition-colors">
                        Raw Document Text
                    </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-bg-secondary flex items-center justify-center text-text-secondary group-hover:bg-color-lavender-soft group-hover:text-color-purple transition-colors">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </button>
            
            {isOpen && (
                <div className="mt-6 p-6 bg-bg-secondary rounded-xl border border-border-color overflow-y-auto max-h-[500px] text-sm text-text-secondary whitespace-pre-wrap font-mono leading-relaxed">
                    {text}
                </div>
            )}
        </div>
    );
};

export default RawTextViewer;
