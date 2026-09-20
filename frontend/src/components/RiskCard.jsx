import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import RiskBadge from './RiskBadge';

const RiskCard = ({ risks }) => {
    if (!risks || risks.length === 0) {
        return (
            <div className="card h-full flex flex-col items-center justify-center text-center p-8 border-dashed">
                <div className="w-12 h-12 bg-status-success-bg rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck size={24} className="text-status-success" />
                </div>
                <h3 className="text-lg font-medium text-text-primary mb-1">No major risks identified</h3>
                <p className="text-text-secondary text-sm">This document appears to be well-structured with minimal compliance issues.</p>
            </div>
        );
    }

    return (
        <div className="card h-full">
            <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="text-status-warning" size={24} />
                <h3 className="text-lg font-semibold text-text-primary font-serif">Compliance & Risks</h3>
            </div>
            <div className="space-y-4">
                {risks.map((risk, index) => (
                    <div key={index} className="p-4 rounded-xl border border-border-color bg-bg-main hover:bg-bg-secondary transition-colors">
                        <div className="flex justify-between items-start mb-2 gap-4">
                            <h4 className="font-medium text-text-primary leading-tight">{risk.risk}</h4>
                            <div className="shrink-0">
                                <RiskBadge level={risk.severity} />
                            </div>
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed">
                            {risk.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RiskCard;
