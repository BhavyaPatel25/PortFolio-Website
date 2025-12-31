import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Publications from '@/components/sections/Publications';
import Contact from '@/components/sections/Contact';

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Bhavya Patel | AI Engineer & ML Researcher</title>
        <meta 
          name="description" 
          content="Graduate AI/ML Engineer specializing in LLMs, Vision Transformers, and production-grade ML pipelines. Research published in Springer. Based in Montreal, Canada." 
        />
        <meta name="keywords" content="AI Engineer, Machine Learning, Deep Learning, LLM, Vision Transformer, Python, TensorFlow, PyTorch, Montreal" />
        <meta property="og:title" content="Bhavya Patel | AI Engineer & ML Researcher" />
        <meta property="og:description" content="Building intelligent systems at scale. Specializing in LLMs, Vision Transformers, and production-grade ML pipelines." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://bhavyapatel.dev" />
      </Helmet>

      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Publications />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
