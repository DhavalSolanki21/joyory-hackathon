import React, { useState } from 'react';
import { Quote, Copy, Check } from 'lucide-react';

const SourceSnippet = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!text || text.includes('Not found in the document')) return null;

    return (
        <div className="mt-4 bg-bg-main border border-border-color rounded-xl overflow-hidden text-sm">
            <div className="flex items-center justify-between px-4 py-2 bg-bg-secondary border-b border-border-color">
                <div className="flex items-center gap-2 text-text-secondary">
                    <Quote size={14} />
                    <span className="font-medium text-xs uppercase tracking-wider">Source from document</span>
                </div>
                <button 
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-xs text-text-muted hover:text-text-primary transition-colors"
                >
                    {copied ? <Check size={14} className="text-status-success" /> : <Copy size={14} />}
                    <span>{copied ? 'Copied' : 'Copy Source'}</span>
                </button>
            </div>
            <div className="p-4 text-text-secondary italic leading-relaxed">
                "{text}"
            </div>
        </div>
    );
};

export default SourceSnippet;
