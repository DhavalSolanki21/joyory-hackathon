import React from 'react';
import { FileText, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RiskBadge from './RiskBadge';

const DocumentContextCard = ({ document }) => {
    const navigate = useNavigate();

    if (!document) return null;

    return (
        <div className="card bg-bg-secondary border-none mb-6">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                        <FileText size={24} className="text-color-purple" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-text-primary mb-1">
                            {document.title || `Document ${document.id}`}
                        </h2>
                        <div className="flex items-center gap-3 text-sm text-text-secondary">
                            <span>{document.document_type || 'Unknown Type'}</span>
                            <span>•</span>
                            <span>{new Date(document.uploaded_at).toLocaleDateString()}</span>
                            <span>•</span>
                            <RiskBadge level={document.overall_risk} />
                        </div>
                    </div>
                </div>
                <button 
                    onClick={() => navigate(`/document/${document.id}`)}
                    className="btn-secondary"
                >
                    <Eye size={18} />
                    <span className="hidden sm:inline">View Document</span>
                </button>
            </div>
        </div>
    );
};

export default DocumentContextCard;
