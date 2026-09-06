import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { ArrowDown, ArrowUpRight, Bot, BriefcaseBusiness, Code2, GraduationCap, MessageCircle, RotateCcw, Send, Sparkles, X } from 'lucide-react';
import './chatbot.css';

const API_URL = 'https://rag-chatbot-api-pixd.onrender.com/chat';
type Message = { role: 'user' | 'assistant'; content: string; id: string };
const suggestions = [
  { Icon: BriefcaseBusiness, label: 'Explore projects', question: 'What projects has Bhavya built?' },
  { Icon: Code2, label: 'Technical skills', question: "What are Bhavya's technical skills?" },
  { Icon: GraduationCap, label: 'His experience', question: "What is Bhavya's work experience?" },
  { Icon: MessageCircle, label: 'Get in touch', question: 'How can I get in touch with Bhavya?' },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showLatest, setShowLatest] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const controller = useRef<AbortController>();
  const pending = useRef(false);
  const lastQuestion = useRef('');
  const followLatest = useRef(true);

  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => {
    if (!open) return;
    // Opening the panel must not summon a phone's software keyboard.
    if (matchMedia('(pointer: fine) and (min-width: 601px)').matches) field.current?.focus();
    else closeButton.current?.focus();
    followLatest.current = true;
    setShowLatest(false);
  }, [open]);
  useEffect(() => {
    const element = viewport.current;
    if (element && followLatest.current) element.scrollTop = element.scrollHeight;
    else if (element) setShowLatest(true);
  }, [messages, loading, error, open]);
  useEffect(() => {
    if (!field.current) return;
    field.current.style.height = 'auto';
    field.current.style.height = `${Math.min(field.current.scrollHeight, 106)}px`;
  }, [input, open]);

  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => launcher.current?.focus());
  };
  const requestAnswer = async (question: string) => {
    if (pending.current) return;
    pending.current = true;
    lastQuestion.current = question;
    setLoading(true);
    setError('');
    const requestController = new AbortController();
    controller.current = requestController;
    const timeout = window.setTimeout(() => requestController.abort(), 45000);
    try {
      const response = await fetch(API_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
        body: JSON.stringify({ question }), signal: requestController.signal,
      });
      if (!response.ok) throw new Error('Unavailable');
      const data = await response.json();
      if (typeof data.answer !== 'string' || !data.answer.trim()) throw new Error('Empty answer');
      setMessages(previous => [...previous, { role: 'assistant', content: data.answer, id: crypto.randomUUID() }]);
    } catch {
      setError(requestController.signal.aborted
        ? 'That took longer than expected. Give me another try in a moment.'
        : 'I couldn’t connect just now. Try again, or explore the projects directly.');
    } finally {
      clearTimeout(timeout);
      pending.current = false;
      setLoading(false);
    }
  };
  const send = (question = input) => {
    const trimmed = question.trim();
    if (!trimmed || pending.current) return;
    followLatest.current = true;
    setShowLatest(false);
    setMessages(previous => [...previous, { role: 'user', content: trimmed, id: crypto.randomUUID() }]);
    setInput('');
    void requestAnswer(trimmed);
  };
  const submit = (event: FormEvent) => { event.preventDefault(); send(); };
  const keyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); send(); }
  };
  const scroll = () => {
    const element = viewport.current;
    if (!element) return;
    followLatest.current = element.scrollHeight - element.scrollTop - element.clientHeight < 45;
    if (followLatest.current) setShowLatest(false);
  };

  return <div className="techy-widget">
    <button ref={launcher} type="button" className="techy-launcher" hidden={open} onClick={() => setOpen(true)} aria-label="Open chat with Techy" aria-expanded={open} aria-controls="techy-panel">
      <span className="techy-launcher-icon"><Bot size={25} strokeWidth={1.7}/></span><span>Ask Techy<span>Portfolio guide</span></span><Sparkles size={15}/>
    </button>
    {open && <section id="techy-panel" className="techy-panel" role="dialog" aria-modal="false" aria-labelledby="techy-title" onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); close(); } }}>
      <header className="techy-header"><span className="techy-avatar"><Bot size={25} strokeWidth={1.7}/></span><div><h2 id="techy-title">Techy <span>AI GUIDE</span></h2><p>A little help exploring Bhavya’s world.</p></div><button ref={closeButton} type="button" className="techy-close" onClick={close} aria-label="Close chat"><X size={19}/></button></header>
      <div ref={viewport} className="techy-conversation" onScroll={scroll}>
        {messages.length === 0 ? <div className="techy-welcome"><span className="techy-welcome-icon"><Bot size={37} strokeWidth={1.4}/><Sparkles size={18}/></span><p className="techy-eyebrow">YOUR FRIENDLY SIDEKICK</p><h3>Hey! Where should<br/>we start?</h3><p>I can help you discover Bhavya’s projects, skills, and the story behind his work.</p><div className="techy-suggestions">{suggestions.map(({Icon,label,question}) => <button key={label} type="button" onClick={() => send(question)}><Icon size={17}/><span>{label}</span><ArrowUpRight size={14}/></button>)}</div></div> : <div className="techy-log" role="log" aria-label="Conversation with Techy" aria-live="polite" aria-relevant="additions">{messages.map(message => <div className={`techy-message techy-message-${message.role}`} key={message.id}><span className="techy-sender">{message.role === 'user' ? 'You' : 'Techy'}</span><div className="techy-bubble">{message.content}</div></div>)}</div>}
        {loading && <div className="techy-loading" role="status"><span className="techy-typing" aria-hidden="true"><i/><i/><i/></span><span>Finding that for you…<small>The first reply can take a little longer.</small></span></div>}
        {error && <div className="techy-error"><p role="alert">{error}</p><div><button type="button" onClick={() => { followLatest.current = true; void requestAnswer(lastQuestion.current); }}><RotateCcw size={14}/> Try again</button><a href="#projects" onClick={close}>View projects <ArrowUpRight size={14}/></a></div></div>}
      </div>
      {showLatest && <button className="techy-latest" onClick={() => { if (viewport.current) viewport.current.scrollTop = viewport.current.scrollHeight; followLatest.current = true; setShowLatest(false); }}>Latest reply <ArrowDown size={14}/></button>}
      <form className="techy-composer" onSubmit={submit}><div className="techy-input-wrap"><label className="sr-only" htmlFor="techy-question">Your question for Techy</label><textarea id="techy-question" ref={field} rows={1} maxLength={2000} value={input} onChange={event => setInput(event.target.value)} onKeyDown={keyDown} placeholder="Ask about Bhavya’s work…"/><button type="submit" disabled={loading || !input.trim()} aria-label="Send message"><Send size={18}/></button></div><p>Enter to send <span>·</span> Shift + Enter for a new line</p></form>
      <footer className="techy-footer"><Sparkles size={12}/><span>Grounded in Bhavya’s work. AI can make mistakes.</span></footer>
    </section>}
  </div>;
}
