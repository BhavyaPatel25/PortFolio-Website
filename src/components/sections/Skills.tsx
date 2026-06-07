import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { Marquee } from '@/components/ui/Marquee';
import {
  SiTensorflow, SiPytorch, SiLangchain, SiHuggingface,
  SiPython, SiJavascript, SiTypescript, SiDart,
  SiDocker, SiKubernetes, SiGit, SiLinux,
  SiReact, SiDjango, SiFastapi, SiTailwindcss, SiFlutter, SiStreamlit, SiFirebase,
  SiScikitlearn,
} from '@icons-pack/react-simple-icons';
import {
  Database, Eye, Bot, Search, BarChart3, Terminal, Cloud, GitMerge,
  Globe, Palette, Code, Coffee, Network, Sparkles, Plug,
} from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: string;
}

const S = ({ children }: { children: React.ReactNode }) => (
  <span className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">{children}</span>
);

const skills: Skill[] = [
  // AI & Machine Learning
  { name: 'TensorFlow', icon: <S><SiTensorflow /></S>, category: 'AI/ML' },
  { name: 'PyTorch', icon: <S><SiPytorch /></S>, category: 'AI/ML' },
  { name: 'LangChain', icon: <S><SiLangchain /></S>, category: 'AI/ML' },
  { name: 'LangGraph', icon: <S><Network className="w-3 h-3" /></S>, category: 'AI/ML' },
  { name: 'Hugging Face', icon: <S><SiHuggingface /></S>, category: 'AI/ML' },
  { name: 'Scikit-learn', icon: <S><SiScikitlearn /></S>, category: 'AI/ML' },
  { name: 'Computer Vision', icon: <S><Eye className="w-3 h-3" /></S>, category: 'AI/ML' },
  { name: 'LLMs', icon: <S><Bot className="w-3 h-3" /></S>, category: 'AI/ML' },
  { name: 'NLP', icon: <S><Search className="w-3 h-3" /></S>, category: 'AI/ML' },
  { name: 'Prompt Engineering', icon: <S><Sparkles className="w-3 h-3" /></S>, category: 'AI/ML' },
  { name: 'RAG', icon: <S><Database className="w-3 h-3" /></S>, category: 'AI/ML' },
  { name: 'Data Analytics', icon: <S><BarChart3 className="w-3 h-3" /></S>, category: 'AI/ML' },

  // Languages
  { name: 'Python', icon: <S><SiPython /></S>, category: 'Languages' },
  { name: 'JavaScript', icon: <S><SiJavascript /></S>, category: 'Languages' },
  { name: 'TypeScript', icon: <S><SiTypescript /></S>, category: 'Languages' },
  { name: 'Java', icon: <S><Coffee className="w-3 h-3" /></S>, category: 'Languages' },
  { name: 'C/C++', icon: <S><Code className="w-3 h-3" /></S>, category: 'Languages' },
  { name: 'SQL', icon: <S><Database className="w-3 h-3" /></S>, category: 'Languages' },
  { name: 'Shell', icon: <S><Terminal className="w-3 h-3" /></S>, category: 'Languages' },
  { name: 'Dart', icon: <S><SiDart /></S>, category: 'Languages' },

  // Cloud & DevOps
  { name: 'Docker', icon: <S><SiDocker /></S>, category: 'Cloud & DevOps' },
  { name: 'Kubernetes', icon: <S><SiKubernetes /></S>, category: 'Cloud & DevOps' },
  { name: 'AWS', icon: <S><Cloud className="w-3 h-3" /></S>, category: 'Cloud & DevOps' },
  { name: 'Git/GitHub', icon: <S><SiGit /></S>, category: 'Cloud & DevOps' },
  { name: 'CI/CD', icon: <S><GitMerge className="w-3 h-3" /></S>, category: 'Cloud & DevOps' },
  { name: 'Linux', icon: <S><SiLinux /></S>, category: 'Cloud & DevOps' },
  { name: 'REST APIs', icon: <S><Plug className="w-3 h-3" /></S>, category: 'Cloud & DevOps' },

  // Frameworks & Tools
  { name: 'React', icon: <S><SiReact /></S>, category: 'Frameworks' },
  { name: 'Django', icon: <S><SiDjango /></S>, category: 'Frameworks' },
  { name: 'FastAPI', icon: <S><SiFastapi /></S>, category: 'Frameworks' },
  { name: 'Tailwind CSS', icon: <S><SiTailwindcss /></S>, category: 'Frameworks' },
  { name: 'Flutter', icon: <S><SiFlutter /></S>, category: 'Frameworks' },
  { name: 'Streamlit', icon: <S><SiStreamlit /></S>, category: 'Frameworks' },
  { name: 'Firebase', icon: <S><SiFirebase /></S>, category: 'Frameworks' },
  { name: 'Web Scraping', icon: <S><Globe className="w-3 h-3" /></S>, category: 'Frameworks' },
  { name: 'UI/UX Design', icon: <S><Palette className="w-3 h-3" /></S>, category: 'Frameworks' },
];

const marqueeItems = [
  'TensorFlow', 'PyTorch', 'LangChain', 'React', 'Python',
  'FastAPI', 'Docker', 'AWS', 'TypeScript', 'Computer Vision',
  'LLMs', 'RAG', 'Distributed Systems', 'Flutter',
];

const categories = ['AI/ML', 'Languages', 'Cloud & DevOps', 'Frameworks'];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-24 md:py-32 relative">
      <div className="container px-4 sm:px-6" ref={ref}>
        <div className="max-w-5xl mx-auto">
          <SectionEyebrow label="Toolkit" number="04" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f5] mb-6">
              Skills & <span className="text-gradient">Expertise</span>
            </h2>
            <p className="text-[#8a8a9a] text-lg max-w-xl">
              {skills.length} technologies across AI, full-stack, and cloud.
            </p>
          </motion.div>

          {/* Marquee ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-14"
          >
            <Marquee items={marqueeItems} speed={30} />
          </motion.div>

          {/* Skills by category */}
          <div className="space-y-10">
            {categories.map((category, ci) => {
              const categorySkills = skills.filter((s) => s.category === category);
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.2 + ci * 0.1,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <h3 className="font-mono text-xs text-[#4a4a5a] uppercase tracking-widest mb-4">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill, si) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          delay: 0.3 + ci * 0.08 + si * 0.02,
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="group flex items-center gap-1.5 px-3 py-1.5 bg-[#111118] border border-[#1a1a24] rounded-md text-xs text-[#8a8a9a] transition-all duration-200 hover:border-[#8B5CF6]/40 hover:text-[#f0f0f5]"
                      >
                        {skill.icon}
                        {skill.name}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
