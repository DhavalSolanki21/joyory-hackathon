import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DocumentQA = () => {
  const { id } = useParams();
  const [qaInput, setQaInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!qaInput.trim() || isTyping) return;

    const query = qaInput.trim();
    setQaInput('');
    setMessages(prev => [
      ...prev,
      {
        role: 'user',
        content: query,
        timestamp: 'Just now • Live Grounding',
        author: 'User',
        initials: 'US'
      }
    ]);
    
    setIsTyping(true);

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/documents/${id}/ask/`, {
        question: query
      });

      const data = response.data;

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: (
            <>
              <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                {data.answer}
              </p>
              {data.sources && data.sources.map((source, idx) => (
                <div key={idx} className="mt-2 rounded-2xl bg-tertiary-fixed/30 p-space-md flex flex-col gap-2.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <span className="material-symbols-outlined text-[18px]">balance</span>
                      <span className="font-label-md text-label-md tracking-tight">Source Excerpt</span>
                    </div>
                  </div>
                  <blockquote className="font-display-lg italic text-body-md text-on-surface-variant pl-3">
                    "{source.excerpt}"
                  </blockquote>
                </div>
              ))}
            </>
          ),
          confidence: data.confidence || 'N/A'
        }
      ]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: <p className="text-error">An error occurred while communicating with the assistant.</p>,
          confidence: 'Error'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePromptClick = (topic) => {
    setQaInput(`Tell me about the ${topic} in this contract.`);
    document.getElementById('qa-input').focus();
  };

  const handleSuggestedClick = (question) => {
    setQaInput(question);
    document.getElementById('qa-input').focus();
  };

  return (
    <div className="flex flex-col w-full relative">
      {/* Subtle Ambient Glow Overlay (strictly contained) */}
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-48 left-12 w-80 h-80 bg-secondary-fixed/20 rounded-full blur-2xl pointer-events-none -z-10"></div>
      
      {/* Top Breadcrumb & Quick Action Bar */}
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md mb-space-xl">
        <div className="flex flex-col gap-space-xs">
          <nav className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm flex-wrap">
            <span className="hover:text-primary transition-colors cursor-pointer">Workspace</span>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Intelligence Console</span>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Documents</span>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <span className="text-on-surface font-medium truncate max-w-[220px]">Enterprise Cloud Services Agreement</span>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <span className="text-primary font-semibold">Ask Questions</span>
          </nav>
          <div className="flex items-baseline gap-3 mt-1 flex-wrap">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              <span className="font-title-md text-title-md uppercase tracking-wider text-outline block mb-1">Interactive Inquiry Dossier</span>
              Ask About This <em className="font-headline-lg text-headline-lg text-primary italic font-normal">Document</em>
            </h1>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
            Query verified contract provisions, liability thresholds, and covenants with grounded source citations.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start lg:self-center">
          <button className="h-11 px-space-md rounded-2xl bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-all duration-200 flex items-center gap-2 shadow-sm" type="button">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Document</span>
          </button>
          <button className="h-11 px-space-md rounded-2xl bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md hover:bg-secondary-fixed-dim transition-all duration-200 flex items-center gap-2 shadow-sm" type="button">
            <span className="material-symbols-outlined text-[18px]">ios_share</span>
            <span>Export Transcript</span>
          </button>
        </div>
      </section>
      
      {/* Two-Column Editorial Tri-Fold Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* LEFT COLUMN: Primary Q&A Thread & Composer (approx 68% = 8 cols) */}
        <section className="lg:col-span-8 flex flex-col gap-space-lg min-w-0">
          {/* Live Thread Canvas */}
          <div className="flex flex-col gap-space-lg">
            {messages.map((msg, index) => (
              msg.role === 'user' ? (
                <article key={index} className="bg-surface-container-lowest rounded-3xl p-space-lg shadow-sm flex flex-col gap-space-md transition-all animate-fadeIn">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-md text-label-md shrink-0">
                      {msg.initials}
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">{msg.author}</span>
                        <time className="font-body-sm text-body-sm text-outline">{msg.timestamp}</time>
                      </div>
                      <p className="font-body-lg text-body-lg text-on-surface mt-1">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                </article>
              ) : (
                <article key={index} className="bg-surface-container-lowest rounded-3xl p-space-lg shadow-sm flex flex-col gap-space-md transition-all animate-fadeIn -mt-4">
                  <div className="flex items-start gap-3.5 mt-2">
                    <div className="w-9 h-9 rounded-2xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-[20px]">neurology</span>
                    </div>
                    <div className="flex flex-col min-w-0 flex-1 gap-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-label-md text-label-md text-primary font-bold tracking-wide">Velum Legal Assistant</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">Verified Grounded Citation</span>
                        </div>
                        <span className="font-body-sm text-body-sm text-outline">Conf. {msg.confidence}</span>
                      </div>
                      {msg.content}
                    </div>
                  </div>
                </article>
              )
            ))}

            {isTyping && (
              <article className="bg-surface-container-lowest rounded-3xl p-space-lg shadow-sm flex flex-col gap-space-md transition-all animate-fadeIn -mt-4">
                <div className="flex items-start gap-3.5 mt-2">
                  <div className="w-9 h-9 rounded-2xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">neurology</span>
                  </div>
                  <div className="flex flex-col min-w-0 flex-1 gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-label-md text-label-md text-primary font-bold tracking-wide">Velum Legal Assistant</span>
                      <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm animate-pulse">Analyzing AST Nodes...</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant italic">
                      Cross-referencing 38 indexed pages against Delaware statutory interpretation frameworks...
                    </p>
                  </div>
                </div>
              </article>
            )}
          </div>
          
          {/* Sticky Active Question Composer */}
          <div className="sticky bottom-4 z-20 mt-space-sm">
            <form onSubmit={handleSubmit} className="rounded-3xl bg-surface-container-lowest/95 backdrop-blur-xl p-space-md shadow-xl flex flex-col gap-space-sm border border-surface-container-low">
              {/* Context Pills above textarea */}
              <div className="flex items-center justify-between gap-2 pb-1 flex-wrap">
                <div className="flex items-center gap-2 overflow-x-auto py-0.5 no-scrollbar">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline shrink-0">Inquire:</span>
                  <button className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-secondary-fixed text-on-surface-variant hover:text-on-secondary-fixed font-label-sm text-label-sm transition-colors shrink-0" type="button" onClick={() => handlePromptClick('Payment terms')}>
                    Payment terms
                  </button>
                  <button className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-secondary-fixed text-on-surface-variant hover:text-on-secondary-fixed font-label-sm text-label-sm transition-colors shrink-0" type="button" onClick={() => handlePromptClick('Termination window')}>
                    Termination window
                  </button>
                  <button className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-secondary-fixed text-on-surface-variant hover:text-on-secondary-fixed font-label-sm text-label-sm transition-colors shrink-0" type="button" onClick={() => handlePromptClick('Governing jurisdiction')}>
                    Governing jurisdiction
                  </button>
                  <button className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-secondary-fixed text-on-surface-variant hover:text-on-secondary-fixed font-label-sm text-label-sm transition-colors shrink-0" type="button" onClick={() => handlePromptClick('Indemnity carve-out')}>
                    Indemnity carve-out
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-primary shrink-0">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="font-label-sm text-label-sm font-semibold">AST Lexical Mode</span>
                </div>
              </div>
              
              {/* Input area */}
              <div className="relative flex flex-col">
                <textarea 
                  className="w-full rounded-2xl bg-surface-container-low px-4 py-3 text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors resize-none shadow-inner" 
                  id="qa-input" 
                  placeholder="Ask a question regarding terms, liabilities, IP rights, or breach covenants..." 
                  rows="3"
                  value={qaInput}
                  onChange={(e) => setQaInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                ></textarea>
              </div>
              
              {/* Composer Actions & Telemetry */}
              <div className="flex items-center justify-between gap-3 pt-1 flex-wrap">
                <div className="flex items-center gap-2 text-outline font-body-sm text-body-sm">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Grounded with AST Lexical Verification • 38 pages indexed</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-label-sm text-label-sm text-outline hidden sm:inline-block">Press Enter ↵ to send</span>
                  <button 
                    className="h-11 px-5 rounded-2xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50" 
                    type="submit"
                    disabled={isTyping || !qaInput.trim()}
                  >
                    <span>Ask Assistant</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
        
        {/* RIGHT COLUMN: Research Dossier & Telemetry (approx 32% = 4 cols) */}
        <aside className="lg:col-span-4 flex flex-col gap-space-lg">
          {/* Document Dossier Card with Visual Cover Accent */}
          <section className="bg-surface-container-lowest rounded-3xl p-space-lg shadow-sm flex flex-col gap-space-md">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-secondary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">draft</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Target File</span>
                  <h3 className="font-title-md text-title-md text-on-surface font-bold truncate max-w-[210px]" title="Enterprise Cloud Services Agreement — Apex Global Corp.pdf">
                    Apex Global Corp.pdf
                  </h3>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                Risk: 84/100
              </span>
            </div>
            
            {/* Editorial Document Visualizer Card */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-surface-container-high p-4 flex flex-col justify-between h-36">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-secondary-container/40 blur-xl pointer-events-none"></div>
              <div className="flex items-center justify-between z-10">
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-md bg-surface-container-lowest/80 text-on-surface font-semibold">Master Cloud Agreement</span>
                <span className="font-label-sm text-label-sm text-outline">v2.4 Executed</span>
              </div>
              <div className="z-10 flex flex-col">
                <span className="font-headline-sm text-headline-sm text-primary leading-tight">Delaware Commercial</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Binding arbitration under AAA Commercial Rules</span>
              </div>
            </div>
            
            {/* Metadata List */}
            <div className="flex flex-col gap-2 pt-1 font-body-sm text-body-sm text-on-surface-variant">
              <div className="flex items-center justify-between py-1 border-b border-surface-container-low">
                <span className="text-outline">File Hash</span>
                <span className="font-mono text-on-surface">sha256:7f84...9e10</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-surface-container-low">
                <span className="text-outline">Analyst</span>
                <span className="text-on-surface font-medium">Elena Rostova</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-surface-container-low">
                <span className="text-outline">Indexed</span>
                <span className="text-on-surface">14 Oct 2026, 09:12 EST</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-outline">Execution State</span>
                <span className="text-primary font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Counter-signed
                </span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button className="py-2.5 px-3 rounded-xl bg-surface-container-low hover:bg-secondary-fixed text-on-surface font-label-sm text-label-sm transition-colors text-center font-semibold" type="button">
                Full Analysis
              </button>
              <button className="py-2.5 px-3 rounded-xl bg-surface-container-low hover:bg-secondary-fixed text-on-surface font-label-sm text-label-sm transition-colors text-center font-semibold" type="button">
                Compare v1.0
              </button>
            </div>
          </section>
          
          {/* Suggested Inquiry Vectors Card */}
          <section className="bg-surface-container-lowest rounded-3xl p-space-lg shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
                <h3 className="font-title-md text-title-md text-on-surface font-semibold">Suggested Questions</h3>
              </div>
              <span className="font-label-sm text-label-sm text-outline">Curated</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                "What is the notice period required for unilateral termination?",
                "Who owns custom API integrations and telemetry middleware?",
                "Are there mandatory disaster recovery (RTO / RPO) commitments?",
                "What arbitration forum governs dispute resolution?"
              ].map((q, idx) => (
                <button 
                  key={idx} 
                  className="text-left p-3 rounded-2xl bg-surface-container-low hover:bg-secondary-fixed/40 transition-colors flex items-start justify-between gap-3 group" 
                  type="button"
                  onClick={() => handleSuggestedClick(q)}
                >
                  <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">
                    {q}
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-outline group-hover:text-primary transition-colors shrink-0 mt-0.5">add_circle</span>
                </button>
              ))}
            </div>
          </section>
          
          {/* Session Citations Ledger */}
          <section className="bg-surface-container-lowest rounded-3xl p-space-lg shadow-sm flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">bookmarks</span>
                <h3 className="font-title-md text-title-md text-on-surface font-semibold">Session Citations</h3>
              </div>
              <span className="font-label-sm text-label-sm text-primary font-bold">3 Clauses</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="p-3 rounded-2xl bg-surface-container-low flex items-center justify-between gap-2">
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md font-semibold text-on-surface truncate">Section 14.2 — Liability Carve-Outs</span>
                  <span className="font-body-sm text-body-sm text-error font-medium">Uncapped Exposure</span>
                </div>
                <span className="px-2 py-0.5 rounded-lg bg-surface-container-lowest text-outline font-label-sm text-label-sm shrink-0">p. 23</span>
              </div>
              <div className="p-3 rounded-2xl bg-surface-container-low flex items-center justify-between gap-2">
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md font-semibold text-on-surface truncate">Section 8.2 — Invoicing & Late Fee</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Net 30 / 1.5% Compound</span>
                </div>
                <span className="px-2 py-0.5 rounded-lg bg-surface-container-lowest text-outline font-label-sm text-label-sm shrink-0">p. 14</span>
              </div>
              <div className="p-3 rounded-2xl bg-surface-container-low flex items-center justify-between gap-2">
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md font-semibold text-on-surface truncate">Section 11.4 — Convenience Termination</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">90-day prior written notice</span>
                </div>
                <span className="px-2 py-0.5 rounded-lg bg-surface-container-lowest text-outline font-label-sm text-label-sm shrink-0">p. 19</span>
              </div>
            </div>
          </section>
          
          {/* Model Engine & Integrity Telemetry Card */}
          <section className="bg-surface-container-lowest rounded-3xl p-space-lg shadow-sm flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Engine Telemetry</span>
              <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-primary font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                Velum Legal v4.8
              </span>
            </div>
            {/* Metric Breakdown Ring SVG Visual */}
            <div className="mt-2 p-3.5 rounded-2xl bg-surface-container-low flex items-center gap-4">
              <div className="w-14 h-14 relative shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-surface-container-high" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                  <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="100, 100" strokeLinecap="round" strokeWidth="3.5"></path>
                </svg>
                <span className="absolute font-label-sm text-label-sm font-bold text-primary">100%</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-bold text-on-surface">Zero Hallucination</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Deterministic AST mapping ensures queries pin directly to raw contract leaf nodes.</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="p-3 rounded-2xl bg-surface-container-low flex flex-col">
                <span className="font-headline-sm text-headline-sm text-primary">38 / 38</span>
                <span className="font-label-sm text-label-sm text-outline">Pages Indexed</span>
              </div>
              <div className="p-3 rounded-2xl bg-surface-container-low flex flex-col">
                <span className="font-headline-sm text-headline-sm text-primary">420ms</span>
                <span className="font-label-sm text-label-sm text-outline">Inference Latency</span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default DocumentQA;
