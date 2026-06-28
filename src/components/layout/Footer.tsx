import { Linkedin, Github, Mail, ArrowUp } from 'lucide-react';

const socials = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/bhavyapatel1000', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/BhavyaPatel25/', label: 'GitHub' },
  { icon: Mail, href: 'mailto:bhavyarpatel22@gmail.com', label: 'Email' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#26211b] py-12">
      <div className="container px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-serif text-3xl text-[#f3eee3] hover:text-accent transition-colors"
            >
              Bhavya<span className="text-accent italic">.</span>
            </a>

            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-lg surface surface-hover flex items-center justify-center text-muted-warm hover:text-accent"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 eyebrow hover:text-accent transition-colors"
            >
              Back to top
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-[#26211b] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-mono text-xs text-dim">© {year} Bhavya Patel</span>
            <span className="font-mono text-xs text-dim">
              Built with React · Tailwind · Three.js
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
