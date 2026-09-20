import React from 'react';

const SuggestedQuestions = ({ onSelect }) => {
    const suggestions = [
        "What are the payment terms?",
        "What is the contract duration?",
        "Who are the parties involved?",
        "Are there any termination clauses?",
        "What are the main risks?"
    ];

    return (
        <div className="flex flex-wrap gap-2 mt-6 justify-center max-w-2xl mx-auto">
            {suggestions.map((q, i) => (
                <button 
                    key={i}
                    onClick={() => onSelect(q)}
                    className="px-4 py-2 bg-bg-card border border-border-color rounded-full text-sm text-text-secondary hover:text-color-purple hover:border-color-lavender transition-all"
                >
                    {q}
                </button>
            ))}
        </div>
    );
};

export default SuggestedQuestions;
