import React from 'react';

const QALoading = () => {
    return (
        <div className="flex justify-start mb-6 w-full">
            <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-color-lavender flex items-center justify-center shrink-0">
                    <span className="text-white font-serif font-bold text-sm">AI</span>
                </div>
                <div className="bg-bg-card border border-border-color px-5 py-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
                    <div className="flex gap-1 items-center">
                        <span className="w-2 h-2 rounded-full bg-color-lavender animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-color-lavender animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-color-lavender animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-sm text-text-muted ml-2">Analyzing document...</span>
                </div>
            </div>
        </div>
    );
};

export default QALoading;
