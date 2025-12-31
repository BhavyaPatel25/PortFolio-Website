import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Brain, 
  Code2, 
  Cloud, 
  Database,
  Cpu,
  Globe,
  Terminal,
  Layers
} from 'lucide-react';

const skillCategories = [
  {
    title: 'AI & Machine Learning',
    icon: Brain,
    color: 'from-primary to-primary/50',
    skills: [
      { name: 'TensorFlow', level: 90 },
      { name: 'PyTorch', level: 85 },
      { name: 'LangChain', level: 88 },
      { name: 'Hugging Face', level: 82 },
      { name: 'Scikit-learn', level: 92 },
      { name: 'NLP', level: 85 },
    ],
  },
  {
    title: 'Programming',
    icon: Code2,
    color: 'from-secondary to-secondary/50',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'Java', level: 80 },
      { name: 'C++', level: 75 },
      { name: 'SQL', level: 85 },
      { name: 'Shell', level: 78 },
      { name: 'TypeScript', level: 72 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    color: 'from-primary to-secondary',
    skills: [
      { name: 'AWS Bedrock', level: 85 },
      { name: 'AWS SageMaker', level: 80 },
      { name: 'Azure ML', level: 78 },
      { name: 'Docker', level: 82 },
      { name: 'Git/GitHub', level: 92 },
      { name: 'CI/CD', level: 75 },
    ],
  },
  {
    title: 'Frameworks & Tools',
    icon: Layers,
    color: 'from-secondary to-primary',
    skills: [
      { name: 'Django', level: 80 },
      { name: 'Flutter', level: 78 },
      { name: 'Streamlit', level: 88 },
      { name: 'REST APIs', level: 90 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'Vector DBs', level: 75 },
    ],
  },
];

const techIcons = [
  { name: 'Python', icon: Terminal },
  { name: 'TensorFlow', icon: Brain },
  { name: 'AWS', icon: Cloud },
  { name: 'Docker', icon: Database },
  { name: 'PyTorch', icon: Cpu },
  { name: 'LangChain', icon: Layers },
  { name: 'REST API', icon: Globe },
  { name: 'Git', icon: Code2 },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -right-40 top-1/3 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />
      
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
              Technical Arsenal
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3"
            >
              Skills &{' '}
              <span className="text-gradient">Technologies</span>
            </motion.h2>
          </div>

          {/* Floating icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-32 mb-12 hidden md:block"
          >
            {techIcons.map((tech, i) => (
              <motion.div
                key={tech.name}
                className="absolute glass rounded-xl p-4 group cursor-default"
                style={{
                  left: `${10 + (i * 11)}%`,
                  top: `${Math.sin(i * 0.8) * 30 + 30}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3 + i * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.1 }}
              >
                <tech.icon className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Skills grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, catIdx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + catIdx * 0.1 }}
                className="glass glass-hover rounded-2xl p-6 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} p-0.5`}>
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + catIdx * 0.1 + skillIdx * 0.05 }}
                    >
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm text-muted-foreground">{skill.name}</span>
                        <span className="text-sm text-primary font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.5 + catIdx * 0.1 + skillIdx * 0.05, ease: 'easeOut' }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
