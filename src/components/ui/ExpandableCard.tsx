import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ExpandableCardProps {
  title: string;
  subtitle?: string;
  preview: React.ReactNode;
  details: React.ReactNode;
  icon?: React.ReactNode;
  color?: string;
  delay?: number;
}

export function ExpandableCard({
  title,
  subtitle,
  preview,
  details,
  icon,
  color = 'primary',
  delay = 0,
}: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="group"
    >
      <motion.div
        animate={{ height: isExpanded ? 'auto' : '100px' }}
        transition={{ type: 'spring', damping: 20 }}
        className="relative overflow-hidden"
      >
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full p-6 rounded-xl glass text-left transition-all duration-300 ${
            isExpanded ? 'border-primary/50' : 'border-border/50 hover:border-primary/30'
          }`}
          whileHover={{ boxShadow: '0 0 20px rgba(132, 0, 255, 0.2)' }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                {icon && <div className="text-xl flex-shrink-0">{icon}</div>}
                <h3 className="text-lg font-bold truncate">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{subtitle}</p>
            </div>

            {/* Preview content */}
            <div className="flex-shrink-0">{preview}</div>

            {/* Expand icon */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-5 h-5 text-primary" />
            </motion.div>
          </div>

          {/* Details - shown when expanded */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : -10 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={`mt-6 pt-6 border-t border-border/50 ${isExpanded ? 'block' : 'hidden'}`}
          >
            <div className="space-y-4">{details}</div>
          </motion.div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default ExpandableCard;
