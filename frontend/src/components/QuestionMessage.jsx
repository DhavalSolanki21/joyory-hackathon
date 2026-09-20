import React from 'react';
import { User } from 'lucide-react';

const QuestionMessage = ({ question }) => {
    return (
        <div className="flex justify-end mb-6 w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex gap-4 max-w-[85%] sm:max-w-[75%] flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-color-purple flex items-center justify-center shrink-0">
                    <User size={16} className="text-white" />
                </div>
                <div className="bg-color-lavender-soft text-text-primary px-5 py-3 rounded-2xl rounded-tr-sm">
                    <p className="text-sm leading-relaxed">{question}</p>
                </div>
            </div>
        </div>
    );
};

export default QuestionMessage;
