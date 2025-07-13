import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalProps {
  logs: string[];
}

const Terminal: React.FC<TerminalProps> = ({ logs }) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="cyber-panel h-80 sm:h-96">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-cyber font-bold text-cyber-green">
          SYSTEM LOGS
        </h2>
        <div className="flex items-center space-x-2">
          <div className="status-light bg-cyber-green"></div>
          <span className="text-xs text-cyber-green font-mono">LIVE</span>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="bg-black h-64 sm:h-80 overflow-y-auto p-3 sm:p-4 font-mono text-xs sm:text-sm border border-cyber-green/30 rounded"
        style={{ 
          background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)',
          scrollbarWidth: 'thin',
          scrollbarColor: '#00ff41 #1a1a1a'
        }}
      >
        <AnimatePresence>
          {logs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-1 break-words"
            >
              <span className="text-cyber-green">{log}</span>
              <span className="text-cyber-green animate-blink">_</span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {logs.length === 0 && (
          <div className="text-gray-500 italic">
            <span className="text-cyber-green">$</span> Waiting for system logs...
            <span className="text-cyber-green animate-blink">_</span>
          </div>
        )}
      </div>
      
      <div className="mt-3 sm:mt-4 flex items-center justify-between text-xs text-gray-400">
        <span>Lines: {logs.length}</span>
        <span>Status: {logs.length > 0 ? 'ACTIVE' : 'IDLE'}</span>
      </div>
    </div>
  );
};

export default Terminal; 