import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorState = ({ message = 'Something went wrong.', onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center w-full">
            <div className="w-12 h-12 bg-status-danger-bg rounded-full flex items-center justify-center mb-4">
                <AlertTriangle size={24} className="text-status-danger" />
            </div>
            <p className="text-text-primary font-medium mb-4">{message}</p>
            {onRetry && (
                <button onClick={onRetry} className="btn-secondary">
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorState;
