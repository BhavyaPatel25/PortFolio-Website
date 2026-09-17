import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Send } from 'lucide-react';
const email='bhavyarpatel22@gmail.com';
export default function ContactPanel() {
  const [state,setState]=useState<'idle'|'sending'|'success'|'error'|'local'>('idle');
  const [copied,setCopied]=useState(false);
  const copy=async()=>{try{await navigator.clipboard.writeText(email);setCopied(true);}catch{setCopied(false);}};
  const submit=async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(['localhost','127.0.0.1','::1'].includes(location.hostname)){setState('local');return;}
    const form=event.currentTarget;
    const body=new URLSearchParams(new FormData(form) as unknown as Record<string,string>);
    setState('sending');
    try{const response=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:body.toString()});if(!response.ok)throw new Error('Send failed');setState('success');form.reset();}catch{setState('error');}
  };
  return <div className="contact-grid"><div className="contact-intro ed-reveal"><p>Working on a Generative AI, RAG, or Computer Vision challenge? I’m happy to discuss a project, a research collaboration, or an opportunity on your team.</p><a href={`mailto:${email}`} className="email-link">{email} <ArrowUpRight/></a><button className="copy-button" onClick={copy}>{copied?<Check size={16}/>:<Copy size={16}/>}<span role="status">{copied?'Email copied':'Copy email'}</span></button><div className="social-links"><a href="https://github.com/BhavyaPatel25" target="_blank" rel="noreferrer"><Github size={18}/> GitHub <ArrowUpRight size={14}/></a><a href="https://www.linkedin.com/in/bhavyapatel1000/" target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn <ArrowUpRight size={14}/></a></div></div>
    <form className="game-contact-form ed-reveal" name="contact" onSubmit={submit}>
      <input type="hidden" name="form-name" value="contact"/><div hidden><input type="text" name="bot-field" tabIndex={-1} autoComplete="off" aria-hidden="true"/></div>
      <div className="form-pair"><label>Your name<input required name="name" autoComplete="name" placeholder="Your name" maxLength={120}/></label><label>Email address<input required type="email" name="email" autoComplete="email" placeholder="you@example.com"/></label></div>
      <label>What are we building?<textarea required name="message" rows={4} placeholder="Tell me a little about your idea…" maxLength={5000}/></label>
      <button className="game-button dark" disabled={state==='sending'}>{state==='sending'?'Sending…':'Send a message'} <Send size={17}/></button>
      <p className="form-status" role="status">{state==='success'?'Message sent. Thanks for reaching out!':state==='error'?'The message could not be sent. Please try again or email me directly.':state==='local'?'This is a local preview. Use the email link to reach me; messages send on the Netlify site.':''}</p>
    </form></div>;
}

