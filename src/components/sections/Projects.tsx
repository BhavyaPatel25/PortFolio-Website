import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  icon: string;
  accentColor: string;
  metrics?: string[];
  github?: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Multilingual Video Script Generation',
    category: 'AI/ML',
    description: 'AI pipeline transforming PowerPoint slides into narrated videos',
    accentColor: 'from-purple-500 to-pink-500',
    icon: '🎬',
    metrics: ['70% Faster', '5+ Languages', 'Auto Sync'],
    tags: ['GPT-4', 'LangChain', 'Python', 'Video'],
    github: 'https://github.com/BhavyaPatel25/Multilingual-Script-Generation',
  },
  {
    id: '2',
    title: 'Museum View Detection AI',
    category: 'Vision',
    description: 'Deep learning system classifying indoor vs outdoor museum imagery',
    accentColor: 'from-blue-500 to-cyan-500',
    icon: '🏛️',
    metrics: ['91.5% Accuracy', '22% Above Baseline', 'Fine-tuned CNN'],
    tags: ['PyTorch', 'Vision', 'CNN', 'ML'],
    github: 'https://github.com/BhavyaPatel25/Museum-View-Detection',
  },
  {
    id: '3',
    title: 'Palm Box Cricket',
    category: 'Mobile',
    description: 'Flutter mobile app for cricket facility slot booking',
    accentColor: 'from-green-500 to-emerald-500',
    icon: '🏏',
    metrics: ['40% Efficiency', '35% Engagement', 'Real-time'],
    tags: ['Flutter', 'Dart', 'Firebase', 'Mobile'],
    github: 'https://github.com/BhavyaPatel25/Palm-Box-Cricket',
  },
  {
    id: '4',
    title: 'RAG Chatbot',
    category: 'AI/ML',
    description: 'Document-aware chatbot with retrieval-augmented generation',
    accentColor: 'from-orange-500 to-red-500',
    icon: '💬',
    metrics: ['Vector DB', 'LLM Powered', 'Real-time'],
    tags: ['LangChain', 'RAG', 'Python', 'FastAPI'],
    github: 'https://github.com/BhavyaPatel25/rag_chatbot',
  },
  {
    id: '5',
    title: 'Distributed Stock Market System',
    category: 'Backend',
    description: 'Fault-tolerant distributed system with replication and sequencing',
    accentColor: 'from-indigo-500 to-purple-500',
    icon: '📊',
    metrics: ['High Availability', 'Distributed', 'Fault Tolerant'],
    tags: ['Java', 'Distributed', 'Backend', 'Systems'],
    github: 'https://github.com/BhavyaPatel25/Distributed-Share-Market',
  },
];

const categories = ['All', ...new Set(projects.map(p => p.category))];

function ProjectCard({ project, index, isHovered, setHovered }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setHovered(project.id)}
      onMouseLeave={() => setHovered(null)}
      className="group relative"
    >
      <div className={`glass rounded-2xl overflow-hidden border border-primary/20 group-hover:border-primary/60 transition-all duration-300 p-6 h-full flex flex-col`}>
        {/* Animated background gradient on hover */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${project.accentColor} opacity-0 group-hover:opacity-5`}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header with icon and metrics */}
          <div className="flex items-start justify-between mb-4">
            <motion.div 
              className={`text-4xl p-3 rounded-xl bg-gradient-to-br ${project.accentColor} opacity-80`}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {project.icon}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={isHovered === project.id ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.2 }}
              className="text-xs font-semibold text-accent"
            >
              {project.category}
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-gradient transition-all">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground/90 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Metrics - Show on hover */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={isHovered === project.id ? { opacity: 1, height: 'auto' } : {}}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mb-4"
          >
            {project.metrics && (
              <div className="flex flex-wrap gap-2 pb-4">
                {project.metrics.map((metric, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${project.accentColor} text-white font-semibold`}
                  >
                    {metric}
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-md glass border border-primary/30 text-muted-foreground hover:text-primary transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-auto">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 rounded-lg glass border border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all flex items-center justify-center gap-2 font-semibold text-base group/btn"
              >
                <Github className="w-5 h-5 group-hover/btn:text-primary" />
                <span>Code</span>
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -right-40 top-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute -left-40 bottom-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />

      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <motion.span
                className="inline-block px-4 py-2 rounded-full glass mb-4 text-sm font-medium text-accent"
              >
                Featured Projects
              </motion.span>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                <span className="text-gradient">Projects</span> & Innovation
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-base md:text-lg text-muted-foreground/90 max-w-2xl mx-auto">
                End-to-end solutions from AI pipelines to distributed systems
              </p>
            </ScrollReveal>
          </div>

          {/* Category filter */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2.5 rounded-lg font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30'
                      : 'glass hover:glass-hover'
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
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isHovered={hoveredProject}
                  setHovered={setHoveredProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View all CTA */}
        </motion.div>
      </div>
    </section>
  );
}
