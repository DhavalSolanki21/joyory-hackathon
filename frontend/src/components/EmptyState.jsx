import React from 'react';
import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmptyState = ({ 
    title = 'No documents yet', 
    description = 'Upload your first PDF to begin analyzing contracts, risks and important clauses.',
    actionLabel = 'Upload Document',
    onAction
}) => {
    const navigate = useNavigate();

    const handleAction = () => {
        if (onAction) {
            onAction();
        } else {
            navigate('/upload');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-bg-card rounded-2xl border border-border-color border-dashed">
            <div className="w-16 h-16 bg-color-lavender-soft rounded-full flex items-center justify-center mb-6">
                <FileText size={32} className="text-color-purple" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2 font-serif">{title}</h3>
            <p className="text-text-secondary max-w-sm mb-8 text-sm">
                {description}
            </p>
            <button onClick={handleAction} className="btn-primary">
                {actionLabel}
            </button>
        </div>
    );
};

export default EmptyState;
