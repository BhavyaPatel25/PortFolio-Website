import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ProjectCard3D from '@/components/3d/ProjectCards3D';

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


export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Section header */}
          <div className="mb-16">
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
              <p className="text-base md:text-lg text-muted-foreground/90 max-w-2xl">
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

          {/* Projects grid with 3D cards */}
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground mb-6 text-lg">No projects in this category yet.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory('All')}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold"
              >
                View All Projects
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <ProjectCard3D
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* View all CTA */}
        </motion.div>
      </div>
    </section>
  );
}
