import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Briefcase, BookOpen, Award } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { InteractiveCard } from '@/components/ui/InteractiveCard';
import WaveBackground from '@/components/ui/WaveBackground';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const highlights = [
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'MApCompSc @ Concordia University, focusing on machine learning and distributed systems.',
      color: 'primary',
    },
    {
      icon: Briefcase,
      title: 'Experience',
      description: '2+ Years in AI/ML Engineering with hands-on experience building production systems.',
      color: 'secondary',
    },
    {
      icon: BookOpen,
      title: 'Research',
      description: 'Published research in Springer, focusing on advanced ML techniques and applications.',
      color: 'accent',
    },
    {
      icon: Award,
      title: 'Teaching',
      description: 'Teaching Assistant for Distributed Systems, mentoring future engineers.',
      color: 'primary',
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Animated wave background */}
      <WaveBackground />

      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -left-40 top-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute -right-40 bottom-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />

      <div className="container px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <motion.span
                className="inline-block px-4 py-2 rounded-full glass mb-4 text-sm font-medium text-primary"
              >
                About Me
              </motion.span>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient">Building Tomorrow's AI</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-base md:text-lg text-muted-foreground/90 max-w-2xl mx-auto">
                With a passion for machine learning and a drive to solve complex problems, I'm dedicated to creating intelligent systems that make a real impact.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {highlights.map((item, idx) => (
              <ScrollReveal key={idx} direction={idx % 2 === 0 ? 'left' : 'right'} delay={0.1 + idx * 0.1}>
                <InteractiveCard
                  icon={<item.icon className="w-6 h-6" />}
                  title={item.title}
                  description={item.description}
                  color={item.color}
                />
              </ScrollReveal>
            ))}
          </div>

          {/* Detailed content */}
          <ScrollReveal direction="up" delay={0.3} className="mt-20">
            <div className="glass rounded-xl p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-6 text-gradient">What Drives Me</h3>
              <p className="text-muted-foreground/90 leading-relaxed mb-4">
                I'm passionate about bridging the gap between cutting-edge research and practical applications. My journey in AI/ML has been about understanding not just the "what" but the "why" and "how" of intelligent systems.
              </p>
              <p className="text-muted-foreground/90 leading-relaxed">
                Whether it's fine-tuning large language models, building computer vision pipelines, or architecting scalable ML infrastructure, I approach each challenge with curiosity and rigor.
              </p>
            </div>
          </ScrollReveal>
        </motion.div>
      </div>
    </section>
  );
}
