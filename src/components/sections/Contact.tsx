import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Linkedin, Github, Send, ArrowUpRight, Phone, Globe } from 'lucide-react';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'contact',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      // noop
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="container px-4 sm:px-6" ref={ref}>
        <div className="max-w-5xl mx-auto">
          <SectionEyebrow label="Contact" number="06" />

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: editorial CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#f3eee3] leading-[0.95]">
                Let's build something{' '}
                <span className="text-gradient italic">intelligent</span>.
              </h2>
              <p className="text-muted-warm text-base leading-relaxed mt-6 max-w-md">
                Open to AI/ML engineering and research roles. Have a problem worth
                solving? I'd love to hear about it.
              </p>

              <div className="mt-8 space-y-3">
                <a
                  href="tel:+14388339398"
                  className="group flex items-center gap-3 text-[#c9c3b6] hover:text-accent transition-colors"
                >
                  <span className="w-9 h-9 rounded-lg surface flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </span>
                  <span className="link-underline">(438) 833-9398</span>
                </a>
                <a
                  href="https://bhavyapatel25.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-[#c9c3b6] hover:text-accent transition-colors"
                >
                  <span className="w-9 h-9 rounded-lg surface flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </span>
                  <span className="link-underline">bhavyapatel25.netlify.app</span>
                </a>
                <a
                  href="mailto:bhavyarpatel22@gmail.com"
                  className="group flex items-center gap-3 text-[#c9c3b6] hover:text-accent transition-colors"
                >
                  <span className="w-9 h-9 rounded-lg surface flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </span>
                  <span className="link-underline">bhavyarpatel22@gmail.com</span>
                </a>
                <div className="flex items-center gap-3 text-muted-warm">
                  <span className="w-9 h-9 rounded-lg surface flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </span>
                  Montreal, Canada
                </div>
              </div>

              <div className="flex items-center gap-3 mt-8">
                {[
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/bhavyapatel1000', label: 'LinkedIn' },
                  { icon: Github, href: 'https://github.com/BhavyaPatel25/', label: 'GitHub' },
                ].map((s) => (
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
            </motion.div>

            {/* Right: form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="surface rounded-2xl p-6 md:p-8 space-y-5"
              name="contact"
              data-netlify="true"
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow">Send a message</span>
                <span className="font-mono text-[10px] text-dim">POST /contact</span>
              </div>

              <div>
                <label className="eyebrow mb-1.5 block">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0e0d0b] border border-[#2a241d] rounded-lg px-3.5 py-3 text-sm text-[#f3eee3] placeholder:text-dim focus:outline-none focus:border-accent/60 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="eyebrow mb-1.5 block">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0e0d0b] border border-[#2a241d] rounded-lg px-3.5 py-3 text-sm text-[#f3eee3] placeholder:text-dim focus:outline-none focus:border-accent/60 transition-colors"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label className="eyebrow mb-1.5 block">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#0e0d0b] border border-[#2a241d] rounded-lg px-3.5 py-3 text-sm text-[#f3eee3] placeholder:text-dim focus:outline-none focus:border-accent/60 transition-colors resize-none"
                  placeholder="Tell me about the opportunity..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full justify-center disabled:opacity-50"
              >
                {submitted ? (
                  'Message sent'
                ) : isSubmitting ? (
                  'Sending…'
                ) : (
                  <>
                    Send message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
