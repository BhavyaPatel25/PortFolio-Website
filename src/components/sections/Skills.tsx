import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Code2, Cloud, Layers } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ExpandableCard from '@/components/ui/ExpandableCard';

const skillCategories = [
  {
    title: 'AI & Machine Learning',
    icon: Brain,
    color: 'primary',
    description: 'Expertise in building intelligent systems',
    skills: ['TensorFlow', 'PyTorch', 'LangChain', 'LangGraph', 'Vector DBs', 'Hugging Face', 'Prompt Engineering', 'Data Analytics', 'Scikit-learn', 'NLP', 'Computer Vision', 'LLMs', 'N8N', 'RAG'],
    details: 'Advanced experience with machine learning frameworks, fine-tuning large language models, building RAG systems, and deploying production-grade AI pipelines.',
  },
  {
    title: 'Programming Languages',
    icon: Code2,
    color: 'secondary',
    description: 'Multi-language software engineering',
    skills: ['Python', 'Java', 'C', 'C++', 'SQL', 'Shell', 'Dart', 'MATLAB'],
    details: 'Proficient in multiple programming languages for different domains - Python for data science, Java for backend systems, Dart for mobile development.',
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    color: 'accent',
    description: 'Scalable deployment and infrastructure',
    skills: ['AWS Bedrock', 'AWS SageMaker', 'Docker', 'Git/GitHub', 'REST APIs', 'Linux', 'Kubernetes', 'CI/CD'],
    details: 'Experience with cloud platforms for machine learning deployment, containerization, and building scalable production systems.',
  },
  {
    title: 'Frameworks & Tools',
    icon: Layers,
    color: 'primary',
    description: 'Modern development ecosystems',
    skills: ['Django', 'Flutter', 'Web Scraping', 'UI/UX', 'Streamlit', 'Firebase', 'FastAPI', 'React'],
    details: 'Full-stack development with modern frameworks for web, mobile, and data visualization applications.',
  },
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -left-40 top-1/2 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
      <div className="absolute -right-40 bottom-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />

      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <span className="inline-block px-4 py-2 rounded-full glass mb-4 text-sm font-medium text-accent">
                Core Competencies
              </span>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient">Skills & Expertise</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-base md:text-lg text-muted-foreground/90 max-w-2xl mx-auto">
                Click on any category to explore my expertise and tools. Each skill is actively used in production systems.
              </p>
            </ScrollReveal>
          </div>

          {/* Interactive category tabs */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {skillCategories.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <motion.button
                    key={idx}
                    onClick={() => setSelectedCategory(idx)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all ${
                      selectedCategory === idx
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                        : 'glass hover:bg-card/60'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.title}
                  </motion.button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Category content */}
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Left: Category description and details */}
            <ScrollReveal direction="left">
              <div className="glass rounded-xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  {(() => {
                    const Icon = skillCategories[selectedCategory].icon;
                    return <Icon className="w-8 h-8 text-primary" />;
                  })()}
                  <h3 className="text-2xl font-bold">{skillCategories[selectedCategory].title}</h3>
                </div>
                <p className="text-muted-foreground/90 leading-relaxed mb-6">
                  {skillCategories[selectedCategory].details}
                </p>
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-secondary">Core Strengths:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                    <li>Production-grade system design and implementation</li>
                    <li>Best practices and optimization</li>
                    <li>Scalability and performance tuning</li>
                    <li>Documentation and knowledge sharing</li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Skill pills with interactive hover */}
            <ScrollReveal direction="right">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {skillCategories[selectedCategory].skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05, type: 'spring', stiffness: 200 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      className="px-4 py-2 rounded-lg glass border border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all cursor-default"
                    >
                      <span className="text-sm font-medium">{skill}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/50">
                  <div className="glass rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{skillCategories[selectedCategory].skills.length}</p>
                    <p className="text-xs text-muted-foreground mt-1">Technologies</p>
                  </div>
                  <div className="glass rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-secondary">Expert</p>
                    <p className="text-xs text-muted-foreground mt-1">Proficiency Level</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </motion.div>

          {/* Expandable detailed skills */}
          <div className="mt-16">
            <ScrollReveal direction="up" delay={0.3}>
              <h3 className="text-2xl font-bold mb-6">
                <span className="text-gradient">Additional Capabilities</span>
              </h3>
            </ScrollReveal>

            <div className="space-y-4">
              {[
                {
                  title: 'Research & Publishing',
                  icon: '📚',
                  preview: 'Published in Springer',
                  details: 'Authored peer-reviewed research papers published in reputable conferences and journals focused on machine learning and AI applications.',
                },
                {
                  title: 'Teaching & Mentorship',
                  icon: '🎓',
                  preview: 'TA Experience',
                  details: 'Teaching Assistant for Distributed Systems course, mentoring students and helping them understand complex distributed computing concepts.',
                },
                {
                  title: 'System Design',
                  icon: '🏗️',
                  preview: 'Architecture Expert',
                  details: 'Experienced in designing scalable, fault-tolerant systems with emphasis on performance, reliability, and maintainability.',
                },
              ].map((item, idx) => (
                <ScrollReveal key={idx} direction={idx % 2 === 0 ? 'left' : 'right'} delay={0.1 + idx * 0.1}>
                  <ExpandableCard
                    icon={item.icon}
                    title={item.title}
                    subtitle={item.preview}
                    preview={<span className="text-xs px-2 py-1 bg-primary/20 rounded text-primary">{item.preview}</span>}
                    details={<p className="text-muted-foreground">{item.details}</p>}
                    delay={idx * 0.1}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
