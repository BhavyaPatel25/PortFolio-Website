import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowDown, ArrowRight, ArrowUpRight, Plus, X } from 'lucide-react';
import { projects, experiences, publications, certifications, type Project } from '../journey/content';
import ContactPanel from '../journey/ContactPanel';
import './editorial.css';
import { useEditorialScroll } from './useEditorialScroll';

const tags: Record<string,string> = {sam2:'COMPUTER VISION',vit:'PUBLISHED RESEARCH',museum:'MACHINE LEARNING',multilingual:'GENERATIVE AI',rag:'LLMs & RETRIEVAL',palm:'MOBILE DEVELOPMENT',stock:'DISTRIBUTED SYSTEMS'};
const skills = [
 ['Models & intelligence','PyTorch / TensorFlow / TensorFlow Hub / Scikit-learn / Hugging Face Transformers / Machine Learning / Deep Learning / Computer Vision / NLP / CNNs / Vision Transformers (ViT) / Model Training / Model Evaluation / Hyperparameter Tuning / Feature Engineering / Image Processing'],
 ['Language & retrieval','Generative AI / LLMs / LangChain / LangGraph / Agentic Workflows / RAG / Multi-Stage RAG / Fine-tuning / Prompt Engineering / Prompt Evaluation / Semantic Search / Embeddings / Semantic Caching / Pinecone / ChromaDB / FAISS'],
 ['Systems & delivery','Python / Java / SQL / Shell Scripting / Linux / FastAPI / REST APIs / Distributed Computing / API Integration / Git / GitHub'],
 ['Cloud & MLOps','AWS Bedrock / Azure Machine Learning / Azure ML / MLOps / Docker / Kubernetes / CI/CD / GitHub Actions / Model Monitoring / Experiment Tracking / Model Deployment'],
 ['Data & experimentation','Pandas / NumPy / Data Pipelines / Vector Databases / Vector Search / MLflow / Model Monitoring / Experiment Tracking / Model Deployment / Weights & Biases / Streamlit / Tableau'],
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
 useEditorialScroll(root);
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
  <Helmet><title>Bhavya Patel — AI & Machine Learning Engineer</title><meta name="description" content="Explore Bhavya Patel’s work in Generative AI, Agentic Workflows, RAG, and Computer Vision. AI/ML Engineer at State Street, with 3 years across FinTech, enterprise content, and research."/><link rel="canonical" href="https://bhavyapatel25.netlify.app/"/></Helmet>
  <div className="ed-reading-progress" aria-hidden="true" />
  <nav className="ed-chapters" aria-label="Page chapters">
   {[['projects','Work'],['about','About'],['experience','Experience'],['skills','Toolkit'],['contact','Contact']].map(([id,label],index)=><a key={id} href={`#${id}`} data-chapter={id} aria-label={`${String(index+1).padStart(2,'0')} / ${label}`}><span className="ed-chapter-dot"/><span className="ed-chapter-label">{String(index+1).padStart(2,'0')} / {label}</span></a>)}
  </nav>
  <a className="ed-skip" href="#projects">Skip to selected work</a>
  <header className="ed-header"><a className="ed-logo" href="#home" aria-label="Bhavya Patel home">bp<span>.</span></a><span className="ed-header-note">INDEPENDENT MIND.<br/>COLLABORATIVE SPIRIT.</span><button className="ed-menu" aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu} aria-controls="ed-nav" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Plus/>}</button><nav id="ed-nav" className={menu?'ed-nav is-open':'ed-nav'} aria-label="Main navigation">{[['projects','Work'],['about','About'],['experience','Experience'],['contact','Contact']].map(([id,label])=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{label}<span>↗</span></a>)}</nav><a className="ed-resume" href="/Bhavya%20Patel%20Resume.pdf" download>Résumé <ArrowUpRight size={15}/></a></header>
  <main>
   <section className="ed-hero" id="home" aria-labelledby="ed-name"><div className="ed-hero-meta"><span>AI / MACHINE LEARNING ENGINEER</span><span>MONTRÉAL, CANADA · 45.5019° N</span></div><h1 id="ed-name"><span>Bhavya</span> <span>Patel<i>.</i></span></h1><div className="ed-hero-bottom"><a className="ed-work-link" href="#projects"><span className="ed-arrow-circle"><ArrowDown size={24}/></span>SCROLL TO EXPLORE<br/>SELECTED WORK</a><div className="ed-hero-statement ed-reveal"><h2>From research.<br/><em>To working AI.</em></h2><p>I’m an AI/ML Engineer with 3 years of experience across FinTech, enterprise content, and research. At State Street, I work with Generative AI, Agentic Workflows, and RAG to make financial-document review more efficient and auditable.</p></div><div className="ed-availability"><span/>AI/ML Engineer<br/>at State Street</div></div></section>
   <section className="ed-work ed-section" id="projects"><div className="ed-section-heading ed-reveal"><span className="ed-kicker">01 / SELECTED WORK</span><h2>Ideas, put<br/><em>into practice.</em></h2><p>The questions behind the projects.<br/>The systems I built to explore them.</p></div>
    <div className="ed-featured">{featured.map((project,index)=><article className={`ed-project ed-reveal ed-project-${index}`} key={project.id}><button className="ed-project-image" aria-label={`Explore ${project.title}`} onClick={event=>open(project,event)}><WorkCover id={project.id}/><span className="ed-explore">Explore project <ArrowUpRight size={18}/></span></button><div className="ed-project-info"><span className="ed-project-number">0{index+1}</span><div><span className="ed-kicker">{tags[project.id]} · {project.period}</span><h3><button onClick={event=>open(project,event)}>{project.title}</button></h3><p>{project.tagline}</p></div><button className="ed-project-arrow" aria-label={`Read about ${project.title}`} onClick={event=>open(project,event)}><ArrowUpRight/></button></div></article>)}</div>
    <div className="ed-more-work"><span className="ed-kicker">MORE EXPLORATIONS</span>{projects.filter(project=>!['sam2','rag','museum'].includes(project.id)).map(project=><button className="ed-reveal" key={project.id} onClick={event=>open(project,event)}><span>{project.title}</span><span>{tags[project.id]}</span><ArrowUpRight size={22}/></button>)}</div>
   </section>
   <section id="about" className="ed-about ed-section"><div className="ed-about-top ed-reveal"><span className="ed-kicker">02 / THE PERSON BEHIND THE WORK</span><h2>Curious by nature.<br/><em>Practical by training.</em></h2></div><div className="ed-about-grid"><div className="ed-profile ed-reveal"><div className="ed-portrait"><img src="/images/bhavya-profile-hd.jpeg" alt="Bhavya Patel" loading="lazy" width="2268" height="4032"/></div><span>BHAVYA PATEL — MONTRÉAL</span><p>Engineer, curious human,<br/>and occasional player two.</p></div><div className="ed-about-copy"><p className="ed-lead ed-reveal">I enjoy taking a question from the first experiment to a working system.</p><p className="ed-reveal">My path began with a Bachelor of Technology in Computer Engineering at CHARUSAT University and continued with a Master of Applied Computer Science at Concordia University, completed in June 2026. Along the way, I worked on Computer Vision research, enterprise learning tools, and Distributed Systems teaching. I now work remotely in Canada as an AI/ML Engineer at State Street.</p><p className="ed-reveal">My work spans RAG pipelines, LLM orchestration, semantic caching, and automated evaluation. I use Python, LangGraph, AWS Bedrock, Azure ML, and MLflow to connect experiments with deployment, keeping model performance and operational efficiency in view.</p><p className="ed-reveal">Away from the code, I’m a gamer and an explorer. A good challenge, good company, and something new to learn usually make my day.</p><a href="/Bhavya%20Patel%20Resume.pdf" className="ed-inline-link" download>A little more about my background <ArrowUpRight size={18}/></a><div className="ed-education ed-reveal"><div><span>Sep 2024 — Jun 2026</span><strong>Concordia University</strong><p>Master of Applied Computer Science</p></div><div><span>Jul 2020 — Jun 2024</span><strong>CHARUSAT</strong><p>Bachelor of Technology in Computer Engineering</p></div></div></div></div></section>
   <section id="experience" className="ed-experience ed-section"><div className="ed-section-heading ed-reveal"><span className="ed-kicker">03 / EXPERIENCE</span><h2>Experience.<br/><em>With outcomes.</em></h2><p>From research labs to financial workflows.<br/>Here’s where I’ve contributed.</p></div><div className="ed-impact-summary ed-reveal" aria-label="Selected results at State Street"><div><span className="ed-kicker">NOW / STATE STREET</span><p>Intelligence with<br/><em>measurable impact.</em></p></div><div><strong>31<span>%</span></strong><p>Lower document<br/>retrieval latency</p></div><div><strong>34<span>%</span></strong><p>Higher document<br/>processing throughput</p></div><div><strong>22<span>%</span></strong><p>Fewer tokens per<br/>audited document</p></div></div><div className="ed-experience-list">{experiences.map((item,index)=><details className="ed-reveal" key={item.title} open={index===0}><summary><span>{item.period}</span><div><h3>{item.title}</h3><p>{item.company}</p></div><Plus size={20}/></summary><div className="ed-experience-detail"><p>{item.location}</p><p>{item.description}</p><ul>{item.details.map(detail=><li key={detail}>{detail}</li>)}</ul></div></details>)}</div><a className="ed-publication ed-reveal" href={publications[0].doi} target="_blank" rel="noreferrer"><span className="ed-kicker">IN PRINT / SPRINGER · ICDSA 2024</span><h3>{publications[0].title}</h3><span>94% accuracy · UCF-101<br/>Read the research <ArrowUpRight size={22}/></span></a></section>
   <section className="ed-skills ed-section" id="skills"><div className="ed-reveal"><span className="ed-kicker">04 / TOOLKIT</span><h2>The tools behind<br/><em>the work.</em></h2></div><div>{skills.map(([title,tools])=><div className="ed-skill-row ed-reveal" key={title}><h3>{title}</h3><p>{tools}</p></div>)}<details className="ed-certificates ed-reveal"><summary>Courses & certifications <Plus size={18}/></summary>{certifications.map(certificate=><a key={certificate.title} href={certificate.link} target="_blank" rel="noreferrer">{certificate.title}<ArrowUpRight size={16}/></a>)}</details></div></section>
   <section id="contact" className="ed-contact ed-section"><div className="ed-contact-heading ed-reveal"><span className="ed-kicker">05 / WHAT’S NEXT?</span><h2>Have a challenge?<br/><em>Let’s work on it.</em></h2><ArrowUpRight className="ed-contact-arrow"/></div><ContactPanel/></section>
  </main><footer className="ed-footer ed-reveal"><a href="#home">Bhavya Patel<span>© {new Date().getFullYear()}</span></a><span>BUILT WITH INTENTION. STILL EXPLORING.</span><a href="#home">Back to top <ArrowUpRight size={15}/></a></footer>
  <dialog className="ed-dialog" ref={dialog} onCancel={()=>setSelected(null)} onClick={event=>{if(event.target===dialog.current)setSelected(null);}} aria-labelledby="ed-dialog-title">{selected&&<div className="ed-dialog-inner"><button className="ed-dialog-close" onClick={()=>setSelected(null)} aria-label="Close project details"><X/></button><span className="ed-kicker">{tags[selected.id]} / {selected.period}</span><h2 id="ed-dialog-title">{selected.title}</h2><p>{selected.description}</p><div className="ed-tech">{selected.tech.map(tech=><span key={tech}>{tech}</span>)}</div>{selected.publication&&<a className="ed-inline-link" href={selected.publication} target="_blank" rel="noreferrer">Read the published research <ArrowUpRight size={20}/></a>}{selected.github&&<a className="ed-inline-link" href={selected.github} target="_blank" rel="noreferrer">Explore the source code <ArrowUpRight size={20}/></a>}</div>}</dialog>
 </div>;
}

