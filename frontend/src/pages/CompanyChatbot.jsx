import React, { useState, useEffect, useRef } from 'react';
import { companyChat } from '../services/api';

const suggestedPrompts = [
  {
    icon: "assignment_late",
    text: "What should I do if a product fails the quality check?",
    category: "Quality SOP"
  },
  {
    icon: "receipt_long",
    text: "What is our company expense reimbursement policy?",
    category: "Finance Policy"
  },
  {
    icon: "shield",
    text: "What are the key non-disclosure obligations in our NDAs?",
    category: "Legal & Compliance"
  },
  {
    icon: "laptop_mac",
    text: "How do I request hardware or IT equipment approval?",
    category: "IT Operations"
  }
];

const CompanyChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: "Hello! I am **Upteky MindBase**, your company's private AI Assistant.\n\nI am connected to all company documents, SOPs, policies, and files. Ask me any question and I will retrieve the exact answer and cite the source document for you.",
      sources: [],
      timestamp: 'Just now'
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (questionText) => {
    const query = questionText || inputQuestion;
    if (!query.trim() || loading) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!questionText) setInputQuestion('');
    setLoading(true);

    try {
      const response = await companyChat(query);
      const data = response.data;

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: data.answer || "I could not retrieve an answer at this time.",
        sources: data.sources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: "I encountered an error connecting to the backend server. Please verify the Django backend is running at `http://127.0.0.1:8000`.",
        sources: [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-5xl mx-auto gap-space-md">
      {/* Top Banner */}
      <div className="flex items-center justify-between bg-surface-container-low border border-border-color rounded-2xl px-space-lg py-space-md shadow-sm">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold shadow-md">
            <span className="material-symbols-outlined text-[26px]">chat_spark</span>
          </div>
          <div>
            <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Upteky MindBase Chatbot
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Personalized company AI assistant — Ask questions across all company SOPs & indexed documents
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-status-success-bg text-status-success font-semibold text-xs border border-status-success/20">
            <span className="w-2 h-2 rounded-full bg-status-success animate-ping"></span>
            Knowledge Base Sync On
          </span>
        </div>
      </div>

      {/* Main Chat Stream Box */}
      <div className="flex-1 bg-surface-container-lowest border border-border-color rounded-3xl p-space-lg flex flex-col justify-between overflow-hidden shadow-sm">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-space-md scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-space-md ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">psychology</span>
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-space-md shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-primary text-on-primary rounded-tr-none'
                    : msg.isError
                    ? 'bg-status-danger-bg text-status-danger border border-status-danger/30 rounded-tl-none'
                    : 'bg-surface-container-low text-on-surface border border-border-color rounded-tl-none'
                }`}
              >
                <div className="font-body-md text-body-md leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </div>

                {/* Source Citations Box */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-space-md pt-space-xs border-t border-border-color/60 flex flex-col gap-2">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">menu_book</span>
                      Cited Document Sources ({msg.sources.length}):
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {msg.sources.map((src, idx) => (
                        <div
                          key={idx}
                          className="bg-surface-container border border-border-color rounded-xl p-2.5 flex flex-col gap-1 text-xs"
                        >
                          <span className="font-semibold text-on-surface flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-primary">description</span>
                            {src.document_title}
                          </span>
                          {src.excerpt && (
                            <p className="text-on-surface-variant italic font-body-sm line-clamp-2">
                              "{src.excerpt}"
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-2 text-right">
                  <span
                    className={`font-body-sm text-[10px] ${
                      msg.sender === 'user' ? 'text-on-primary/70' : 'text-on-surface-variant/70'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-9 h-9 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center shrink-0 mt-1 border border-border-color">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-space-md justify-start items-center">
              <div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm animate-pulse">
                <span className="material-symbols-outlined text-[20px]">psychology</span>
              </div>
              <div className="bg-surface-container-low border border-border-color rounded-2xl p-space-md flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-150"></span>
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-300"></span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Searching company data directory & synthesizing answer...
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompt Chips */}
        {messages.length <= 2 && (
          <div className="py-space-sm border-t border-border-color/50">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline mb-2 block font-semibold">
              Suggested Questions
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt.text)}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-surface-container-low hover:bg-primary/10 hover:border-primary border border-border-color text-left transition-all group"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary group-hover:scale-110 transition-transform">
                    {prompt.icon}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="font-body-sm text-body-sm text-on-surface font-medium truncate">
                      {prompt.text}
                    </span>
                    <span className="font-label-sm text-[10px] text-outline">
                      {prompt.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mt-space-sm flex items-center gap-space-sm pt-space-xs"
        >
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full h-12 pl-4 pr-12 rounded-2xl bg-surface-container-low border border-border-color text-on-surface placeholder:text-outline font-body-md text-body-md focus:bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Ask anything about company SOPs, policies, data..."
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={!inputQuestion.trim() || loading}
            className="h-12 px-6 rounded-2xl bg-primary text-on-primary font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all shrink-0"
          >
            <span>Ask</span>
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyChatbot;
