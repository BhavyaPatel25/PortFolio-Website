import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Brain, 
  Code2, 
  Cloud, 
  Layers,
  Sparkles
} from 'lucide-react';

const skillCategories = [
  {
    title: 'AI & Machine Learning',
    icon: Brain,
    color: 'primary',
    skills: ['TensorFlow', 'PyTorch', 'LangChain', 'Hugging Face', 'Scikit-learn', 'NLP', 'Computer Vision', 'LLMs'],
  },
  {
    title: 'Programming',
    icon: Code2,
    color: 'secondary',
    skills: ['Python', 'Java', 'C++', 'SQL', 'Shell', 'TypeScript', 'Dart', 'MATLAB'],
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    color: 'primary',
    skills: ['AWS Bedrock', 'AWS SageMaker', 'Azure ML', 'Docker', 'Git/GitHub', 'CI/CD', 'REST APIs', 'Linux'],
  },
  {
    title: 'Frameworks & Tools',
    icon: Layers,
    color: 'secondary',
    skills: ['Django', 'Flutter', 'Streamlit', 'PostgreSQL', 'MongoDB', 'Vector DBs', 'Firebase', 'RAG'],
  },
];

function SkillPill({ skill, delay, color }: { skill: string; delay: number; color: string }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay,
        type: 'spring',
        stiffness: 200,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.1, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        relative px-4 py-2.5 rounded-xl cursor-default
        glass glass-hover
        border border-transparent
        ${isHovered ? (color === 'primary' ? 'border-primary/50' : 'border-secondary/50') : ''}
        transition-colors duration-300
      `}
    >
      {/* Glow effect on hover */}
      <motion.div
        className={`absolute inset-0 rounded-xl ${color === 'primary' ? 'bg-primary' : 'bg-secondary'} blur-xl`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.2 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <span className={`relative text-sm font-medium ${isHovered ? (color === 'primary' ? 'text-primary' : 'text-secondary') : 'text-foreground'} transition-colors duration-300`}>
        {skill}
      </span>
      
      {/* Sparkle on hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-1 -right-1"
        >
          <Sparkles className={`w-3 h-3 ${color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
        </motion.div>
      )}
    </motion.div>
  );
}

function SkillCategory({ category, index, isInView }: { 
  category: typeof skillCategories[0]; 
  index: number; 
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
      className="glass rounded-2xl p-6 md:p-8 group relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${category.color === 'primary' ? 'from-primary/5 to-transparent' : 'from-secondary/5 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 relative">
        <motion.div 
          className={`w-12 h-12 rounded-xl ${category.color === 'primary' ? 'bg-primary/10' : 'bg-secondary/10'} flex items-center justify-center`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <category.icon className={`w-6 h-6 ${category.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
        </motion.div>
        <h3 className="text-xl font-semibold">{category.title}</h3>
      </div>
      
      {/* Skills cloud */}
      <div className="flex flex-wrap gap-3 relative">
        {category.skills.map((skill, skillIdx) => (
          <SkillPill 
            key={skill} 
            skill={skill} 
            delay={0.3 + index * 0.1 + skillIdx * 0.05}
            color={category.color}
          />
        ))}
      </div>
    </motion.div>
  );
}

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

          {/* Skills grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => (
              <SkillCategory 
                key={category.title} 
                category={category} 
                index={index} 
                isInView={isInView}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
