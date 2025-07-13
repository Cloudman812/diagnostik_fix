import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Основной текст */}
      <motion.span
        className="relative z-10"
        animate={{
          textShadow: [
            '0 0 5px #00ff41',
            '2px 0 5px #ff0040, -2px 0 5px #00d4ff',
            '0 0 5px #00ff41'
          ]
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      >
        {text}
      </motion.span>
      
      {/* Глитч эффект - красный слой */}
      <motion.span
        className="absolute top-0 left-0 text-cyber-red opacity-80"
        animate={{
          x: [0, -2, 2, 0],
          opacity: [0, 0.8, 0]
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 3
        }}
      >
        {text}
      </motion.span>
      
      {/* Глитч эффект - синий слой */}
      <motion.span
        className="absolute top-0 left-0 text-cyber-blue opacity-80"
        animate={{
          x: [0, 2, -2, 0],
          opacity: [0, 0.8, 0]
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 3,
          delay: 0.1
        }}
      >
        {text}
      </motion.span>
    </div>
  );
};

export default GlitchText; 