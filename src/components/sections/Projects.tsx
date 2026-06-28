import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight, Github, Plus } from 'lucide-react';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

interface Project {
  id: string;
  title: string;
  tagline: string;
  period: string;
  stack: string;
  description: string;
  tech: string[];
  github?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 'sam2',
    title: 'Grounded-SAM2 LVIS Benchmark',
    tagline: "Master's capstone — open-vocabulary segmentation at scale",
    period: 'Jan 2026 — Apr 2026',
    stack: 'PyTorch · Grounding DINO · SAM2 · LVIS · CUDA',
    description:
      'Engineered an open-vocabulary segmentation benchmarking pipeline on the LVIS dataset (1,200+ categories) as my Master’s capstone, creating a balanced 16,000-image subset to evaluate zero-shot object segmentation at scale. Generated and evaluated 140,000+ detections with a hybrid Grounding DINO + SAM2 architecture on an RTX 4090, automating mask generation, RLE encoding, and official LVIS metric computation via custom Python scripts.',
    tech: ['PyTorch', 'Grounding DINO', 'SAM2', 'LVIS', 'CUDA'],
    github: 'https://github.com/BhavyaPatel25/Grounded-SAM2-LVIS-Benchmark',
    featured: true,
  },
  {
    id: 'museum',
    title: 'Museum View Detection',
    tagline: 'End-to-end image classification pipeline — CNN vs tree-based baselines',
    period: 'Dec 2024 — Mar 2025',
    stack: 'PyTorch · CNN · XGBoost · Streamlit · MLflow',
    description:
      'Built and deployed an end-to-end image classification pipeline on Streamlit, training a PyTorch CNN on the MIT Places dataset (10,000 images) with advanced data augmentation and hyperparameter optimization. Compared baseline classifiers (Decision Tree, Random Forest, XGBoost) against the fine-tuned CNN, logging every run via MLflow for reproducibility and systematic model comparison.',
    tech: ['PyTorch', 'CNN', 'XGBoost', 'Streamlit', 'MLflow'],
    github: 'https://github.com/BhavyaPatel25/Museum-View-Detection',
    featured: true,
  },
  {
    id: 'multilingual',
    title: 'Multilingual Video Script Generation',
    tagline: 'AI pipeline transforming PowerPoint decks into narrated videos',
    period: 'Dec 2023 — Jun 2024',
    stack: 'GPT-4 · LangChain · Python · Streamlit',
    description:
      'An end-to-end content automation pipeline that converts presentation decks into multilingual video scripts using LLMs, with auto-sync narration and support for 5+ languages. Benchmarking 4 LLMs lifted script accuracy by 25% and generation speed by 35% with GPT-3.5-Turbo, and 10+ course modules scaled content 3x via Streamlit Cloud.',
    tech: ['GPT-4', 'LangChain', 'Python', 'RAG'],
    github: 'https://github.com/BhavyaPatel25/Multilingual-Script-Generation',
    featured: true,
  },
  {
    id: 'rag',
    title: 'RAG Chatbot',
    tagline: 'Document-aware chatbot with retrieval-augmented generation',
    period: '2024',
    stack: 'LangChain · RAG · FastAPI',
    description:
      'A production-ready RAG pipeline with vector database integration, real-time streaming responses, and custom document ingestion. Answers natural-language questions directly over your uploaded documents with cited retrieval.',
    tech: ['LangChain', 'RAG', 'Python', 'FastAPI'],
    github: 'https://github.com/BhavyaPatel25/rag_chatbot',
    featured: true,
  },
  {
    id: 'palm',
    title: 'Palm Box Cricket',
    tagline: 'Flutter mobile app for real-time cricket facility slot booking',
    period: '2022',
    stack: 'Flutter · Dart · Firebase',
    description:
      'Real-time booking system built with Flutter and Firebase, enabling instant slot reservations and growing user engagement by 40% through an intuitive booking UI.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    github: 'https://github.com/BhavyaPatel25/Palm-Box-Cricket',
  },
  {
    id: 'stock',
    title: 'Distributed Stock Market System',
    tagline: 'Fault-tolerant distributed trading platform with replication',
    period: '2023',
    stack: 'Java · Distributed Systems',
    description:
      'Java-based distributed trading platform with leader election, consensus protocols, and automatic failover handling for resilient operation across nodes.',
    tech: ['Java', 'Distributed', 'Backend', 'Systems'],
    github: 'https://github.com/BhavyaPatel25/Distributed-Share-Market',
  },
];

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

function FeaturedRow({
  project,
  index,
  open,
  onToggle,
}: {
  project: Project;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="relative w-full text-left surface rounded-xl overflow-hidden transition-colors duration-300 hover:bg-[#17140f] hover:border-[#3a3329]"
      >
        <span className="absolute left-0 top-0 h-full w-[3px] bg-accent scale-y-0 origin-top transition-transform duration-500 group-hover:scale-y-100" />

        <div className="p-6 md:p-8 pl-8 md:pl-10">
          <div className="flex items-start gap-6">
            <span className="section-number text-5xl md:text-6xl hidden sm:block">{num}</span>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <span className="font-mono text-xs text-accent">{project.period}</span>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#f3eee3] leading-tight group-hover:text-accent transition-colors mt-1">
                    {project.title}
                  </h3>
                  <p className="text-muted-warm text-sm mt-2">{project.tagline}</p>
                </div>
                <span
                  className={`flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    open
                      ? 'border-accent bg-accent/10 text-accent rotate-45'
                      : 'border-[#3a3329] text-dim group-hover:border-accent group-hover:text-accent'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                </span>
              </div>

              <div
                className="grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <p className="text-[#c9c3b6] text-sm leading-relaxed max-w-2xl mt-5">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap mt-5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono text-muted-warm bg-[#0e0d0b] border border-[#2a241d] px-2.5 py-1 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="ml-auto inline-flex items-center gap-1.5 text-xs font-mono text-accent link-underline"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [openId, setOpenId] = useState<string | null>(featured[0]?.id ?? null);

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container px-4 sm:px-6" ref={ref}>
        <div className="max-w-5xl mx-auto">
          <SectionEyebrow label="Selected Work" number="03" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 max-w-2xl"
          >
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#f3eee3] leading-[0.95]">
              Things I've <span className="text-gradient italic">built</span>.
            </h2>
            <p className="text-muted-warm text-base mt-5 max-w-lg">
              From a Master’s capstone segmentation benchmark to production LLM pipelines and
              distributed systems. Tap a project to read the case.
            </p>
          </motion.div>

          <div className="space-y-4">
            {featured.map((project, i) => (
              <FeaturedRow
                key={project.id}
                project={project}
                index={i}
                open={openId === project.id}
                onToggle={() => setOpenId(openId === project.id ? null : project.id)}
              />
            ))}
          </div>

          {others.length > 0 && (
            <div className="mt-16">
              <h3 className="eyebrow mb-4">More work</h3>
              <div>
                {others.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={project.github || '#'}
                      target={project.github ? '_blank' : undefined}
                      rel={project.github ? 'noopener noreferrer' : undefined}
                      className="group flex items-center justify-between gap-4 py-5 border-t border-[#26211b] transition-colors duration-200 hover:border-accent/40"
                    >
                      <div className="flex items-center gap-5 md:gap-8 min-w-0">
                        <span className="font-mono text-xs text-dim w-6 flex-shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0">
                          <span className="text-[#f3eee3] font-medium text-base md:text-lg block truncate group-hover:text-accent transition-colors">
                            {project.title}
                          </span>
                          <span className="text-dim text-xs md:text-sm">{project.tagline}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <span className="hidden md:block text-xs text-dim font-mono">{project.stack.split(' · ')[0]}</span>
                        <ArrowUpRight className="w-4 h-4 text-dim group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
