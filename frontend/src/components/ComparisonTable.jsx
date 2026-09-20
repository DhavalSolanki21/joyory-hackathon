import React from 'react';
import RiskBadge from './RiskBadge';

const ComparisonTable = ({ differences }) => {
    if (!differences || differences.length === 0) {
        return (
            <div className="card text-center p-8 text-text-secondary">
                No significant differences found between these documents.
            </div>
        );
    }

    return (
        <div className="card p-0 overflow-hidden mt-6">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-border-color bg-bg-secondary text-sm text-text-secondary">
                            <th className="px-6 py-4 font-medium min-w-[150px]">Clause / Section</th>
                            <th className="px-6 py-4 font-medium min-w-[250px]">Version 1</th>
                            <th className="px-6 py-4 font-medium min-w-[250px]">Version 2</th>
                            <th className="px-6 py-4 font-medium min-w-[120px]">Significance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {differences.map((diff, index) => {
                            // Subtle visual highlighting based on difference type
                            // The backend doesn't explicitly return 'Added' or 'Removed' always, but we can look at the content
                            // or significance. We'll use a subtle hover color.
                            
                            let bgHighlight = '';
                            if (!diff.version_1 && diff.version_2) bgHighlight = 'bg-[var(--status-success-bg)]/30';
                            else if (diff.version_1 && !diff.version_2) bgHighlight = 'bg-[var(--status-danger-bg)]/30';
                            
                            return (
                                <tr key={index} className={`border-b border-border-color hover:bg-bg-secondary transition-colors ${bgHighlight}`}>
                                    <td className="px-6 py-4 font-medium text-text-primary text-sm align-top">
                                        {diff.field}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-text-secondary align-top whitespace-pre-wrap">
                                        {diff.version_1 || <span className="italic text-text-muted">Not present</span>}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-text-secondary align-top whitespace-pre-wrap">
                                        {diff.version_2 || <span className="italic text-text-muted">Not present</span>}
                                    </td>
                                    <td className="px-6 py-4 align-top">
                                        <RiskBadge level={diff.significance} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComparisonTable;
