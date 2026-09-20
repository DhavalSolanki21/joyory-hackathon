import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState = ({ message = 'Loading...' }) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 w-full h-full text-text-muted">
            <Loader2 size={32} className="animate-spin mb-4 text-color-purple" />
            <p className="text-sm font-medium">{message}</p>
        </div>
    );
};

export default LoadingState;
