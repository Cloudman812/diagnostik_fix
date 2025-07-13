import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Search, CheckCircle } from 'lucide-react';

interface ScanProgressProps {
  progress: number;
}

const ScanProgress: React.FC<ScanProgressProps> = ({ progress }) => {
  const scanSteps = [
    { icon: <Zap className="w-6 h-6" />, label: 'INITIALIZING', color: 'text-cyber-blue' },
    { icon: <Search className="w-6 h-6" />, label: 'SCANNING', color: 'text-cyber-yellow' },
    { icon: <Shield className="w-6 h-6" />, label: 'ANALYZING', color: 'text-cyber-purple' },
    { icon: <CheckCircle className="w-6 h-6" />, label: 'COMPLETING', color: 'text-cyber-green' }
  ];

  const currentStep = Math.floor((progress / 100) * scanSteps.length);

  return (
    <div className="cyber-panel">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-cyber font-bold text-cyber-green">
          SCAN PROGRESS
        </h2>
        <div className="flex items-center space-x-2">
          <div className="status-light bg-cyber-yellow animate-pulse"></div>
          <span className="text-xs text-cyber-yellow font-mono">SCANNING</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-cyber-green font-mono">PROGRESS</span>
          <span className="text-sm text-cyber-green font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4 relative overflow-hidden">
          <motion.div
            className="h-4 bg-gradient-to-r from-cyber-blue via-cyber-yellow to-cyber-green rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Animated scan line */}
          <motion.div
            className="absolute top-0 left-0 w-1 h-full bg-white opacity-70"
            animate={{ x: [0, progress * 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Scan Steps */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {scanSteps.map((step, index) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: index <= currentStep ? 1 : 0.5, 
              scale: index <= currentStep ? 1 : 0.8 
            }}
            transition={{ delay: index * 0.2 }}
            className={`p-3 rounded border ${
              index <= currentStep 
                ? 'border-cyber-green bg-cyber-green/10' 
                : 'border-gray-600 bg-gray-800/50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className={index <= currentStep ? step.color : 'text-gray-500'}>
                {step.icon}
              </div>
              <div>
                <div className={`text-xs font-mono ${
                  index <= currentStep ? 'text-cyber-green' : 'text-gray-500'
                }`}>
                  {step.label}
                </div>
                <div className={`text-xs ${
                  index <= currentStep ? 'text-cyber-green' : 'text-gray-600'
                }`}>
                  {index <= currentStep ? 'ACTIVE' : 'PENDING'}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Status Indicators */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center p-3 bg-darker-bg rounded border border-cyber-green/30"
        >
          <div className="text-2xl font-cyber font-bold text-cyber-blue mb-1">
            {Math.floor(Math.random() * 1000) + 500}
          </div>
          <div className="text-xs text-gray-400">FILES SCANNED</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center p-3 bg-darker-bg rounded border border-cyber-green/30"
        >
          <div className="text-2xl font-cyber font-bold text-cyber-yellow mb-1">
            {Math.floor(Math.random() * 5)}
          </div>
          <div className="text-xs text-gray-400">THREATS FOUND</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center p-3 bg-darker-bg rounded border border-cyber-green/30"
        >
          <div className="text-2xl font-cyber font-bold text-cyber-green mb-1">
            {Math.floor(Math.random() * 50) + 20}
          </div>
          <div className="text-xs text-gray-400">ISSUES FIXED</div>
        </motion.div>
      </div>

      {/* Animated Status Messages */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 p-3 bg-darker-bg rounded border border-cyber-green/30"
      >
        <div className="text-sm text-cyber-green font-mono">
          <span className="animate-blink">{'>'}</span> Scanning system files...
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Estimated time remaining: {Math.max(0, Math.floor((100 - progress) / 10))} seconds
        </div>
      </motion.div>
    </div>
  );
};

export default ScanProgress; 