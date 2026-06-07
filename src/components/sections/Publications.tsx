import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, ExternalLink, Award, Calendar } from 'lucide-react';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

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
    link: 'https://www.coursera.org/account/accomplishments/verify/M5XESR2N4ZRS',
  },
  {
    title: 'Architecting Smart IoT Devices',
    issuer: 'Coursera – EIT Digital',
    description: 'IoT system design, sensor integration, edge computing, and secure communication protocols.',
    link: 'https://www.coursera.org/account/accomplishments/verify/Z65TH9SXR54Z',
  },
  {
    title: 'Flutter Development with UI/UX',
    issuer: 'Inspire Cyber Security',
    description: 'Cross-platform apps with Firebase backend and intuitive UI/UX design.',
    link: '/Flutter_Certificate.pdf',
  },
  {
    title: 'Complete Machine Learning & Data Science Bootcamp 2023',
    issuer: 'Udemy',
    description: 'Comprehensive ML/DS training covering algorithms, neural networks, and practical projects.',
    link: 'https://www.udemy.com/certificate/UC-7b5941b7-bd44-479f-af93-406b110adda2/',
  },
  {
    title: '100 Days of Code: The Complete Python Pro Bootcamp',
    issuer: 'Udemy',
    description: 'Comprehensive Python training from basics to advanced applications and automation.',
    link: 'https://www.udemy.com/certificate/UC-927b7167-6ab5-4dfd-8b1e-ad9f0a7b9e93/',
  },
  {
    title: 'TensorFlow Developer Certificate: Zero to Mastery',
    issuer: 'Udemy',
    description: 'Deep learning with TensorFlow, CNNs, RNNs, and deployment strategies.',
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
            className="mb-14"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f5] mb-6">
              Publications & <span className="text-gradient">Credentials</span>
            </h2>
            <p className="text-[#8a8a9a] text-lg max-w-xl">
              Peer-reviewed research and professional certifications.
            </p>
          </motion.div>

          {/* Publications */}
          <div className="mb-20">
            {publications.map((pub, index) => (
              <motion.article
                key={pub.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="surface rounded-md p-6 md:p-8 relative overflow-hidden group"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-md bg-[#111118] border border-[#1a1a24] flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-[#f0f0f5] mb-1">
                      {pub.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#8a8a9a]">
                      <span className="text-[#8B5CF6]">{pub.conference}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {pub.year}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-[#8a8a9a] text-sm leading-relaxed mb-6 max-w-3xl">
                  {pub.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
                  {pub.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Award className="w-3.5 h-3.5 text-[#8B5CF6] flex-shrink-0" />
                      <span className="text-[#8a8a9a]">{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-2.5 py-1 rounded text-[10px] font-mono bg-[#111118] border border-[#1a1a24] text-[#4a4a5a]">
                    {pub.publisher}
                  </span>
                  <a
                    href={pub.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="invert-btn text-xs py-2 px-4 flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Publication
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Certifications */}
          <div>
            <h3 className="font-mono text-xs text-[#4a4a5a] uppercase tracking-widest mb-6">
              Certifications
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {certifications.map((cert, index) => (
                <motion.a
                  key={cert.title}
                  href={cert.link}
                  target={cert.link.startsWith('/') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group surface rounded-md p-5 block transition-colors duration-200 hover:bg-[#16161f]"
                >
                  <h4 className="font-medium text-[#f0f0f5] text-sm mb-1 group-hover:text-[#f0f0f5]">
                    {cert.title}
                  </h4>
                  <p className="text-[11px] text-[#8B5CF6] mb-2">{cert.issuer}</p>
                  <p className="text-[11px] text-[#4a4a5a] leading-relaxed">
                    {cert.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#4a4a5a] mt-3 group-hover:text-[#8B5CF6] transition-colors">
                    View Certificate <ExternalLink className="w-3 h-3" />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
