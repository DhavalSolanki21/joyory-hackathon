import React from 'react';
import SourceSnippet from './SourceSnippet';

const AnswerMessage = ({ answer, sourceSnippet }) => {
    return (
        <div className="flex justify-start mb-6 w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex gap-4 max-w-[90%] sm:max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-color-lavender flex items-center justify-center shrink-0">
                    <span className="text-white font-serif font-bold text-sm">AI</span>
                </div>
                <div className="bg-bg-card border border-border-color px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm">
                    <p className="text-sm leading-relaxed text-text-primary whitespace-pre-wrap">{answer}</p>
                    
                    {sourceSnippet && (
                        <SourceSnippet text={sourceSnippet} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnswerMessage;
