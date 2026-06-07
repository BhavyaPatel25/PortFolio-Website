import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Briefcase, BookOpen, Award } from 'lucide-react';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

const cards = [
  {
    icon: GraduationCap,
    title: 'Education',
    value: 'MApCompSc',
    subtitle: 'Concordia University',
    description: 'Focusing on machine learning and distributed systems in Montreal, Canada.',
  },
  {
    icon: BookOpen,
    title: 'Research',
    value: 'Springer',
    subtitle: 'ICDSA 2024',
    description: 'Vision Transformer for sports action recognition. 94% accuracy on UCF-101.',
  },
  {
    icon: Briefcase,
    title: 'Experience',
    value: '2+ Years',
    subtitle: 'AI/ML Engineering',
    description: 'From data science internships to teaching assistant roles.',
  },
  {
    icon: Award,
    title: 'Teaching',
    value: 'TA',
    subtitle: 'Distributed Systems',
    description: 'Mentoring 20+ students at Concordia.',
  },
];

function BentoCard({ card, index }: { card: typeof cards[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="surface surface-hover rounded-md p-6 md:p-8 relative overflow-hidden group"
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-md bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
            <card.icon className="w-5 h-5 text-[#8B5CF6]" />
          </div>
          <span className="font-mono text-[10px] text-[#4a4a5a]">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-bold text-[#f0f0f5]">{card.value}</span>
            <span className="text-sm text-[#8a8a9a]">{card.subtitle}</span>
          </div>
        </div>

        <p className="text-[#8a8a9a] text-sm leading-relaxed">{card.description}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container px-4 sm:px-6" ref={ref}>
        <div className="max-w-5xl mx-auto">
          <SectionEyebrow label="About Me" number="01" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f5] mb-6">
              Building <span className="text-gradient">Tomorrow's AI</span>
            </h2>
            <p className="text-[#8a8a9a] text-lg max-w-2xl leading-relaxed">
              With a passion for machine learning and a drive to solve complex problems,
              I'm dedicated to creating intelligent systems that make a real impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <BentoCard key={card.title} card={card} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 surface rounded-md p-6 md:p-8"
          >
            <p className="text-[#8a8a9a] text-sm leading-relaxed">
              I'm passionate about bridging the gap between cutting-edge research and practical
              applications. Whether it's fine-tuning large language models, building computer vision
              pipelines, or architecting scalable ML infrastructure, I approach each challenge
              with curiosity and rigor.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
