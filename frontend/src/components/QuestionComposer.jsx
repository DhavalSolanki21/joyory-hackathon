import React, { useState } from 'react';
import { Send } from 'lucide-react';

const QuestionComposer = ({ onSend, disabled }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        if (!text.trim() || disabled) return;
        
        onSend(text.trim());
        setText('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="relative bg-bg-card border border-border-color rounded-2xl p-2 shadow-sm focus-within:border-color-lavender focus-within:ring-2 focus-within:ring-color-lavender-soft transition-all"
        >
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question about this document..."
                className="w-full bg-transparent border-none focus:outline-none resize-none p-3 text-text-primary text-sm min-h-[60px] max-h-[150px]"
                rows={1}
                disabled={disabled}
            />
            <div className="absolute bottom-3 right-3">
                <button
                    type="submit"
                    disabled={!text.trim() || disabled}
                    className={`p-2 rounded-xl transition-colors flex items-center justify-center
                        ${!text.trim() || disabled 
                            ? 'bg-bg-secondary text-text-muted cursor-not-allowed' 
                            : 'bg-color-purple text-white hover:bg-color-lavender'}
                    `}
                >
                    <Send size={18} />
                </button>
            </div>
        </form>
    );
};

export default QuestionComposer;
