import React from 'react';
import { MessageCircle } from 'lucide-react';
import SuggestedQuestions from './SuggestedQuestions';

const QAEmptyState = ({ onSuggestSelect }) => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center w-full h-full">
            <div className="w-16 h-16 bg-color-lavender-soft rounded-full flex items-center justify-center mb-6">
                <MessageCircle size={32} className="text-color-purple" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2 font-serif">Start exploring your document</h3>
            <p className="text-text-secondary max-w-sm mb-8 text-sm">
                Ask any question about the content, risks, or clauses, and I'll find the exact source in the document.
            </p>
            
            <SuggestedQuestions onSelect={onSuggestSelect} />
        </div>
    );
};

export default QAEmptyState;
