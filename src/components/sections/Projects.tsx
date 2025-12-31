import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Play, Brain, Eye, Video } from 'lucide-react';
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
  },
  {
    title: 'Vision Transformer Sports Recognition',
    description: 'Novel ViT-based approach for multi-sport activity recognition across varied domains.',
    problem: 'Traditional CNNs struggle with temporal patterns in sports action videos.',
    solution: 'Optimized Vision Transformer architecture with hyperparameter tuning on 10K+ frames.',
    impact: 'Achieved 94% accuracy, published in Springer at ICDSA 2024.',
    tech: ['PyTorch', 'Vision Transformer', 'Python', 'UCF-101'],
    icon: Brain,
    gradient: 'from-primary via-secondary to-primary',
    featured: true,
  },
];

function ProjectCard({ project, index, isInView }: { project: typeof projects[0]; index: number; isInView: boolean }) {
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
          <Button variant="outline" size="sm" className="flex-1" disabled>
            <Github className="w-4 h-4 mr-2" />
            Code
          </Button>
          <Button variant="default" size="sm" className="flex-1" disabled>
            <Play className="w-4 h-4 mr-2" />
            Demo
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
              AI/ML{' '}
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
