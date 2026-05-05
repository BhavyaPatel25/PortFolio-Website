import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Briefcase, GraduationCap, ChevronDown } from 'lucide-react';
import FloatingShapes from '@/components/ui/FloatingShapes';

const experiences = [
  {
    type: 'work',
    title: 'Teaching Assistant',
    company: 'Concordia University',
    location: 'Montreal, Canada',
    period: 'Sep 2025 – Present',
    description: 'Distributed Systems course',
    details: [
      'Mentored 20+ students in Distributed Systems, covering Java RMI, CORBA, and SOAP-based Web Services through hands-on lab sessions and individualized academic support.',
      'Conducted weekly tutorials and 5+ structured lab sessions, reinforcing theoretical concepts with practical exercises to improve student engagement and comprehension.',
      'Evaluated and graded 5+ assignments and final projects per term, ensuring grading consistency and delivering actionable feedback within 5 days to support continuous student improvement.',
    ],
    color: 'primary',
  },
  {
    type: 'work',
    title: 'Data Science Intern',
    company: 'Blue Data Consulting',
    location: 'Surat, India',
    period: 'Dec 2023 – Jun 2024',
    description: 'AI/ML Engineering & LLM Development',
    details: [
      'Designed and implemented an AI-driven content automation pipeline that converted 50+ PowerPoint decks into video-based courses using LLMs, RAG, and Streamlit, improving automation efficiency by ~40%.',
      'Conducted comparative benchmarking of GPT-3.5, GPT-4, OpenAI models, and Gemini, achieving 25% higher script accuracy and 35% faster content generation through model selection and tuning.',
      'Developed and delivered 10+ AI-powered course modules leveraging LangChain, Flowise AI, Synapse CoR, and prompt engineering, collaborating with a 5-member team to scale content production by 3×.',
    ],
    color: 'secondary',
  },
  {
    type: 'research',
    title: 'ML Research Student',
    company: 'CHARUSAT University',
    location: 'Changa, India',
    period: 'Mar 2022 – Jun 2023',
    description: 'Vision Transformer Research',
    details: [
      'Processed and curated 13K+ video frames from the UCF-101 Sports Action dataset to train deep learning models for multi-class activity recognition.',
      'Optimized a Vision Transformer (ViT) architecture through advanced hyperparameter tuning and data preprocessing, improving classification accuracy from 84% to 94%.',
      'Conducted systematic experiments across multiple hyperparameter configurations and data augmentation strategies, increasing training stability and reducing validation loss by ~9%.',
    ],
    color: 'primary',
  },
  {
    type: 'work',
    title: 'Flutter Developer Trainee',
    company: 'Inspire Cyber Security',
    location: 'Surat, India',
    period: 'May – Oct 2022',
    description: 'Mobile Application Development',
    details: [
      'Prototyped and developed 3+ mobile applications using Flutter, translating Adobe XD wireframes into responsive, production-ready interfaces and reducing iteration cycles by 50%.',
      'Built a Notes application with SQLite-based offline storage, implementing full CRUD functionality with reliable local synchronization and zero data loss.',
      'Delivered a client-facing solution, “Palm Box Cricket Booking System,” enabling real-time slot reservations and improving user engagement by ~40% through intuitive Flutter UI/UX design.',
    ],
    color: 'secondary',
  },
  {
    type: 'work',
    title: 'Python Developer Intern',
    company: 'Jemistry Info Solutions',
    location: 'Surat, India',
    period: 'May – Jul 2022',
    description: 'Backend Development & Team Leadership',
    details: [
      'Led and mentored a 4-member intern team to develop a PC health monitoring system using Python Socket and OS modules, automating real-time system reporting to server endpoints.',
      'Implemented secure authentication and user management in Django with PostgreSQL, reducing login latency by ~30% while strengthening access control.',
      'Refactored and optimized backend components to improve processing efficiency, reducing resource consumption by 40% on low-end devices while maintaining enterprise-grade functionality.',
    ],
    color: 'primary',
  },
];

function ExperienceCard({ exp, index, isInView }: { exp: typeof experiences[0]; index: number; isInView: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
      className="relative pl-8 md:pl-0"
    >
      {/* Timeline connector */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
      
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
        className={`absolute left-0 md:left-1/2 top-6 w-4 h-4 rounded-full border-2 bg-background -translate-x-1.5 md:-translate-x-2 ${
          exp.color === 'primary' ? 'border-primary' : 'border-secondary'
        }`}
      >
        <div className={`absolute inset-1 rounded-full ${
          exp.color === 'primary' ? 'bg-primary' : 'bg-secondary'
        } animate-pulse`} />
      </motion.div>

      {/* Card */}
      <div className={`md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
        <motion.div
          className="glass glass-hover rounded-2xl p-6 cursor-pointer group"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                exp.color === 'primary' ? 'bg-primary/10' : 'bg-secondary/10'
              }`}>
                {exp.type === 'research' ? (
                  <GraduationCap className={`w-5 h-5 ${exp.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                ) : (
                  <Briefcase className={`w-5 h-5 ${exp.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{exp.title}</h3>
                <p className={`text-sm ${exp.color === 'primary' ? 'text-primary' : 'text-secondary'}`}>
                  {exp.company}
                </p>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
            <span>{exp.location}</span>
            <span className="font-mono">{exp.period}</span>
          </div>

          <p className="text-muted-foreground mb-4">{exp.description}</p>

          {/* Expandable details */}
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <ul className="space-y-2 pt-4 border-t border-border/50">
              {exp.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                    exp.color === 'primary' ? 'bg-primary' : 'bg-secondary'
                  }`} />
                  {detail}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden">
      {/* Animated floating shapes background */}
      <FloatingShapes />

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Section header */}
          <div className="mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-primary font-mono text-sm tracking-wider uppercase"
            >
              Career Journey
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mt-3"
            >
              Professional <span className="text-gradient">Experience</span>
            </motion.h2>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.title + exp.company} exp={exp} index={index} isInView={isInView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
