import { useState } from 'react';
import { motion } from 'framer-motion';
import SkillsGlobe from '@/components/3d/SkillsGlobe';

interface Skill {
  name: string;
  icon: string;
  category: 'ai-ml' | 'languages' | 'devops' | 'frameworks';
}

const skillsDatabase: Skill[] = [
  // AI & Machine Learning
  { name: 'TensorFlow', icon: '🧠', category: 'ai-ml' },
  { name: 'PyTorch', icon: '🔥', category: 'ai-ml' },
  { name: 'LangChain', icon: '💬', category: 'ai-ml' },
  { name: 'LangGraph', icon: '🔀', category: 'ai-ml' },
  { name: 'Vector DBs', icon: '📊', category: 'ai-ml' },
  { name: 'Hugging Face', icon: '🤗', category: 'ai-ml' },
  { name: 'NLP', icon: '📝', category: 'ai-ml' },
  { name: 'Computer Vision', icon: '👁️', category: 'ai-ml' },
  { name: 'LLMs', icon: '🤖', category: 'ai-ml' },
  { name: 'Prompt Engineering', icon: '✨', category: 'ai-ml' },
  { name: 'Data Analytics', icon: '📈', category: 'ai-ml' },
  { name: 'Scikit-learn', icon: '🎯', category: 'ai-ml' },
  { name: 'RAG', icon: '🔍', category: 'ai-ml' },
  { name: 'N8N', icon: '⚙️', category: 'ai-ml' },

  // Programming Languages
  { name: 'Python', icon: '🐍', category: 'languages' },
  { name: 'Java', icon: '☕', category: 'languages' },
  { name: 'JavaScript', icon: '⚡', category: 'languages' },
  { name: 'TypeScript', icon: '📘', category: 'languages' },
  { name: 'C/C++', icon: '⚙️', category: 'languages' },
  { name: 'SQL', icon: '🗄️', category: 'languages' },
  { name: 'Shell', icon: '🖥️', category: 'languages' },
  { name: 'Dart', icon: '🎯', category: 'languages' },

  // Cloud & DevOps
  { name: 'Docker', icon: '🐳', category: 'devops' },
  { name: 'AWS', icon: '☁️', category: 'devops' },
  { name: 'Git/GitHub', icon: '🔗', category: 'devops' },
  { name: 'Kubernetes', icon: '☸️', category: 'devops' },
  { name: 'CI/CD', icon: '🚀', category: 'devops' },
  { name: 'Linux', icon: '🐧', category: 'devops' },
  { name: 'REST APIs', icon: '🔌', category: 'devops' },

  // Frameworks & Tools
  { name: 'React', icon: '⚛️', category: 'frameworks' },
  { name: 'Django', icon: '🎸', category: 'frameworks' },
  { name: 'FastAPI', icon: '⚡', category: 'frameworks' },
  { name: 'Tailwind CSS', icon: '🎨', category: 'frameworks' },
  { name: 'Flutter', icon: '📱', category: 'frameworks' },
  { name: 'Streamlit', icon: '🔷', category: 'frameworks' },
  { name: 'Firebase', icon: '🔥', category: 'frameworks' },
  { name: 'Web Scraping', icon: '🕷️', category: 'frameworks' },
  { name: 'UI/UX Design', icon: '🎭', category: 'frameworks' },
];

const categoryInfo = {
  'ai-ml': { label: 'AI & Machine Learning', icon: '🧠', color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30' },
  'languages': { label: 'Languages', icon: '💻', color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30' },
  'devops': { label: 'Cloud & DevOps', icon: '☁️', color: 'from-orange-500/20 to-yellow-500/20 border-orange-500/30' },
  'frameworks': { label: 'Frameworks', icon: '🛠️', color: 'from-green-500/20 to-emerald-500/20 border-green-500/30' },
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
          className="text-center mb-12"
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
                  <span className="text-xl">{info.icon}</span>
                  <span className="font-bold text-foreground">{info.label}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {categorySkills.length} skills
                  </span>
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    className="text-primary"
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
                        <motion.button
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.02 }}
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          whileHover={{ scale: 1.08 }}
                          className="relative group"
                        >
                          <motion.div
                            className={`px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/60 to-secondary/60 border border-white/20 flex items-center gap-1 cursor-pointer transition-all text-xs font-medium hover:from-primary to-secondary`}
                          >
                            <span>{skill.icon}</span>
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
                        </motion.button>
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
          className="mt-12 flex flex-wrap gap-3 justify-center text-sm"
        >
          {[
            { label: 'Total Skills', value: skillsDatabase.length, icon: '⭐' },
            { label: 'Categories', value: categories.length, icon: '📂' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-primary/20">
              <span>{stat.icon}</span>
              <span className="text-muted-foreground">{stat.label}:</span>
              <span className="font-bold text-primary">{stat.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
