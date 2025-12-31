import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Mail } from 'lucide-react';
import NeuralNetwork from '@/components/3d/NeuralNetwork';

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <NeuralNetwork />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/20 rounded-full blur-[100px] pulse-glow" style={{ animationDelay: '-1.5s' }} />
      
      <div className="container relative z-10 px-6 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Open to opportunities</span>
          </motion.div>
          
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
          >
            Bhavya{' '}
            <span className="text-gradient">Patel</span>
          </motion.h1>
          
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-6"
          >
            AI Engineer & Applied ML Researcher
          </motion.h2>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Building intelligent systems at scale. Specializing in LLMs, Vision Transformers, 
            and production-grade ML pipelines. Research published in Springer.
          </motion.p>
          
          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => scrollToSection('projects')}
              className="group"
            >
              View Projects
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="heroOutline" 
              size="xl"
              asChild
            >
              <a href="/Bhavya_Patel_Resume.pdf" download>
                <Download className="w-5 h-5" />
                Download Resume
              </a>
            </Button>
            <Button 
              variant="glass" 
              size="xl"
              onClick={() => scrollToSection('contact')}
            >
              <Mail className="w-5 h-5" />
              Contact Me
            </Button>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
          >
            {[
              { value: '2+', label: 'Years Experience' },
              { value: '1', label: 'Publication' },
              { value: '5+', label: 'AI Projects' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-primary rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
