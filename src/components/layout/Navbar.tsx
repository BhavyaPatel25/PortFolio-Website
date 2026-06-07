import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Publications', href: '#publications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [maskStyle, setMaskStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const activeLink = linkRefs.current.get(activeSection);
    const nav = navRef.current;
    if (activeLink && nav) {
      const linkRect = activeLink.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      setMaskStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    }
  }, [activeSection]);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#1a1a24]' : 'bg-transparent'
        }`}
      >
        <div className="container px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-mono text-sm font-bold text-[#f0f0f5] hover:text-[#8B5CF6] transition-colors"
            >
              bp.dev
            </a>

            {/* Desktop navigation with animated underline mask */}
            <div ref={navRef} className="hidden md:flex items-center gap-1 relative">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  ref={(el) => {
                    if (el) linkRefs.current.set(link.href.slice(1), el);
                  }}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`px-3 py-2 text-sm transition-colors relative z-10 ${
                    activeSection === link.href.slice(1)
                      ? 'text-[#f0f0f5]'
                      : 'text-[#8a8a9a] hover:text-[#f0f0f5]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <motion.div
                className="absolute bottom-0 h-[2px] bg-[#8B5CF6] rounded-full"
                animate={{
                  left: maskStyle.left,
                  width: maskStyle.width,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#8a8a9a] hover:text-[#f0f0f5] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#0a0a0f]/95 backdrop-blur-md border-b border-[#1a1a24] md:hidden"
          >
            <div className="container px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`block px-3 py-3 text-sm rounded-md transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'text-[#f0f0f5] bg-[#111118]'
                      : 'text-[#8a8a9a] hover:text-[#f0f0f5] hover:bg-[#111118]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
