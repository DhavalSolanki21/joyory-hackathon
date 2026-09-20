import React from 'react';

const KeyInformation = ({ data }) => {
    if (!data) return null;

    const fields = [
        { label: 'Parties', value: data.parties ? data.parties.join(' & ') : 'Not specified' },
        { label: 'Contract Value', value: data.contract_value || 'Not specified' },
        { label: 'Effective Date', value: data.effective_date || 'Not specified' },
        { label: 'Expiration Date', value: data.expiration_date || 'Not specified' },
        { label: 'Payment Terms', value: data.payment_terms || 'Not specified' },
    ];

    return (
        <div className="card h-full">
            <h3 className="text-lg font-semibold text-text-primary mb-6 font-serif">Key Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
                {fields.map((field, index) => (
                    <div key={index} className="flex flex-col">
                        <span className="text-xs text-text-muted uppercase tracking-wider font-medium mb-1">
                            {field.label}
                        </span>
                        <span className="text-text-primary font-medium">
                            {field.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KeyInformation;
