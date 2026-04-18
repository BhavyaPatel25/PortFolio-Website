import { motion } from 'framer-motion';

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating gradient orbs */}
      <motion.div
        className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-[60px]"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ left: '10%', top: '15%' }}
      />
      <motion.div
        className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 blur-[80px]"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 50, -30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ left: '70%', top: '60%' }}
      />
      <motion.div
        className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/20 blur-[50px]"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.15, 0.85, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{ left: '50%', top: '30%' }}
      />
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 blur-[70px]"
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 60, -50, 0],
          scale: [1, 1.05, 0.9, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{ left: '20%', top: '70%' }}
      />
    </div>
  );
}
