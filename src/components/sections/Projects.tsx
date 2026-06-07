import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  github?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Multilingual Video Script Generation',
    tagline: 'AI pipeline transforming PowerPoint slides into narrated videos',
    description:
      'An end-to-end content automation pipeline that converts presentation decks into multilingual video scripts using LLMs, with auto-sync narration and support for 5+ languages.',
    tech: ['GPT-4', 'LangChain', 'Python', 'Video'],
    github: 'https://github.com/BhavyaPatel25/Multilingual-Script-Generation',
    featured: true,
  },
  {
    id: '2',
    title: 'Museum View Detection AI',
    tagline: 'Deep learning system for indoor / outdoor classification',
    description:
      'Fine-tuned CNN architecture achieving 91.5% accuracy on museum imagery classification, outperforming baseline ResNet models by 22%.',
    tech: ['PyTorch', 'Vision', 'CNN', 'ML'],
    github: 'https://github.com/BhavyaPatel25/Museum-View-Detection',
    featured: true,
  },
  {
    id: '3',
    title: 'RAG Chatbot',
    tagline: 'Document-aware chatbot with retrieval-augmented generation',
    description:
      'A production-ready RAG pipeline with vector database integration, real-time streaming responses, and custom document ingestion.',
    tech: ['LangChain', 'RAG', 'Python', 'FastAPI'],
    github: 'https://github.com/BhavyaPatel25/rag_chatbot',
    featured: true,
  },
  {
    id: '4',
    title: 'Palm Box Cricket',
    tagline: 'Flutter mobile app for cricket facility slot booking',
    description:
      'Real-time booking system built with Flutter and Firebase, achieving 40% operational efficiency and 35% user engagement growth.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Mobile'],
    github: 'https://github.com/BhavyaPatel25/Palm-Box-Cricket',
  },
  {
    id: '5',
    title: 'Distributed Stock Market System',
    tagline: 'Fault-tolerant distributed system with replication',
    description:
      'Java-based distributed trading platform with leader election, consensus protocols, and automatic failover handling.',
    tech: ['Java', 'Distributed', 'Backend', 'Systems'],
    github: 'https://github.com/BhavyaPatel25/Distributed-Share-Market',
  },
  {
    id: '6',
    title: 'EEG Signal Analysis Platform',
    tagline: 'BCI pipeline for real-time brainwave classification',
    description:
      'Deep learning-powered brain-computer interface pipeline processing raw EEG signals into actionable cognitive state predictions.',
    tech: ['PyTorch', 'Signal Processing', 'BCI', 'Research'],
  },
];

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container px-4 sm:px-6" ref={ref}>
        <div className="max-w-5xl mx-auto">
          <SectionEyebrow label="Selected Works" number="03" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f5] mb-6">
              Projects & <span className="text-gradient">Innovation</span>
            </h2>
            <p className="text-[#8a8a9a] text-lg max-w-xl">
              End-to-end solutions spanning AI pipelines, distributed systems, and mobile platforms.
            </p>
          </motion.div>

          {/* Featured case studies */}
          <div className="space-y-6 mb-16">
            {featured.map((project, i) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.1 + i * 0.1,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                className="group surface rounded-md overflow-hidden transition-colors duration-300 hover:bg-[#16161f]"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[10px] text-[#8B5CF6] border border-[#8B5CF6]/30 px-2 py-0.5 rounded">
                      CASE {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] text-[#4a4a5a]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold text-[#f0f0f5] mb-1 flex items-center gap-2">
                    {project.title}
                    <ArrowUpRight
                      className={`w-5 h-5 text-[#4a4a5a] transition-all duration-300 ${
                        hovered === project.id
                          ? 'text-[#8B5CF6] translate-x-0.5 -translate-y-0.5'
                          : ''
                      }`}
                    />
                  </h3>
                  <p className="text-[#8a8a9a] text-sm mb-4">{project.tagline}</p>
                  <p className="text-[#8a8a9a] text-sm leading-relaxed max-w-2xl mb-6">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-3 flex-wrap">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono text-[#4a4a5a] bg-[#111118] border border-[#1a1a24] px-2.5 py-1 rounded"
                      >
                        {t}
                      </span>
                    ))}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-[#4a4a5a] hover:text-[#f0f0f5] transition-colors duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Other projects as compact list */}
          <div>
            <h3 className="font-mono text-xs text-[#4a4a5a] uppercase tracking-widest mb-4">
              More Projects
            </h3>
            <div className="space-y-0">
              {others.map((project, i) => (
                <motion.a
                  key={project.id}
                  href={project.github || '#'}
                  target={project.github ? '_blank' : undefined}
                  rel={project.github ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.3 + i * 0.06,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-center justify-between py-4 border-t border-[#1a1a24] transition-colors duration-200 hover:text-[#f0f0f5]"
                >
                  <div className="flex items-center gap-4 md:gap-6 min-w-0">
                    <span className="font-mono text-[10px] text-[#4a4a5a] w-6 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <span className="text-[#f0f0f5] font-medium text-sm block truncate">
                        {project.title}
                      </span>
                      <span className="text-[#4a4a5a] text-xs">{project.tagline}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="hidden md:block text-xs text-[#4a4a5a] font-mono">
                      {project.tech[0]}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#4a4a5a] group-hover:text-[#8B5CF6] transition-colors duration-200" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
