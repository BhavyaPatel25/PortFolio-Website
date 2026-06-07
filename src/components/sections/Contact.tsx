import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Linkedin, Github, Send } from 'lucide-react';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map(
      (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
    )
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
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
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
    } catch (err) {
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f5] mb-6">
              Let&apos;s <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-[#8a8a9a] text-lg max-w-xl">
              Open to AI/ML engineering roles, research collaborations, and innovative projects.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <a
                  href="mailto:bhavyarpatel22@gmail.com"
                  className="group flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-md bg-[#111118] border border-[#1a1a24] flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:border-[#8B5CF6]/40">
                    <Mail className="w-4 h-4 text-[#8a8a9a] group-hover:text-[#f0f0f5] transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-[#4a4a5a] uppercase tracking-wider">Email</p>
                    <p className="text-sm text-[#f0f0f5]">bhavyarpatel22@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-[#111118] border border-[#1a1a24] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#8a8a9a]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-[#4a4a5a] uppercase tracking-wider">Location</p>
                    <p className="text-sm text-[#f0f0f5]">Montreal, Quebec, Canada</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#1a1a24] space-y-4">
                <p className="text-[10px] font-mono text-[#4a4a5a] uppercase tracking-wider">Connect</p>
                <div className="flex gap-2">
                  <a
                    href="https://www.linkedin.com/in/bhavyapatel1000"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="w-10 h-10 rounded-md bg-[#111118] border border-[#1a1a24] flex items-center justify-center hover:border-[#8B5CF6]/40 transition-colors duration-200"
                  >
                    <Linkedin className="w-4 h-4 text-[#8a8a9a] hover:text-[#f0f0f5]" />
                  </a>
                  <a
                    href="https://github.com/BhavyaPatel25/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="w-10 h-10 rounded-md bg-[#111118] border border-[#1a1a24] flex items-center justify-center hover:border-[#8B5CF6]/40 transition-colors duration-200"
                  >
                    <Github className="w-4 h-4 text-[#8a8a9a] hover:text-[#f0f0f5]" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="surface rounded-md p-6 md:p-8 space-y-5"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>
                    Don&apos;t fill this out: <input name="bot-field" />
                  </label>
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono text-[#4a4a5a] uppercase tracking-wider mb-1.5 block">
                      Name
                    </label>
                    <input
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="w-full bg-[#111118] border border-[#1a1a24] rounded-md px-3 py-2.5 text-sm text-[#f0f0f5] placeholder:text-[#4a4a5a] focus:outline-none focus:border-[#8B5CF6]/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#4a4a5a] uppercase tracking-wider mb-1.5 block">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="w-full bg-[#111118] border border-[#1a1a24] rounded-md px-3 py-2.5 text-sm text-[#f0f0f5] placeholder:text-[#4a4a5a] focus:outline-none focus:border-[#8B5CF6]/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#4a4a5a] uppercase tracking-wider mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="w-full bg-[#111118] border border-[#1a1a24] rounded-md px-3 py-2.5 text-sm text-[#f0f0f5] placeholder:text-[#4a4a5a] focus:outline-none focus:border-[#8B5CF6]/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full invert-btn py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitted ? (
                    <>Message sent</>
                  ) : isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
