import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { DotGrid } from '@/components/ui/DotGrid';
import { LatentSpaceFallback } from '@/components/three/LatentSpaceFallback';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { useWebGLSupport } from '@/hooks/use-webgl-support';

const LatentSpaceScene = lazy(() => import('@/components/three/LatentSpace'));

const CODE = `const engineer = {
  title: 'AI/ML Engineer',
  focus: ['LLMs', 'Vision Transformers', 'RAG'],
  stack: ['PyTorch', 'TensorFlow', 'LangChain'],
  research: 'Springer · ICDSA 2024',
  based: 'Montreal, CA',
  status: 'open to AI/ML roles',
}`;

function TypewriterCode() {
  const reduced = usePrefersReducedMotion();
  const [text, setText] = useState(reduced ? CODE : '');
  const idx = useRef(0);

  useEffect(() => {
    if (reduced) return;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      idx.current += 1;
      setText(CODE.slice(0, idx.current));
      if (idx.current < CODE.length) {
        timer = setTimeout(tick, 18 + Math.random() * 26);
      }
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [reduced]);

  // lightweight syntax highlight: wrap quoted strings + known tokens in lime
  const render = (src: string) => {
    const parts: React.ReactNode[] = [];
    const regex = /('[^']*')|(\b(?:const|return)\b)|(\{|\}|\[|\])/g;
    let last = 0;
    let m: RegExpExecArray | null;
    let key = 0;
    while ((m = regex.exec(src))) {
      if (m.index > last) parts.push(src.slice(last, m.index));
      if (m[1]) parts.push(<span key={key++} className="text-accent">{m[1]}</span>);
      else if (m[2]) parts.push(<span key={key++} className="text-[#c9c3b6]">{m[2]}</span>);
      else parts.push(<span key={key++} className="text-dim">{m[0]}</span>);
      last = m.index + m[0].length;
    }
    if (last < src.length) parts.push(src.slice(last));
    return parts;
  };

  return (
    <pre className="font-mono text-[12.5px] sm:text-sm leading-relaxed text-[#c9c3b6] whitespace-pre overflow-hidden">
      <code>
        {render(text)}
        <span className="cursor-caret text-accent">▋</span>
      </code>
    </pre>
  );
}

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGLSupport();
  const canRender3D = !reduced && webgl === true;
  const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 180 : 420;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end overflow-hidden pt-24"
    >
      {canRender3D ? (
        <Suspense fallback={<LatentSpaceFallback />}>
          <LatentSpaceScene count={count} reduced={reduced} />
        </Suspense>
      ) : (
        <LatentSpaceFallback />
      )}
      <DotGrid className="opacity-10" />

      <div className="container px-4 sm:px-6 relative z-10 w-full pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="status-dot w-2 h-2 rounded-full bg-accent" />
            <span className="eyebrow">Artificial Intelligence Engineer — Montreal, Canada</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[19vw] sm:text-[15vw] md:text-[12vw] lg:text-[11rem] leading-[0.85] tracking-tight text-[#f3eee3]"
          >
            Bhavya
            <br />
            <span className="text-gradient italic">Patel</span>
          </motion.h1>

          <div className="mt-8 grid md:grid-cols-2 gap-8 items-end">
            {/* Terminal self-description */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="surface rounded-lg overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#26211b] bg-[#0e0d0b]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3a3329]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#3a3329]" />
                <span className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                <span className="ml-2 font-mono text-[11px] text-dim">engineer.ts</span>
              </div>
              <div className="p-4 sm:p-5 min-h-[180px]">
                <TypewriterCode />
              </div>
            </motion.div>

            {/* Tagline + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[#c9c3b6] text-lg leading-relaxed max-w-md mb-7">
                Building intelligent systems that scale — from{' '}
                <span className="text-accent">Vision Transformers</span> to{' '}
                <span className="text-accent">production LLM pipelines</span>. Research
                published in Springer.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#projects" className="btn-primary">
                  View Projects
                  <ArrowDown className="w-4 h-4" />
                </a>
                <button
                  className="btn-ghost"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/Bhavya Patel Resume.pdf';
                    link.download = 'Bhavya Patel Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <Download className="w-4 h-4" />
                  Resume
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
