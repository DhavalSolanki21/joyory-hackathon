import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Trash2 } from 'lucide-react';
import RiskBadge from './RiskBadge';
import ConfirmModal from './ConfirmModal';
import { deleteDocument } from '../services/api';

const DocumentTable = ({ documents, onRefresh }) => {
    const navigate = useNavigate();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [docToDelete, setDocToDelete] = useState(null);

    const confirmDelete = (doc) => {
        setDocToDelete(doc);
        setDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (!docToDelete) return;
        try {
            await deleteDocument(docToDelete.id);
            if (onRefresh) onRefresh();
        } catch (error) {
            console.error('Error deleting document', error);
        } finally {
            setDeleteModalOpen(false);
            setDocToDelete(null);
        }
    };

    return (
        <div className="card p-0 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-border-color bg-bg-secondary text-sm text-text-secondary">
                            <th className="px-6 py-4 font-medium">Document</th>
                            <th className="px-6 py-4 font-medium">Type</th>
                            <th className="px-6 py-4 font-medium">Upload Date</th>
                            <th className="px-6 py-4 font-medium">Risk Level</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((doc) => (
                            <tr key={doc.id} className="border-b border-border-color hover:bg-bg-secondary transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-text-primary mb-1 truncate max-w-[200px] md:max-w-[300px]">
                                        {doc.title || `Document ${doc.id}`}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-text-secondary">
                                    {doc.document_type || 'Unknown'}
                                </td>
                                <td className="px-6 py-4 text-sm text-text-secondary">
                                    {new Date(doc.uploaded_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <RiskBadge level={doc.overall_risk} />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => navigate(`/document/${doc.id}`)}
                                            className="p-2 text-text-secondary hover:text-color-purple hover:bg-color-lavender-soft rounded-lg transition-colors"
                                            title="View Details"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button 
                                            onClick={() => confirmDelete(doc)}
                                            className="p-2 text-text-secondary hover:text-status-danger hover:bg-status-danger-bg rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ConfirmModal 
                isOpen={deleteModalOpen}
                title="Delete Document"
                message={`Are you sure you want to delete "${docToDelete?.title || 'this document'}"? This action cannot be undone.`}
                confirmText="Delete"
                isDestructive={true}
                onConfirm={handleDelete}
                onCancel={() => setDeleteModalOpen(false)}
            />
        </div>
    );
};

export default DocumentTable;
