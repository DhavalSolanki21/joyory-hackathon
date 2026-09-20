import React, { useState } from 'react';

const DocumentDetails = () => {
  const [isRawExpanded, setIsRawExpanded] = useState(false);
  const [qaInput, setQaInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'user',
      content: 'What are the termination notice requirements and penalties?',
      timestamp: '10:42 AM'
    },
    {
      role: 'assistant',
      content: (
        <>
          <p>
            Either party may terminate for convenience with <span className="font-semibold text-primary">90 days prior written notice</span>, subject to an early termination penalty equal to <span className="font-semibold text-primary">50% of the remaining term fees</span>.
          </p>
          {/* Verified Citation Card */}
          <div className="mt-space-xs p-space-sm rounded-xl bg-surface-container-lowest shadow-xs flex flex-col gap-1">
            <div className="flex items-center gap-1 text-primary font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[14px]">format_quote</span>
              <span>Section 11.2 — Termination for Convenience</span>
            </div>
            <blockquote className="italic text-body-sm font-body-sm text-on-surface-variant pl-2 border-l-2 border-secondary-container">
              "In the event Customer terminates without cause prior to the expiration of the Initial Term, Customer shall pay fifty percent (50%) of all remaining monthly minimum fees through the end of such Term within thirty (30) days of termination."
            </blockquote>
          </div>
        </>
      ),
      citation: 'Cited from Page 14'
    },
    {
      role: 'user',
      content: 'Is indemnification capped for data security breaches?',
      timestamp: '10:44 AM'
    },
    {
      role: 'assistant',
      content: (
        <>
          <p>
            <strong className="text-error font-semibold">No.</strong> Section 14.2 explicitly stipulates that indemnification obligations arising from breaches of Section 8 (Confidentiality & Data Security) are <span className="font-semibold text-on-surface">expressly excluded</span> from the aggregate liability cap.
          </p>
          {/* Citation Card */}
          <div className="mt-space-xs p-space-sm rounded-xl bg-surface-container-lowest shadow-xs flex flex-col gap-1">
            <div className="flex items-center gap-1 text-primary font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[14px]">format_quote</span>
              <span>Section 14.2 — Aggregate Liability Exceptions</span>
            </div>
            <blockquote className="italic text-body-sm font-body-sm text-on-surface-variant pl-2 border-l-2 border-error/40">
              "...Liabilities arising from breaches of Section 8 or indemnification obligations shall NOT be subject to the 12-month trailing fee aggregate cap."
            </blockquote>
          </div>
        </>
      ),
      citation: 'Cited from Page 19'
    }
  ]);

  const handleAskQuestion = (e) => {
    e.preventDefault();
    if (!qaInput.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        role: 'user',
        content: qaInput.trim(),
        timestamp: 'Just now'
      }
    ]);
    setQaInput('');

    // Simulate response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: (
            <>
              <p>
                According to the terms of this Master Cloud Agreement, this item is governed under <span className="font-semibold text-primary">Delaware statutory provisions</span>. Custom API middleware engineered for Solaria retains a shared intellectual property license under clause 9.3 unless explicitly disclaimed via an addendum.
              </p>
              <div className="mt-space-xs p-space-sm rounded-xl bg-surface-container-lowest shadow-xs flex flex-col gap-1">
                <div className="flex items-center gap-1 text-primary font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[14px]">format_quote</span>
                  <span>Section 9.3 — Intellectual Property Rights</span>
                </div>
                <blockquote className="italic text-body-sm font-body-sm text-on-surface-variant pl-2 border-l-2 border-secondary-container">
                  "All integration scripts, API endpoints, and middleware workflows co-developed during setup shall be subject to a non-exclusive, perpetual cross-license."
                </blockquote>
              </div>
            </>
          ),
          citation: 'Verified Citation • Section 9.3'
        }
      ]);
    }, 700);
  };

  const setSuggestedPrompt = (prompt) => {
    setQaInput(prompt);
  };

  const scrollToQaPanel = () => {
    const qaPanel = document.getElementById('qa-panel');
    if (qaPanel) {
      qaPanel.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('qa-input').focus();
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Document Header & Meta Strip */}
      <section className="w-full flex flex-col gap-space-lg mb-space-xl">
        {/* Breadcrumb and Document Status Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs text-outline">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Contract Dossier</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Master Services</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="font-label-sm text-label-sm text-outline">REF-2026-APX-841</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-medium">
              Enterprise Cloud Services Agreement — Apex Global Corp.pdf
            </h1>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-space-sm">
            <button 
              className="h-11 px-space-md rounded-xl bg-primary text-on-primary font-label-md text-label-md flex items-center gap-space-xs shadow-sm hover:bg-primary-container transition-all" 
              onClick={scrollToQaPanel}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">forum</span>
              <span>Ask Question</span>
            </button>
            <button className="h-11 px-space-md rounded-xl bg-surface-container-lowest text-on-surface font-label-md text-label-md flex items-center gap-space-xs hover:bg-secondary-fixed transition-colors shadow-sm" type="button">
              <span className="material-symbols-outlined text-[18px]">difference</span>
              <span>Compare with v1.2</span>
            </button>
            <button className="h-11 px-space-md rounded-xl bg-surface-container-lowest text-on-surface font-label-md text-label-md flex items-center gap-space-xs hover:bg-secondary-fixed transition-colors shadow-sm" type="button">
              <span className="material-symbols-outlined text-[18px]">file_download</span>
              <span>Export PDF Audit</span>
            </button>
            <button className="h-11 px-space-md rounded-xl bg-surface-container-low text-error font-label-md text-label-md flex items-center gap-space-xs hover:bg-error-container hover:text-on-error-container transition-colors shadow-sm" type="button">
              <span className="material-symbols-outlined text-[18px]">delete</span>
              <span>Delete</span>
            </button>
          </div>
        </div>
        {/* Metadata Attributes Bar */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-wrap items-center justify-between gap-space-md">
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="flex items-center gap-space-xs px-3 py-1.5 rounded-xl bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-primary">description</span>
              <span className="text-outline">Type:</span>
              <span className="font-semibold text-on-surface">Master Cloud Agreement</span>
            </div>
            <div className="flex items-center gap-space-xs px-3 py-1.5 rounded-xl bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-secondary">schedule</span>
              <span className="text-outline">Uploaded:</span>
              <span className="font-semibold text-on-surface">14 Oct 2026 by Elena Rostova</span>
            </div>
            <div className="flex items-center gap-space-xs px-3 py-1.5 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="font-semibold">Analysis Complete</span>
            </div>
          </div>
          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Overall Risk Profile:</span>
              <span className="px-3 py-1 rounded-xl bg-error-container text-on-error-container font-label-sm text-label-sm font-bold tracking-wide flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
                HIGH RISK
              </span>
            </div>
            <div className="h-4 w-px bg-surface-container-highest"></div>
            <div className="text-outline font-label-sm text-label-sm">
              Integrity Score: <span className="text-primary font-bold">68 / 100</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Flagship 2-Column Asymmetric Workspace (70% Analysis / 30% Assistant) */}
      <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-gutter items-start">
        {/* Left Column: 70% Analysis & Risk Dossier (8 cols on 12-grid) */}
        <main className="xl:col-span-8 flex flex-col gap-space-xl min-w-0">
          {/* 1. AI Executive Summary (Featured Editorial Card) */}
          <section className="relative overflow-hidden rounded-2xl bg-surface-container-low p-space-lg shadow-sm">
            <div className="flex items-center justify-between gap-space-md mb-space-md">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-xl bg-secondary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                  Executive <span className="italic font-headline-md text-primary">Synthesis</span>
                </h2>
              </div>
              <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-lg bg-surface-container-lowest text-primary font-semibold">Velum LLM v4.8 (Legal fine-tuned)</span>
            </div>
            <div className="text-on-surface-variant font-body-lg text-body-lg leading-relaxed flex flex-col gap-space-md">
              <p>
                The submitted <span className="font-semibold text-on-surface">Enterprise Cloud Services Agreement</span> governs a triennial SaaS infrastructure arrangement between Apex Global Corp and Solaria Health Systems. While general terms align with industry standards for tier-1 telemetry services, the document introduces <span className="text-error font-semibold underline decoration-error/30 decoration-2 underline-offset-4">severe asymmetric liability exposure</span> in data compromise scenarios.
              </p>
              <p className="font-body-md text-body-md text-outline">
                Key friction points center around Section 14.2 (uninhibited provider indemnity carve-outs), Section 11.2 (aggressive 90-day auto-renewal notification traps), and a stark absence of explicit GDPR/HIPAA Business Associate Appendices despite dealing directly with clinical diagnostic data streams.
              </p>
            </div>
            {/* Metric micro-strip */}
            <div className="mt-space-lg pt-space-md grid grid-cols-2 md:grid-cols-4 gap-space-md">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Clauses Audited</span>
                <span className="font-headline-sm text-headline-sm text-on-surface mt-0.5">84 Provisions</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">High Hazards</span>
                <span className="font-headline-sm text-headline-sm text-error mt-0.5">1 Critical</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Medium Hazards</span>
                <span className="font-headline-sm text-headline-sm text-[#C5964A] mt-0.5">2 Detected</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Missing Schedules</span>
                <span className="font-headline-sm text-headline-sm text-primary mt-0.5">3 Addenda</span>
              </div>
            </div>
          </section>
          
          {/* 2. Key Information Grid */}
          <section className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[20px] text-primary">fact_check</span>
                <h3 className="font-title-md text-title-md text-on-surface font-semibold">Structured Core Terms</h3>
              </div>
              <span className="font-label-sm text-label-sm text-outline">Extracted via Canonical Extraction Pipeline</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              {/* Parties */}
              <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px] text-primary">groups</span>
                  Contracting Parties
                </div>
                <p className="font-body-md text-body-md text-on-surface font-semibold mt-1">
                  Apex Global Corp <span className="font-normal text-outline text-body-sm">(Provider)</span> &amp; Solaria Health Systems <span className="font-normal text-outline text-body-sm">(Client)</span>
                </p>
                <span className="text-body-sm font-body-sm text-on-surface-variant">Both corporate entities organized under Delaware state statute.</span>
              </div>
              {/* Value */}
              <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px] text-primary">payments</span>
                  Contract Valuation
                </div>
                <p className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5">
                  $380,000 <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">/ Annual Recurring Base</span>
                </p>
                <span className="text-body-sm font-body-sm text-on-surface-variant">Plus tiered compute overage fees billing monthly in arrears.</span>
              </div>
              {/* Dates */}
              <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px] text-primary">event_repeat</span>
                  Term &amp; Horizon
                </div>
                <div className="flex items-center gap-space-md mt-1">
                  <div>
                    <span className="text-body-sm font-body-sm text-outline block">Effective Date</span>
                    <span className="font-body-md text-body-md font-semibold text-on-surface">01 Nov 2026</span>
                  </div>
                  <span className="material-symbols-outlined text-outline-variant text-[16px]">arrow_forward</span>
                  <div>
                    <span className="text-body-sm font-body-sm text-outline block">Expiration Date</span>
                    <span className="font-body-md text-body-md font-semibold text-on-surface">31 Oct 2029 (3-Year Term)</span>
                  </div>
                </div>
              </div>
              {/* Payment Terms */}
              <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px] text-primary">account_balance_wallet</span>
                  Payment &amp; Invoicing Terms
                </div>
                <p className="font-body-md text-body-md text-on-surface font-semibold mt-1">
                  Net 30 Days from invoice receipt
                </p>
                <span className="text-body-sm font-body-sm text-error font-medium">1.5% monthly late interest applied after day 31.</span>
              </div>
              {/* Dispute */}
              <div className="md:col-span-2 bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex items-center justify-between flex-wrap gap-space-md">
                <div className="flex items-center gap-space-md">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">gavel</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Jurisdiction, Governing Law &amp; Venue</span>
                    <span className="font-body-md text-body-md font-semibold text-on-surface">State of Delaware; Mandatory AAA Commercial Arbitration in Wilmington</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-xl bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">Section 18.4</span>
              </div>
            </div>
          </section>
          
          {/* 3. Compliance & Risk Audit */}
          <section className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[20px] text-error">warning</span>
                <h3 className="font-title-md text-title-md text-on-surface font-semibold">Compliance &amp; Risk Vulnerability Audit</h3>
              </div>
              <span className="font-label-sm text-label-sm text-outline">3 items identified for renegotiation</span>
            </div>
            <div className="flex flex-col gap-space-sm">
              {/* Risk 1: High */}
              <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-xs transition-all hover:bg-surface-container-low">
                <div className="flex items-center justify-between gap-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <span className="px-2.5 py-0.5 rounded-lg bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">HIGH SEVERITY</span>
                    <h4 className="font-title-md text-title-md text-on-surface font-semibold">Uncapped Liability on Data Incidents</h4>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-semibold">Clause 14.2</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                  Clause 14.2 explicitly exempts security incidents, patient record disclosures, and cyber intrusions from the standard aggregate 12-month trailing fee limitation of liability cap. In case of a breach, Solaria Health Systems retains virtually infinite liability exposure without reciprocal provider guarantees.
                </p>
                <div className="mt-space-xs flex items-center justify-between pt-space-xs">
                  <span className="text-body-sm font-body-sm text-outline flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">psychology</span> Recommended Redline: Cap data liabilities at 2x annual contract value ($760,000).
                  </span>
                  <button className="text-primary font-label-sm text-label-sm font-semibold flex items-center gap-1 hover:underline" type="button">
                    View in Document <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </button>
                </div>
              </div>
              {/* Risk 2: Medium */}
              <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-xs transition-all hover:bg-surface-container-low">
                <div className="flex items-center justify-between gap-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <span className="px-2.5 py-0.5 rounded-lg bg-[#faedd9] text-[#8e5a1b] font-label-sm text-label-sm font-bold">MEDIUM SEVERITY</span>
                    <h4 className="font-title-md text-title-md text-on-surface font-semibold">Unilateral Auto-Renewal with 90-Day Opt-Out Window</h4>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-semibold">Clause 11.2</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                  Requires certified written notice 90 calendar days prior to the annual renewal date, or the contract auto-renews for consecutive 1-year terms. If not marked in internal vendor calendars by August 2, 2029, commitment extends automatically into 2030 with a 7% mandatory indexation rate hike.
                </p>
                <div className="mt-space-xs flex items-center justify-between pt-space-xs">
                  <span className="text-body-sm font-body-sm text-outline flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">psychology</span> Recommended Redline: Shorten notification horizon from 90 days to 30 days.
                  </span>
                  <button className="text-primary font-label-sm text-label-sm font-semibold flex items-center gap-1 hover:underline" type="button">
                    View in Document <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </button>
                </div>
              </div>
              {/* Risk 3: Medium */}
              <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-xs transition-all hover:bg-surface-container-low">
                <div className="flex items-center justify-between gap-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <span className="px-2.5 py-0.5 rounded-lg bg-[#faedd9] text-[#8e5a1b] font-label-sm text-label-sm font-bold">MEDIUM SEVERITY</span>
                    <h4 className="font-title-md text-title-md text-on-surface font-semibold">Ambiguous IP Assignment in Custom Integrations</h4>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-semibold">Clause 9.3</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                  Clause 9.3 creates potential shared ownership over custom API middleware and telemetry webhooks engineered during the implementation phase, possibly granting Apex Global rights to commercialize Solaria's internal workflow schemas to third parties.
                </p>
                <div className="mt-space-xs flex items-center justify-between pt-space-xs">
                  <span className="text-body-sm font-body-sm text-outline flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">psychology</span> Recommended Redline: Sole ownership of custom schemas must vest in Customer.
                  </span>
                  <button className="text-primary font-label-sm text-label-sm font-semibold flex items-center gap-1 hover:underline" type="button">
                    View in Document <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
          
          {/* 4. Missing & Omitted Clauses */}
          <section className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[20px] text-tertiary">rule</span>
              <h3 className="font-title-md text-title-md text-on-surface font-semibold">Missing Protective Instruments</h3>
            </div>
            <p className="font-body-md text-body-md text-outline">
              Standard enterprise benchmark contracts of this tier typically include specialized protections that are omitted in this draft:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                <div className="w-8 h-8 rounded-lg bg-secondary-fixed text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">security</span>
                </div>
                <span className="font-title-md text-title-md text-on-surface font-semibold mt-1">Data Protection DPA Appendix</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Absence of standardized EU/US Standard Contractual Clauses or HIPAA Business Associate safeguards.</p>
              </div>
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                <div className="w-8 h-8 rounded-lg bg-secondary-fixed text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">cloud_sync</span>
                </div>
                <span className="font-title-md text-title-md text-on-surface font-semibold mt-1">BC / DR &amp; RTO/RPO Commitments</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">No contractual ceiling on downtime recovery time objectives (RTO) or recovery point objectives (RPO).</p>
              </div>
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                <div className="w-8 h-8 rounded-lg bg-secondary-fixed text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">price_change</span>
                </div>
                <span className="font-title-md text-title-md text-on-surface font-semibold mt-1">Benchmarking &amp; Price Caps</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Lacks an annual price escalation ceiling (CPI indexation) after expiration of the initial 3-year term.</p>
              </div>
            </div>
          </section>
          
          {/* 5. Raw Document Text Viewer (Collapsible) */}
          <section className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between flex-wrap gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">article</span>
                </div>
                <div>
                  <h3 className="font-title-md text-title-md text-on-surface font-semibold">Extracted Legal Text Engine</h3>
                  <span className="font-body-sm text-body-sm text-outline">OCR Verified • 24,810 words across 38 pages</span>
                </div>
              </div>
              <button 
                className="h-9 px-space-md rounded-xl bg-surface-container text-primary font-label-md text-label-md flex items-center gap-space-xs hover:bg-secondary-fixed transition-colors" 
                onClick={() => setIsRawExpanded(!isRawExpanded)}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">{isRawExpanded ? 'expand_less' : 'expand_more'}</span>
                <span>{isRawExpanded ? 'Hide Raw Document View' : 'Expand Raw Document View'}</span>
              </button>
            </div>
            
            <div className={`transition-all duration-300 ${isRawExpanded ? '' : 'hidden'}`}>
              <div className="bg-surface-container-low rounded-xl p-space-md font-mono text-body-sm text-on-surface leading-relaxed max-h-96 overflow-y-auto select-text">
                <div className="flex gap-4">
                  <div className="text-outline select-none font-mono text-right w-8 space-y-1">
                    <div>01</div><div>02</div><div>03</div><div>04</div><div>05</div><div>06</div><div>07</div><div>08</div><div>09</div><div>10</div><div>11</div><div>12</div><div>13</div><div>14</div><div>15</div><div>16</div><div>17</div><div>18</div>
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="text-primary font-bold">SECTION 11 — TERM AND TERMINATION</div>
                    <div className="text-on-surface-variant">11.1 Term. This Agreement shall commence on the Effective Date and continue for 36 months.</div>
                    <div className="bg-secondary-fixed-dim/40 rounded px-1 text-on-secondary-fixed">11.2 Termination for Convenience. Either party may terminate for convenience with 90 days prior written notice, subject to payment of early termination fees equal to 50% of remaining term fees.</div>
                    <div className="text-on-surface-variant">11.3 Termination for Cause. Either party may terminate immediately upon written notice if the other party breaches.</div>
                    <div>&nbsp;</div>
                    <div className="text-primary font-bold">SECTION 14 — LIMITATION OF LIABILITY &amp; INDEMNITY</div>
                    <div className="text-on-surface-variant">14.1 Consequential Damages Waiver. NEITHER PARTY SHALL BE LIABLE FOR INDIRECT OR SPECIAL DAMAGES.</div>
                    <div className="bg-error-container/60 rounded px-1 text-on-error-container font-semibold">14.2 Aggregate Liability Exceptions. NOTWITHSTANDING SECTION 14.1, LIABILITIES ARISING FROM BREACHES OF SECTION 8 (CONFIDENTIALITY AND SECURITY) OR INDEMNIFICATION OBLIGATIONS SHALL NOT BE SUBJECT TO THE 12-MONTH FEE AGGREGATE CAP.</div>
                    <div className="text-on-surface-variant">14.3 Cap Amount. In all other cases, maximum liability shall not exceed fees paid in the twelve (12) months preceding the claim.</div>
                    <div>&nbsp;</div>
                    <div className="text-primary font-bold">SECTION 18 — GOVERNING LAW &amp; ARBITRATION</div>
                    <div className="text-on-surface-variant">18.1 Delaware Law. This Agreement is governed by the laws of the State of Delaware.</div>
                    <div className="text-on-surface-variant">18.2 Dispute Resolution. Disputes resolved through binding arbitration administered by the AAA in Wilmington, DE.</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        {/* Right Column: 30% Interactive Document Q&A Panel (4 cols on 12-grid) */}
        <aside className="xl:col-span-4 bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col h-[calc(100vh-6.5rem)] sticky top-20 min-w-0" id="qa-panel">
          {/* Assistant Header */}
          <div className="pb-space-md border-b border-surface-container-high flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">psychology</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight">Contract Assistant</h3>
                <span className="font-body-sm text-body-sm text-outline">Grounded Q&amp;A • Verified citations</span>
              </div>
            </div>
            <button 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors" 
              title="Clear conversation" 
              onClick={() => setMessages([])}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            </button>
          </div>
          
          {/* Dialogue Stream */}
          <div className="flex-1 overflow-y-auto py-space-md flex flex-col gap-space-md pr-1">
            {messages.map((msg, idx) => (
              msg.role === 'user' ? (
                <div key={idx} className="flex flex-col items-end gap-1">
                  <div className="bg-secondary-fixed text-on-secondary-fixed rounded-2xl rounded-tr-xs px-4 py-2.5 max-w-[88%] font-body-md text-body-md shadow-xs">
                    {msg.content}
                  </div>
                  <span className="font-label-sm text-label-sm text-outline px-1">{msg.timestamp}</span>
                </div>
              ) : (
                <div key={idx} className="flex flex-col items-start gap-1">
                  <div className="bg-surface-container-low text-on-surface rounded-2xl rounded-tl-xs p-space-md max-w-[95%] font-body-md text-body-md shadow-xs flex flex-col gap-space-xs">
                    {msg.content}
                  </div>
                  <span className="font-label-sm text-label-sm text-outline px-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-primary">verified</span> {msg.citation}
                  </span>
                </div>
              )
            ))}
          </div>
          
          {/* Quick Suggested Query Chips */}
          <div className="pt-space-sm flex flex-col gap-space-xs">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Suggested Queries</span>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              <button 
                className="shrink-0 px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors" 
                onClick={() => setSuggestedPrompt('Summarize IP ownership')}
                type="button"
              >
                Summarize IP ownership
              </button>
              <button 
                className="shrink-0 px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors" 
                onClick={() => setSuggestedPrompt('Check indemnity limits')}
                type="button"
              >
                Check indemnity limits
              </button>
              <button 
                className="shrink-0 px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors" 
                onClick={() => setSuggestedPrompt('List late penalties')}
                type="button"
              >
                List late penalties
              </button>
            </div>
          </div>
          
          {/* Input Bar Form */}
          <form className="mt-space-sm pt-space-xs flex items-center gap-space-xs" onSubmit={handleAskQuestion}>
            <div className="relative flex-1">
              <input 
                className="w-full h-11 pl-3.5 pr-10 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary-container transition-all" 
                id="qa-input" 
                placeholder="Ask a question about this document..." 
                type="text"
                value={qaInput}
                onChange={(e) => setQaInput(e.target.value)}
              />
              <span className="material-symbols-outlined absolute right-3 top-2.5 text-outline text-[18px]">search</span>
            </div>
            <button className="h-11 px-4 rounded-xl bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center hover:bg-primary-container transition-colors shadow-xs" type="submit">
              <span>Ask</span>
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
};

export default DocumentDetails;
