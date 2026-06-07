import { Linkedin, Github, Mail } from 'lucide-react';

const socials = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/bhavyapatel1000', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/BhavyaPatel25/', label: 'GitHub' },
  { icon: Mail, href: 'mailto:bhavyarpatel22@gmail.com', label: 'Email' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1a1a24] py-10">
      <div className="container px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="font-mono text-sm font-bold text-[#f0f0f5]">bhavya_patel</span>
            <p className="font-mono text-xs text-[#4a4a5a] mt-1">
              &copy; {currentYear} — All rights reserved
            </p>
          </div>

          <div className="flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md flex items-center justify-center bg-[#111118] border border-[#1a1a24] hover:border-[#4a4a5a] hover:text-[#f0f0f5] text-[#8a8a9a] transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <div className="font-mono text-xs text-[#4a4a5a]">
            Built with React + Tailwind
          </div>
        </div>
      </div>
    </footer>
  );
}
