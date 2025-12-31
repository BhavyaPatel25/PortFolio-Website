import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, ExternalLink, Award, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const publications = [
  {
    title: 'Vision Transformer in Sport Action: Recognizing Athletic Activities across Varied Sporting Domain',
    conference: 'International Conference on Data Science Applications (ICDSA 2024)',
    publisher: 'Springer Book Series',
    year: '2024',
    description: 'Co-authored research introducing a novel Vision Transformer (ViT)-based approach for sports action recognition, achieving substantial performance improvements over traditional CNN architectures.',
    highlights: [
      'Novel ViT architecture for multi-sport recognition',
      'Validated on 10,000+ frames dataset',
      'Outperformed traditional CNN approaches',
      'Published in Springer international series',
    ],
    doi: 'https://link.springer.com/chapter/10.1007/978-981-96-2179-8_35',
  },
];

const certifications = [
  {
    title: 'Fundamentals of Digital Image and Video Processing',
    issuer: 'Coursera – Northwestern University',
    description: 'Signal processing, motion estimation, and video compression using MATLAB and Python.',
  },
  {
    title: 'Architecting Smart IoT Devices',
    issuer: 'Coursera – EIT Digital',
    description: 'IoT system design, sensor integration, edge computing, and secure communication protocols.',
  },
  {
    title: 'Flutter Development with UI/UX',
    issuer: 'Inspire Cyber Security',
    description: 'Cross-platform apps with Firebase backend and intuitive UI/UX design.',
  },
];

export default function Publications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="publications" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -left-40 top-1/2 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]" />
      
      <div className="container px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Publications */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="text-primary font-mono text-sm tracking-wider uppercase"
              >
                Research
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3"
              >
                Publications &{' '}
                <span className="text-gradient">Research</span>
              </motion.h2>
            </div>

            {publications.map((pub, index) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="glass glass-hover rounded-2xl p-8 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5 flex-shrink-0">
                      <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all">
                        {pub.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="text-secondary font-medium">{pub.conference}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {pub.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6">{pub.description}</p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {pub.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Award className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 rounded-lg text-xs font-mono bg-muted text-muted-foreground">
                      {pub.publisher}
                    </span>
                    <Button variant="outline" size="sm" asChild>
                      <a href={pub.doi} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Publication
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <div>
            <div className="text-center mb-12">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-secondary font-mono text-sm tracking-wider uppercase"
              >
                Credentials
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-2xl md:text-3xl font-bold mt-3"
              >
                Certifications
              </motion.h3>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="glass glass-hover rounded-xl p-6 group"
                >
                  <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-sm text-secondary mb-3">{cert.issuer}</p>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
