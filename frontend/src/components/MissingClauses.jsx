import React from 'react';
import { FileText, Check } from 'lucide-react';

const MissingClauses = ({ clauses }) => {
    if (!clauses || clauses.length === 0) {
        return (
            <div className="card h-full flex flex-col items-center justify-center text-center p-8 border-dashed">
                <div className="w-12 h-12 bg-status-success-bg rounded-full flex items-center justify-center mb-4">
                    <Check size={24} className="text-status-success" />
                </div>
                <h3 className="text-lg font-medium text-text-primary mb-1">No missing clauses</h3>
                <p className="text-text-secondary text-sm">The document appears to contain all standard required clauses.</p>
            </div>
        );
    }

    return (
        <div className="card h-full">
            <div className="flex items-center gap-3 mb-6">
                <FileText className="text-color-purple" size={24} />
                <h3 className="text-lg font-semibold text-text-primary font-serif">Missing Clauses</h3>
            </div>
            <ul className="space-y-3">
                {clauses.map((clause, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-bg-secondary text-sm text-text-primary">
                        <span className="w-1.5 h-1.5 rounded-full bg-status-danger mt-2 shrink-0" />
                        <span className="leading-relaxed">{clause}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MissingClauses;
