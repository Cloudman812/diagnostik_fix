import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench, 
  Shield, 
  Zap, 
  CheckCircle, 
  XCircle,
  Loader2,
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
  AlertTriangle,
  Settings,
  FileText,
  Database,
  Lock,
  Unlock,
  RefreshCw,
  RotateCcw,
  Play,
  Pause,
  Square,
  Triangle,
  Circle,
  Hexagon,
  Star
} from 'lucide-react';

interface FixProcessModalProps {
  isVisible: boolean;
  problemTitle: string;
  problemType: 'critical' | 'warning';
  onComplete: () => void;
  onClose: () => void;
  isFixing: boolean;
  progress: number;
  currentStep: number;
  logs: string[];
}

const FixProcessModal: React.FC<FixProcessModalProps> = ({ 
  isVisible, 
  problemTitle, 
  problemType, 
  onComplete,
  onClose,
  isFixing,
  progress,
  currentStep,
  logs
}) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const fixSteps = [
    {
      title: 'АНАЛИЗ ПРОБЛЕМЫ',
      description: 'Глубокое сканирование системы...',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'text-cyber-yellow',
      duration: 2000
    },
    {
      title: 'ПОДГОТОВКА ИСПРАВЛЕНИЯ',
      description: 'Создание точек восстановления...',
      icon: <Settings className="w-6 h-6" />,
      color: 'text-cyber-blue',
      duration: 1500
    },
    {
      title: 'ПРИМЕНЕНИЕ ИСПРАВЛЕНИЙ',
      description: 'Выполнение корректирующих действий...',
      icon: <Wrench className="w-6 h-6" />,
      color: 'text-cyber-green',
      duration: 3000
    },
    {
      title: 'ПРОВЕРКА ЦЕЛОСТНОСТИ',
      description: 'Валидация исправлений...',
      icon: <Shield className="w-6 h-6" />,
      color: 'text-cyber-purple',
      duration: 2000
    },
    {
      title: 'ФИНАЛИЗАЦИЯ',
      description: 'Завершение процесса...',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'text-cyber-green',
      duration: 1000
    }
  ];

  const systemIcons = [
    <Cpu className="w-4 h-4" />,
    <MemoryStick className="w-4 h-4" />,
    <HardDrive className="w-4 h-4" />,
    <Network className="w-4 h-4" />,
    <Shield className="w-4 h-4" />,
    <Settings className="w-4 h-4" />,
    <Database className="w-4 h-4" />,
    <FileText className="w-4 h-4" />
  ];

  useEffect(() => {
    if (progress >= 100 && !isCompleted) {
      setIsCompleted(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  }, [progress, isCompleted, onComplete]);

  const getProblemIcon = () => {
    switch (problemType) {
      case 'critical':
        return <XCircle className="w-8 h-8 text-cyber-red" />;
      case 'warning':
        return <AlertTriangle className="w-8 h-8 text-cyber-yellow" />;
      default:
        return <AlertTriangle className="w-8 h-8 text-cyber-yellow" />;
    }
  };

  const getProblemColor = () => {
    switch (problemType) {
      case 'critical':
        return 'border-cyber-red bg-cyber-red/10';
      case 'warning':
        return 'border-cyber-yellow bg-cyber-yellow/10';
      default:
        return 'border-cyber-yellow bg-cyber-yellow/10';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={`cyber-panel max-w-4xl w-full max-h-[90vh] overflow-y-auto ${getProblemColor()}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 border-b border-cyber-green/30 pb-4">
              <div className="flex items-center space-x-3">
                {getProblemIcon()}
                <div>
                  <h2 className="text-2xl font-cyber font-bold text-cyber-green">
                    ПРОЦЕСС ИСПРАВЛЕНИЯ
                  </h2>
                  <p className="text-sm text-gray-400 font-mono">
                    {problemTitle}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`status-light ${isFixing ? 'bg-cyber-green animate-pulse' : 'bg-gray-500'}`}></div>
                  <span className={`text-xs font-mono ${isFixing ? 'text-cyber-green' : 'text-gray-500'}`}>
                    {isFixing ? 'АКТИВНО' : 'ПАУЗА'}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="text-cyber-green hover:text-cyber-red transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Current Step */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-darker-bg rounded border border-cyber-green/30"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={fixSteps[currentStep]?.color}>
                  {fixSteps[currentStep]?.icon}
                </div>
                <div>
                  <h3 className="text-lg font-cyber font-bold text-cyber-green">
                    {fixSteps[currentStep]?.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {fixSteps[currentStep]?.description}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-3 relative overflow-hidden mb-3">
                <motion.div
                  className="h-3 bg-gradient-to-r from-cyber-blue via-cyber-green to-cyber-purple rounded-full"
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

              <div className="text-sm text-cyber-green font-mono">
                ПРОГРЕСС: {Math.round(progress)}%
              </div>
            </motion.div>

            {/* System Status Grid */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {systemIcons.map((icon, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: currentStep >= Math.floor(index / 2) ? 1 : 0.5, 
                    scale: currentStep >= Math.floor(index / 2) ? 1 : 0.8 
                  }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded border ${
                    currentStep >= Math.floor(index / 2) 
                      ? 'border-cyber-green bg-cyber-green/10' 
                      : 'border-gray-600 bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <div className={currentStep >= Math.floor(index / 2) ? 'text-cyber-green' : 'text-gray-500'}>
                      {icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Animated Process Logs */}
            <div className="mb-6">
              <h3 className="text-lg font-cyber font-bold text-cyber-green mb-3">
                СИСТЕМНЫЕ ЛОГИ
              </h3>
              <div className="bg-darker-bg p-4 rounded border border-cyber-green/30 h-48 overflow-y-auto">
                <div className="space-y-1">
                  {logs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="text-sm font-mono text-cyber-green"
                    >
                      {log}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Icons Animation */}
            <div className="relative h-20 mb-6 overflow-hidden">
              {[...Array(8)].map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  initial={{ 
                    x: Math.random() * 100, 
                    y: 100, 
                    opacity: 0 
                  }}
                  animate={{ 
                    x: Math.random() * 100, 
                    y: -20, 
                    opacity: [0, 1, 0] 
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 2, 
                    repeat: Infinity, 
                    delay: index * 0.5 
                  }}
                >
                  <div className="text-cyber-green">
                    {systemIcons[index % systemIcons.length]}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Completion Status */}
            <AnimatePresence>
              {isCompleted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center p-6 bg-cyber-green/20 rounded border border-cyber-green"
                >
                  <CheckCircle className="w-12 h-12 text-cyber-green mx-auto mb-3" />
                  <h3 className="text-xl font-cyber font-bold text-cyber-green mb-2">
                    ИСПРАВЛЕНИЕ ЗАВЕРШЕНО
                  </h3>
                  <p className="text-sm text-gray-300">
                    Проблема успешно устранена
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FixProcessModal; 