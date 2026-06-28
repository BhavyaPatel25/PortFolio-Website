import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { Marquee } from '@/components/ui/Marquee';
import {
  SiTensorflow, SiPytorch, SiScikitlearn, SiKeras, SiHuggingface, SiLangchain,
  SiPython, SiDjango, SiFastapi, SiFlutter,
  SiPandas, SiNumpy, SiPlotly, SiStreamlit, SiMysql,
  SiDocker, SiGithubactions, SiGithub, SiJira, SiPytest, SiGit, SiLinux,
} from '@icons-pack/react-simple-icons';
import {
  Database, Eye, Bot, Search, Brain, Sparkles, Network, Workflow,
  Coffee, Code, Terminal, Plug, LineChart, Waves, BarChart3, PieChart,
  GitMerge, Rocket, Cloud, CloudDrizzle, SlidersHorizontal,
} from 'lucide-react';

interface Skill { name: string; icon: React.ReactNode; category: string; }

const S = ({ children }: { children: React.ReactNode }) => (
  <span className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">{children}</span>
);

const skills: Skill[] = [
  // AI & Machine Learning
  { name: 'PyTorch', icon: <S><SiPytorch /></S>, category: 'AI & Machine Learning' },
  { name: 'TensorFlow', icon: <S><SiTensorflow /></S>, category: 'AI & Machine Learning' },
  { name: 'Scikit-learn', icon: <S><SiScikitlearn /></S>, category: 'AI & Machine Learning' },
  { name: 'Keras', icon: <S><SiKeras /></S>, category: 'AI & Machine Learning' },
  { name: 'Hugging Face', icon: <S><SiHuggingface /></S>, category: 'AI & Machine Learning' },
  { name: 'LangChain', icon: <S><SiLangchain /></S>, category: 'AI & Machine Learning' },
  { name: 'LangGraph', icon: <S><Network className="w-3 h-3" /></S>, category: 'AI & Machine Learning' },
  { name: 'NLP', icon: <S><Search className="w-3 h-3" /></S>, category: 'AI & Machine Learning' },
  { name: 'Computer Vision', icon: <S><Eye className="w-3 h-3" /></S>, category: 'AI & Machine Learning' },
  { name: 'Deep Learning', icon: <S><Brain className="w-3 h-3" /></S>, category: 'AI & Machine Learning' },
  { name: 'Generative AI', icon: <S><Sparkles className="w-3 h-3" /></S>, category: 'AI & Machine Learning' },
  { name: 'RAG', icon: <S><Database className="w-3 h-3" /></S>, category: 'AI & Machine Learning' },
  { name: 'Model Fine-tuning', icon: <S><SlidersHorizontal className="w-3 h-3" /></S>, category: 'AI & Machine Learning' },
  { name: 'Prompt Engineering', icon: <S><Sparkles className="w-3 h-3" /></S>, category: 'AI & Machine Learning' },
  { name: 'LLM Frameworks', icon: <S><Bot className="w-3 h-3" /></S>, category: 'AI & Machine Learning' },
  { name: 'MLOps', icon: <S><Workflow className="w-3 h-3" /></S>, category: 'AI & Machine Learning' },

  // Languages & Frameworks
  { name: 'Python', icon: <S><SiPython /></S>, category: 'Languages & Frameworks' },
  { name: 'C', icon: <S><Code className="w-3 h-3" /></S>, category: 'Languages & Frameworks' },
  { name: 'C++', icon: <S><Code className="w-3 h-3" /></S>, category: 'Languages & Frameworks' },
  { name: 'Java', icon: <S><Coffee className="w-3 h-3" /></S>, category: 'Languages & Frameworks' },
  { name: 'SQL', icon: <S><Database className="w-3 h-3" /></S>, category: 'Languages & Frameworks' },
  { name: 'Shell Scripting', icon: <S><Terminal className="w-3 h-3" /></S>, category: 'Languages & Frameworks' },
  { name: 'Django', icon: <S><SiDjango /></S>, category: 'Languages & Frameworks' },
  { name: 'FastAPI', icon: <S><SiFastapi /></S>, category: 'Languages & Frameworks' },
  { name: 'Flutter', icon: <S><SiFlutter /></S>, category: 'Languages & Frameworks' },
  { name: 'REST API Integration', icon: <S><Plug className="w-3 h-3" /></S>, category: 'Languages & Frameworks' },

  // Data Science & Analytics
  { name: 'Pandas', icon: <S><SiPandas /></S>, category: 'Data Science & Analytics' },
  { name: 'NumPy', icon: <S><SiNumpy /></S>, category: 'Data Science & Analytics' },
  { name: 'Matplotlib', icon: <S><LineChart className="w-3 h-3" /></S>, category: 'Data Science & Analytics' },
  { name: 'Seaborn', icon: <S><Waves className="w-3 h-3" /></S>, category: 'Data Science & Analytics' },
  { name: 'Plotly', icon: <S><SiPlotly /></S>, category: 'Data Science & Analytics' },
  { name: 'Streamlit', icon: <S><SiStreamlit /></S>, category: 'Data Science & Analytics' },
  { name: 'Tableau', icon: <S><BarChart3 className="w-3 h-3" /></S>, category: 'Data Science & Analytics' },
  { name: 'Power BI', icon: <S><PieChart className="w-3 h-3" /></S>, category: 'Data Science & Analytics' },
  { name: 'Data Analytics', icon: <S><BarChart3 className="w-3 h-3" /></S>, category: 'Data Science & Analytics' },
  { name: 'Data Visualization', icon: <S><LineChart className="w-3 h-3" /></S>, category: 'Data Science & Analytics' },

  // Vector Databases & Storage
  { name: 'Pinecone', icon: <S><Database className="w-3 h-3" /></S>, category: 'Vector Databases & Storage' },
  { name: 'ChromaDB', icon: <S><Database className="w-3 h-3" /></S>, category: 'Vector Databases & Storage' },
  { name: 'FAISS', icon: <S><Database className="w-3 h-3" /></S>, category: 'Vector Databases & Storage' },
  { name: 'MySQL', icon: <S><SiMysql /></S>, category: 'Vector Databases & Storage' },
  { name: 'Vector Databases', icon: <S><Database className="w-3 h-3" /></S>, category: 'Vector Databases & Storage' },

  // MLOps & Deployment
  { name: 'MLflow', icon: <S><Workflow className="w-3 h-3" /></S>, category: 'MLOps & Deployment' },
  { name: 'Weights & Biases', icon: <S><BarChart3 className="w-3 h-3" /></S>, category: 'MLOps & Deployment' },
  { name: 'Docker', icon: <S><SiDocker /></S>, category: 'MLOps & Deployment' },
  { name: 'GitHub Actions', icon: <S><SiGithubactions /></S>, category: 'MLOps & Deployment' },
  { name: 'CI/CD', icon: <S><GitMerge className="w-3 h-3" /></S>, category: 'MLOps & Deployment' },
  { name: 'Model Deployment', icon: <S><Rocket className="w-3 h-3" /></S>, category: 'MLOps & Deployment' },
  { name: 'FastAPI', icon: <S><SiFastapi /></S>, category: 'MLOps & Deployment' },

  // Cloud & Tools
  { name: 'AWS (S3, EC2, Lambda, Bedrock, SageMaker)', icon: <S><Cloud className="w-3 h-3" /></S>, category: 'Cloud & Tools' },
  { name: 'Azure ML', icon: <S><CloudDrizzle className="w-3 h-3" /></S>, category: 'Cloud & Tools' },
  { name: 'Git', icon: <S><SiGit /></S>, category: 'Cloud & Tools' },
  { name: 'GitHub', icon: <S><SiGithub /></S>, category: 'Cloud & Tools' },
  { name: 'Jira', icon: <S><SiJira /></S>, category: 'Cloud & Tools' },
  { name: 'Linux', icon: <S><SiLinux /></S>, category: 'Cloud & Tools' },
  { name: 'PyTest', icon: <S><SiPytest /></S>, category: 'Cloud & Tools' },
];

const marqueeItems = [
  'PyTorch', 'TensorFlow', 'LangChain', 'Hugging Face', 'Python',
  'FastAPI', 'Docker', 'AWS', 'Computer Vision', 'RAG',
  'MLOps', 'LangGraph', 'Azure ML', 'Flutter',
];

const categories = [
  'AI & Machine Learning',
  'Languages & Frameworks',
  'Data Science & Analytics',
  'Vector Databases & Storage',
  'MLOps & Deployment',
  'Cloud & Tools',
] as const;

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
            className="mb-12 max-w-2xl"
          >
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#f3eee3] leading-[0.95]">
              The <span className="text-gradient italic">stack</span> I reach for.
            </h2>
            <p className="text-muted-warm text-base mt-5">
              {skills.length} technologies across AI, data, MLOps, and cloud.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-16 -mx-4 sm:-mx-6 py-5 border-y border-[#26211b]"
          >
            <Marquee items={marqueeItems} speed={28} />
          </motion.div>

          <div className="space-y-12">
            {categories.map((category, ci) => {
              const categorySkills = skills.filter((s) => s.category === category);
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + ci * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-baseline gap-3 mb-5">
                    <span className="font-mono text-xs text-accent">{String(ci + 1).padStart(2, '0')}</span>
                    <h3 className="font-serif text-2xl text-[#f3eee3]">{category}</h3>
                    <span className="h-px flex-1 bg-[#26211b]" />
                    <span className="font-mono text-xs text-dim">{categorySkills.length}</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {categorySkills.map((skill, si) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.3 + ci * 0.06 + si * 0.02, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="group flex items-center gap-2 px-3.5 py-2 surface rounded-lg text-sm text-muted-warm transition-all duration-200 hover:border-accent/50 hover:text-[#f3eee3] hover:-translate-y-0.5"
                      >
                        <span className="text-dim group-hover:text-accent transition-colors">{skill.icon}</span>
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
