import React, { useState, useRef } from 'react';

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [analysisStatus, setAnalysisStatus] = useState('idle'); // idle, active, complete
  
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const startAnalysis = () => {
    if (!file) return;
    setIsUploading(true);
    setAnalysisStatus('active');
    setProgress(58); // Start at 58% as per design

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 8;
        if (next >= 100) {
          clearInterval(interval);
          setAnalysisStatus('complete');
          setIsUploading(false);
          return 100;
        }
        return next;
      });
    }, 400);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto pb-16">
      {/* Ambient subtle background glow */}
      <div className="absolute -top-12 right-12 w-96 h-96 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 -left-12 w-80 h-80 rounded-full bg-tertiary-fixed/30 blur-3xl pointer-events-none -z-10"></div>
      
      {/* Editorial Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pt-2">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-sm font-label-sm uppercase tracking-wider">Pipeline Node // Ingestion</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
            <span className="text-label-sm font-label-sm text-outline tracking-wider uppercase">POST /doc_intelligence/upload</span>
          </div>
          <h1 className="text-display-lg font-display-lg text-on-surface tracking-tight">
            Upload <span className="italic font-normal font-headline-lg text-primary">Document</span>
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Upload a PDF contract or agreement and let Velum analyze its structure, hidden risks, and missing clauses with deep legal telemetry.
          </p>
        </div>
        {/* Quick Session Badge / Info */}
        <div className="flex items-center gap-3 bg-surface-container-lowest shadow-sm rounded-2xl px-4 py-3 self-start md:self-auto">
          <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">verified_user</span>
          </div>
          <div>
            <div className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Vault Encryption</div>
            <div className="text-body-sm font-body-sm font-semibold text-on-surface">AES-256 Legal Enclave Active</div>
          </div>
        </div>
      </header>
      
      {/* Main Workspace Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Primary Ingestion & Configuration Column (7 Cols) */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            {/* Dropzone Area */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-title-md font-title-md text-on-surface">Source File Dossier</label>
                <span className="text-label-sm font-label-sm text-outline tracking-wider uppercase">Standard & OCR v4</span>
              </div>
              <div className="relative group cursor-pointer transition-all duration-300 rounded-2xl bg-surface-container-low p-8 text-center flex flex-col items-center justify-center min-h-[260px] overflow-hidden hover:bg-surface-container hover:shadow-md">
                <input 
                  accept=".pdf" 
                  className="absolute inset-0 opacity-0 cursor-pointer z-20" 
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                {/* Subtle decorative dash outline overlay via SVG */}
                <svg className="absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] pointer-events-none stroke-secondary-container stroke-[1.5] [stroke-dasharray:8,6] fill-none rounded-xl" preserveAspectRatio="none">
                  <rect height="99%" rx="12" width="99%" x="1" y="1"></rect>
                </svg>
                {/* Central Icon Badge */}
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-surface-container-lowest shadow-sm flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-105">
                    <span className="material-symbols-outlined text-[32px]">upload_file</span>
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-secondary-fixed text-primary flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[14px]">add</span>
                  </span>
                </div>
                {/* Main Copy */}
                <div className="text-body-lg font-body-lg text-on-surface font-medium max-w-sm">
                  Drop your PDF agreement here or <span className="text-primary-container font-semibold underline decoration-secondary-container underline-offset-4 hover:text-primary">Browse Files</span>
                </div>
                <p className="text-body-sm font-body-sm text-on-surface-variant mt-2 max-w-md">
                  Supports PDF files up to 25MB. Text extraction and OCR applied automatically.
                </p>
                {/* Security notice pill */}
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/80 text-outline text-label-sm font-label-sm">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  <span>Zero-retention ephemeral processing</span>
                </div>
              </div>
              
              {/* Uploaded File Preview Chip */}
              {file && (
                <div className="flex items-center justify-between bg-surface-container-low px-4 py-3 rounded-2xl shadow-sm transition-all duration-300">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                    </div>
                    <div className="min-w-0 flex flex-col">
                      <span className="text-body-md font-body-md font-semibold text-on-surface truncate">{file.name}</span>
                      <div className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant">
                        <span>{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                        <span className="w-1 h-1 rounded-full bg-outline"></span>
                        <span className="text-primary font-medium">Ready for synthesis</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-colors z-30 relative" 
                    title="Remove file" 
                    type="button"
                    onClick={removeFile}
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
              )}
            </div>
            
            {/* Document Metadata Attributes */}
            <div className="space-y-5 pt-2">
              <div>
                <label className="block text-label-md font-label-md text-on-surface font-semibold mb-2" htmlFor="doc-title">
                  Document Title
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-outline text-[20px]">edit_note</span>
                  <input className="w-full h-11 pl-11 pr-4 bg-surface-container-low rounded-xl text-body-md font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary-container transition-all" id="doc-title" placeholder="e.g., Global Enterprise SLA - Q4 2026" type="text" defaultValue={file ? file.name.replace('.pdf', '') : 'Global Enterprise SLA - Q4 2026'}/>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-label-md font-label-md text-on-surface font-semibold mb-2" htmlFor="doc-category">
                    Document Category / Type
                  </label>
                  <div className="relative">
                    <select className="w-full h-11 pl-4 pr-10 bg-surface-container-low rounded-xl text-body-md font-body-md text-on-surface appearance-none cursor-pointer focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary-container transition-all" id="doc-category" defaultValue="msa">
                      <option value="msa">Master Services Agreement (MSA)</option>
                      <option value="nda">Non-Disclosure Agreement (NDA)</option>
                      <option value="licensing">Software / IP Licensing</option>
                      <option value="procurement">Vendor Procurement Terms</option>
                      <option value="custom">Custom Legal Instrument</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-outline text-[20px]">expand_more</span>
                  </div>
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface font-semibold mb-2">
                    Governing Jurisdiction
                  </label>
                  <div className="relative">
                    <select className="w-full h-11 pl-4 pr-10 bg-surface-container-low rounded-xl text-body-md font-body-md text-on-surface appearance-none cursor-pointer focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary-container transition-all" defaultValue="Delaware">
                      <option value="Delaware">Delaware (US) - Commercial Standard</option>
                      <option>England & Wales (UK)</option>
                      <option>European Union (GDPR Aligned)</option>
                      <option>California (US - CCPA/CPRA)</option>
                      <option>Auto-Detect from Preamble</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-outline text-[20px]">gavel</span>
                  </div>
                </div>
              </div>
              {/* Analysis Intensity Toggle */}
              <div>
                <label className="block text-label-md font-label-md text-on-surface font-semibold mb-2">
                  Analysis Intensity Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 bg-surface-container-low rounded-2xl">
                  {/* Deep Risk Option (Active default) */}
                  <label className="relative flex items-start gap-3 p-3.5 rounded-xl cursor-pointer transition-all bg-surface-container-lowest shadow-sm text-on-surface">
                    <input defaultChecked className="mt-1 accent-primary h-4 w-4" name="intensity" type="radio" value="deep"/>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-body-md font-body-md font-semibold">Deep Risk & Clause Audit</span>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-primary text-label-sm font-label-sm">Recommended</span>
                      </div>
                      <span className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                        Clause-by-clause liability scoring, uncapped indemnity scans, and cross-party drift.
                      </span>
                    </div>
                  </label>
                  {/* Standard Option */}
                  <label className="relative flex items-start gap-3 p-3.5 rounded-xl cursor-pointer transition-all hover:bg-surface-container-lowest/60 text-on-surface">
                    <input className="mt-1 accent-primary h-4 w-4" name="intensity" type="radio" value="standard"/>
                    <div className="flex flex-col">
                      <span className="text-body-md font-body-md font-semibold">Standard Summary</span>
                      <span className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                        Executive brief, governing dates, key renewal triggers, and primary party taxonomy.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
              {/* Action Button Area */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button 
                  className={`w-full sm:w-auto flex-1 h-12 px-8 rounded-xl bg-primary text-on-primary font-body-md text-body-md font-semibold tracking-wide flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] ${!file ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-container'}`} 
                  onClick={startAnalysis}
                  disabled={!file || analysisStatus === 'active'}
                  type="button"
                >
                  <span className={`material-symbols-outlined text-[20px] ${analysisStatus === 'active' ? 'animate-spin' : ''}`}>
                    {analysisStatus === 'idle' ? 'neurology' : analysisStatus === 'active' ? 'autorenew' : 'task_alt'}
                  </span>
                  <span>{analysisStatus === 'idle' ? 'Analyze Document' : analysisStatus === 'active' ? 'Synthesizing Dossier...' : 'Analysis Complete'}</span>
                </button>
                <button className="w-full sm:w-auto h-12 px-6 rounded-xl bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors font-body-md text-body-md font-medium flex items-center justify-center gap-2" type="button">
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                  <span>Audit Heuristics</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Document Reference Archival Card (Image Rich) */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex items-center gap-6 overflow-hidden">
            <div className="w-32 h-24 rounded-2xl shrink-0 overflow-hidden relative shadow-sm">
              <img className="w-full h-full object-cover" alt="Editorial close-up of heavy linen parchment archival contract paper stamped with minimalist purple seal in soft daylight studio setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPWHNECk5FyUmE1yvgGsll3HI05F865Up4H6iClbO7dRVdnrQqNQ97VqX8Ejgi5Yy3Dh5mkYw-8L6LrYVcSIpjyj2uQSrEfp-4t6Xl5lsC-dieoroiWl9ah9FiT0it84l-fOl21YlhFaoMzanUzx4eh-LOeQ_q0cAI2W6zItF66IYSA3i31EjGFAkcN1wtEeDy-Ki5Lr11EiZOsEO9D66clybgCUB0PiFl0y_MKOlzTbsz0pxFrqh4Wg"/>
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
            </div>
            <div className="space-y-1">
              <span className="text-label-sm font-label-sm uppercase tracking-widest text-primary font-bold">Lexical Precedent Model</span>
              <h4 className="text-title-md font-title-md text-on-surface font-semibold">Indexed Against 140,000+ Precedents</h4>
              <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                Velum compares ambiguous terms to verified judicial enforcement standards across commercial benchmarks.
              </p>
            </div>
          </div>
        </section>
        
        {/* Live Analysis Pipeline & Inspection Card (5 Cols) */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          {/* Interactive Multi-Step Progress Tracker Card */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
            {/* Top Accent Status */}
            <div className="flex items-center justify-between pb-5">
              <div className="flex items-center gap-2">
                {analysisStatus === 'active' && (
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                  </span>
                )}
                <span className="text-title-md font-title-md text-on-surface font-bold">AI Pipeline Status</span>
              </div>
              <span className="text-label-md font-label-md font-bold text-primary px-2.5 py-1 bg-secondary-fixed rounded-lg">
                {progress}% {analysisStatus === 'complete' ? 'Ready' : 'Complete'}
              </span>
            </div>
            {/* Real-Time Progress Bar */}
            <div className="space-y-2 mb-6">
              <div className="w-full h-2 bg-surface-container-low rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-secondary-container via-primary to-primary-container rounded-full transition-all duration-700 ease-out" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-label-sm font-label-sm text-on-surface-variant">
                <span>Estimated elapsed: 1.4s</span>
                <span className="font-medium text-primary">Target: 3.2s Total</span>
              </div>
            </div>
            {/* Multi-Step Timeline */}
            <div className="relative space-y-6 before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-surface-container-high">
              {/* Step 1: Upload */}
              <div className="relative flex items-start gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 shadow-sm ${progress > 0 ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-high text-outline'}`}>
                  {progress > 0 ? <span className="material-symbols-outlined text-[18px]">check</span> : <span className="text-label-sm font-label-sm font-bold">1</span>}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-body-md font-body-md font-semibold text-on-surface">Uploading document</span>
                    {progress > 0 && <span className="text-label-sm font-label-sm text-outline">184 ms</span>}
                  </div>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">Validated payload hash & PDF version integrity</p>
                </div>
              </div>
              {/* Step 2: Extraction & OCR */}
              <div className={`relative flex items-start gap-4 ${progress < 30 ? 'opacity-60' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${progress > 30 ? 'bg-secondary-container text-on-secondary-container shadow-sm' : 'bg-surface-container-high text-outline'}`}>
                  {progress > 30 ? <span className="material-symbols-outlined text-[18px]">check</span> : <span className="text-label-sm font-label-sm font-bold">2</span>}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-body-md font-body-md font-semibold text-on-surface">Extracting text & layout OCR</span>
                    {progress > 30 && <span className="text-label-sm font-label-sm text-outline">620 ms</span>}
                  </div>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">32 pages converted into tokenized AST streams</p>
                </div>
              </div>
              {/* Step 3: Analyzing Semantics */}
              <div className={`relative flex items-start gap-4 ${progress < 50 ? 'opacity-60' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${progress >= 50 && progress < 100 ? 'bg-primary text-on-primary shadow-md ring-4 ring-secondary-fixed/50 animate-pulse' : progress >= 100 ? 'bg-secondary-container text-on-secondary-container shadow-sm' : 'bg-surface-container-high text-outline'}`}>
                  {progress >= 100 ? <span className="material-symbols-outlined text-[18px]">check</span> : progress >= 50 ? <span className="material-symbols-outlined text-[16px]">psychology</span> : <span className="text-label-sm font-label-sm font-bold">3</span>}
                </div>
                <div className={`flex-1 ${progress >= 50 && progress < 100 ? 'pt-0.5 bg-surface-container-low p-3 rounded-xl' : 'pt-1'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-body-md font-body-md font-semibold ${progress >= 50 && progress < 100 ? 'text-primary' : 'text-on-surface'}`}>Analyzing document semantics</span>
                    {progress >= 50 && progress < 100 && <span className="text-label-sm font-label-sm font-bold text-primary uppercase">Active</span>}
                  </div>
                  <p className="text-body-sm font-body-sm text-on-surface-variant mt-0.5">
                    Deconstructing bilateral covenants, governing triggers, and indemnity riders...
                  </p>
                </div>
              </div>
              {/* Step 4: Liabilities & Compliance */}
              <div className={`relative flex items-start gap-4 ${progress < 80 ? 'opacity-60' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${progress >= 100 ? 'bg-secondary-container text-on-secondary-container shadow-sm' : 'bg-surface-container-high text-outline'}`}>
                  {progress >= 100 ? <span className="material-symbols-outlined text-[18px]">check</span> : <span className="text-label-sm font-label-sm font-bold">4</span>}
                </div>
                <div className="flex-1 pt-1">
                  <span className="text-body-md font-body-md font-semibold text-on-surface">Identifying liabilities & compliance risks</span>
                  <p className="text-body-sm font-body-sm text-outline">Sanctions, non-standard caps, regulatory flags</p>
                </div>
              </div>
              {/* Step 5: Preparing Synthesis Report */}
              <div className={`relative flex items-start gap-4 ${progress < 100 ? 'opacity-40' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${progress >= 100 ? 'bg-secondary-container text-on-secondary-container shadow-sm' : 'bg-surface-container-high text-outline'}`}>
                  {progress >= 100 ? <span className="material-symbols-outlined text-[18px]">check</span> : <span className="text-label-sm font-label-sm font-bold">5</span>}
                </div>
                <div className="flex-1 pt-1">
                  <span className="text-body-md font-body-md font-semibold text-on-surface">Preparing synthesis report</span>
                  <p className="text-body-sm font-body-sm text-outline">Executive summary & redline recommendation deck</p>
                </div>
              </div>
            </div>
            
            {/* Micro telemetry spark */}
            <div className="mt-8 pt-5 bg-surface-container-low/60 -mx-6 -mb-6 p-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">memory</span>
                <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">Model: Velum-Legal-Large (Quantized)</span>
              </div>
              <span className="text-label-sm font-label-sm text-primary font-semibold">1,240 tokens/sec</span>
            </div>
          </div>
          
          {/* Real-Time Preliminary Signals Card */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-headline-sm font-headline-sm text-on-surface">Detected Signatures</h3>
              <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-primary text-label-sm font-label-sm font-semibold">Heuristic Triage</span>
            </div>
            {/* Tag cloud / Pill indicators */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-tertiary-fixed/60 text-on-tertiary-fixed text-label-sm font-label-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Mutual Indemnity §14.2
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-secondary-fixed text-on-secondary-fixed text-label-sm font-label-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                SLA 99.95% Availability
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-surface-container text-on-surface-variant text-label-sm font-label-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                Uncapped Consequential Damages
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-tertiary-fixed/60 text-on-tertiary-fixed text-label-sm font-label-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Data Protection Addendum (GDPR)
              </span>
            </div>
            {/* Secondary Image Artifact */}
            <div className="pt-2">
              <div className="w-full h-28 rounded-2xl overflow-hidden relative shadow-sm">
                <img className="w-full h-full object-cover" alt="Editorial visual of an executive fountain pen resting over violet-tinted legal document briefs with elegant shallow depth of field" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnUxQ32aWI7S0eakdTF1bKCHN8gMr0H0am-imgvQBYLpxQg1iX51C7z_nuGurNVYzMbeZHc3IEfdEvmy-eR-MDNUOBihfS5VVlYoMJSnK0nLO1Y27_wExGhSEydNTkiDe1RG4i1mB3_MZzyj218Vgp0qSVuPNKPGYodNym190WlUseYrkWwLNgUlVKAAhWLFJv4bE57CBpIHwa8n-q7K1xqb4ekDYgkMoi5DzwXpzZ5PFYP5ZGo2wfaA"/>
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-inverse-surface/20 to-transparent flex items-end p-3">
                  <span className="text-label-sm font-label-sm text-surface font-semibold tracking-wide">
                    Analysis artifacts will be securely pinned to Workspace Library.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UploadDocument;
