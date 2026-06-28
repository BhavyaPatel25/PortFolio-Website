import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Briefcase, GraduationCap, ChevronDown, MapPin, Users } from 'lucide-react';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

interface ExperienceItem {
  type: 'work' | 'research' | 'leadership';
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
    title: 'Teaching Assistant — Distributed Systems',
    company: 'Concordia University',
    location: 'Montreal, Canada',
    period: 'Sep 2025 — May 2026',
    description: 'Led labs and tutorials on Java RMI, CORBA, and SOAP web services.',
    details: [
      'Directed 10+ lab sessions and weekly tutorials on Distributed Systems for 20+ students.',
      'Authored 10+ tutorials, 5+ labs, 10+ page technical presentations, and programming exercises.',
      'Evaluated 50+ assignments and final projects per term with structured feedback within 5 days.',
    ],
  },
  {
    type: 'work',
    title: 'Data Science Intern',
    company: 'Blue Data Consulting & IT Services Pvt. Ltd.',
    location: 'Surat, India',
    period: 'Dec 2023 — Jun 2024',
    description: 'AI/ML engineering — LLM-powered content automation pipeline.',
    details: [
      'Architected an end-to-end AI pipeline converting 50+ PowerPoint decks into video courses using LLMs, RAG, and Streamlit, lifting automation efficiency 40%.',
      'Benchmarked 4 LLMs on accuracy and speed, achieving 25% higher script accuracy and 35% faster generation with GPT-3.5-Turbo.',
      'Collaborated with a 5-member team on 10+ AI course modules (LangChain, Flowise AI, prompt engineering), scaling content 3x via Streamlit Cloud.',
    ],
  },
  {
    type: 'research',
    title: 'ML Research Student — Vision Transformers',
    company: 'CHARUSAT University',
    location: 'Changa, India',
    period: 'Mar 2022 — Jun 2023',
    description: 'ViT-based sports action recognition on the UCF-101 dataset.',
    details: [
      'Built a deep learning pipeline extracting and curating 13K+ video frames from UCF-101 using NumPy and Pandas.',
      'Fine-tuned a Vision Transformer with TensorFlow and TensorFlow Hub, lifting accuracy from 84% to 94%.',
      'Applied systematic hyperparameter tuning and advanced data augmentation to cut validation loss.',
    ],
  },
  {
    type: 'work',
    title: 'Flutter Development Trainee',
    company: 'Inspire Cyber Security',
    location: 'Surat, India',
    period: 'May — Oct 2022',
    description: 'Mobile app development from Adobe XD to production Flutter UIs.',
    details: [
      'Prototyped 3+ mobile apps in Adobe XD, converting wireframes into responsive Flutter interfaces, cutting iteration cycles 50%.',
      'Delivered the client project "Palm Box Cricket Booking System" with real-time slot reservations, growing user engagement 40%.',
    ],
  },
  {
    type: 'leadership',
    title: 'Professional Service Director — Rotaract Club',
    company: 'CHARUSAT University',
    location: 'Gujarat, India',
    period: 'Sep 2022 — Aug 2023',
    description: 'Led cross-functional teams organizing community and technical events.',
    details: [
      'Led and coordinated 10+ social, technical, and cultural events impacting 500+ students.',
      'Managed cross-functional team operations, improving coordination efficiency by 25%.',
    ],
  },
];

const ICON = { work: Briefcase, research: GraduationCap, leadership: Users } as const;
const LABEL = { work: 'Work', research: 'Research', leadership: 'Leadership' } as const;

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="container px-4 sm:px-6" ref={ref}>
        <div className="max-w-5xl mx-auto">
          <SectionEyebrow label="Experience" number="02" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 max-w-2xl"
          >
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#f3eee3] leading-[0.95]">
              A path through <span className="text-gradient italic">research</span> and
              shipping.
            </h2>
          </motion.div>

          <div className="relative pl-8 sm:pl-10">
            <span className="absolute left-[10px] sm:left-[13px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-[#2a241d] to-transparent" />

            <div className="space-y-3">
              {experiences.map((exp, i) => {
                const isExpanded = expandedIndex === i;
                const Icon = ICON[exp.type];
                return (
                  <motion.div
                    key={exp.title + exp.company}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <span
                      className={`absolute -left-[26px] sm:-left-[34px] top-6 w-3 h-3 rounded-full border-2 transition-colors ${
                        isExpanded ? 'bg-accent border-accent' : 'bg-[#0b0a08] border-[#3a3329]'
                      }`}
                    />

                    <button
                      onClick={() => setExpandedIndex(isExpanded ? null : i)}
                      className="w-full text-left surface surface-hover rounded-xl p-5 md:p-6"
                      aria-expanded={isExpanded}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Icon className="w-3.5 h-3.5 text-accent" />
                            <span className="eyebrow">{LABEL[exp.type]}</span>
                          </div>
                          <h3 className="font-serif text-xl md:text-2xl text-[#f3eee3] leading-tight">
                            {exp.title}
                          </h3>
                          <p className="text-muted-warm text-sm mt-1">
                            {exp.company} · <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />{exp.location}</span>
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="font-mono text-xs text-accent whitespace-nowrap">{exp.period}</span>
                          <ChevronDown className={`w-4 h-4 text-dim mt-2 ml-auto transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      </div>

                      <motion.div
                        initial={false}
                        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-[#c9c3b6] text-sm mt-4 mb-4">{exp.description}</p>
                        <ul className="space-y-2.5">
                          {exp.details.map((d, di) => (
                            <li key={di} className="flex gap-3 text-sm text-muted-warm">
                              <span className="text-accent font-mono mt-0.5">→</span>
                              <span className="leading-relaxed">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
