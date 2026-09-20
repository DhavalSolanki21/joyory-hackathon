import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm', isDestructive = false }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-bg-card border border-border-color rounded-2xl p-6 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
                <button 
                    onClick={onCancel}
                    className="absolute top-4 right-4 text-text-muted hover:text-text-primary"
                >
                    <X size={20} />
                </button>
                
                <div className="flex items-center gap-4 mb-4">
                    {isDestructive && (
                        <div className="w-10 h-10 rounded-full bg-status-danger-bg flex items-center justify-center shrink-0">
                            <AlertTriangle size={20} className="text-status-danger" />
                        </div>
                    )}
                    <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
                </div>
                
                <p className="text-text-secondary text-sm mb-6 ml-14">
                    {message}
                </p>
                
                <div className="flex justify-end gap-3">
                    <button onClick={onCancel} className="btn-secondary">
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className={isDestructive ? 'btn-danger' : 'btn-primary'}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
