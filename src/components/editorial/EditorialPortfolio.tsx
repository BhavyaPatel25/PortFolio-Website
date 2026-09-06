import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowDown, ArrowRight, ArrowUpRight, Plus, X } from 'lucide-react';
import { projects, experiences, publications, certifications, type Project } from '../journey/content';
import ContactPanel from '../journey/ContactPanel';
import './editorial.css';

const tags: Record<string,string> = {sam2:'COMPUTER VISION',museum:'MACHINE LEARNING',multilingual:'GENERATIVE AI',rag:'LLMs & RETRIEVAL',palm:'MOBILE DEVELOPMENT',stock:'DISTRIBUTED SYSTEMS'};
const skills = [
 ['Models & intelligence','PyTorch / TensorFlow / Scikit-learn / Hugging Face / Computer Vision / NLP'],
 ['Language & retrieval','LangChain / LangGraph / RAG / Fine-tuning / Pinecone / FAISS'],
 ['Systems & delivery','Python / Java / SQL / FastAPI / Docker / AWS / Azure ML / GitHub Actions'],
 ['Data & experimentation','Pandas / NumPy / MLflow / Weights & Biases / Streamlit / Tableau'],
];
function WorkCover({id}:{id:string}) {
 return <div className={`ed-cover ed-cover-${id}`} aria-hidden="true">
  <div className="ed-cover-top"><span>BHAVYA PATEL / EXPERIMENTS</span><span>{id === 'sam2'?'01 — VISION':id==='rag'?'02 — LANGUAGE':'03 — LEARNING'}</span></div>
  {id === 'sam2' ? <div className="ed-vision"><div className="ed-object object-one"/><div className="ed-object object-two"/><div className="ed-object object-three"/><div className="ed-detection detection-one"><span>OBJECT / 001</span></div><div className="ed-detection detection-two"><span>OBJECT / 002</span></div><div className="ed-cross cross-one">+</div><div className="ed-cross cross-two">+</div><p>Teaching machines<br/><i>to see more.</i></p></div>
  : id === 'rag' ? <div className="ed-retrieval"><div className="ed-document"><span>YOUR KNOWLEDGE</span><i/><i/><i/><i/><i/></div><div className="ed-flow-line"><span>RETRIEVE</span><ArrowRight/></div><div className="ed-answer"><span>GROUNDED ANSWERS</span><p>Better context.<br/><i>Better answers.</i></p><div>Documents → understanding</div></div></div>
  : <div className="ed-museum"><div className="ed-museum-frame"><div/><div/><div/></div><p>A different<br/><i>point of view.</i></p><span>CLASSIFY / COMPARE / EVALUATE</span></div>}
  <div className="ed-cover-bottom"><span>CONCEPT STUDY · {tags[id]}</span><ArrowUpRight size={25}/></div>
 </div>;
}

export default function EditorialPortfolio() {
 const [selected,setSelected] = useState<Project|null>(null);
 const [menu,setMenu] = useState(false);
 const dialog = useRef<HTMLDialogElement>(null);
 const opener = useRef<HTMLButtonElement|null>(null);
 const root = useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(selected) dialog.current?.showModal();
  else {dialog.current?.close();opener.current?.focus();}
 },[selected]);
 useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const elements=root.current?.querySelectorAll<HTMLElement>('.ed-reveal');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add('ed-visible');observer.unobserve(entry.target);}
  }),{threshold:.08});
  if(!media.matches) elements?.forEach(element=>{element.classList.add('ed-pending');observer.observe(element);});
  const reveal=()=>{if(media.matches)elements?.forEach(element=>element.classList.remove('ed-pending'));};
  media.addEventListener('change',reveal);
  return()=>{observer.disconnect();media.removeEventListener('change',reveal);};
 },[]);
 const open=(project:Project,event:React.MouseEvent<HTMLButtonElement>)=>{opener.current=event.currentTarget;setSelected(project);};
 const featured=['sam2','rag','museum'].map(id=>projects.find(project=>project.id===id)!);
 return <div className="editorial" ref={root}>
  <Helmet><title>Bhavya Patel — AI & Machine Learning Engineer</title><meta name="description" content="Bhavya Patel's selected work in computer vision, language models, and useful AI systems. Based in Montreal."/><link rel="canonical" href="https://bhavyapatel25.netlify.app/"/></Helmet>
  <a className="ed-skip" href="#projects">Skip to selected work</a>
  <header className="ed-header"><a className="ed-logo" href="#home" aria-label="Bhavya Patel home">bp<span>.</span></a><span className="ed-header-note">INDEPENDENT MIND.<br/>COLLABORATIVE SPIRIT.</span><button className="ed-menu" aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu} aria-controls="ed-nav" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Plus/>}</button><nav id="ed-nav" className={menu?'ed-nav is-open':'ed-nav'} aria-label="Main navigation">{[['projects','Work'],['about','About'],['experience','Experience'],['contact','Contact']].map(([id,label])=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{label}<span>↗</span></a>)}</nav><a className="ed-resume" href="/Bhavya%20Patel%20Resume.pdf" download>Résumé <ArrowUpRight size={15}/></a></header>
  <main>
   <section className="ed-hero" id="home" aria-labelledby="ed-name"><div className="ed-hero-meta"><span>AI / MACHINE LEARNING ENGINEER</span><span>MONTRÉAL, CANADA · 45.5019° N</span></div><h1 id="ed-name"><span>Bhavya</span> <span>Patel<i>.</i></span></h1><div className="ed-hero-bottom"><a className="ed-work-link" href="#projects"><span className="ed-arrow-circle"><ArrowDown size={24}/></span>SCROLL TO EXPLORE<br/>SELECTED WORK</a><div className="ed-hero-statement"><h2>Curiosity into code.<br/><em>Ideas into something useful.</em></h2><p>I build AI systems that see, understand, and solve real problems. A little research. A lot of experimentation. Always a human perspective.</p></div><div className="ed-availability"><span/>Open to AI/ML<br/>opportunities</div></div></section>
   <section className="ed-work ed-section" id="projects"><div className="ed-section-heading ed-reveal"><span className="ed-kicker">01 / SELECTED WORK</span><h2>Proof of<br/><em>curiosity.</em></h2><p>A few things I’ve built.<br/>And what I learned along the way.</p></div>
    <div className="ed-featured">{featured.map((project,index)=><article className={`ed-project ed-reveal ed-project-${index}`} key={project.id}><button className="ed-project-image" aria-label={`Explore ${project.title}`} onClick={event=>open(project,event)}><WorkCover id={project.id}/><span className="ed-explore">Explore project <ArrowUpRight size={18}/></span></button><div className="ed-project-info"><span className="ed-project-number">0{index+1}</span><div><span className="ed-kicker">{tags[project.id]} · {project.period}</span><h3><button onClick={event=>open(project,event)}>{project.title}</button></h3><p>{project.tagline}</p></div><button className="ed-project-arrow" aria-label={`Read about ${project.title}`} onClick={event=>open(project,event)}><ArrowUpRight/></button></div></article>)}</div>
    <div className="ed-more-work"><span className="ed-kicker">MORE EXPLORATIONS</span>{projects.filter(project=>!['sam2','rag','museum'].includes(project.id)).map(project=><button key={project.id} onClick={event=>open(project,event)}><span>{project.title}</span><span>{tags[project.id]}</span><ArrowUpRight size={22}/></button>)}</div>
   </section>
   <section id="about" className="ed-about ed-section"><div className="ed-about-top ed-reveal"><span className="ed-kicker">02 / THE PERSON BEHIND THE WORK</span><h2>A technical mind.<br/><em>A human approach.</em></h2></div><div className="ed-about-grid"><div className="ed-profile"><div className="ed-portrait"><img src="/images/bhavya-profile-hd.jpeg" alt="Bhavya Patel" loading="lazy" width="2268" height="4032"/></div><span>BHAVYA PATEL — MONTRÉAL</span><p>Engineer, curious human,<br/>and occasional player two.</p></div><div className="ed-about-copy ed-reveal"><p className="ed-lead">I like the moment a difficult problem starts to make sense.</p><p>That curiosity took me from computer engineering at CHARUSAT to a Master of Applied Computer Science at Concordia University. Along the way, I’ve built vision models, explored language systems, and helped students navigate distributed computing.</p><p>I care about the whole process: asking a better question, building a thoughtful experiment, and turning the result into something people can actually use.</p><p>Outside the work, I’m a gamer and an explorer. I like a good challenge, good company, and finding something new to learn.</p><a href="/Bhavya%20Patel%20Resume.pdf" className="ed-inline-link" download>A little more about my background <ArrowUpRight size={18}/></a><div className="ed-education"><div><span>2024 — 2026</span><strong>Concordia University</strong><p>Master of Applied Computer Science</p></div><div><span>2020 — 2024</span><strong>CHARUSAT</strong><p>B.Tech · Computer Engineering</p></div></div></div></div></section>
   <section id="experience" className="ed-experience ed-section"><div className="ed-section-heading ed-reveal"><span className="ed-kicker">03 / EXPERIENCE</span><h2>Learning.<br/><em>By doing.</em></h2><p>Research, teaching, and building.<br/>Every role adds a new perspective.</p></div><div className="ed-experience-list">{experiences.map(item=><details key={item.title}><summary><span>{item.period}</span><div><h3>{item.title}</h3><p>{item.company}</p></div><Plus size={20}/></summary><div className="ed-experience-detail"><p>{item.location}</p><ul>{item.details.map(detail=><li key={detail}>{detail}</li>)}</ul></div></details>)}</div><a className="ed-publication ed-reveal" href={publications[0].doi} target="_blank" rel="noreferrer"><span className="ed-kicker">IN PRINT / SPRINGER · ICDSA 2024</span><h3>{publications[0].title}</h3><span>Read the research <ArrowUpRight size={22}/></span></a></section>
   <section className="ed-skills ed-section" id="skills"><div><span className="ed-kicker">04 / TOOLKIT</span><h2>Whatever<br/><em>the idea needs.</em></h2></div><div>{skills.map(([title,tools])=><div className="ed-skill-row" key={title}><h3>{title}</h3><p>{tools}</p></div>)}<details className="ed-certificates"><summary>Courses & certifications <Plus size={18}/></summary>{certifications.map(certificate=><a key={certificate.title} href={certificate.link} target="_blank" rel="noreferrer">{certificate.title}<ArrowUpRight size={16}/></a>)}</details></div></section>
   <section id="contact" className="ed-contact ed-section"><div className="ed-contact-heading"><span className="ed-kicker">05 / WHAT’S NEXT?</span><h2>Good things start<br/><em>with a conversation.</em></h2><ArrowUpRight className="ed-contact-arrow"/></div><ContactPanel/></section>
  </main><footer className="ed-footer"><a href="#home">Bhavya Patel<span>© {new Date().getFullYear()}</span></a><span>BUILT WITH INTENTION. STILL EXPLORING.</span><a href="#home">Back to top <ArrowUpRight size={15}/></a></footer>
  <dialog className="ed-dialog" ref={dialog} onCancel={()=>setSelected(null)} onClick={event=>{if(event.target===dialog.current)setSelected(null);}} aria-labelledby="ed-dialog-title">{selected&&<div className="ed-dialog-inner"><button className="ed-dialog-close" onClick={()=>setSelected(null)} aria-label="Close project details"><X/></button><span className="ed-kicker">{tags[selected.id]} / {selected.period}</span><h2 id="ed-dialog-title">{selected.title}</h2><p>{selected.description}</p><div className="ed-tech">{selected.tech.map(tech=><span key={tech}>{tech}</span>)}</div>{selected.github&&<a className="ed-inline-link" href={selected.github} target="_blank" rel="noreferrer">Explore the source code <ArrowUpRight size={20}/></a>}</div>}</dialog>
 </div>;
}

