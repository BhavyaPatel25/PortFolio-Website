import { useState } from 'react';
import { motion } from 'framer-motion';
import SkillsGlobe from '@/components/3d/SkillsGlobe';
import {
  SiTensorflow, SiPytorch, SiLangchain, SiHuggingface,
  SiPython, SiJavascript, SiTypescript, SiDart,
  SiDocker, SiKubernetes, SiGit, SiLinux,
  SiReact, SiDjango, SiFastapi, SiTailwindcss, SiFlutter, SiStreamlit, SiFirebase,
  SiScikitlearn, SiN8n,
} from '@icons-pack/react-simple-icons';
import {
  Database, Eye, Bot, Search, BarChart3, Terminal, Cloud, GitMerge,
  Globe, Palette, Code, Coffee, Network, Sparkles, Plug,
} from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: 'ai-ml' | 'languages' | 'devops' | 'frameworks';
}

const S = ({ children }: { children: React.ReactNode }) => (
  <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">{children}</span>
);

const skillsDatabase: Skill[] = [
  // AI & Machine Learning
  { name: 'TensorFlow', icon: <S><SiTensorflow /></S>, category: 'ai-ml' },
  { name: 'PyTorch', icon: <S><SiPytorch /></S>, category: 'ai-ml' },
  { name: 'LangChain', icon: <S><SiLangchain /></S>, category: 'ai-ml' },
  { name: 'LangGraph', icon: <S><Network className="w-3.5 h-3.5" /></S>, category: 'ai-ml' },
  { name: 'Vector DBs', icon: <S><Database className="w-3.5 h-3.5" /></S>, category: 'ai-ml' },
  { name: 'Hugging Face', icon: <S><SiHuggingface /></S>, category: 'ai-ml' },
  { name: 'NLP', icon: <S><Bot className="w-3.5 h-3.5" /></S>, category: 'ai-ml' },
  { name: 'Computer Vision', icon: <S><Eye className="w-3.5 h-3.5" /></S>, category: 'ai-ml' },
  { name: 'LLMs', icon: <S><Bot className="w-3.5 h-3.5" /></S>, category: 'ai-ml' },
  { name: 'Prompt Engineering', icon: <S><Sparkles className="w-3.5 h-3.5" /></S>, category: 'ai-ml' },
  { name: 'Data Analytics', icon: <S><BarChart3 className="w-3.5 h-3.5" /></S>, category: 'ai-ml' },
  { name: 'Scikit-learn', icon: <S><SiScikitlearn /></S>, category: 'ai-ml' },
  { name: 'RAG', icon: <S><Search className="w-3.5 h-3.5" /></S>, category: 'ai-ml' },
  { name: 'N8N', icon: <S><SiN8n /></S>, category: 'ai-ml' },

  // Programming Languages
  { name: 'Python', icon: <S><SiPython /></S>, category: 'languages' },
  { name: 'Java', icon: <S><Coffee className="w-3.5 h-3.5" /></S>, category: 'languages' },
  { name: 'JavaScript', icon: <S><SiJavascript /></S>, category: 'languages' },
  { name: 'TypeScript', icon: <S><SiTypescript /></S>, category: 'languages' },
  { name: 'C/C++', icon: <S><Code className="w-3.5 h-3.5" /></S>, category: 'languages' },
  { name: 'SQL', icon: <S><Database className="w-3.5 h-3.5" /></S>, category: 'languages' },
  { name: 'Shell', icon: <S><Terminal className="w-3.5 h-3.5" /></S>, category: 'languages' },
  { name: 'Dart', icon: <S><SiDart /></S>, category: 'languages' },

  // Cloud & DevOps
  { name: 'Docker', icon: <S><SiDocker /></S>, category: 'devops' },
  { name: 'AWS', icon: <S><Cloud className="w-3.5 h-3.5" /></S>, category: 'devops' },
  { name: 'Git/GitHub', icon: <S><SiGit /></S>, category: 'devops' },
  { name: 'Kubernetes', icon: <S><SiKubernetes /></S>, category: 'devops' },
  { name: 'CI/CD', icon: <S><GitMerge className="w-3.5 h-3.5" /></S>, category: 'devops' },
  { name: 'Linux', icon: <S><SiLinux /></S>, category: 'devops' },
  { name: 'REST APIs', icon: <S><Plug className="w-3.5 h-3.5" /></S>, category: 'devops' },

  // Frameworks & Tools
  { name: 'React', icon: <S><SiReact /></S>, category: 'frameworks' },
  { name: 'Django', icon: <S><SiDjango /></S>, category: 'frameworks' },
  { name: 'FastAPI', icon: <S><SiFastapi /></S>, category: 'frameworks' },
  { name: 'Tailwind CSS', icon: <S><SiTailwindcss /></S>, category: 'frameworks' },
  { name: 'Flutter', icon: <S><SiFlutter /></S>, category: 'frameworks' },
  { name: 'Streamlit', icon: <S><SiStreamlit /></S>, category: 'frameworks' },
  { name: 'Firebase', icon: <S><SiFirebase /></S>, category: 'frameworks' },
  { name: 'Web Scraping', icon: <S><Globe className="w-3.5 h-3.5" /></S>, category: 'frameworks' },
  { name: 'UI/UX Design', icon: <S><Palette className="w-3.5 h-3.5" /></S>, category: 'frameworks' },
];

const categoryInfo = {
  'ai-ml': { label: 'AI & Machine Learning', icon: <Bot className="w-4 h-4" />, color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30' },
  'languages': { label: 'Languages', icon: <Code className="w-4 h-4" />, color: 'from-sky-500/20 to-blue-500/20 border-sky-500/30' },
  'devops': { label: 'Cloud & DevOps', icon: <Cloud className="w-4 h-4" />, color: 'from-cyan-500/20 to-teal-500/20 border-cyan-500/30' },
  'frameworks': { label: 'Frameworks', icon: <Globe className="w-4 h-4" />, color: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30' },
};

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(skillsDatabase.map(s => s.category))) as Array<keyof typeof categoryInfo>;

  return (
    <section id="skills" className="py-16 md:py-20 relative overflow-hidden">
      <SkillsGlobe />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
            <span className="text-gradient">Skills</span> & Expertise
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {skillsDatabase.length} technologies across AI, full-stack, and cloud
          </p>
        </motion.div>

        {/* Skills by Category */}
        <div className="space-y-6">
          {categories.map((category, catIdx) => {
            const categorySkills = skillsDatabase.filter(s => s.category === category);
            const info = categoryInfo[category];
            const isExpanded = expandedCategory === category || expandedCategory === null;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                className={`rounded-lg border-2 bg-gradient-to-br ${info.color} p-4 transition-all`}
              >
                {/* Category Header */}
                <motion.button
                  onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                  className="w-full flex items-center gap-2 mb-3 hover:opacity-80 transition"
                >
                  <span className="text-primary">{info.icon}</span>
                  <span className="font-bold text-foreground">{info.label}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {categorySkills.length} skills
                  </span>
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    className="text-primary text-xs"
                  >
                    ▼
                  </motion.span>
                </motion.button>

                {/* Skills Grid */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isExpanded ? 'auto' : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill, idx) => {
                      return (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.02 }}
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          className="relative group"
                        >
                          <motion.div
                            whileHover={{ scale: 1.08 }}
                            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/60 to-secondary/60 border border-white/20 flex items-center gap-1.5 cursor-pointer transition-all text-xs font-medium hover:from-primary hover:to-secondary"
                          >
                            {skill.icon}
                            <span>{skill.name}</span>
                          </motion.div>

                          {/* Tooltip */}
                          {hoveredSkill === skill.name && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8, y: 5 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.8, y: 5 }}
                              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-lg bg-background/90 backdrop-blur border border-primary/30 text-xs whitespace-nowrap z-50"
                            >
                              <p className="font-semibold text-foreground">{skill.name}</p>
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-wrap gap-3 text-sm"
        >
          {[
            { label: 'Total Skills', value: skillsDatabase.length },
            { label: 'Categories', value: categories.length },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-primary/20">
              <span className="text-muted-foreground">{stat.label}:</span>
              <span className="font-bold text-primary">{stat.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
