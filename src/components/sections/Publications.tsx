import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, ExternalLink, Award, Calendar, ArrowUpRight } from 'lucide-react';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

const publications = [
  {
    title:
      'Vision Transformer in Sport Action: Recognizing Athletic Activities',
    conference: 'ICDSA 2024 · India',
    publisher: 'Springer Book Series',
    year: 'Jun 2024',
    description:
      'Co-authored and spearheaded research on a novel ViT-based deep learning approach for multi-class sports action recognition, overseeing model design, the training pipeline (TensorFlow, TensorFlow Hub), and experimentation on 10,000+ video frames from UCF-101 — achieving significant accuracy improvements over CNN baselines. Presented at ICDSA 2024, India, and published in the Springer Book Series.',
    highlights: [
      'Novel ViT architecture for multi-sport recognition',
      'Validated on 10,000+ frames from UCF-101',
      'Outperformed traditional CNN baselines',
      'Presented at ICDSA 2024 · Published in Springer',
    ],
    doi: 'https://link.springer.com/chapter/10.1007/978-981-96-2179-8_35',
  },
];

const certifications = [
  {
    title: 'Fundamentals of Digital Image and Video Processing',
    issuer: 'Coursera — Northwestern University',
    description:
      'Core computer vision concepts including signal processing and motion estimation using Python, supporting deep learning research.',
    link: 'https://www.coursera.org/account/accomplishments/verify/M5XESR2N4ZRS',
  },
  {
    title: 'Architecting Smart IoT Devices',
    issuer: 'Coursera — EIT Digital',
    description:
      'IoT system design including edge computing and secure communication protocols, relevant to real-time data pipelines and embedded AI systems.',
    link: 'https://www.coursera.org/account/accomplishments/verify/Z65TH9SXR54Z',
  },
  {
    title: 'Flutter Development with UI/UX',
    issuer: 'Inspire Cyber Security',
    description: 'Cross-platform apps with Firebase backend and intuitive UI/UX design.',
    link: '/Flutter_Certificate.pdf',
  },
  {
    title: 'Complete ML & Data Science Bootcamp 2023',
    issuer: 'Udemy',
    description: 'Comprehensive ML/DS training: algorithms, neural networks, and practical projects.',
    link: 'https://www.udemy.com/certificate/UC-7b5941b7-bd44-479f-af93-406b110adda2/',
  },
  {
    title: '100 Days of Code: The Complete Python Pro Bootcamp',
    issuer: 'Udemy',
    description: 'Python from basics to advanced applications and automation.',
    link: 'https://www.udemy.com/certificate/UC-927b7167-6ab5-4dfd-8b1e-ad9f0a7b9e93/',
  },
  {
    title: 'TensorFlow Developer Certificate: Zero to Mastery',
    issuer: 'Udemy',
    description: 'Deep learning with TensorFlow — CNNs, RNNs, and deployment strategies.',
    link: 'https://www.udemy.com/certificate/UC-634f84af-0eb2-4112-8926-0579e6e0c478/',
  },
];

export default function Publications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="publications" className="py-24 md:py-32 relative">
      <div className="container px-4 sm:px-6" ref={ref}>
        <div className="max-w-5xl mx-auto">
          <SectionEyebrow label="Research" number="05" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 max-w-2xl"
          >
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#f3eee3] leading-[0.95]">
              Research & <span className="text-gradient italic">credentials</span>.
            </h2>
            <p className="text-muted-warm text-base mt-5">
              Peer-reviewed work and professional certifications.
            </p>
          </motion.div>

          <div className="mb-20">
            {publications.map((pub) => (
              <motion.article
                key={pub.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="surface rounded-2xl p-7 md:p-10 relative overflow-hidden group"
              >
                <span className="absolute top-0 left-0 h-full w-[3px] bg-accent scale-y-50 origin-top transition-transform duration-500 group-hover:scale-y-100" />
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="flex items-center gap-1.5 eyebrow-accent">
                    <BookOpen className="w-3.5 h-3.5" />
                    Publication
                  </span>
                  <span className="font-mono text-xs text-dim flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {pub.year}
                  </span>
                  <span className="font-mono text-[10px] text-muted-warm border border-[#2a241d] px-2 py-0.5 rounded">
                    {pub.publisher}
                  </span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-[#f3eee3] leading-snug mb-3 max-w-3xl">
                  {pub.title}
                </h3>
                <p className="text-muted-warm text-sm leading-relaxed mb-6 max-w-2xl">
                  {pub.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 mb-7">
                  {pub.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm">
                      <Award className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      <span className="text-[#c9c3b6]">{h}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <a href={pub.doi} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    Read paper
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <span className="eyebrow">{pub.conference}</span>
                </div>
              </motion.article>
            ))}
          </div>

          <div>
            <h3 className="eyebrow mb-5">Certifications</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {certifications.map((c, i) => (
                <motion.a
                  key={c.title}
                  href={c.link}
                  target={c.link.startsWith('http') ? '_blank' : undefined}
                  rel={c.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group surface surface-hover rounded-xl p-5 flex items-start justify-between gap-4"
                >
                  <div className="min-w-0">
                    <h4 className="text-[#f3eee3] font-medium text-sm leading-snug group-hover:text-accent transition-colors">
                      {c.title}
                    </h4>
                    <p className="text-dim text-xs font-mono mt-1">{c.issuer}</p>
                    <p className="text-muted-warm text-xs mt-2 leading-relaxed">{c.description}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-dim flex-shrink-0 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
