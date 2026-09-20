import React from 'react';

const SummaryCard = ({ title, value, subtitle, icon: Icon, colorClass }) => {
    return (
        <div className="card flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-text-secondary text-sm font-medium mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-text-primary font-serif">{value}</h3>
                {subtitle && <p className="text-xs text-text-muted mt-1">{subtitle}</p>}
            </div>
        </div>
    );
};

export default SummaryCard;
