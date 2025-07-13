import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Network, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Activity,
  Zap,
  Thermometer,
  Gauge
} from 'lucide-react';
import MatrixBackground from './components/MatrixBackground';
import ParticleSystem from './components/ParticleSystem';
import StatusPanel from './components/StatusPanel';
import Terminal from './components/Terminal';
import SystemMonitor from './components/SystemMonitor';
import ScanProgress from './components/ScanProgress';
import GlitchText from './components/GlitchText';
import DiagnosisResults from './components/DiagnosisResults';

const App: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [allProblemsFixed, setAllProblemsFixed] = useState(false);
  const [systemStatus, setSystemStatus] = useState({
    cpu: { usage: 0, temp: 0, status: 'normal' },
    memory: { usage: 0, available: 0, status: 'normal' },
    disk: { usage: 0, free: 0, status: 'normal' },
    network: { speed: 0, status: 'normal' },
    security: { threats: 0, status: 'secure' }
  });

  const [logs, setLogs] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Симуляция обновления системных данных
    const interval = setInterval(() => {
      if (allProblemsFixed) {
        // Показатели для исправленного устройства
        setSystemStatus(prev => ({
          cpu: {
            usage: 20 + Math.floor(Math.random() * 15), // 20-35%
            temp: 35 + Math.floor(Math.random() * 15), // 35-50°C
            status: 'normal'
          },
          memory: {
            usage: 30 + Math.floor(Math.random() * 20), // 30-50%
            available: 12 + Math.floor(Math.random() * 4), // 12-16GB
            status: 'normal'
          },
          disk: {
            usage: 45 + Math.floor(Math.random() * 20), // 45-65%
            free: 200 + Math.floor(Math.random() * 100), // 200-300GB
            status: 'normal'
          },
          network: {
            speed: 150 + Math.floor(Math.random() * 50), // 150-200Mbps
            status: 'normal'
          },
          security: {
            threats: 0,
            status: 'secure'
          }
        }));
      } else {
        // Показатели для проблемного устройства
        setSystemStatus(prev => ({
          cpu: {
            usage: Math.floor(Math.random() * 100),
            temp: 30 + Math.floor(Math.random() * 50),
            status: Math.random() > 0.8 ? 'warning' : 'normal'
          },
          memory: {
            usage: 40 + Math.floor(Math.random() * 40),
            available: 8 + Math.floor(Math.random() * 8),
            status: Math.random() > 0.9 ? 'warning' : 'normal'
          },
          disk: {
            usage: 60 + Math.floor(Math.random() * 30),
            free: 100 + Math.floor(Math.random() * 200),
            status: Math.random() > 0.85 ? 'warning' : 'normal'
          },
          network: {
            speed: Math.floor(Math.random() * 1000),
            status: Math.random() > 0.95 ? 'warning' : 'normal'
          },
          security: {
            threats: Math.floor(Math.random() * 3),
            status: Math.random() > 0.9 ? 'warning' : 'secure'
          }
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [allProblemsFixed]);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setLogs([]);
    setShowResults(false);
    setAllProblemsFixed(false); // Сброс состояния при новом сканировании
    
    const scanSteps = [
      'Инициализация системы диагностики...',
      'Проверка целостности файловой системы...',
      'Сканирование реестра Windows...',
      'Анализ процессов и служб...',
      'Проверка сетевых соединений...',
      'Сканирование на наличие вредоносного ПО...',
      'Анализ производительности системы...',
      'Проверка обновлений безопасности...',
      'Формирование отчета...',
      'Диагностика завершена!'
    ];

    let currentStep = 0;
    const scanInterval = setInterval(() => {
      if (currentStep < scanSteps.length) {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${scanSteps[currentStep]}`]);
        setScanProgress((currentStep + 1) * (100 / scanSteps.length));
        currentStep++;
      } else {
        clearInterval(scanInterval);
        setIsScanning(false);
        setShowResults(true);
      }
    }, 1500);
  };

  const handleAllProblemsFixed = () => {
    setAllProblemsFixed(true);
  };

  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      <MatrixBackground />
      <ParticleSystem />
      
      {/* Scan line effect */}
      {isScanning && <div className="scan-line" />}
      
      <div className="relative z-10 p-3 sm:p-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 sm:mb-8"
        >
          <GlitchText 
            text="COMPUTER MASTER DIAGNOSTICS" 
            className="text-2xl sm:text-4xl font-cyber font-bold mb-2"
          />
          <p className="text-cyber-blue text-sm sm:text-lg">
            Advanced System Analysis & Security Suite
          </p>
        </motion.div>

        {/* Main Content Grid - Mobile First */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* System Monitor - Full width on mobile, left column on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 order-1 lg:order-1"
          >
            <SystemMonitor systemStatus={systemStatus} allProblemsFixed={allProblemsFixed} />
          </motion.div>

          {/* Terminal & Scan Progress - Full width on mobile, center column on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1 order-3 lg:order-2"
          >
            <div className="space-y-4 sm:space-y-6">
              <Terminal logs={logs} />
              {isScanning && <ScanProgress progress={scanProgress} />}
            </div>
          </motion.div>

          {/* Status Panel - Full width on mobile, right column on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-1 order-2 lg:order-3"
          >
            <StatusPanel systemStatus={systemStatus} />
          </motion.div>
        </div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 sm:mt-8 text-center"
        >
          <button
            onClick={startScan}
            disabled={isScanning}
            className={`cyber-button text-base sm:text-xl px-6 sm:px-8 py-3 sm:py-4 ${isScanning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
          >
            {isScanning ? 'СКАНИРОВАНИЕ...' : 'ЗАПУСТИТЬ ДИАГНОСТИКУ'}
          </button>
        </motion.div>
      </div>
      
      {/* Diagnosis Results Modal */}
      <DiagnosisResults 
        isVisible={showResults} 
        onClose={() => setShowResults(false)}
        onAllProblemsFixed={handleAllProblemsFixed}
      />
    </div>
  );
};

export default App; 