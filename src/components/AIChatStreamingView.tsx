import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Zap,
  RotateCcw,
  Copy,
  Check,
  StopCircle,
  HelpCircle,
  BookOpen,
  GraduationCap,
  Calculator,
  Compass,
  ArrowRight,
  ExternalLink,
  Share2,
  Mail,
} from 'lucide-react';
import { ClassGrade, AcademicSubject } from '../types/academic';
import { MathRenderer } from './MathRenderer';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  latencyMs?: number;
}

interface AIChatStreamingViewProps {
  onSwitchToProjectDesigner?: (topic: string) => void;
}

const CLASS_OPTIONS: ClassGrade[] = [
  'College / University / Olympiad',
  'Class 12 (Senior Secondary / Board)',
  'Class 11 (Senior Secondary)',
  'Class 10 (High School / Board)',
  'Class 9 (High School)',
  'Class 8 (Middle)',
  'Class 7 (Middle)',
  'Class 6 (Middle)',
  'Class 4-5 (Upper Elementary)',
  'Class 1-3 (Elementary)',
];

const SUBJECT_OPTIONS: AcademicSubject[] = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'General Science',
  'History & Civics',
  'Geography & Environment',
  'English & Literature',
  'Computer Science & Coding',
  'Economics & Commerce',
  'Other / Any Subject',
];

const QUICK_PROMPTS = [
  {
    label: '1 + 1',
    icon: '⚡',
    prompt: '1 + 1',
    grade: 'Class 1-3 (Elementary)' as ClassGrade,
    subject: 'Mathematics' as AcademicSubject,
    desc: 'Instant arithmetic',
  },
  {
    label: 'Polynomials Functional Equation',
    icon: '📐',
    prompt:
      'Find all polynomials P(x) with real coefficients such that for all real numbers x, the following equation holds true: P(x²) = (P(x))² - 2P(x)',
    grade: 'College / University / Olympiad' as ClassGrade,
    subject: 'Mathematics' as AcademicSubject,
    desc: 'Olympiad phased proof',
  },
  {
    label: 'Hydraulic Robotic Arm Project',
    icon: '🚀',
    prompt:
      'Design a complete school science project: Hydraulic Robotic Arm using cardboard, syringes, and water. Include inquiry question, hypothesis, day-by-day milestone tasks, 4 presentation slides with spoken script, 3-panel trifold poster layout, household materials, and scoring rubric.',
    grade: 'Class 8 (Middle)' as ClassGrade,
    subject: 'Physics' as AcademicSubject,
    desc: 'Full project blueprint',
  },
  {
    label: 'Photosynthesis & Calvin Cycle',
    icon: '🧬',
    prompt:
      'Explain photosynthesis and the light-independent Calvin cycle in detail with chemical equations, balanced formula, and why chlorophyll absorbs blue/red light.',
    grade: 'Class 10 (High School / Board)' as ClassGrade,
    subject: 'Biology' as AcademicSubject,
    desc: 'Step-by-step bio diagram',
  },
  {
    label: 'Python Palindrome Checker',
    icon: '💻',
    prompt:
      'Write an optimal Python function to verify if a string or integer is a palindrome, including handling whitespace and non-alphanumeric characters, with time and space complexity analysis.',
    grade: 'Class 11 (Senior Secondary)' as ClassGrade,
    subject: 'Computer Science & Coding' as AcademicSubject,
    desc: 'Code & algorithmic proof',
  },
  {
    label: 'Newton’s 2nd Law (F = m·a)',
    icon: '⚛️',
    prompt:
      'State and derive Newton’s Second Law of Motion (F = m·a) from the rate of change of momentum. Provide 2 numerical practice problems with full solutions.',
    grade: 'Class 9 (High School)' as ClassGrade,
    subject: 'Physics' as AcademicSubject,
    desc: 'Derivation & exercises',
  },
];

// Helper to format text with markdown-like parsing & KaTeX
export const FormattedContent: React.FC<{ content: string; isStreaming?: boolean }> = ({
  content,
  isStreaming = false,
}) => {
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);

  // Split into lines or code blocks
  const lines = content.split('\n');

  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLang = '';
  let codeBlockCounter = 0;

  const elements: React.ReactNode[] = [];

  const handleCopyCode = (codeText: string, idx: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check code blocks
    if (line.trim().startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLang = line.trim().replace(/^```/, '') || 'code';
        codeBuffer = [];
      } else {
        inCodeBlock = false;
        const currentIdx = codeBlockCounter++;
        const codeText = codeBuffer.join('\n');
        elements.push(
          <div key={`code-${currentIdx}`} className="my-4 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-md">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 text-xs text-slate-300 font-mono border-b border-slate-700">
              <span className="uppercase font-semibold tracking-wider">{codeLang}</span>
              <button
                onClick={() => handleCopyCode(codeText, currentIdx)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors cursor-pointer"
              >
                {copiedCodeIdx === currentIdx ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 text-emerald-300 font-mono text-xs sm:text-sm overflow-x-auto whitespace-pre leading-relaxed">
              <code>{codeText}</code>
            </pre>
          </div>
        );
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Markdown Headings
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${i}`} className="text-lg sm:text-xl font-bold text-slate-900 mt-5 mb-2.5 flex items-center gap-2">
          <MathRenderer content={line.replace('### ', '')} />
        </h3>
      );
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${i}`} className="text-xl sm:text-2xl font-black text-indigo-950 mt-6 mb-3 border-b pb-2 border-indigo-100 flex items-center gap-2">
          <MathRenderer content={line.replace('## ', '')} />
        </h2>
      );
      continue;
    }
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={`h1-${i}`} className="text-2xl sm:text-3xl font-black text-slate-900 mt-6 mb-4">
          <MathRenderer content={line.replace('# ', '')} />
        </h1>
      );
      continue;
    }

    // Bullet points
    if (line.trim().startsWith('• ') || line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const cleanLine = line.trim().replace(/^[•\-\*]\s*/, '');
      elements.push(
        <div key={`bullet-${i}`} className="flex items-start gap-2.5 my-1.5 ml-2 text-slate-800">
          <span className="text-indigo-600 font-bold text-base leading-tight select-none">•</span>
          <div className="flex-1 leading-relaxed text-sm sm:text-base">
            <MathRenderer content={cleanLine} />
          </div>
        </div>
      );
      continue;
    }

    // Numbered lists (e.g. "1. ")
    const numMatch = line.trim().match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      elements.push(
        <div key={`num-${i}`} className="flex items-start gap-2.5 my-1.5 ml-2 text-slate-800">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 font-bold text-xs shrink-0 mt-0.5 select-none">
            {numMatch[1]}
          </span>
          <div className="flex-1 leading-relaxed text-sm sm:text-base">
            <MathRenderer content={numMatch[2]} />
          </div>
        </div>
      );
      continue;
    }

    // Empty lines
    if (line.trim() === '') {
      elements.push(<div key={`empty-${i}`} className="h-2" />);
      continue;
    }

    // Normal paragraph with math
    elements.push(
      <p key={`p-${i}`} className="my-1 text-slate-800 leading-relaxed text-sm sm:text-base">
        <MathRenderer content={line} />
      </p>
    );
  }

  // If still in code block at end of streaming chunk
  if (inCodeBlock && codeBuffer.length > 0) {
    elements.push(
      <pre key="unclosed-code" className="p-4 my-3 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs overflow-x-auto">
        <code>{codeBuffer.join('\n')}</code>
      </pre>
    );
  }

  return (
    <div className="space-y-1">
      {elements}
      {isStreaming && (
        <span className="inline-block w-2.5 h-4 ml-1 bg-indigo-600 animate-pulse align-middle" />
      )}
    </div>
  );
};

export const AIChatStreamingView: React.FC<AIChatStreamingViewProps> = ({
  onSwitchToProjectDesigner,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: `### Welcome to EduGenius AI! 🚀\n\nI am your **ultra-fast academic assistant** — built to answer any question, solve any mathematical equation, and design complete school science projects in seconds.\n\n**Try asking:**\n• Simple arithmetic like **$1 + 1$** (instant answer)\n• Olympiad functional equations like **$P(x^2) = (P(x))^2 - 2P(x)$**\n• Comprehensive school science projects with slides, trifold poster & rubric\n• Physics derivations, biology diagrams, or programming algorithms\n\nSelect a quick prompt below or type your question!`,
      timestamp: 'Just now',
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<ClassGrade>('College / University / Olympiad');
  const [selectedSubject, setSelectedSubject] = useState<AcademicSubject>('Mathematics');
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsStreaming(false);
    }
  };

  const executePrompt = async (promptText: string, gradeOverride?: ClassGrade, subjectOverride?: ClassGrade | any) => {
    if (!promptText.trim() || isStreaming) return;

    const finalPrompt = promptText.trim();
    const finalGrade = gradeOverride || selectedGrade;
    const finalSubject = subjectOverride || selectedSubject;

    const userMsgId = `user-${Date.now()}`;
    const assistantMsgId = `asst-${Date.now()}`;
    const startTime = performance.now();

    // Append user message
    const newMessages: Message[] = [
      ...messages,
      {
        id: userMsgId,
        role: 'user',
        content: finalPrompt,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        timestamp: 'Streaming...',
      },
    ];

    setMessages(newMessages);
    setInputPrompt('');
    setIsStreaming(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const response = await fetch('/api/chat-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: finalPrompt,
          grade: finalGrade,
          subject: finalSubject,
          history: messages.slice(-4).map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      if (!response.body) {
        throw new Error('ReadableStream not supported.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedContent = '';
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.slice(6);
            if (dataStr === '[DONE]') {
              break;
            }
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                streamedContent += parsed.text;

                // Update current assistant message in state
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsgId
                      ? {
                          ...m,
                          content: streamedContent,
                        }
                      : m
                  )
                );
              }
            } catch (err) {
              // Ignore non-json chunks
            }
          }
        }
      }

      const durationMs = Math.round(performance.now() - startTime);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? {
                ...m,
                content: streamedContent || 'Verified answer generated.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                latencyMs: durationMs,
              }
            : m
        )
      );
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Streaming request failed:', err);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  content:
                    m.content ||
                    `⚠️ Encountered an issue connecting to the AI server. Please verify your connection or try again.`,
                  timestamp: 'Failed',
                }
              : m
          )
        );
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      executePrompt(inputPrompt);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Top Banner & Fast Presets */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-700/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold tracking-wide uppercase mb-3">
              <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              Ultra-Fast Streaming AI • ChatGPT & Gemini Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Instant Academic & Project Solver
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-1 max-w-2xl leading-relaxed">
              Ask any homework question, mathematical proof, science concept, or request a complete school project blueprint. Answers begin streaming in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-300">Grade Level</label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value as ClassGrade)}
                className="bg-slate-800/90 text-white text-xs sm:text-sm border border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-indigo-400"
              >
                {CLASS_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-300">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value as AcademicSubject)}
                className="bg-slate-800/90 text-white text-xs sm:text-sm border border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-indigo-400"
              >
                {SUBJECT_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Quick Click Prompts */}
        <div className="mt-6 pt-5 border-t border-indigo-700/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Instant Speed Test Prompts (Click to Run):
            </span>
            <span className="text-xs text-indigo-300/80 hidden sm:inline">Zero waiting time</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {QUICK_PROMPTS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedGrade(item.grade);
                  setSelectedSubject(item.subject);
                  executePrompt(item.prompt, item.grade, item.subject);
                }}
                disabled={isStreaming}
                className="flex flex-col items-start p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-indigo-400/50 transition-all text-left text-xs cursor-pointer group disabled:opacity-50"
              >
                <div className="flex items-center gap-1.5 font-bold text-white group-hover:text-indigo-200">
                  <span>{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 truncate w-full">{item.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Conversation Feed */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 min-h-[500px] flex flex-col justify-between">
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5 px-1">
                {msg.role === 'user' ? (
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    You
                  </span>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px]">
                      AI
                    </span>
                    <span className="text-xs font-bold text-indigo-900 tracking-wide">
                      EduGenius Solver
                    </span>
                    {msg.latencyMs && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                        ⚡ {msg.latencyMs}ms
                      </span>
                    )}
                  </div>
                )}
                <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
              </div>

              <div
                className={`w-full max-w-4xl rounded-2xl p-4 sm:p-6 transition-all ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white ml-auto rounded-tr-sm shadow-md'
                    : 'bg-slate-50 text-slate-900 border border-slate-200 rounded-tl-sm shadow-sm'
                }`}
              >
                {msg.role === 'user' ? (
                  <div className="font-medium text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
                    <MathRenderer content={msg.content} />
                  </div>
                ) : (
                  <div>
                    <FormattedContent
                      content={msg.content}
                      isStreaming={isStreaming && msg.id === messages[messages.length - 1].id}
                    />

                    {/* Action Bar for AI response */}
                    {msg.content.length > 0 && (!isStreaming || msg.id !== messages[messages.length - 1].id) && (
                      <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopy(msg.content, msg.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors font-medium cursor-pointer"
                          >
                            {copiedMsgId === msg.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-700 font-bold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-slate-500" />
                                <span>Copy Answer</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => {
                              executePrompt(`Provide an alternate intuitive explanation with more visual analogies for:\n${msg.content.slice(0, 300)}`);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors font-medium cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Explain Simpler</span>
                          </button>

                          <a
                            href={`mailto:utkarsh22012013@gmail.com?subject=${encodeURIComponent('EduGenius AI Academic Solution')}&body=${encodeURIComponent(msg.content)}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors font-medium cursor-pointer"
                            title="Email this solution to utkarsh22012013@gmail.com"
                          >
                            <Mail className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Email Solution</span>
                          </a>
                        </div>

                        {onSwitchToProjectDesigner && (
                          <button
                            onClick={() => onSwitchToProjectDesigner(messages[messages.length - 2]?.content || 'Science Project')}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 transition-colors font-semibold cursor-pointer"
                          >
                            <Compass className="w-3.5 h-3.5" />
                            <span>Design Full Project Model</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executePrompt(inputPrompt);
            }}
            className="relative"
          >
            <div className="flex flex-col rounded-2xl border-2 border-indigo-200 focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-100 transition-all bg-white shadow-sm overflow-hidden">
              <textarea
                ref={textareaRef}
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
                placeholder="Ask any question, functional equation, 1+1, or describe a school project to build..."
                className="w-full p-4 text-sm sm:text-base outline-none resize-none text-slate-900 placeholder:text-slate-400"
              />

              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="hidden sm:inline">Press</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[10px]">Enter ↵</kbd>
                  <span className="hidden sm:inline">to solve</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-indigo-600 font-medium">LaTeX math & KaTeX supported</span>
                </div>

                <div className="flex items-center gap-2">
                  {isStreaming ? (
                    <button
                      type="button"
                      onClick={handleStopStreaming}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      <StopCircle className="w-4 h-4" />
                      <span>Stop</span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!inputPrompt.trim()}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                    >
                      <span>Ask AI</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
