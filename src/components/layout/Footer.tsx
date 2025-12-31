import { motion } from 'framer-motion';
import { Heart, Linkedin, Github, Mail } from 'lucide-react';

const socials = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/bhavyapatel1000', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/bhavyapatel1000', label: 'GitHub' },
  { icon: Mail, href: 'mailto:bhavyarpatel22@gmail.com', label: 'Email' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-border">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and copyright */}
          <div className="text-center md:text-left">
            <a href="#home" className="text-2xl font-bold text-gradient mb-2 inline-block">
              BP
            </a>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Bhavya Patel. All rights reserved.
            </p>
          </div>

          {/* Built with */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-muted-foreground flex items-center gap-1"
          >
            Built with <Heart className="w-4 h-4 text-primary fill-primary" /> using React & Three.js
          </motion.p>

          {/* Social links */}
          <div className="flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center group hover:bg-primary/10 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
