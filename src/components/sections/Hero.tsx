import { motion } from 'framer-motion';
import { DotGrid } from '@/components/ui/DotGrid';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <DotGrid className="opacity-40" />

      <div className="container px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <span className="eyebrow">AI Engineer & Applied ML Researcher</span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-2">
              <span className="text-[#f0f0f5]">Bhavya</span>
            </h1>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-gradient mb-8">
              Patel
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-xl text-[#8a8a9a] max-w-xl mb-10 leading-relaxed"
          >
            Building intelligent systems that scale. Specializing in LLMs,
            Vision Transformers, and production-grade ML pipelines.
            Research published in Springer.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <a href="#projects" className="invert-btn">
              <span>View Projects</span>
            </a>
            <button
              className="outline-btn"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/Bhavya Patel Resume.pdf';
                link.download = 'Bhavya Patel Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Download Resume
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-3 gap-8 pt-8 border-t border-[#1a1a24] max-w-md"
          >
            {[
              { value: '2+', label: 'Years Exp' },
              { value: '1', label: 'Publication' },
              { value: '5+', label: 'AI Projects' },
            ].map((stat, idx) => (
              <div key={idx} className="text-left">
                <p className="text-2xl sm:text-3xl font-bold text-gradient">{stat.value}</p>
                <p className="text-xs text-[#8a8a9a] mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
