import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  XCircle, 
  Wrench, 
  Shield, 
  Zap,
  CheckCircle,
  Loader2
} from 'lucide-react';
import SuccessModal from './SuccessModal';

interface DiagnosticResult {
  id: string;
  title: string;
  description: string;
  recommendation: string;
  type: 'critical' | 'warning';
  severity: number;
}

interface DiagnosisResultsProps {
  isVisible: boolean;
  onClose: () => void;
  onAllProblemsFixed?: () => void;
}

const DiagnosisResults: React.FC<DiagnosisResultsProps> = ({ isVisible, onClose, onAllProblemsFixed }) => {
  const [fixedProblems, setFixedProblems] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Fix process state - now supports multiple simultaneous fixes
  const [activeFixes, setActiveFixes] = useState<{[key: string]: {
    progress: number;
    currentStep: number;
    logs: string[];
    isCompleted: boolean;
  }}>({});

  const diagnosticResults: DiagnosticResult[] = [
    {
      id: 'security-threat',
      title: 'КРИТИЧЕСКАЯ УГРОЗА БЕЗОПАСНОСТИ',
      description: 'Обнаружено 3 активных вредоносных процесса в системе. Файл "svchost32.exe" в папке %TEMP% является троянским конем типа Backdoor.Win32.Generic.',
      recommendation: 'НЕМЕДЛЕННО: Запустить полное сканирование антивирусом и удалить подозрительные файлы.',
      type: 'critical',
      severity: 10
    },
    {
      id: 'cpu-overheat',
      title: 'ПЕРЕГРЕВ ПРОЦЕССОРА',
      description: 'Температура CPU достигает 89°C при нагрузке, что значительно превышает безопасные пределы. Риск термического повреждения компонентов.',
      recommendation: 'Проверить систему охлаждения, очистить от пыли, заменить термопасту.',
      type: 'critical',
      severity: 9
    },
    {
      id: 'memory-overload',
      title: 'КРИТИЧЕСКИЙ УРОВЕНЬ ИСПОЛЬЗОВАНИЯ ПАМЯТИ',
      description: 'RAM используется на 94%, что вызывает сильные лаги и зависания. Система работает на пределе возможностей.',
      recommendation: 'Закрыть ненужные программы, увеличить объем RAM до 16GB.',
      type: 'critical',
      severity: 8
    },
    {
      id: 'disk-damage',
      title: 'ПОВРЕЖДЕНИЕ ФАЙЛОВОЙ СИСТЕМЫ',
      description: 'Найдено 127 поврежденных секторов на диске C:. Риск потери данных и полного отказа диска.',
      recommendation: 'Выполнить chkdsk /f, создать резервные копии важных данных.',
      type: 'critical',
      severity: 9
    },
    {
      id: 'outdated-drivers',
      title: 'УСТАРЕВШИЕ ДРАЙВЕРЫ',
      description: '23 драйвера не обновлялись более 2 лет. Видеокарта работает на 60% от возможной производительности.',
      recommendation: 'Обновить драйверы через Device Manager или сайт производителя.',
      type: 'warning',
      severity: 6
    },
    {
      id: 'network-issues',
      title: 'ПРОБЛЕМЫ С СЕТЬЮ',
      description: 'Скорость интернета снижена на 40% из-за конфликта DNS. Нестабильное соединение.',
      recommendation: 'Сменить DNS на 8.8.8.8/8.8.4.4, перезагрузить роутер.',
      type: 'warning',
      severity: 5
    },
    {
      id: 'system-clutter',
      title: 'ЗАСОРЕННАЯ СИСТЕМА',
      description: '15.7 GB временных файлов, 47 устаревших записей в реестре. Система загружается медленно.',
      recommendation: 'Запустить очистку диска, использовать CCleaner для реестра.',
      type: 'warning',
      severity: 4
    },
    {
      id: 'no-antivirus',
      title: 'ОТСУТСТВИЕ АНТИВИРУСНОЙ ЗАЩИТЫ',
      description: 'Антивирус не активен более 30 дней. Система полностью уязвима для атак.',
      recommendation: 'Активировать антивирус, обновить базы данных.',
      type: 'critical',
      severity: 10
    },
    {
      id: 'power-issues',
      title: 'ПРОБЛЕМЫ С ЭЛЕКТРОПИТАНИЕМ',
      description: 'Блок питания работает на нестабильном напряжении. Риск повреждения компонентов.',
      recommendation: 'Проверить блок питания, заменить при необходимости.',
      type: 'warning',
      severity: 7
    },
    {
      id: 'system-overload',
      title: 'ПЕРЕГРУЗКА СИСТЕМЫ',
      description: '89 процессов запущено одновременно. Система работает неэффективно.',
      recommendation: 'Отключить автозапуск ненужных программ, оптимизировать систему.',
      type: 'critical',
      severity: 7
    }
  ];

  // Static list - no shuffling, always show the same 7 problems in the same order
  const selectedResults = diagnosticResults.slice(0, 7);

  const logMessages = [
    'Инициализация модуля диагностики...',
    'Загрузка системных библиотек...',
    'Проверка прав доступа...',
    'Создание временных файлов...',
    'Анализ системного реестра...',
    'Проверка целостности файлов...',
    'Сканирование процессов...',
    'Оптимизация памяти...',
    'Очистка временных данных...',
    'Обновление системных настроек...',
    'Проверка сетевых соединений...',
    'Валидация безопасности...',
    'Синхронизация данных...',
    'Применение исправлений...',
    'Перезапуск служб...',
    'Финальная проверка...'
  ];

  const fixSteps = [
    { title: 'АНАЛИЗ ПРОБЛЕМЫ', duration: 2000 },
    { title: 'ПОДГОТОВКА ИСПРАВЛЕНИЯ', duration: 1500 },
    { title: 'ПРИМЕНЕНИЕ ИСПРАВЛЕНИЙ', duration: 3000 },
    { title: 'ПРОВЕРКА ЦЕЛОСТНОСТИ', duration: 2000 },
    { title: 'ФИНАЛИЗАЦИЯ', duration: 1000 }
  ];

  const startFixProcess = async (problemId: string) => {
    const problem = diagnosticResults.find(p => p.id === problemId);
    if (!problem) return;
    
    // Initialize fix state for this problem
    setActiveFixes(prev => ({
      ...prev,
      [problemId]: {
        progress: 0,
        currentStep: 0,
        logs: [],
        isCompleted: false
      }
    }));

    for (let stepIndex = 0; stepIndex < fixSteps.length; stepIndex++) {
      // Update current step
      setActiveFixes(prev => ({
        ...prev,
        [problemId]: {
          ...prev[problemId],
          currentStep: stepIndex
        }
      }));
      
      // Add logs for current step
      const stepLogs = logMessages.slice(stepIndex * 3, (stepIndex + 1) * 3);
      
      for (let i = 0; i < stepLogs.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setActiveFixes(prev => ({
          ...prev,
          [problemId]: {
            ...prev[problemId],
            logs: [...prev[problemId].logs, `[${new Date().toLocaleTimeString()}] ${stepLogs[i]}`]
          }
        }));
      }

      // Update progress
      const stepProgress = ((stepIndex + 1) / fixSteps.length) * 100;
      setActiveFixes(prev => ({
        ...prev,
        [problemId]: {
          ...prev[problemId],
          progress: stepProgress
        }
      }));

      // Wait for step duration
      await new Promise(resolve => setTimeout(resolve, fixSteps[stepIndex].duration));
    }

    // Mark as completed
    setActiveFixes(prev => ({
      ...prev,
      [problemId]: {
        ...prev[problemId],
        isCompleted: true
      }
    }));

    // Add to fixed problems
    setFixedProblems(prev => [...prev, problemId]);

    // Check if all problems are fixed
    const allFixed = selectedResults.every(r => 
      fixedProblems.includes(r.id) || activeFixes[r.id]?.isCompleted
    );
    
    if (allFixed && onAllProblemsFixed) {
      onAllProblemsFixed();
    }
  };

  const handleFixProblem = async (problemId: string) => {
    if (fixedProblems.includes(problemId) || activeFixes[problemId]) return;
    await startFixProcess(problemId);
  };

  const handleFixAllProblems = async () => {
    const unfixedProblems = selectedResults.filter(r => 
      !fixedProblems.includes(r.id) && !activeFixes[r.id]
    );
    
    unfixedProblems.forEach(problem => {
      startFixProcess(problem.id);
    });
  };

  const handleFixBasicProblems = async () => {
    if (fixedProblems.includes('basic') || activeFixes['basic']) return;
    
    // Initialize basic fix
    setActiveFixes(prev => ({
      ...prev,
      basic: {
        progress: 0,
        currentStep: 0,
        logs: [],
        isCompleted: false
      }
    }));

    // Simulate basic system fix
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setActiveFixes(prev => ({
        ...prev,
        basic: {
          ...prev.basic,
          progress: i
        }
      }));
    }

    setActiveFixes(prev => ({
      ...prev,
      basic: {
        ...prev.basic,
        isCompleted: true
      }
    }));

    setFixedProblems(prev => [...prev, 'basic']);
  };

  const getProblemIcon = (type: string) => {
    const iconClass = "w-5 h-5 sm:w-6 sm:h-6"; // Responsive icon sizing
    switch (type) {
      case 'critical':
        return <AlertTriangle className={`${iconClass} text-cyber-red`} />;
      case 'warning':
        return <AlertTriangle className={`${iconClass} text-cyber-yellow`} />;
      default:
        return <AlertTriangle className={`${iconClass} text-cyber-yellow`} />;
    }
  };

  const getProblemColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'border-cyber-red/50 bg-cyber-red/10';
      case 'warning':
        return 'border-cyber-yellow/50 bg-cyber-yellow/10';
      default:
        return 'border-cyber-yellow/50 bg-cyber-yellow/10';
    }
  };

  const getProblemTitleColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'text-cyber-red';
      case 'warning':
        return 'text-cyber-yellow';
      default:
        return 'text-cyber-yellow';
    }
  };

  const isAnyFixActive = Object.keys(activeFixes).length > 0;
  const unfixedProblems = selectedResults.filter(r => !fixedProblems.includes(r.id) && !activeFixes[r.id]);
  const canFixAll = unfixedProblems.length > 0 || (!fixedProblems.includes('basic') && !activeFixes['basic']);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="cyber-panel max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6 border-b border-cyber-green/30 pb-3 sm:pb-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-cyber-red" />
                <h2 className="text-lg sm:text-2xl font-cyber font-bold text-cyber-green">
                  РЕЗУЛЬТАТЫ ДИАГНОСТИКИ
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-cyber-green hover:text-cyber-red transition-colors p-1"
              >
                <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Fix All Button */}
            {canFixAll && (
              <div className="mb-4 sm:mb-6">
                <motion.button
                  onClick={handleFixAllProblems}
                  disabled={isAnyFixActive}
                  whileHover={!isAnyFixActive ? { scale: 1.02 } : {}}
                  whileTap={!isAnyFixActive ? { scale: 0.98 } : {}}
                  className="w-full cyber-button text-sm sm:text-lg py-3 sm:py-4 flex items-center justify-center space-x-2 sm:space-x-3 bg-gradient-to-r from-cyber-purple to-cyber-blue hover:from-cyber-blue hover:to-cyber-purple"
                >
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-base">ИСПРАВИТЬ ВСЕ ПРОБЛЕМЫ ОДНОВРЕМЕННО</span>
                </motion.button>
              </div>
            )}

            {/* Basic System Fix Button */}
            <div className="mb-4 sm:mb-6">
              <motion.button
                onClick={handleFixBasicProblems}
                disabled={fixedProblems.includes('basic') || !!activeFixes['basic']}
                whileHover={!fixedProblems.includes('basic') && !activeFixes['basic'] ? { scale: 1.02 } : {}}
                whileTap={!fixedProblems.includes('basic') && !activeFixes['basic'] ? { scale: 0.98 } : {}}
                className={`w-full cyber-button text-sm sm:text-lg py-3 sm:py-4 flex items-center justify-center space-x-2 sm:space-x-3 ${
                  fixedProblems.includes('basic')
                    ? 'bg-cyber-green/20 border-cyber-green text-cyber-green'
                    : activeFixes['basic']
                    ? 'bg-cyber-blue/20 border-cyber-blue text-cyber-blue'
                    : ''
                }`}
              >
                {fixedProblems.includes('basic') ? (
                  <>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-base">БАЗОВЫЕ ПРОБЛЕМЫ ИСПРАВЛЕНЫ</span>
                  </>
                ) : activeFixes['basic'] ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span className="text-xs sm:text-base">ИСПРАВЛЕНИЕ В ПРОЦЕССЕ... {Math.round(activeFixes['basic'].progress)}%</span>
                  </>
                ) : (
                  <>
                    <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-base">ИСПРАВИТЬ БАЗОВЫЕ СИСТЕМНЫЕ ПРОБЛЕМЫ</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Individual Problem Fix Buttons - Static List */}
            <div className="space-y-3 sm:space-y-4">
              {selectedResults.map((result) => (
                <div
                  key={result.id}
                  className={`p-3 sm:p-4 rounded border ${getProblemColor(result.type)}`}
                >
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                      {getProblemIcon(result.type)}
                      <h3 className={`font-cyber font-bold text-sm sm:text-base ${getProblemTitleColor(result.type)} truncate`}>
                        {result.title}
                      </h3>
                    </div>
                    <div className="text-xs text-gray-400 font-mono ml-2 flex-shrink-0">
                      {result.severity}/10
                    </div>
                  </div>
                  
                  <div className="text-xs sm:text-sm text-gray-300 mb-2 sm:mb-3 leading-relaxed">
                    {result.description}
                  </div>
                  
                  <div className="text-xs text-cyber-blue mb-3 sm:mb-4 font-mono">
                    💡 {result.recommendation}
                  </div>

                  <motion.button
                    onClick={() => handleFixProblem(result.id)}
                    disabled={fixedProblems.includes(result.id) || !!activeFixes[result.id]}
                    whileHover={!fixedProblems.includes(result.id) && !activeFixes[result.id] ? { scale: 1.02 } : {}}
                    whileTap={!fixedProblems.includes(result.id) && !activeFixes[result.id] ? { scale: 0.98 } : {}}
                    className={`cyber-button-sm flex items-center space-x-2 text-xs sm:text-sm ${
                      fixedProblems.includes(result.id)
                        ? 'bg-cyber-green/20 border-cyber-green text-cyber-green'
                        : activeFixes[result.id]
                        ? 'bg-cyber-blue/20 border-cyber-blue text-cyber-blue'
                        : ''
                    }`}
                  >
                    {fixedProblems.includes(result.id) ? (
                      <>
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>ИСПРАВЛЕНО</span>
                      </>
                    ) : activeFixes[result.id] ? (
                      <>
                        <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                        <span>ИСПРАВЛЕНИЕ... {Math.round(activeFixes[result.id].progress)}%</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>ИСПРАВИТЬ ПРОБЛЕМУ</span>
                      </>
                    )}
                  </motion.button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-darker-bg rounded border border-cyber-green/30">
              <div className="text-center">
                <div className="text-base sm:text-lg font-cyber font-bold text-cyber-green mb-2">
                  СВОДКА ДИАГНОСТИКИ
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <div className="text-cyber-red font-bold">{selectedResults.filter(r => r.type === 'critical').length}</div>
                    <div className="text-gray-400">КРИТИЧЕСКИХ</div>
                  </div>
                  <div>
                    <div className="text-cyber-yellow font-bold">{selectedResults.filter(r => r.type === 'warning').length}</div>
                    <div className="text-gray-400">ПРЕДУПРЕЖДЕНИЙ</div>
                  </div>
                  <div>
                    <div className="text-cyber-green font-bold">{fixedProblems.length}</div>
                    <div className="text-gray-400">ИСПРАВЛЕНО</div>
                  </div>
                  <div>
                    <div className="text-cyber-blue font-bold">{Object.keys(activeFixes).length}</div>
                    <div className="text-gray-400">АКТИВНЫХ</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Success Modal */}
      <SuccessModal
        isVisible={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          onClose();
        }}
        fixedProblems={fixedProblems.length}
        totalProblems={selectedResults.length + 1}
      />
    </AnimatePresence>
  );
};

export default DiagnosisResults; 