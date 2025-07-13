import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  MemoryStick, 
  HardDrive, 
  Activity, 
  Thermometer, 
  Gauge 
} from 'lucide-react';

interface SystemStatus {
  cpu: { usage: number; temp: number; status: string };
  memory: { usage: number; available: number; status: string };
  disk: { usage: number; free: number; status: string };
  network: { speed: number; status: string };
  security: { threats: number; status: string };
}

interface SystemMonitorProps {
  systemStatus: SystemStatus;
  allProblemsFixed?: boolean;
}

const SystemMonitor: React.FC<SystemMonitorProps> = ({ systemStatus, allProblemsFixed = false }) => {
  const getUsageColor = (usage: number) => {
    if (allProblemsFixed) return 'text-cyber-green'; // Всегда зеленый для исправленного устройства
    if (usage < 50) return 'text-cyber-green';
    if (usage < 80) return 'text-cyber-yellow';
    return 'text-cyber-red';
  };

  const getBarColor = (usage: number) => {
    if (allProblemsFixed) return 'bg-cyber-green'; // Всегда зеленый для исправленного устройства
    if (usage < 50) return 'bg-cyber-green';
    if (usage < 80) return 'bg-cyber-yellow';
    return 'bg-cyber-red';
  };

  const monitorItems = [
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'CPU USAGE',
      value: systemStatus.cpu.usage,
      unit: '%',
      subValue: `${systemStatus.cpu.temp}°C`,
      color: 'text-cyber-blue'
    },
    {
      icon: <MemoryStick className="w-8 h-8" />,
      title: 'MEMORY USAGE',
      value: systemStatus.memory.usage,
      unit: '%',
      subValue: `${systemStatus.memory.available}GB Available`,
      color: 'text-cyber-purple'
    },
    {
      icon: <HardDrive className="w-8 h-8" />,
      title: 'DISK USAGE',
      value: systemStatus.disk.usage,
      unit: '%',
      subValue: `${systemStatus.disk.free}GB Free`,
      color: 'text-cyber-orange'
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'NETWORK SPEED',
      value: systemStatus.network.speed,
      unit: 'Mbps',
      subValue: 'Active Connection',
      color: 'text-cyber-green'
    }
  ];

  return (
    <div className="cyber-panel h-full">
      <h2 className="text-xl font-cyber font-bold text-cyber-green mb-6 text-center">
        SYSTEM MONITOR
      </h2>
      
      {/* Status Message */}
      {allProblemsFixed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 p-3 bg-cyber-green/20 rounded border border-cyber-green text-center"
        >
          <div className="text-sm font-cyber font-bold text-cyber-green">
            ✅ СИСТЕМА ОПТИМИЗИРОВАНА
          </div>
          <div className="text-xs text-gray-300 mt-1">
            Все проблемы устранены
          </div>
        </motion.div>
      )}
      
      <div className="space-y-6">
        {monitorItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-darker-bg p-4 rounded border border-cyber-green/30"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={item.color}>
                  {item.icon}
                </div>
                <div>
                  <div className="font-mono text-sm text-cyber-green">{item.title}</div>
                  <div className="text-xs text-gray-400">{item.subValue}</div>
                </div>
              </div>
              <div className={`text-2xl font-cyber font-bold ${getUsageColor(item.value)}`}>
                {item.value}{item.unit}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-3 relative overflow-hidden">
              <motion.div
                className={`h-3 rounded-full ${getBarColor(item.value)}`}
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                style={{
                  background: `linear-gradient(90deg, ${getBarColor(item.value).includes('green') ? '#00ff41' : getBarColor(item.value).includes('yellow') ? '#ffd700' : '#ff0040'} 0%, ${getBarColor(item.value).includes('green') ? '#00cc33' : getBarColor(item.value).includes('yellow') ? '#ffb700' : '#cc0033'} 100%)`
                }}
              />
              
              {/* Animated scan line */}
              <motion.div
                className="absolute top-0 left-0 w-1 h-full bg-white opacity-50"
                animate={{ x: [0, item.value * 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Real-time Activity Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-darker-bg rounded border border-cyber-green/30"
      >
        <div className="text-center mb-4">
          <div className="text-lg font-cyber font-bold text-cyber-green">
            REAL-TIME ACTIVITY
          </div>
        </div>
        
        <div className="flex items-end justify-between h-20 space-x-1">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`${allProblemsFixed ? 'bg-cyber-green' : 'bg-cyber-green'} rounded-t`}
              initial={{ height: 0 }}
              animate={{ height: `${allProblemsFixed ? Math.random() * 40 + 10 : Math.random() * 100}%` }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              style={{ width: '4px' }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SystemMonitor; 