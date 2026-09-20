import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const initialDocuments = [
  {
    id: 1,
    title: 'Master Service Agreement - Apex Corp v2.4.pdf',
    type: 'msa',
    date: '14 Oct 2026',
    risk: 'high',
    excerpt: 'Section 14.2 “Unlimited Direct Liabilities for Cloud Outages” contradicts standard indemnification cap thresholds...',
    version: 'v2.4'
  },
  {
    id: 2,
    title: 'SaaS Enterprise Subscription Agreement - CloudScale Ltd.pdf',
    type: 'saas',
    date: '12 Oct 2026',
    risk: 'medium',
    excerpt: 'Clause 8.1 Data portability requirement specifies 30-day notice with non-standard export fee structure...'
  },
  {
    id: 3,
    title: 'Mutual Non-Disclosure Agreement - Synapse AI.pdf',
    type: 'nda',
    date: '09 Oct 2026',
    risk: 'low',
    excerpt: 'Standard reciprocal confidential disclosure period lasting 3 years; IP residual knowledge provisions harmonized...'
  },
  {
    id: 4,
    title: 'Vendor Supply Terms - Meridian Global.pdf',
    type: 'msa',
    date: '03 Oct 2026',
    risk: 'high',
    excerpt: 'Payment net-90 clause with unilateral audit penalty clauses detected in Appendix 3 regarding inventory shortfall...'
  },
  {
    id: 5,
    title: 'Executive Employment Agreement - C-Level.pdf',
    type: 'nda',
    date: '28 Sep 2026',
    risk: 'low',
    excerpt: 'Standard Delaware jurisdiction, non-solicitation restricted to 12 months with equity acceleration on change of control...'
  }
];

const Dashboard = () => {
  const [documents, setDocuments] = useState(initialDocuments);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalDoc, setDeleteModalDoc] = useState(null);

  const filteredDocuments = documents.filter(doc => {
    const matchesQuery = !searchQuery || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      doc.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    if (activeFilter === 'high-risk') matchesFilter = doc.risk === 'high';
    else if (activeFilter === 'msa') matchesFilter = doc.type === 'msa';
    else if (activeFilter === 'nda') matchesFilter = doc.type === 'nda';
    else if (activeFilter === 'saas') matchesFilter = doc.type === 'saas';

    return matchesQuery && matchesFilter;
  });

  const handleDeleteConfirm = () => {
    if (deleteModalDoc) {
      setDocuments(docs => docs.filter(d => d.id !== deleteModalDoc.id));
      setDeleteModalDoc(null);
    }
  };

  return (
    <div className="flex flex-col w-full gap-space-xl">
      {/* Top Bar / Editorial Header */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
        <div className="flex flex-col max-w-2xl">
          <div className="flex items-center gap-space-xs text-primary mb-2">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Repository · Vault v4.2</span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight leading-none">
            Document <span className="font-headline-lg italic font-normal text-primary">Library</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
            Manage, analyze and compare your documents with intelligent contract synthesis.
          </p>
        </div>
        {/* Action Group */}
        <div className="flex flex-wrap items-center gap-space-sm">
          <Link to="/compare" className="inline-flex items-center gap-space-sm px-5 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all duration-200">
            <span className="material-symbols-outlined text-[20px]">difference</span>
            <span>Compare Documents</span>
          </Link>
          <Link to="/upload" className="inline-flex items-center gap-space-sm px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md shadow-[0_8px_20px_rgba(117,103,168,0.25)] hover:bg-primary-container transition-all duration-200">
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Upload Document</span>
          </Link>
        </div>
      </section>

      {/* Summary Metric Cards (4 Bento Pastel Cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">
        {/* Card 1: Total Documents */}
        <div className="relative overflow-hidden rounded-2xl p-space-lg bg-surface-container-low shadow-sm flex flex-col justify-between min-h-[160px] group transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-secondary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">description</span>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +12 this month
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">128</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">active contracts</span>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-1">Total Indexed Documents</p>
          </div>
        </div>
        {/* Card 2: High Risk */}
        <div className="relative overflow-hidden rounded-2xl p-space-lg bg-surface-container-highest/60 shadow-sm flex flex-col justify-between min-h-[160px] group transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-error-container/70 flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
              3 critical clauses
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-lg text-headline-lg text-error font-bold tracking-tight">09</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">flagged for review</span>
            </div>
            <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mt-1">Elevated Risk Exposure</p>
          </div>
        </div>
        {/* Card 3: Medium Risk */}
        <div className="relative overflow-hidden rounded-2xl p-space-lg bg-surface-container shadow-sm flex flex-col justify-between min-h-[160px] group transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-[22px]">gpp_maybe</span>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
              Review within 14d
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">24</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">pending warnings</span>
            </div>
            <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mt-1">Moderate Variances</p>
          </div>
        </div>
        {/* Card 4: Low Risk */}
        <div className="relative overflow-hidden rounded-2xl p-space-lg bg-surface-bright shadow-sm flex flex-col justify-between min-h-[160px] group transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm font-semibold">
              Verified
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">95</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">fully compliant</span>
            </div>
            <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mt-1">Standard Terms Verified</p>
          </div>
        </div>
      </section>

      {/* Visual Editorial Context Break / Digest Spark */}
      <section className="rounded-3xl bg-surface-container-low p-space-lg flex flex-col md:flex-row items-center justify-between gap-space-lg shadow-sm">
        <div className="flex items-center gap-space-md">
          <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-primary shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[28px]">psychology</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Live Analysis Digest</span>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            </div>
            <p className="font-title-md text-title-md text-on-surface font-semibold mt-0.5">Automated Risk Synthesis Completed</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Meridian Global and Apex Corp contracts updated today contain 4 newly extracted indemnification clauses.
            </p>
          </div>
        </div>
        {/* Mini inline telemetry SVG */}
        <div className="flex items-center gap-space-md shrink-0">
          <div className="flex flex-col items-end">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">98.4%</span>
            <span className="font-label-sm text-label-sm text-outline">OCR Confidence</span>
          </div>
          <div className="w-28 h-10 flex items-center">
            <svg className="w-full h-full overflow-visible text-primary" viewBox="0 0 110 40">
              <path d="M 0 32 Q 20 28, 35 15 T 70 22 T 105 8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5"></path>
              <circle cx="105" cy="8" fill="currentColor" r="3.5"></circle>
            </svg>
          </div>
        </div>
      </section>

      {/* Document Table & Explorer Container */}
      <section className="rounded-3xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-lg">
        {/* Toolbar: Search Bar + Filter Pills */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          {/* Search */}
          <div className="relative flex-1 max-w-lg">
            <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
            <input 
              className="w-full h-11 pl-11 pr-space-md rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary-container transition-all" 
              placeholder="Filter by title, party, or keyword..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <button 
              className={`px-3.5 py-1.5 rounded-xl font-label-md text-label-md transition-all ${activeFilter === 'all' ? 'bg-secondary-fixed text-on-secondary-fixed font-semibold' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}
              onClick={() => setActiveFilter('all')}
            >
              All Documents (128)
            </button>
            <button 
              className={`px-3.5 py-1.5 rounded-xl font-label-md text-label-md transition-all ${activeFilter === 'high-risk' ? 'bg-secondary-fixed text-on-secondary-fixed font-semibold' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}
              onClick={() => setActiveFilter('high-risk')}
            >
              High Risk (9)
            </button>
            <button 
              className={`px-3.5 py-1.5 rounded-xl font-label-md text-label-md transition-all ${activeFilter === 'msa' ? 'bg-secondary-fixed text-on-secondary-fixed font-semibold' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}
              onClick={() => setActiveFilter('msa')}
            >
              Master Services
            </button>
            <button 
              className={`px-3.5 py-1.5 rounded-xl font-label-md text-label-md transition-all ${activeFilter === 'nda' ? 'bg-secondary-fixed text-on-secondary-fixed font-semibold' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}
              onClick={() => setActiveFilter('nda')}
            >
              NDA & Confidentiality
            </button>
            <button 
              className={`px-3.5 py-1.5 rounded-xl font-label-md text-label-md transition-all ${activeFilter === 'saas' ? 'bg-secondary-fixed text-on-secondary-fixed font-semibold' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}
              onClick={() => setActiveFilter('saas')}
            >
              SaaS Agreements
            </button>
          </div>
        </div>

        {/* Table Structure */}
        <div className="overflow-x-auto -mx-space-lg px-space-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/60 rounded-xl text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                <th className="py-3 px-4 rounded-l-xl font-semibold">Document Title & Excerpt</th>
                <th className="py-3 px-4 font-semibold">Classification</th>
                <th className="py-3 px-4 font-semibold">Uploaded</th>
                <th className="py-3 px-4 font-semibold">Risk Index</th>
                <th className="py-3 px-4 rounded-r-xl font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-0 text-on-surface font-body-md text-body-md">
              {filteredDocuments.map(doc => (
                <tr key={doc.id} className="group transition-colors duration-150 hover:bg-surface-container-low">
                  <td className="py-4 px-4 align-top max-w-md">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary-fixed/70 text-primary flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-on-primary transition-all">
                        <span className="material-symbols-outlined text-[20px]">
                          {doc.type === 'msa' ? 'description' : doc.type === 'saas' ? 'cloud_sync' : doc.type === 'nda' ? 'lock_reset' : 'inventory_2'}
                        </span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-title-md text-title-md font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
                            {doc.title}
                          </span>
                          {doc.version && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm text-[10px]">{doc.version}</span>
                          )}
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">
                          {doc.excerpt}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 align-middle whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-surface-container text-on-surface font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[14px] text-primary">
                        {doc.type === 'msa' ? 'handshake' : doc.type === 'saas' ? 'dns' : doc.type === 'nda' ? 'shield' : 'inventory_2'}
                      </span>
                      {doc.type === 'msa' ? 'Master Services' : doc.type === 'saas' ? 'Enterprise SaaS' : doc.type === 'nda' ? 'NDA' : 'Vendor Agreement'}
                    </span>
                  </td>
                  <td className="py-4 px-4 align-middle whitespace-nowrap text-on-surface-variant font-body-sm text-body-sm">
                    {doc.date}
                  </td>
                  <td className="py-4 px-4 align-middle whitespace-nowrap">
                    {doc.risk === 'high' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                        HIGH RISK
                      </span>
                    )}
                    {doc.risk === 'medium' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        MEDIUM RISK
                      </span>
                    )}
                    {doc.risk === 'low' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-surface-container-low text-primary font-label-sm text-label-sm font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        LOW RISK
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 align-middle text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link to={`/documents/${doc.id}`} className="px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-secondary-fixed text-primary font-label-sm text-label-sm font-semibold transition-all">
                        View Details
                      </Link>
                      <button className="w-8 h-8 rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" title="Quick Compare">
                        <span className="material-symbols-outlined text-[18px]">difference</span>
                      </button>
                      <button 
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-error-container hover:text-error transition-colors" 
                        title="Delete Document"
                        onClick={() => setDeleteModalDoc(doc)}
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Pagination & Synthesis Status Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pt-space-xs text-on-surface-variant font-body-sm text-body-sm">
          <div className="flex items-center gap-2">
            <span>Displaying <strong className="text-on-surface font-semibold">{filteredDocuments.length}</strong> of <strong className="text-on-surface font-semibold">{documents.length}</strong> legal documents</span>
            <span className="text-outline">·</span>
            <span className="text-primary font-medium">All vector embeddings synchronized</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 rounded-xl bg-surface-container-low flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-semibold font-label-sm text-label-sm flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded-xl bg-surface-container-low text-on-surface-variant font-semibold font-label-sm text-label-sm hover:bg-surface-container-high transition-colors flex items-center justify-center">2</button>
            <button className="w-8 h-8 rounded-xl bg-surface-container-low text-on-surface-variant font-semibold font-label-sm text-label-sm hover:bg-surface-container-high transition-colors flex items-center justify-center">3</button>
            <button className="w-8 h-8 rounded-xl bg-surface-container-low flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* Delete Confirmation Modal Overlay */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm transition-opacity duration-200 ${deleteModalDoc ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`w-full max-w-md bg-surface-container-lowest rounded-3xl p-space-lg shadow-xl transform transition-transform duration-200 ${deleteModalDoc ? 'scale-100' : 'scale-95'}`}>
          <div className="flex items-center justify-between mb-space-md">
            <div className="w-12 h-12 rounded-2xl bg-error-container flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[24px]">delete_forever</span>
            </div>
            <button 
              className="w-8 h-8 rounded-xl bg-surface-container-low text-on-surface-variant hover:text-on-surface flex items-center justify-center" 
              onClick={() => setDeleteModalDoc(null)}
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Archive Legal Document</h3>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Are you sure you want to remove <span className="font-semibold text-on-surface">"{deleteModalDoc?.title}"</span> from the intelligent workspace? This action de-indexes all related synthesized clauses and vectors.
          </p>
          <div className="mt-space-lg flex items-center justify-end gap-space-sm">
            <button 
              className="px-5 py-2.5 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors" 
              onClick={() => setDeleteModalDoc(null)}
            >
              Keep Document
            </button>
            <button 
              className="px-5 py-2.5 rounded-xl bg-error text-on-error font-label-md text-label-md hover:opacity-90 transition-opacity" 
              onClick={handleDeleteConfirm}
            >
              Confirm Deletion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
