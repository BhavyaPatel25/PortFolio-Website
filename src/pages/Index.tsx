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
        <title>Bhavya Patel | Artificial Intelligence Engineer</title>
        <meta
          name="description"
          content="Artificial Intelligence Engineer with 2+ years building ML systems — LLM applications, RAG, computer vision, and production pipelines. PyTorch, TensorFlow, LangChain. Published in Springer (ICDSA 2024). Based in Montreal, Canada."
        />
        <meta name="keywords" content="Artificial Intelligence Engineer, AI/ML, Machine Learning, Deep Learning, LLM, RAG, Vision Transformer, PyTorch, TensorFlow, LangChain, Hugging Face, AWS, Azure, Montreal" />
        <meta property="og:title" content="Bhavya Patel | Artificial Intelligence Engineer" />
        <meta property="og:description" content="AI/ML Engineer — LLM applications, RAG, computer vision, and production ML pipelines. Published in Springer (ICDSA 2024). Montreal, Canada." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://bhavyapatel25.netlify.app" />
      </Helmet>

      <div className="min-h-screen bg-[#0b0a08]">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Publications />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
