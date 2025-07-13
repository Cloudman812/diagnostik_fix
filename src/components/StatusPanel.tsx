import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  MemoryStick, 
  HardDrive, 
  Network, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle 
} from 'lucide-react';

interface SystemStatus {
  cpu: { usage: number; temp: number; status: string };
  memory: { usage: number; available: number; status: string };
  disk: { usage: number; free: number; status: string };
  network: { speed: number; status: string };
  security: { threats: number; status: string };
}

interface StatusPanelProps {
  systemStatus: SystemStatus;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ systemStatus }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
      case 'secure':
        return 'text-cyber-green';
      case 'warning':
        return 'text-cyber-yellow';
      case 'error':
        return 'text-cyber-red';
      default:
        return 'text-cyber-green';
    }
  };

  const getStatusIcon = (status: string) => {
    const iconClass = "w-4 h-4 sm:w-5 sm:h-5";
    switch (status) {
      case 'normal':
      case 'secure':
        return <CheckCircle className={`${iconClass} text-cyber-green`} />;
      case 'warning':
        return <AlertTriangle className={`${iconClass} text-cyber-yellow`} />;
      case 'error':
        return <XCircle className={`${iconClass} text-cyber-red`} />;
      default:
        return <CheckCircle className={`${iconClass} text-cyber-green`} />;
    }
  };

  const statusItems = [
    {
      icon: <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'CPU',
      value: `${systemStatus.cpu.usage}%`,
      subValue: `${systemStatus.cpu.temp}°C`,
      status: systemStatus.cpu.status,
      color: 'text-cyber-blue'
    },
    {
      icon: <MemoryStick className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'RAM',
      value: `${systemStatus.memory.usage}%`,
      subValue: `${systemStatus.memory.available}GB`,
      status: systemStatus.memory.status,
      color: 'text-cyber-purple'
    },
    {
      icon: <HardDrive className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'DISK',
      value: `${systemStatus.disk.usage}%`,
      subValue: `${systemStatus.disk.free}GB`,
      status: systemStatus.disk.status,
      color: 'text-cyber-orange'
    },
    {
      icon: <Network className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'NETWORK',
      value: `${systemStatus.network.speed}Mbps`,
      subValue: 'Active',
      status: systemStatus.network.status,
      color: 'text-cyber-green'
    },
    {
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'SECURITY',
      value: systemStatus.security.threats === 0 ? 'CLEAN' : `${systemStatus.security.threats} THREATS`,
      subValue: systemStatus.security.status === 'secure' ? 'Protected' : 'Vulnerable',
      status: systemStatus.security.status,
      color: 'text-cyber-red'
    }
  ];

  return (
    <div className="cyber-panel h-full">
      <h2 className="text-lg sm:text-xl font-cyber font-bold text-cyber-green mb-4 sm:mb-6 text-center">
        SYSTEM STATUS
      </h2>
      
      <div className="space-y-3 sm:space-y-4">
        {statusItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-2 sm:p-3 bg-darker-bg rounded border border-cyber-green/30 hover:border-cyber-green/60 transition-all duration-300"
          >
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              <div className={`${item.color} flex-shrink-0`}>
                {item.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-mono text-xs sm:text-sm text-cyber-green truncate">{item.title}</div>
                <div className="text-xs text-gray-400 truncate">{item.subValue}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ml-2">
              <div className={`font-cyber font-bold text-xs sm:text-sm ${getStatusColor(item.status)}`}>
                {item.value}
              </div>
              {getStatusIcon(item.status)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Overall System Health */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4 sm:mt-6 p-3 sm:p-4 bg-darker-bg rounded border border-cyber-green/50"
      >
        <div className="text-center">
          <div className="text-sm sm:text-lg font-cyber font-bold text-cyber-green mb-2">
            OVERALL HEALTH
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <motion.div
              className="bg-gradient-to-r from-cyber-green to-cyber-blue h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '85%' }}
              transition={{ duration: 2, delay: 0.8 }}
            />
          </div>
          <div className="text-xs sm:text-sm text-cyber-green font-mono">85% OPTIMAL</div>
        </div>
      </motion.div>
    </div>
  );
};

export default StatusPanel; 