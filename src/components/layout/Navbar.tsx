import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import LiveClock from '@/components/ui/LiveClock';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Research', href: '#publications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [maskStyle, setMaskStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 180) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const activeLink = linkRefs.current.get(activeSection);
    const nav = navRef.current;
    if (activeLink && nav) {
      const lr = activeLink.getBoundingClientRect();
      const nr = nav.getBoundingClientRect();
      setMaskStyle({ left: lr.left - nr.left, width: lr.width });
    }
  }, [activeSection]);

  const scrollToSection = (href: string) => {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0b0a08]/80 backdrop-blur-xl border-b border-[#26211b]'
            : 'bg-transparent'
        }`}
      >
        <div className="container px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-mono text-sm font-semibold text-[#f3eee3] hover:text-accent transition-colors"
            >
              bp<span className="text-accent">.</span>
            </a>

            {/* Desktop nav */}
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
                      ? 'text-[#f3eee3]'
                      : 'text-[#9b948a] hover:text-[#f3eee3]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <motion.div
                className="absolute bottom-1 h-[2px] bg-accent rounded-full"
                animate={{ left: maskStyle.left, width: maskStyle.width }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* Status + clock */}
            <div className="hidden md:flex items-center gap-3">
              <span className="flex items-center gap-2 eyebrow">
                <span className="status-dot w-1.5 h-1.5 rounded-full bg-accent" />
                Available
              </span>
              <span className="font-mono text-xs text-dim tabular-nums">
                MTL <LiveClock />
              </span>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#9b948a] hover:text-[#f3eee3] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#0b0a08]/95 backdrop-blur-xl border-b border-[#26211b] md:hidden"
          >
            <div className="container px-4 sm:px-6 py-4">
              <div className="flex items-center gap-2 eyebrow mb-4">
                <span className="status-dot w-1.5 h-1.5 rounded-full bg-accent" />
                Available for AI/ML roles
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`block px-3 py-3 text-base rounded-md transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'text-[#f3eee3] bg-[#17140f]'
                      : 'text-[#9b948a] hover:text-[#f3eee3] hover:bg-[#17140f]'
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
