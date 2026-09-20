import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDocuments, deleteDocument } from '../services/api';

const DocumentDirectory = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');

  const fetchDocs = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await getDocuments();
      setDocuments(response.data);
    } catch (err) {
      console.error("Fetch docs error:", err);
      setErrorMsg("Failed to load documents from backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this document from the company directory?")) return;
    try {
      await deleteDocument(id);
      setDocuments(prev => prev.filter(d => d.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete document.");
    }
  };

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = !searchQuery ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.category && doc.category.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = activeFilter === 'ALL' || doc.status === activeFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col max-w-6xl mx-auto gap-space-lg pb-16">
      {/* Banner */}
      <div className="flex items-center justify-between bg-surface-container-low border border-border-color rounded-3xl p-space-lg shadow-sm">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center font-bold shadow-md">
            <span className="material-symbols-outlined text-[26px]">folder_open</span>
          </div>
          <div>
            <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Company Data Directory
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Centralized repository of indexed company SOPs, policies, and files accessible by Upteky MindBase.
            </p>
          </div>
        </div>
        <Link
          to="/upload"
          className="h-11 px-5 rounded-2xl bg-primary text-on-primary font-semibold flex items-center gap-2 hover:bg-primary/90 shadow-md transition-all text-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Upload Document</span>
        </Link>
      </div>

      {errorMsg && (
        <div className="bg-status-danger-bg border border-status-danger/30 text-status-danger rounded-2xl p-space-md flex items-center gap-3">
          <span className="material-symbols-outlined text-[20px]">warning</span>
          <span className="font-body-sm text-body-sm font-medium">{errorMsg}</span>
        </div>
      )}

      {/* Directory Table Box */}
      <div className="bg-surface-container-lowest border border-border-color rounded-3xl p-space-lg flex flex-col gap-space-md shadow-sm">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <div className="relative flex-1 w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
            <input
              type="text"
              placeholder="Search by title, category..."
              className="w-full h-10 pl-9 pr-4 rounded-xl bg-surface-container-low border border-border-color text-on-surface placeholder:text-outline font-body-sm text-xs focus:outline-none focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-1 bg-surface-container-low border border-border-color p-1 rounded-xl shrink-0">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === 'ALL' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              All ({documents.length})
            </button>
            <button
              onClick={() => setActiveFilter('INDEXED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === 'INDEXED' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Indexed ({documents.filter(d => d.status === 'INDEXED').length})
            </button>
            <button
              onClick={() => setActiveFilter('PENDING_VERIFICATION')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === 'PENDING_VERIFICATION' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Pending ({documents.filter(d => d.status === 'PENDING_VERIFICATION').length})
            </button>
          </div>
        </div>

        {/* Table Content */}
        {loading ? (
          <div className="py-16 text-center text-on-surface-variant flex flex-col items-center justify-center gap-2">
            <span className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
            <span className="font-body-sm text-xs">Loading company documents...</span>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="py-16 text-center text-on-surface-variant flex flex-col items-center justify-center gap-2 border border-dashed border-border-color rounded-2xl">
            <span className="material-symbols-outlined text-[36px] text-outline">folder_off</span>
            <p className="font-title-md text-title-md font-bold text-on-surface">No Documents Found</p>
            <p className="font-body-sm text-xs">
              {documents.length === 0 ? "No documents uploaded yet. Click 'Upload Document' to add SOPs & policies." : "No documents match your current filter query."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-color text-outline uppercase font-label-sm text-[10px] tracking-wider">
                  <th className="py-3 px-4">Document Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Missing Fields</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color/50 text-on-surface font-body-sm text-xs">
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-primary">description</span>
                      <span className="line-clamp-1">{doc.title}</span>
                    </td>
                    <td className="py-3 px-4 text-on-surface-variant">
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface text-[11px] font-medium border border-border-color">
                        {doc.category || 'General'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {doc.status === 'INDEXED' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-status-success-bg text-status-success text-[11px] font-semibold border border-status-success/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-status-success"></span>
                          INDEXED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-status-warning-bg text-status-warning text-[11px] font-semibold border border-status-warning/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-status-warning"></span>
                          PENDING
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-on-surface-variant">
                      {doc.missing_fields && doc.missing_fields.length > 0 ? (
                        <span className="text-status-warning font-medium">
                          {doc.missing_fields.length} missing
                        </span>
                      ) : (
                        <span className="text-status-success">Complete</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/document/${doc.id}`}
                          className="px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary transition-colors text-xs font-semibold"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="p-1 rounded-lg hover:bg-status-danger-bg text-on-surface-variant hover:text-status-danger transition-colors"
                          title="Delete document"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentDirectory;
