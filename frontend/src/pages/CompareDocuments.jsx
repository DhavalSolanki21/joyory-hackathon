import React, { useState } from 'react';

const CompareDocuments = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-space-xl">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs max-w-2xl">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest">
              <span>Comparative Engine</span>
              <span>·</span>
              <span className="text-primary font-semibold">Diff Analysis</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight leading-tight">
              Document <span className="font-headline-sm italic font-normal text-primary">Comparison</span>
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Compare two contract versions side-by-side to detect altered terms, liability shifts, and clause discrepancies across regulatory covenants.
            </p>
          </div>
          <div className="flex items-center gap-space-sm self-start md:self-auto">
            <button className="h-11 px-space-md rounded-xl bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-space-xs font-label-md text-label-md" type="button">
              <span className="material-symbols-outlined text-[18px]">history</span>
              <span>Diff History</span>
            </button>
            <button className="h-11 px-space-md rounded-xl bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-space-xs font-label-md text-label-md" type="button">
              <span className="material-symbols-outlined text-[18px]">file_download</span>
              <span>Export Redline</span>
            </button>
          </div>
        </div>
        
        {/* Top Selection Section: Balanced Comparison Selectors */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* Version 1: Base Document */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-3xl p-space-lg shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Version 1 · Base</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">Baseline Reference</span>
            </div>
            <div className="relative">
              <label className="block font-label-sm text-label-sm uppercase text-outline mb-1.5 font-medium">Selected Contract</label>
              <div className="relative">
                <select className="w-full h-11 pl-3 pr-10 bg-surface-container-low text-on-surface rounded-xl font-body-md text-body-md appearance-none cursor-pointer focus:outline-none focus:bg-surface-container">
                  <option defaultValue>Cloud Services Agreement - v1.0 (Signed Jan 2024)</option>
                  <option>Master Services Agreement - v3.1 (Approved May 2023)</option>
                  <option>Data Protection Addendum - Standard 2023</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">unfold_more</span>
              </div>
            </div>
            {/* Meta chips preview */}
            <div className="p-space-md rounded-2xl bg-surface-container-low flex flex-col gap-space-sm">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                  <span>18 pages</span>
                  <span className="text-outline">•</span>
                  <span>12 Jan 2024</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-medium">
                  Low Risk (9.2)
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Counterparties</span>
                  <span className="font-body-md text-body-md text-on-surface font-medium">Apex Corp & Solaria Health</span>
                </div>
                <span className="material-symbols-outlined text-secondary text-[22px]">verified</span>
              </div>
            </div>
          </div>
          
          {/* Center Action Anchor */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center gap-space-xs text-center py-2">
            <div className="w-12 h-12 rounded-2xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shadow-sm">
              <span className="material-symbols-outlined text-[24px]">sync_alt</span>
            </div>
            <button className="h-11 px-space-md rounded-xl bg-primary-container text-on-primary font-label-md text-label-md font-semibold tracking-wide hover:opacity-95 transition-opacity shadow-sm flex items-center justify-center gap-1.5 w-full" type="button">
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              <span>Run Comparison</span>
            </button>
            <span className="font-label-sm text-label-sm text-outline">Compute delta in &lt;1.8s</span>
          </div>
          
          {/* Version 2: Proposed Revision */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-3xl p-space-lg shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">Version 2 · Revision</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">Incoming Markups</span>
            </div>
            <div className="relative">
              <label className="block font-label-sm text-label-sm uppercase text-outline mb-1.5 font-medium">Target Revision</label>
              <div className="relative">
                <select className="w-full h-11 pl-3 pr-10 bg-surface-container-low text-on-surface rounded-xl font-body-md text-body-md appearance-none cursor-pointer focus:outline-none focus:bg-surface-container">
                  <option defaultValue>Cloud Services Agreement - v2.4 (Proposed Oct 2026)</option>
                  <option>Cloud Services Agreement - v2.3 (Draft Aug 2026)</option>
                  <option>Cloud Services Agreement - v2.0 (Redline July 2026)</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">unfold_more</span>
              </div>
            </div>
            {/* Meta chips preview */}
            <div className="p-space-md rounded-2xl bg-surface-container-low flex flex-col gap-space-sm">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                  <span>22 pages</span>
                  <span className="text-outline">•</span>
                  <span>14 Oct 2026</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                  High Risk (84.1)
                </span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Source Status</span>
                  <span className="font-body-md text-body-md text-on-surface font-medium">Counterparty Proposed Redlines</span>
                </div>
                <span className="material-symbols-outlined text-primary text-[22px]">pending_actions</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Overall Risk Shift & Comparison Summary */}
        <div className="rounded-3xl bg-surface-container-low p-space-lg md:p-space-xl shadow-sm flex flex-col gap-space-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-error-container text-on-error-container font-label-md text-label-md font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">warning</span>
                  Risk Escalated: MODERATE → HIGH
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">+48 Exposure Points</span>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface leading-relaxed max-w-4xl pt-1">
                Version 2.4 introduces 4 material modifications that significantly increase vendor exposure, most notably removing the indemnification ceiling in Section 14.2 and extending customer termination notice from 30 to 90 days.
              </p>
            </div>
            {/* Inline Visual Indicator Gauge */}
            <div className="flex items-center gap-space-md bg-surface-container-lowest p-space-md rounded-2xl shrink-0 shadow-sm">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-surface-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                  <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="78, 100" strokeLinecap="round" strokeWidth="3.5"></path>
                </svg>
                <span className="absolute font-headline-sm text-headline-sm text-on-surface leading-none font-bold">78%</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Variance Severity</span>
                <span className="font-title-md text-title-md text-on-surface font-semibold">Major Divergence</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Requires General Counsel Signoff</span>
              </div>
            </div>
          </div>
          {/* Quick stat pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md pt-space-xs">
            <div className="bg-surface-container-lowest p-space-md rounded-2xl flex items-center justify-between shadow-sm">
              <div className="flex flex-col">
                <span className="font-display-lg-mobile text-display-lg-mobile text-on-surface font-bold leading-none">7</span>
                <span className="font-label-md text-label-md text-on-surface-variant mt-1">Changed Clauses</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">edit_document</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-space-md rounded-2xl flex items-center justify-between shadow-sm">
              <div className="flex flex-col">
                <span className="font-display-lg-mobile text-display-lg-mobile text-on-surface font-bold leading-none">2</span>
                <span className="font-label-md text-label-md text-on-surface-variant mt-1">New Obligations Added</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-space-md rounded-2xl flex items-center justify-between shadow-sm">
              <div className="flex flex-col">
                <span className="font-display-lg-mobile text-display-lg-mobile text-on-surface font-bold leading-none">1</span>
                <span className="font-label-md text-label-md text-on-surface-variant mt-1">Protection Clause Deleted</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-error-container flex items-center justify-center text-on-error-container">
                <span className="material-symbols-outlined text-[20px]">remove_circle</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Detailed Clause Deep Dive Section */}
        <div className="flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-widest">
                <span className="material-symbols-outlined text-[16px]">rule</span>
                <span>In-Depth Inspection</span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
                Active Diff Reader · Section 14.2 Limitation of Liability
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                Critical Redline
              </span>
              <button className="h-9 px-3 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md flex items-center gap-1" type="button">
                <span className="material-symbols-outlined text-[16px]">check</span>
                <span>Accept V1 Baseline</span>
              </button>
            </div>
          </div>
          {/* Side-by-Side Diff Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter bg-surface-container-lowest rounded-3xl p-space-lg shadow-sm">
            {/* Left Side: V1 Original */}
            <div className="flex flex-col gap-space-sm bg-surface-container-low p-space-md rounded-2xl">
              <div className="flex items-center justify-between pb-space-xs">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">v1.0 Original Language</span>
                <span className="text-outline font-label-sm text-label-sm">Lines 342-356</span>
              </div>
              <div className="font-body-md text-body-md text-on-surface leading-relaxed flex flex-col gap-2">
                <p>
                  14.2 <span className="font-semibold">Aggregate Liability Cap.</span> Except for gross negligence or willful misconduct, in no event shall either party's cumulative liability under this Agreement exceed 
                  <span className="px-1.5 py-0.5 rounded bg-error-container text-on-error-container line-through font-medium ml-1">the total fees paid or payable by Customer in the twelve (12) months preceding the incident</span>.
                </p>
                <p className="text-on-surface-variant">
                  Neither party shall be liable to the other for any indirect, consequential, punitive, or special damages, including lost revenue or anticipated profits.
                </p>
              </div>
              <div className="mt-auto pt-space-xs flex items-center justify-between text-outline font-body-sm text-body-sm">
                <span>Status: Mutual Protections Active</span>
                <span className="material-symbols-outlined text-[16px]">lock</span>
              </div>
            </div>
            {/* Right Side: V2 Proposed Redline */}
            <div className="flex flex-col gap-space-sm bg-surface-container-low p-space-md rounded-2xl">
              <div className="flex items-center justify-between pb-space-xs">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">v2.4 Counterparty Markups</span>
                <span className="text-outline font-label-sm text-label-sm">Lines 360-379</span>
              </div>
              <div className="font-body-md text-body-md text-on-surface leading-relaxed flex flex-col gap-2">
                <p>
                  14.2 <span className="font-semibold">Aggregate Liability Cap.</span> Except for gross negligence or willful misconduct, in no event shall either party's cumulative liability under this Agreement exceed 
                  <span className="px-1.5 py-0.5 rounded bg-surface-container text-primary font-semibold underline decoration-secondary decoration-2 mx-1">+ five times (5x) total contract value</span>, 
                  <span className="px-1.5 py-0.5 rounded bg-surface-container text-primary font-semibold underline decoration-secondary decoration-2">+ provided that indemnification for data incidents and regulatory fines shall be completely uncapped</span>.
                </p>
                <p className="text-on-surface">
                  Customer shall retain the unconditional right to seek punitive and restitution damages in cases involving personal identifiable health records.
                </p>
              </div>
              <div className="mt-auto pt-space-xs flex items-center justify-between text-on-error-container font-body-sm text-body-sm">
                <span className="flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[16px]">warning</span>
                  Unlimited indemnity exposure created
                </span>
                <span className="font-label-sm text-label-sm bg-surface-container-highest px-2 py-0.5 rounded">High Severity</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Clause Differences Table */}
        <div className="flex flex-col gap-space-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
                Clause Differences Inventory
              </h2>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Itemized log of clause updates, structural deletions, and incoming additions</span>
            </div>
            {/* Filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
              {[
                { label: 'All', count: 10 },
                { label: 'Critical', count: 4 },
                { label: 'Changed', count: 7 },
                { label: 'Added', count: 2 },
                { label: 'Removed', count: 1 }
              ].map(f => (
                <button 
                  key={f.label}
                  className={`px-3 py-1.5 rounded-xl font-label-sm text-label-sm transition-colors whitespace-nowrap ${filter === f.label ? 'bg-primary text-on-primary font-semibold tracking-wide shadow-sm' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'}`}
                  onClick={() => setFilter(f.label)}
                >
                  {f.label} ({f.count})
                </button>
              ))}
            </div>
          </div>
          {/* Table Container */}
          <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-gutter px-space-lg py-space-md bg-surface-container-low text-outline font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              <div className="col-span-12 md:col-span-3">Clause & Section</div>
              <div className="hidden md:block md:col-span-3">Version 1 (Original)</div>
              <div className="hidden md:block md:col-span-4">Version 2 (Revised)</div>
              <div className="col-span-12 md:col-span-2 text-right">Significance</div>
            </div>
            
            {/* Row 1: Section 14.2 (Critical Changed) */}
            {(filter === 'All' || filter === 'Critical' || filter === 'Changed') && (
              <div className="grid grid-cols-12 gap-gutter px-space-lg py-space-lg hover:bg-surface-container-low/50 transition-colors items-center border-b border-surface-container-low/50 last:border-0">
                <div className="col-span-12 md:col-span-3 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-title-md text-title-md text-on-surface font-bold">14.2</span>
                    <span className="font-body-md text-body-md text-on-surface font-semibold">Limitation of Liability</span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Commercial Risk & Indemnities</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">Changed</span>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-3 text-on-surface-variant font-body-sm text-body-sm leading-relaxed">
                  <div className="p-space-sm rounded-xl bg-surface-container-low">
                    Liability capped at <span className="font-semibold text-on-surface">12 months paid fees</span>. Includes standard exclusions for willful default.
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4 text-on-surface font-body-sm text-body-sm leading-relaxed">
                  <div className="p-space-sm rounded-xl bg-surface-container text-on-surface">
                    Cap raised to <span className="font-bold text-primary">5x contract value</span>. <span className="font-bold text-primary">Uncapped liability</span> for data incidents and regulatory fines.
                  </div>
                </div>
                <div className="col-span-12 md:col-span-2 flex flex-col items-end gap-1.5 justify-center">
                  <span className="px-3 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold tracking-wide">
                    CRITICAL
                  </span>
                  <span className="font-body-sm text-body-sm text-outline">+48 Risk Impact</span>
                </div>
              </div>
            )}
            
            {/* Row 2: Section 11.4 Termination Notice */}
            {(filter === 'All' || filter === 'Changed') && (
              <div className="grid grid-cols-12 gap-gutter px-space-lg py-space-lg bg-surface-container-lowest/70 hover:bg-surface-container-low/50 transition-colors items-center border-b border-surface-container-low/50 last:border-0">
                <div className="col-span-12 md:col-span-3 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-title-md text-title-md text-on-surface font-bold">11.4</span>
                    <span className="font-body-md text-body-md text-on-surface font-semibold">Termination Notice</span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Contract Lifecycle</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">Changed</span>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-3 text-on-surface-variant font-body-sm text-body-sm leading-relaxed">
                  <div className="p-space-sm rounded-xl bg-surface-container-low">
                    Customer or Vendor may terminate for convenience with <span className="font-semibold text-on-surface">30 days written notice</span>.
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4 text-on-surface font-body-sm text-body-sm leading-relaxed">
                  <div className="p-space-sm rounded-xl bg-surface-container text-on-surface">
                    Customer notice extended to <span className="font-bold text-primary">90 days written notice</span> with mandatory transition assistance obligations.
                  </div>
                </div>
                <div className="col-span-12 md:col-span-2 flex flex-col items-end gap-1.5 justify-center">
                  <span className="px-3 py-1 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm font-bold tracking-wide">
                    MODERATE
                  </span>
                  <span className="font-body-sm text-body-sm text-outline">+14 Risk Impact</span>
                </div>
              </div>
            )}
            
            {/* Row 3: Section 8.1 Data Breach Notification SLA (Added) */}
            {(filter === 'All' || filter === 'Critical' || filter === 'Added') && (
              <div className="grid grid-cols-12 gap-gutter px-space-lg py-space-lg hover:bg-surface-container-low/50 transition-colors items-center border-b border-surface-container-low/50 last:border-0">
                <div className="col-span-12 md:col-span-3 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-title-md text-title-md text-on-surface font-bold">8.1</span>
                    <span className="font-body-md text-body-md text-on-surface font-semibold">Data Breach Notification</span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Information Security</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-md bg-surface-container-highest text-secondary font-label-sm text-label-sm font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">add</span> Added
                    </span>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-3 text-on-surface-variant font-body-sm text-body-sm leading-relaxed italic">
                  <div className="p-space-sm rounded-xl bg-surface-container-low/50 text-outline">
                    [Provision absent in v1.0 baseline]
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4 text-on-surface font-body-sm text-body-sm leading-relaxed">
                  <div className="p-space-sm rounded-xl bg-surface-container-high text-on-surface font-medium">
                    Mandatory breach notification within <span className="font-bold text-primary">24 hours of suspected compromise</span>, accompanied by forensic audit logs.
                  </div>
                </div>
                <div className="col-span-12 md:col-span-2 flex flex-col items-end gap-1.5 justify-center">
                  <span className="px-3 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold tracking-wide">
                    CRITICAL
                  </span>
                  <span className="font-body-sm text-body-sm text-outline">+26 Risk Impact</span>
                </div>
              </div>
            )}
            
            {/* Row 4: Section 19.3 Governing Law & Jurisdiction */}
            {(filter === 'All' || filter === 'Changed') && (
              <div className="grid grid-cols-12 gap-gutter px-space-lg py-space-lg bg-surface-container-lowest/70 hover:bg-surface-container-low/50 transition-colors items-center border-b border-surface-container-low/50 last:border-0">
                <div className="col-span-12 md:col-span-3 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-title-md text-title-md text-on-surface font-bold">19.3</span>
                    <span className="font-body-md text-body-md text-on-surface font-semibold">Governing Jurisdiction</span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Legal Operations</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">Changed</span>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-3 text-on-surface-variant font-body-sm text-body-sm leading-relaxed">
                  <div className="p-space-sm rounded-xl bg-surface-container-low">
                    State of Delaware, United States; disputes resolved via AAA commercial arbitration.
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4 text-on-surface font-body-sm text-body-sm leading-relaxed">
                  <div className="p-space-sm rounded-xl bg-surface-container text-on-surface">
                    Shifted to <span className="font-bold text-primary">Supreme Court of New York (Commercial Division)</span>; waiver of jury trial retained.
                  </div>
                </div>
                <div className="col-span-12 md:col-span-2 flex flex-col items-end gap-1.5 justify-center">
                  <span className="px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm font-bold tracking-wide">
                    MINOR
                  </span>
                  <span className="font-body-sm text-body-sm text-outline">+2 Risk Impact</span>
                </div>
              </div>
            )}
            
            {/* Row 5: Section 22.1 Mutual Non-Solicitation (Removed) */}
            {(filter === 'All' || filter === 'Removed') && (
              <div className="grid grid-cols-12 gap-gutter px-space-lg py-space-lg hover:bg-surface-container-low/50 transition-colors items-center border-b border-surface-container-low/50 last:border-0">
                <div className="col-span-12 md:col-span-3 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-title-md text-title-md text-on-surface font-bold">22.1</span>
                    <span className="font-body-md text-body-md text-on-surface font-semibold">Mutual Non-Solicitation</span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Personnel Covenant</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-md bg-error-container text-on-error-container font-label-sm text-label-sm font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">remove</span> Removed
                    </span>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-3 text-on-surface-variant font-body-sm text-body-sm leading-relaxed">
                  <div className="p-space-sm rounded-xl bg-error-container text-on-error-container line-through">
                    Neither party shall recruit, solicit, or hire specialized engineering staff during term + 12 mos.
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4 text-on-surface-variant font-body-sm text-body-sm leading-relaxed italic">
                  <div className="p-space-sm rounded-xl bg-surface-container-low/50 text-outline">
                    [Clause entirely struck through in v2.4 redline proposal]
                  </div>
                </div>
                <div className="col-span-12 md:col-span-2 flex flex-col items-end gap-1.5 justify-center">
                  <span className="px-3 py-1 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm font-bold tracking-wide">
                    MODERATE
                  </span>
                  <span className="font-body-sm text-body-sm text-outline">+12 Risk Impact</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Editorial Synthesis Bar / Bottom CTA */}
        <div className="p-space-lg rounded-3xl bg-surface-container-lowest shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-2xl bg-secondary-fixed flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[24px]">assignment_turned_in</span>
            </div>
            <div className="flex flex-col">
              <span className="font-title-md text-title-md text-on-surface font-semibold">Generate Negotiation Counter-Proposal</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Velum AI can craft suggested counter-language preserving your liability ceiling while honoring SLA updates.</span>
            </div>
          </div>
          <div className="flex items-center gap-space-xs shrink-0 w-full sm:w-auto">
            <button className="h-11 px-space-md rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md w-full sm:w-auto" type="button">
              Reject All Markups
            </button>
            <button className="h-11 px-space-md rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-colors font-label-md text-label-md font-semibold tracking-wide shadow-sm w-full sm:w-auto flex items-center justify-center gap-1.5" type="button">
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span>Draft Counter-Terms</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareDocuments;
