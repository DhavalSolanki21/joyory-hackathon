import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadDocument, confirmDocument } from '../services/api';

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzedDoc, setAnalyzedDoc] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      setFile(selected);
      if (!title) {
        setTitle(selected.name.replace(/\.pdf$/i, ''));
      }
      setErrorMsg(null);
      setAnalyzedDoc(null);
    }
  };

  const removeFile = () => {
    setFile(null);
    setTitle('');
    setAnalyzedDoc(null);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title || file.name);

    try {
      const response = await uploadDocument(formData);
      setAnalyzedDoc(response.data);
    } catch (err) {
      console.error("Upload error:", err);
      setErrorMsg(
        err.response?.data?.error ||
        "Failed to connect to backend server. Make sure Django backend is running at http://127.0.0.1:8000."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!analyzedDoc) return;
    setConfirming(true);
    try {
      await confirmDocument(analyzedDoc.id);
      navigate('/documents');
    } catch (err) {
      console.error("Confirm error:", err);
      setErrorMsg("Failed to confirm document into company directory.");
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="flex flex-col max-w-6xl mx-auto gap-space-lg pb-16">
      {/* Header Banner */}
      <div className="flex items-center justify-between bg-surface-container-low border border-border-color rounded-3xl p-space-lg shadow-sm">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center font-bold shadow-md">
            <span className="material-symbols-outlined text-[26px]">cloud_upload</span>
          </div>
          <div>
            <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Document Ingestion & Semantic Classifier
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Upload company PDFs to automatically extract metadata, classify document type, detect missing values, and index into Upteky MindBase.
            </p>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-status-danger-bg border border-status-danger/30 text-status-danger rounded-2xl p-space-md flex items-center gap-3">
          <span className="material-symbols-outlined text-[20px]">warning</span>
          <span className="font-body-sm text-body-sm font-medium">{errorMsg}</span>
        </div>
      )}

      {/* Main Workspace Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Left Column: Upload Dropzone & Settings */}
        <div className="lg:col-span-6 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest border border-border-color rounded-3xl p-space-lg flex flex-col gap-space-md shadow-sm">
            <h2 className="font-title-md text-title-md text-on-surface font-bold">
              Upload PDF File
            </h2>

            {/* Dropzone Area */}
            <div className="relative border-2 border-dashed border-border-color hover:border-primary rounded-2xl p-8 text-center bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer flex flex-col items-center justify-center min-h-[220px]">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                onChange={handleFileChange}
              />
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-[32px]">upload_file</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface font-semibold">
                Drag & drop your company PDF here or <span className="text-primary underline">browse</span>
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Supports PDF format up to 25MB
              </p>
            </div>

            {/* Selected File Card */}
            {file && (
              <div className="flex items-center justify-between bg-surface-container-low border border-border-color rounded-2xl p-space-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                  </div>
                  <div>
                    <p className="font-body-md text-body-md font-semibold text-on-surface line-clamp-1">
                      {file.name}
                    </p>
                    <p className="font-body-sm text-xs text-on-surface-variant">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-status-danger hover:bg-status-danger-bg transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            )}

            {/* Document Title Input */}
            <div>
              <label className="label">Document Display Title</label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. Quality Standard Operating Procedure 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Analyze Action Button */}
            <button
              type="button"
              disabled={!file || loading}
              onClick={handleAnalyze}
              className="w-full h-12 rounded-2xl bg-primary text-on-primary font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all mt-2"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                  <span>Extracting & Analyzing Semantics...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">neurology</span>
                  <span>Analyze & Detect Missing Values</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Analysis Results & Confirmation */}
        <div className="lg:col-span-6 flex flex-col gap-space-md">
          {analyzedDoc ? (
            <div className="bg-surface-container-lowest border border-border-color rounded-3xl p-space-lg flex flex-col gap-space-md shadow-sm">
              <div className="flex items-center justify-between pb-space-xs border-b border-border-color">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                  Semantic Extraction Complete
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-status-warning-bg text-status-warning font-semibold text-xs border border-status-warning/20">
                  PENDING VERIFICATION
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-primary/10 text-primary font-semibold text-xs border border-primary/20 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">category</span>
                  {analyzedDoc.category || 'General'}
                </span>
                <span className="px-3 py-1 rounded-xl bg-surface-container-high text-on-surface font-semibold text-xs border border-border-color flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">description</span>
                  {analyzedDoc.document_type || 'Document'}
                </span>
              </div>

              {/* Summary */}
              <div>
                <label className="label">Executive Summary</label>
                <div className="bg-surface-container-low border border-border-color rounded-2xl p-space-md text-on-surface font-body-sm leading-relaxed">
                  {analyzedDoc.summary || 'No summary generated.'}
                </div>
              </div>

              {/* Missing Fields / Clauses */}
              <div>
                <label className="label text-status-warning flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">warning</span>
                  Missing Fields & Clauses ({analyzedDoc.missing_fields?.length || 0}):
                </label>
                {analyzedDoc.missing_fields && analyzedDoc.missing_fields.length > 0 ? (
                  <div className="flex flex-col gap-1.5 mt-1">
                    {analyzedDoc.missing_fields.map((missing, idx) => (
                      <div key={idx} className="bg-status-warning-bg/50 border border-status-warning/20 rounded-xl p-2.5 text-xs text-status-warning flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-status-warning"></span>
                        <span>{missing}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="font-body-sm text-xs text-status-success font-medium">
                    ✓ All standard required metadata and clauses are present.
                  </p>
                )}
              </div>

              {/* Metadata Fields */}
              {analyzedDoc.metadata_fields && Object.keys(analyzedDoc.metadata_fields).length > 0 && (
                <div>
                  <label className="label">Extracted Metadata</label>
                  <div className="grid grid-cols-2 gap-2 bg-surface-container-low border border-border-color rounded-2xl p-space-md text-xs">
                    {Object.entries(analyzedDoc.metadata_fields).map(([key, val]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-outline uppercase text-[10px] font-bold">{key.replace(/_/g, ' ')}</span>
                        <span className="text-on-surface font-medium line-clamp-1">{val || 'N/A'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Confirm Action Button */}
              <div className="pt-space-xs border-t border-border-color">
                <button
                  type="button"
                  disabled={confirming}
                  onClick={handleConfirm}
                  className="w-full h-12 rounded-2xl bg-status-success text-on-primary font-semibold flex items-center justify-center gap-2 hover:bg-status-success/90 shadow-md transition-all"
                >
                  {confirming ? (
                    <span>Indexing into Company Directory...</span>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[20px]">check_circle</span>
                      <span>Confirm & Index into Upteky MindBase</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-surface-container-lowest border border-border-color rounded-3xl p-space-lg flex flex-col items-center justify-center text-center min-h-[360px] shadow-sm text-on-surface-variant">
              <div className="w-16 h-16 rounded-2xl bg-surface-container-low border border-border-color flex items-center justify-center text-outline mb-4">
                <span className="material-symbols-outlined text-[32px]">manage_search</span>
              </div>
              <h3 className="font-title-md text-title-md text-on-surface font-bold mb-1">
                No Document Analyzed Yet
              </h3>
              <p className="font-body-sm text-body-sm max-w-xs">
                Upload a company PDF on the left and click 'Analyze & Detect Missing Values' to view semantic classification.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
