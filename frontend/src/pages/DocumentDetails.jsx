import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDocument, askDocument, deleteDocument } from '../services/api';

const DocumentDetails = () => {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [qaInput, setQaInput] = useState('');
  const [qaLoading, setQaLoading] = useState(false);
  const [isRawExpanded, setIsRawExpanded] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: 'Ask me any specific question about this document and I will extract the exact answer and citation for you.',
      timestamp: 'Just now'
    }
  ]);

  useEffect(() => {
    if (!id) return;
    const fetchDoc = async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const response = await getDocument(id);
        setDoc(response.data);
      } catch (err) {
        console.error("Fetch detail error:", err);
        setErrorMsg("Failed to load document details from backend.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [id]);

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!qaInput.trim() || qaLoading) return;

    const userQuery = qaInput.trim();
    setQaInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userQuery, timestamp: 'Just now' }]);
    setQaLoading(true);

    try {
      const response = await askDocument(id, userQuery);
      const data = response.data;
      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: data.answer || "No specific answer found in this document.",
          sources: data.sources || [],
          timestamp: 'Just now'
        }
      ]);
    } catch (err) {
      console.error("Ask doc error:", err);
      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: "Failed to fetch response for this document.",
          timestamp: 'Just now',
          isError: true
        }
      ]);
    } finally {
      setQaLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-on-surface-variant flex flex-col items-center justify-center gap-2">
        <span className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></span>
        <span className="font-body-md text-sm">Loading document details...</span>
      </div>
    );
  }

  if (errorMsg || !doc) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center flex flex-col items-center justify-center gap-4">
        <span className="material-symbols-outlined text-[48px] text-status-danger">error</span>
        <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Document Not Found</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">{errorMsg || "Requested document ID could not be located."}</p>
        <Link to="/documents" className="btn-primary">Return to Directory</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-6xl mx-auto gap-space-lg pb-16">
      {/* Document Header */}
      <div className="flex flex-col gap-space-sm bg-surface-container-low border border-border-color rounded-3xl p-space-lg shadow-sm">
        <div className="flex items-center gap-2 text-outline text-xs">
          <Link to="/documents" className="hover:text-primary transition-colors">Directory</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-on-surface font-semibold">{doc.category || 'General'}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div>
            <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              {doc.title}
            </h1>
            <p className="font-body-sm text-xs text-on-surface-variant mt-1">
              Uploaded on {doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString() : 'Recent'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              doc.status === 'INDEXED' ? 'bg-status-success-bg text-status-success border-status-success/20' : 'bg-status-warning-bg text-status-warning border-status-warning/20'
            }`}>
              {doc.status}
            </span>
          </div>
        </div>
      </div>

      {/* Main Workspace Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Left Column: Summary & Metadata (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          {/* Executive Summary */}
          <div className="bg-surface-container-lowest border border-border-color rounded-3xl p-space-lg shadow-sm">
            <h2 className="font-title-md text-title-md text-on-surface font-bold mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
              Executive Summary
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {doc.summary || "No summary generated for this document."}
            </p>
          </div>

          {/* Missing Fields / Required Clauses Alert */}
          {doc.missing_fields && doc.missing_fields.length > 0 && (
            <div className="bg-status-warning-bg/40 border border-status-warning/30 rounded-3xl p-space-lg shadow-sm">
              <h3 className="font-title-md text-title-md text-status-warning font-bold mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">warning</span>
                Missing Metadata & Required Clauses
              </h3>
              <ul className="flex flex-col gap-1.5 pl-4 list-disc text-xs text-status-warning">
                {doc.missing_fields.map((m, idx) => (
                  <li key={idx}>{m}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Extracted Metadata */}
          {doc.metadata_fields && Object.keys(doc.metadata_fields).length > 0 && (
            <div className="bg-surface-container-lowest border border-border-color rounded-3xl p-space-lg shadow-sm">
              <h3 className="font-title-md text-title-md text-on-surface font-bold mb-3">
                Extracted Metadata Attributes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                {Object.entries(doc.metadata_fields).map(([k, v]) => (
                  <div key={k} className="bg-surface-container-low border border-border-color p-3 rounded-2xl">
                    <span className="text-outline uppercase text-[10px] font-bold block">{k.replace(/_/g, ' ')}</span>
                    <span className="text-on-surface font-medium text-xs mt-0.5 block">{v || 'N/A'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Raw Extracted Text Viewer */}
          <div className="bg-surface-container-lowest border border-border-color rounded-3xl p-space-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-title-md text-title-md text-on-surface font-bold">
                Extracted Document Text
              </h3>
              <button
                type="button"
                onClick={() => setIsRawExpanded(!isRawExpanded)}
                className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
              >
                {isRawExpanded ? 'Collapse' : 'Expand View'}
                <span className="material-symbols-outlined text-[16px]">{isRawExpanded ? 'expand_less' : 'expand_more'}</span>
              </button>
            </div>

            {isRawExpanded && (
              <div className="mt-space-md p-space-md rounded-2xl bg-surface-container-low border border-border-color max-h-80 overflow-y-auto font-mono text-xs text-on-surface leading-relaxed whitespace-pre-wrap">
                {doc.raw_text || "No extracted text available."}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Q&A Assistant (5 Cols) */}
        <div className="lg:col-span-5 bg-surface-container-lowest border border-border-color rounded-3xl p-space-lg flex flex-col justify-between h-[600px] shadow-sm">
          <div className="pb-space-xs border-b border-border-color flex items-center justify-between">
            <h3 className="font-title-md text-title-md text-on-surface font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">forum</span>
              Ask This Document
            </h3>
            <span className="text-xs text-outline">Grounded Q&A</span>
          </div>

          <div className="flex-1 overflow-y-auto py-space-md flex flex-col gap-space-sm pr-1">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-3 rounded-2xl text-xs max-w-[90%] leading-relaxed ${
                  m.sender === 'user' ? 'bg-primary text-on-primary rounded-tr-none' : 'bg-surface-container-low text-on-surface border border-border-color rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {qaLoading && (
              <div className="text-xs text-outline italic animate-pulse">Analyzing document text...</div>
            )}
          </div>

          <form onSubmit={handleAskQuestion} className="flex items-center gap-2 pt-space-xs border-t border-border-color">
            <input
              type="text"
              className="flex-1 h-10 px-3 rounded-xl bg-surface-container-low border border-border-color text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
              placeholder="Ask a question about this document..."
              value={qaInput}
              onChange={(e) => setQaInput(e.target.value)}
              disabled={qaLoading}
            />
            <button
              type="submit"
              disabled={!qaInput.trim() || qaLoading}
              className="h-10 px-4 rounded-xl bg-primary text-on-primary font-semibold text-xs hover:bg-primary/90 disabled:opacity-50"
            >
              Ask
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetails;
