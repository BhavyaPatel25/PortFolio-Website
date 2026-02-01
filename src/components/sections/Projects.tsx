import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: React.ReactNode;
  tags: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Multilingual Video Script Generation',
    category: 'AI/ML',
    description: 'AI pipeline transforming PowerPoint slides into narrated videos',
    fullDescription: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Built an end-to-end AI pipeline that automatically generates narrated videos from PowerPoint presentations with multi-language support.
        </p>
        <div>
          <h4 className="font-semibold mb-2 text-primary">Key Features:</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Automatic script extraction from slides</li>
            <li>Multi-language support (5+ languages)</li>
            <li>Text-to-speech with natural pronunciation</li>
            <li>Video animation and narration synchronization</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-secondary">Tech Stack:</h4>
          <p className="text-muted-foreground">Python, GPT-4, LangChain, TTS APIs, Streamlit</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-accent">Impact:</h4>
          <p className="text-muted-foreground">Accelerated video production by ~70%, seamlessly exporting finalized MP4 outputs</p>
        </div>
      </div>
    ),
    tags: ['GPT-4', 'LangChain', 'Python', 'Video Processing'],
    github: 'https://github.com/BhavyaPatel25/Multilingual-Script-Generation',
  },
  {
    id: '2',
    title: 'Museum View Detection AI',
    category: 'Vision',
    description: 'Deep learning system classifying indoor vs outdoor museum imagery',
    fullDescription: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Developed a computer vision system to automatically classify museum images as indoor or outdoor using deep learning techniques.
        </p>
        <div>
          <h4 className="font-semibold mb-2 text-primary">Achievements:</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>91.5% accuracy and 91.4% F1-score</li>
            <li>Surpassed baselines by 16-22%</li>
            <li>Fine-tuned CNN on MIT Places dataset</li>
            <li>Advanced data augmentation techniques</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-secondary">Tech Stack:</h4>
          <p className="text-muted-foreground">PyTorch, CNN, XGBoost, Random Forest, Python</p>
        </div>
      </div>
    ),
    tags: ['PyTorch', 'Computer Vision', 'CNN', 'Deep Learning'],
    github: 'https://github.com/BhavyaPatel25/Museum-View-Detection',
  },
  {
    id: '3',
    title: 'Palm Box Cricket',
    category: 'Mobile',
    description: 'Flutter mobile app for cricket facility slot booking',
    fullDescription: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Built a comprehensive Flutter mobile application for managing cricket facility bookings with real-time availability and digital payments.
        </p>
        <div>
          <h4 className="font-semibold mb-2 text-primary">Features:</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Real-time slot availability</li>
            <li>Digital booking confirmations</li>
            <li>Payment integration</li>
            <li>User notification system</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-secondary">Impact:</h4>
          <p className="text-muted-foreground">Improved booking efficiency by ~40%, reduced scheduling conflicts, increased user engagement by ~35%</p>
        </div>
      </div>
    ),
    tags: ['Flutter', 'Dart', 'Firebase', 'Mobile'],
    github: 'https://github.com/BhavyaPatel25/Palm-Box-Cricket',
  },
  {
    id: '4',
    title: 'RAG Chatbot System',
    category: 'AI/ML',
    description: 'End-to-end RAG-based chatbot with document context awareness',
    fullDescription: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Implemented a production-grade Retrieval-Augmented Generation system that answers questions by retrieving relevant context from private documents.
        </p>
        <div>
          <h4 className="font-semibold mb-2 text-primary">Architecture:</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Document embedding and storage</li>
            <li>Semantic similarity search</li>
            <li>Context-aware LLM generation</li>
            <li>Real-time processing</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-secondary">Tech Stack:</h4>
          <p className="text-muted-foreground">Python, LangChain, Ollama, FastAPI, ChromaDB</p>
        </div>
      </div>
    ),
    tags: ['RAG', 'LangChain', 'LLM', 'FastAPI'],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', ...new Set(projects.map((p) => p.category))];
  const filteredProjects = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -right-40 top-1/2 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />

      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <span className="inline-block px-4 py-2 rounded-full glass mb-4 text-sm font-medium text-secondary">
                Featured Work
              </span>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient">Projects & Innovation</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-base md:text-lg text-muted-foreground/90 max-w-2xl mx-auto">
                Click on any project to see full details, tech stack, and real-world impact.
              </p>
            </ScrollReveal>
          </div>

          {/* Category filter */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2 rounded-lg font-medium transition-all ${
                    filter === cat
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                      : 'glass hover:bg-card/60'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          {/* Projects grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
          >
            {filteredProjects.map((project, idx) => (
              <ScrollReveal
                key={project.id}
                direction={idx % 2 === 0 ? 'left' : 'right'}
                delay={0.1 + idx * 0.1}
              >
                <motion.button
                  layout
                  onClick={() => setSelectedProject(project)}
                  className="group text-left h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="glass rounded-xl p-6 h-full flex flex-col hover:bg-card/60 hover:border-primary/30 transition-all cursor-pointer">
                    {/* Project header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors flex-1">
                          {project.title}
                        </h3>
                        <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary flex-shrink-0">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">{project.description}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4 flex-grow">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-full bg-secondary/20 text-secondary">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-muted/20 text-muted-foreground">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex gap-2 pt-4 border-t border-border/50">
                      <motion.div
                        className="text-sm font-medium text-primary group-hover:text-secondary transition-colors flex items-center gap-1"
                        whileHover={{ x: 5 }}
                      >
                        View Details
                        <ExternalLink className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </motion.button>
              </ScrollReveal>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Project Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ''}
      >
        {selectedProject && (
          <div className="space-y-6">
            {selectedProject.fullDescription}

            {/* Links */}
            {(selectedProject.github || selectedProject.demo) && (
              <div className="flex gap-3 pt-4 border-t border-border/50">
                {selectedProject.github && (
                  <motion.a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </motion.a>
                )}
                {selectedProject.demo && (
                  <motion.a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </motion.a>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}

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
