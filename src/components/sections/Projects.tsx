import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Github, Brain, Eye, Video, Smartphone, BotMessageSquare, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'Multilingual Video Script Generation',
    description: 'AI pipeline transforming PowerPoint slides into narrated videos using GPT models and TTS APIs.',
    problem: 'Manual video creation from presentations is time-consuming and limits scalability.',
    solution: 'Automated end-to-end pipeline with script extraction, multi-language support (5+ languages), and animation.',
    impact: 'Accelerated video production by ~70%, seamlessly exporting finalized MP4 outputs.',
    tech: ['Python', 'GPT-4', 'LangChain', 'TTS APIs', 'Streamlit'],
    icon: Video,
    gradient: 'from-primary to-secondary',
    featured: true,
    github: 'https://github.com/BhavyaPatel25/Multilingual-Script-Generation',
  },
  {
    title: 'Museum View Detection AI',
    description: 'Deep learning system to classify indoor vs outdoor museum imagery with high accuracy.',
    problem: 'Manual categorization of museum images is error-prone and doesn\'t scale.',
    solution: 'Fine-tuned PyTorch CNN on MIT Places dataset with advanced data augmentation.',
    impact: '91.5% accuracy & 91.4% F1-score, surpassing baselines by 16–22%.',
    tech: ['PyTorch', 'CNN', 'Python', 'XGBoost', 'Random Forest'],
    icon: Eye,
    gradient: 'from-secondary to-primary',
    featured: true,
    github: 'https://github.com/BhavyaPatel25/Museum-View-Detection',
  },
  {
    title: 'Palm Box Cricket',
    description: 'Flutter-based mobile booking application enabling 100% digital slot reservations for a live cricket facility.',
    problem: 'Manual booking workflows caused scheduling conflicts and inefficiencies for the cricket facility.',
    solution: 'Engineered end-to-end booking and availability management flows with real-time slot selection and confirmations.',
    impact: 'Improved booking efficiency by ~40%, reduced scheduling conflicts, and increased user engagement by ~35%.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Mobile Development'],
    icon: Smartphone,
    gradient: 'from-primary via-secondary to-primary',
    featured: true,
    github: 'https://github.com/BhavyaPatel25/Palm-Box-Cricket',
  },
  {
    title: 'RAG Chatbot',
    description: 'An end-to-end RAG-based chatbot that enables users to ask natural language questions and receive accurate, context-aware answers grounded in their own documents using vector databases and large language models.',
    problem: 'Conventional chatbots lack access to private or domain-specific data, resulting in hallucinations and unreliable document-based responses.',
    solution: 'Implemented a Retrieval-Augmented Generation pipeline that embeds documents, retrieves relevant context via semantic search, and generates precise answers using an LLM in real time.',
    impact: 'Significantly improved response accuracy and reliability by grounding outputs in retrieved documents, enabling scalable and trustworthy knowledge access.',
    tech: ['Python', 'LangChain', 'Ollama', 'FASTAPI', 'ChromaDB'],
    icon: BotMessageSquare,
    gradient: 'from-primary to-secondary',
    featured: true,
    github: 'https://github.com/BhavyaPatel25/rag_chatbot',
  },
  {
  title: 'Distributed Stock Market System',
  description: 'A fault-tolerant distributed stock market management system implementing replication, sequencing, and frontend coordination to ensure consistency, availability, and reliability across multiple server replicas.',
  problem: 'Single-server stock trading systems are prone to failures, inconsistencies, and downtime, making them unsuitable for high-availability and distributed environments.',
  solution: 'Designed a distributed architecture with a sequencer, frontend interface, and multiple replicated backend servers. Requests are ordered via a sequencer and processed across replicas, enabling fault tolerance, consistency, and reliable client-server communication.',
  impact: 'Ensured high availability and consistency through replication and request sequencing, simulating real-world distributed system behavior suitable for enterprise-scale transaction processing.',
  tech: ['Java', 'Distributed Systems', 'Socket Programming', 'Gradle', 'Replication'],
  icon: Server,
  gradient: 'from-secondary to-primary',
  featured: true,
  github: 'https://github.com/BhavyaPatel25/Distributed-Share-Market',
}

];

interface Project {
  title: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  tech: string[];
  icon: typeof Video;
  gradient: string;
  featured: boolean;
  github: string;
}

function ProjectCard({ project, index, isInView }: { project: Project; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
      className="group relative"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500 blur-xl`} />
      
      <div className="relative glass glass-hover rounded-2xl p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} p-0.5`}>
            <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
              <project.icon className="w-6 h-6 text-primary" />
            </div>
          </div>
          {project.featured && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-gradient transition-all">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-6">{project.description}</p>

        {/* Problem → Solution → Impact */}
        <div className="space-y-4 mb-6 flex-grow">
          <div>
            <span className="text-xs font-mono text-primary uppercase tracking-wider">Problem</span>
            <p className="text-sm text-muted-foreground mt-1">{project.problem}</p>
          </div>
          <div>
            <span className="text-xs font-mono text-secondary uppercase tracking-wider">Solution</span>
            <p className="text-sm text-muted-foreground mt-1">{project.solution}</p>
          </div>
          <div>
            <span className="text-xs font-mono text-primary uppercase tracking-wider">Impact</span>
            <p className="text-sm text-foreground font-medium mt-1">{project.impact}</p>
          </div>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-lg text-xs font-mono bg-muted text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1" 
            asChild
          >
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              View Code
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -right-40 top-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute -left-40 bottom-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />
      
      <div className="container px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-primary font-mono text-sm tracking-wider uppercase"
            >
              Featured Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3"
            >
              <span className="text-gradient">Projects</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground mt-4 max-w-2xl mx-auto"
            >
              End-to-end machine learning solutions from research to production
            </motion.p>
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} isInView={isInView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
