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
      description: '2 Years in AI/ML Engineering',
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
                I am a graduate student in Applied Computer Science at <span className="text-foreground font-medium">Concordia University</span>, 
                specializing in Artificial Intelligence, Machine Learning, and Data Science. With over two years of experience across 
                academic research and industry projects, I focus on building practical, scalable AI systems that translate complex 
                ideas into real-world solutions.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My work spans <span className="text-primary">machine learning, deep learning, large language models, and computer vision</span>, 
                using tools such as Python, TensorFlow, PyTorch, and LangChain. I have hands-on experience deploying AI solutions on 
                cloud platforms including <span className="text-secondary">AWS Bedrock, SageMaker, and Azure ML</span>, with an emphasis 
                on end-to-end pipelines from data to deployment.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Alongside technical depth, I bring strong communication and leadership skills developed through teaching, research, 
                and collaborative projects. I am driven by continuous learning and enjoy working at the intersection of intelligent 
                systems, real-world impact, and thoughtful design.
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
