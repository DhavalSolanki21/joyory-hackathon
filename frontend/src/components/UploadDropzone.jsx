import React, { useCallback, useState } from 'react';
import { Upload, X, File, AlertTriangle } from 'lucide-react';

const UploadDropzone = ({ onUpload, isUploading }) => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const validateAndSetFile = (selectedFile) => {
        setError('');
        if (selectedFile.type !== 'application/pdf' && !selectedFile.name.toLowerCase().endsWith('.pdf')) {
            setError('Please upload a valid PDF file.');
            return;
        }
        if (selectedFile.size > 20 * 1024 * 1024) {
            setError('File size must be less than 20MB.');
            return;
        }
        setFile(selectedFile);
        if (!title) {
            setTitle(selectedFile.name.replace('.pdf', ''));
        }
    };

    const removeFile = () => {
        setFile(null);
        setError('');
    };

    const handleSubmit = () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        if (title) formData.append('title', title);
        onUpload(formData);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {error && (
                <div className="mb-4 p-4 rounded-xl bg-status-danger-bg text-status-danger flex items-center gap-3">
                    <AlertTriangle size={20} />
                    <span className="text-sm font-medium">{error}</span>
                </div>
            )}

            {!file ? (
                <div 
                    className={`
                        border-2 border-dashed rounded-2xl p-12 text-center transition-colors
                        ${dragActive ? 'border-color-purple bg-color-lavender-soft' : 'border-border-color bg-bg-card hover:border-color-lavender'}
                    `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input 
                        type="file" 
                        accept=".pdf,application/pdf"
                        onChange={handleChange}
                        className="hidden" 
                        id="file-upload" 
                    />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                        <div className="w-16 h-16 bg-bg-secondary rounded-full flex items-center justify-center mb-6">
                            <Upload size={32} className="text-color-purple" />
                        </div>
                        <h3 className="text-xl font-semibold text-text-primary mb-2">Drag & Drop PDF</h3>
                        <p className="text-text-secondary mb-6 text-sm">or click to browse files</p>
                        <span className="btn-secondary">Browse Files</span>
                    </label>
                </div>
            ) : (
                <div className="card space-y-6">
                    <div className="flex items-start justify-between p-4 rounded-xl bg-bg-secondary border border-border-color">
                        <div className="flex items-center gap-4 overflow-hidden">
                            <div className="p-3 bg-white rounded-lg shadow-sm shrink-0">
                                <File size={24} className="text-color-purple" />
                            </div>
                            <div className="min-w-0">
                                <p className="font-medium text-text-primary truncate">{file.name}</p>
                                <p className="text-xs text-text-muted mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        {!isUploading && (
                            <button onClick={removeFile} className="p-2 text-text-muted hover:text-status-danger transition-colors">
                                <X size={20} />
                            </button>
                        )}
                    </div>

                    <div>
                        <label className="label">Document Title (Optional)</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            className="input-field"
                            placeholder="Enter a descriptive title"
                            disabled={isUploading}
                        />
                    </div>

                    <button 
                        onClick={handleSubmit} 
                        disabled={isUploading || !file}
                        className="btn-primary w-full py-3 text-lg"
                    >
                        {isUploading ? 'Analyzing...' : 'Analyze Document'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default UploadDropzone;
