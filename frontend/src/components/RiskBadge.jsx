import React from 'react';

const RiskBadge = ({ level }) => {
    let classes = 'px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider ';
    
    switch (level?.toUpperCase()) {
        case 'LOW':
            classes += 'bg-[var(--status-success-bg)] text-[var(--status-success)]';
            break;
        case 'MEDIUM':
            classes += 'bg-[var(--status-warning-bg)] text-[var(--status-warning)]';
            break;
        case 'HIGH':
            classes += 'bg-[var(--status-danger-bg)] text-[var(--status-danger)]';
            break;
        default:
            classes += 'bg-bg-secondary text-text-muted';
            level = 'UNKNOWN';
    }

    return (
        <span className={classes}>
            {level}
        </span>
    );
};

export default RiskBadge;
