import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  Zap, 
  Shield, 
  Star, 
  Trophy, 
  Award,
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
  Settings,
  Database,
  FileText,
  Lock,
  Unlock,
  RefreshCw,
  Play,
  Square,
  Triangle,
  Circle,
  Hexagon,
  Sparkles,
  Heart,
  Rocket,
  Target,
  TrendingUp,
  Activity,
  Gauge,
  Thermometer,
  Wifi,
  Battery,
  BatteryCharging,
  XCircle
} from 'lucide-react';

interface SuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
  fixedProblems: number;
  totalProblems: number;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isVisible, 
  onClose, 
  fixedProblems, 
  totalProblems 
}) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const phases = [
    {
      title: 'СИСТЕМА ОПТИМИЗИРОВАНА',
      description: 'Все критические проблемы устранены',
      icon: <Shield className="w-12 h-12" />,
      color: 'text-cyber-green',
      duration: 3000
    },
    {
      title: 'ПРОИЗВОДИТЕЛЬНОСТЬ ВОССТАНОВЛЕНА',
      description: 'Компьютер работает на максимальной скорости',
      icon: <Zap className="w-12 h-12" />,
      color: 'text-cyber-blue',
      duration: 3000
    },
    {
      title: 'БЕЗОПАСНОСТЬ ОБЕСПЕЧЕНА',
      description: 'Система защищена от всех угроз',
      icon: <Lock className="w-12 h-12" />,
      color: 'text-cyber-purple',
      duration: 3000
    },
    {
      title: 'ОПТИМИЗАЦИЯ ЗАВЕРШЕНА',
      description: 'Ваш компьютер готов к работе!',
      icon: <Trophy className="w-12 h-12" />,
      color: 'text-cyber-yellow',
      duration: 3000
    }
  ];

  const systemStats = [
    { label: 'CPU', value: '98%', icon: <Cpu className="w-6 h-6" />, color: 'text-cyber-blue' },
    { label: 'RAM', value: '95%', icon: <MemoryStick className="w-6 h-6" />, color: 'text-cyber-purple' },
    { label: 'DISK', value: '99%', icon: <HardDrive className="w-6 h-6" />, color: 'text-cyber-orange' },
    { label: 'NETWORK', value: '100%', icon: <Network className="w-6 h-6" />, color: 'text-cyber-green' },
    { label: 'SECURITY', value: '100%', icon: <Shield className="w-6 h-6" />, color: 'text-cyber-red' },
    { label: 'BATTERY', value: '100%', icon: <BatteryCharging className="w-6 h-6" />, color: 'text-cyber-green' }
  ];

  const achievements = [
    'Устранено все критические угрозы безопасности',
    'Оптимизирована производительность системы',
    'Очищены временные файлы и реестр',
    'Обновлены все драйверы устройств',
    'Восстановлена стабильность сети',
    'Повышена энергоэффективность',
    'Улучшена скорость загрузки',
    'Обеспечена полная защита от вирусов'
  ];

  useEffect(() => {
    if (isVisible) {
      startSuccessSequence();
    }
  }, [isVisible]);

  const startSuccessSequence = async () => {
    setCurrentPhase(0);
    setShowConfetti(false);

    for (let i = 0; i < phases.length; i++) {
      setCurrentPhase(i);
      await new Promise(resolve => setTimeout(resolve, phases[i].duration));
    }

    setShowConfetti(true);
  };

  const confettiColors = ['#00ff41', '#00d4ff', '#ffd700', '#8a2be2', '#ff6b35'];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-cyber-green/20 via-cyber-blue/20 to-cyber-purple/20 backdrop-blur-lg z-50 flex items-center justify-center p-4"
        >
          {/* Confetti Animation */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(50)].map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: confettiColors[index % confettiColors.length],
                    left: `${Math.random() * 100}%`,
                    top: '-10px'
                  }}
                  initial={{ y: -10, opacity: 0, rotate: 0 }}
                  animate={{ 
                    y: window.innerHeight + 10, 
                    opacity: [0, 1, 0], 
                    rotate: 360 
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 2, 
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeIn"
                  }}
                />
              ))}
            </div>
          )}

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="cyber-panel max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-dark-bg via-panel-bg to-darker-bg"
          >
            {/* Header */}
            <div className="text-center mb-8 border-b border-cyber-green/30 pb-6 relative">
              <button
                onClick={onClose}
                className="absolute top-0 right-0 text-cyber-green hover:text-cyber-red transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="inline-block p-4 bg-cyber-green/20 rounded-full mb-4"
              >
                <Trophy className="w-16 h-16 text-cyber-green" />
              </motion.div>
              <h1 className="text-4xl font-cyber font-bold text-cyber-green mb-2">
                ОПТИМИЗАЦИЯ ЗАВЕРШЕНА!
              </h1>
              <p className="text-xl text-cyber-blue font-mono">
                Ваш компьютер полностью исправлен и оптимизирован
              </p>
            </div>

            {/* Current Phase */}
            <motion.div
              key={currentPhase}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 p-6 bg-gradient-to-r from-cyber-green/10 to-cyber-blue/10 rounded border border-cyber-green/30"
            >
              <div className={`mx-auto mb-4 ${phases[currentPhase]?.color}`}>
                {phases[currentPhase]?.icon}
              </div>
              <h2 className="text-2xl font-cyber font-bold text-cyber-green mb-2">
                {phases[currentPhase]?.title}
              </h2>
              <p className="text-lg text-gray-300">
                {phases[currentPhase]?.description}
              </p>
            </motion.div>

            {/* System Performance Stats */}
            <div className="mb-8">
              <h3 className="text-2xl font-cyber font-bold text-cyber-green mb-6 text-center">
                ПОКАЗАТЕЛИ СИСТЕМЫ
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {systemStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-darker-bg rounded border border-cyber-green/30 text-center"
                  >
                    <div className={`mx-auto mb-2 ${stat.color}`}>
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-cyber font-bold text-cyber-green mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 font-mono">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-8">
              <h3 className="text-2xl font-cyber font-bold text-cyber-green mb-6 text-center">
                ДОСТИЖЕНИЯ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-darker-bg rounded border border-cyber-green/30"
                  >
                    <CheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0" />
                    <span className="text-sm text-gray-300">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Summary Stats */}
            <div className="mb-8 p-6 bg-gradient-to-r from-cyber-green/10 to-cyber-blue/10 rounded border border-cyber-green/30">
              <div className="grid grid-cols-3 gap-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-3xl font-cyber font-bold text-cyber-green mb-1">
                    {fixedProblems}
                  </div>
                  <div className="text-sm text-gray-400">ИСПРАВЛЕНО ПРОБЛЕМ</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="text-3xl font-cyber font-bold text-cyber-blue mb-1">
                    {Math.round((fixedProblems / totalProblems) * 100)}%
                  </div>
                  <div className="text-sm text-gray-400">ЭФФЕКТИВНОСТЬ</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="text-3xl font-cyber font-bold text-cyber-purple mb-1">
                    A+
                  </div>
                  <div className="text-sm text-gray-400">ОЦЕНКА СИСТЕМЫ</div>
                </motion.div>
              </div>
            </div>

            {/* Floating Icons */}
            <div className="relative h-32 mb-6 overflow-hidden">
              {[...Array(12)].map((_, index) => {
                const IconComponent = [Star, Heart, Sparkles, Trophy, Award][index % 5];
                return (
                  <motion.div
                    key={index}
                    className="absolute"
                    initial={{ 
                      x: Math.random() * 100, 
                      y: 100, 
                      opacity: 0,
                      rotate: 0
                    }}
                    animate={{ 
                      x: Math.random() * 100, 
                      y: -20, 
                      opacity: [0, 1, 0],
                      rotate: 360
                    }}
                    transition={{ 
                      duration: 4 + Math.random() * 3, 
                      repeat: Infinity, 
                      delay: index * 0.3 
                    }}
                  >
                    <div className="text-cyber-green">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Close Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-center"
            >
              <button
                onClick={onClose}
                className="cyber-button text-lg px-8 py-4 hover:scale-105 transition-transform"
              >
                ЗАВЕРШИТЬ
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal; 