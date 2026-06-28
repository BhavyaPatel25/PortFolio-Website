import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Briefcase, BookOpen, Award, ArrowUpRight } from 'lucide-react';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

const cards = [
  {
    icon: GraduationCap,
    title: 'Education',
    value: 'MApCompSc',
    subtitle: 'Concordia · 2024–26',
    description: 'Master of Applied Computer Science, Concordia University. B.Tech Computer Engineering, CHARUSAT (2024).',
  },
  {
    icon: BookOpen,
    title: 'Research',
    value: 'Springer',
    subtitle: 'ICDSA 2024',
    description: 'Vision Transformer for sports action recognition — lifted accuracy from 84% to 94% on UCF-101.',
  },
  {
    icon: Briefcase,
    title: 'Experience',
    value: '2+ Years',
    subtitle: 'AI / ML Engineering',
    description: 'From LLM pipelines and RAG workflows to computer vision and MLOps across PyTorch, TensorFlow, and LangChain.',
  },
  {
    icon: Award,
    title: 'Teaching',
    value: 'TA',
    subtitle: 'Distributed Systems · Concordia',
    description: 'Led 10+ labs for 20+ students on Java RMI, CORBA, and SOAP-based web services.',
  },
];

function BentoCard({ card, index }: { card: (typeof cards)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="surface surface-hover rounded-xl p-6 md:p-7 relative overflow-hidden group h-full"
    >
      <span className="absolute top-0 left-0 h-[2px] w-0 bg-accent transition-all duration-500 group-hover:w-full" />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
            <card.icon className="w-5 h-5" />
          </div>
          <span className="font-mono text-[10px] text-dim">{String(index + 1).padStart(2, '0')}</span>
        </div>

        <div className="mb-2">
          <span className="font-serif text-3xl md:text-4xl text-[#f3eee3]">{card.value}</span>
        </div>
        <span className="eyebrow-accent text-[10px]">{card.subtitle}</span>
        <p className="text-muted-warm text-sm leading-relaxed mt-4">{card.description}</p>

        <div className="mt-5 flex items-center gap-2 text-[11px] font-mono text-dim">
          <span className="uppercase tracking-widest">{card.title}</span>
          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </div>
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
          <SectionEyebrow label="About" number="01" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 max-w-3xl"
          >
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl leading-[1.25] text-[#e7e1d4]">
              AI/ML engineer with 2+ years building and deploying{' '}
              <span className="text-accent italic">machine learning systems</span> — deep
              learning pipelines, LLM applications, RAG workflows, and computer vision models.
            </p>
            <p className="text-muted-warm text-base leading-relaxed mt-6 max-w-2xl">
              Completed my Master of Applied Computer Science at Concordia University (2026) with
              hands-on work in PyTorch, TensorFlow, LangChain, Hugging Face, and cloud platforms
              including AWS and Azure. Published researcher in computer vision (Springer, ICDSA
              2024) with a 40% automation efficiency gain on an LLM pipeline. I approach each
              problem as both a researcher and an engineer: prove it works, then make it run in
              production.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {cards.map((card, i) => (
              <div
                key={card.title}
                className={
                  i === 0
                    ? 'md:col-span-5'
                    : i === 1
                      ? 'md:col-span-7'
                      : i === 2
                        ? 'md:col-span-7'
                        : 'md:col-span-5'
                }
              >
                <BentoCard card={card} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
