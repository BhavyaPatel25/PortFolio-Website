import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Briefcase, BookOpen, Award } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'MApCompSc @ Concordia University',
    },
    {
      icon: Briefcase,
      title: 'Experience',
      description: '2+ Years in AI/ML Engineering',
    },
    {
      icon: BookOpen,
      title: 'Research',
      description: 'Published in Springer',
    },
    {
      icon: Award,
      title: 'Teaching',
      description: 'TA for Distributed Systems',
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -left-40 top-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
      
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
              About Me
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3"
            >
              Engineer. Researcher.{' '}
              <span className="text-gradient">Builder.</span>
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Story */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a graduate student at <span className="text-foreground font-medium">Concordia University</span> specializing 
                in AI, Machine Learning, and Data Science. My journey bridges the gap between 
                <span className="text-primary"> cutting-edge research</span> and 
                <span className="text-secondary"> production-ready systems</span>.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With hands-on experience in LLMs, Vision Transformers, and cloud-native ML pipelines, 
                I've built AI-driven workflows that automate complex processes and deliver measurable impact.
                My research on sports action recognition using Vision Transformers was published at ICDSA 2024.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Currently serving as a Teaching Assistant for Distributed Systems, I combine 
                my passion for teaching with deep technical expertise in building scalable, 
                intelligent systems.
              </p>
            </motion.div>

            {/* Right: Highlight cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="glass glass-hover rounded-xl p-6 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
