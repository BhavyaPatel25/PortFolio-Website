import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Briefcase, GraduationCap, ChevronDown, Calendar, MapPin } from 'lucide-react';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

interface ExperienceItem {
  type: 'work' | 'research';
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  details: string[];
}

const experiences: ExperienceItem[] = [
  {
    type: 'work',
    title: 'Teaching Assistant',
    company: 'Concordia University',
    location: 'Montreal, Canada',
    period: 'Sep 2025 – Present',
    description: 'Distributed Systems course',
    details: [
      'Mentored 20+ students in Distributed Systems, covering Java RMI, CORBA, and SOAP-based Web Services through hands-on lab sessions.',
      'Conducted weekly tutorials and 5+ structured lab sessions, reinforcing theoretical concepts with practical exercises.',
      'Evaluated and graded 5+ assignments and final projects per term, ensuring grading consistency and delivering actionable feedback within 5 days.',
    ],
  },
  {
    type: 'work',
    title: 'Data Science Intern',
    company: 'Blue Data Consulting',
    location: 'Surat, India',
    period: 'Dec 2023 – Jun 2024',
    description: 'AI/ML Engineering & LLM Development',
    details: [
      'Designed an AI-driven content automation pipeline converting 50+ PowerPoint decks into video courses using LLMs, RAG, and Streamlit.',
      'Benchmarked GPT-3.5, GPT-4, and Gemini, achieving 25% higher script accuracy through model selection and tuning.',
      'Developed 10+ AI-powered course modules leveraging LangChain, Flowise AI, and prompt engineering.',
    ],
  },
  {
    type: 'research',
    title: 'ML Research Student',
    company: 'CHARUSAT University',
    location: 'Changa, India',
    period: 'Mar 2022 – Jun 2023',
    description: 'Vision Transformer Research',
    details: [
      'Processed and curated 13K+ video frames from UCF-101 Sports Action dataset for multi-class activity recognition.',
      'Optimized Vision Transformer (ViT) architecture through hyperparameter tuning, improving accuracy from 84% to 94%.',
      'Systematic experiments across multiple configurations reduced validation loss by ~9%.',
    ],
  },
  {
    type: 'work',
    title: 'Flutter Developer Trainee',
    company: 'Inspire Cyber Security',
    location: 'Surat, India',
    period: 'May – Oct 2022',
    description: 'Mobile Application Development',
    details: [
      'Prototyped and developed 3+ mobile applications using Flutter, translating Adobe XD wireframes into production-ready interfaces.',
      'Built a Notes application with SQLite-based offline storage implementing full CRUD functionality.',
      'Delivered "Palm Box Cricket Booking System" with real-time slot reservations through intuitive Flutter UI/UX.',
    ],
  },
  {
    type: 'work',
    title: 'Python Developer Intern',
    company: 'Jemistry Info Solutions',
    location: 'Surat, India',
    period: 'May – Jul 2022',
    description: 'Backend Development & Team Leadership',
    details: [
      'Led a 4-member intern team to develop a PC health monitoring system using Python Socket and OS modules.',
      'Implemented secure authentication in Django with PostgreSQL, reducing login latency by ~30%.',
      'Refactored backend components improving processing efficiency by 40% on low-end devices.',
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="container px-4 sm:px-6" ref={ref}>
        <div className="max-w-5xl mx-auto">
          <SectionEyebrow label="Career" number="02" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f5] mb-6">
              Experience <span className="text-gradient">Log</span>
            </h2>
            <p className="text-[#8a8a9a] text-lg max-w-xl">
              {experiences.length} entries spanning research, teaching, and engineering.
            </p>
          </motion.div>

          <div className="space-y-4">
            {experiences.map((exp, i) => {
              const isExpanded = expandedIndex === i;
              return (
                <motion.div
                  key={exp.title + exp.company}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group"
                >
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : i)}
                    className="w-full text-left"
                  >
                    <div className="surface rounded-md p-5 md:p-6 transition-all duration-300 hover:bg-[#16161f]">
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center gap-2">
                          <span className="font-mono text-[10px] text-[#4a4a5a]">
                            {String(i).padStart(2, '0')}
                          </span>
                          <div className="w-9 h-9 rounded-md bg-[#111118] border border-[#1a1a24] flex items-center justify-center flex-shrink-0">
                            {exp.type === 'research' ? (
                              <GraduationCap className="w-4 h-4 text-[#8B5CF6]" />
                            ) : (
                              <Briefcase className="w-4 h-4 text-[#7c8bb5]" />
                            )}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 md:gap-4 mb-2">
                            <div>
                              <h3 className="font-semibold text-[#f0f0f5] text-base md:text-lg">
                                {exp.title}
                              </h3>
                              <p className="text-[#8a8a9a] text-sm">
                                {exp.company}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <span className="font-mono text-xs text-[#4a4a5a] flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {exp.period}
                              </span>
                              <ChevronDown
                                className={`w-4 h-4 text-[#4a4a5a] transition-transform duration-300 ${
                                  isExpanded ? 'rotate-180' : ''
                                }`}
                              />
                            </div>
                          </div>

                          <p className="text-[#8a8a9a] text-sm mb-1">{exp.description}</p>
                          <div className="flex items-center gap-1 text-[#4a4a5a] text-xs">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isExpanded ? 'auto' : 0,
                          opacity: isExpanded ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-5 mt-4 border-t border-[#1a1a24]">
                          <ul className="space-y-3 pl-[52px]">
                            {exp.details.map((detail, j) => (
                              <li
                                key={j}
                                className="flex items-start gap-2.5 text-sm text-[#8a8a9a]"
                              >
                                <span className="w-1 h-1 rounded-full bg-[#8B5CF6]/80 mt-2 flex-shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
