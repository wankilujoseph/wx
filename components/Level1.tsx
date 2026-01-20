
import React, { useState, useEffect } from 'react';
import { LEVEL1_SEQUENCE } from '../constants';

interface Level1Props {
  onSuccess: () => void;
  onUpdateScore: (points: number) => void;
}

const Level1: React.FC<Level1Props> = ({ onSuccess, onUpdateScore }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [stage, setStage] = useState<'intro' | 'playing' | 'cleared'>('intro');

  // 按钮显示的固定布局（打乱顺序）
  const buttonLabels = ['加水', '加奶粉', '洗手', '摇匀'];

  useEffect(() => {
    const timer = setTimeout(() => setStage('playing'), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleStepClick = (stepName: string) => {
    if (stage !== 'playing') return;

    const targetStep = LEVEL1_SEQUENCE[currentStep];

    if (stepName === targetStep.name) {
      onUpdateScore(10);
      setFeedback({ type: 'success', message: '操作正确！' });
      
      const nextStepIndex = currentStep + 1;
      
      if (nextStepIndex === LEVEL1_SEQUENCE.length) {
        setCurrentStep(nextStepIndex);
        setTimeout(() => {
          setStage('cleared');
          setTimeout(() => onSuccess(), 1500);
        }, 800);
      } else {
        setCurrentStep(nextStepIndex);
      }
    } else {
      onUpdateScore(-5);
      setFeedback({ type: 'error', message: `顺序错误，请先执行: ${targetStep.name}` });
    }

    const feedbackTimer = setTimeout(() => setFeedback(null), 1200);
    return () => clearTimeout(feedbackTimer);
  };

  return (
    <div className="flex flex-col h-full relative">
      {stage === 'intro' && (
        <div className="absolute inset-0 z-50 bg-amber-50 flex items-center justify-center p-6 text-center">
          <div className="animate-intro">
            <div className="text-6xl mb-4">🥛</div>
            <h2 className="text-3xl font-black text-red-600 mb-2">第一关</h2>
            <p className="text-amber-800 font-bold text-xl">科学冲奶挑战</p>
          </div>
        </div>
      )}

      {stage === 'cleared' && (
        <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm flex items-center justify-center">
          <div className="relative">
             <div className="absolute inset-0 animate-star text-amber-400 text-6xl flex items-center justify-center">✨</div>
             <div className="animate-bounce-in text-center relative z-10">
                <div className="text-7xl mb-4">🎯</div>
                <h3 className="text-3xl font-black text-green-600">冲调完成！</h3>
                <p className="text-gray-500 mt-2 font-medium italic">营养配比达成，即将开启下一关</p>
             </div>
          </div>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">第一关：科学冲奶挑战</h2>
        <p className="text-gray-500 text-sm">请按照正确的科学冲奶顺序依次点击</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-100 flex-1 flex flex-col">
        {/* 插画展示区 */}
        <div className="flex-1 bg-amber-50/30 rounded-2xl mb-6 flex items-center justify-center overflow-hidden border border-amber-100 relative">
          {currentStep < LEVEL1_SEQUENCE.length ? (
             <img 
               src={LEVEL1_SEQUENCE[currentStep].image} 
               alt={LEVEL1_SEQUENCE[currentStep].name}
               className="w-full h-full object-contain animate-fadeIn p-4"
             />
          ) : (
             <img 
               src={LEVEL1_SEQUENCE[LEVEL1_SEQUENCE.length - 1].image} 
               alt="完成"
               className="w-full h-full object-contain p-4"
             />
          )}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/80 px-4 py-1 rounded-full text-xs font-bold text-red-600 border border-red-100">
            当前任务: {currentStep < LEVEL1_SEQUENCE.length ? LEVEL1_SEQUENCE[currentStep].name : '全部完成'}
          </div>
        </div>

        {/* 顶部进度指示器 */}
        <div className="flex justify-between mb-6 px-2">
          {LEVEL1_SEQUENCE.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${idx < currentStep ? 'bg-green-500 border-green-500 text-white shadow-lg' : idx === currentStep ? 'border-red-500 text-red-500 ring-4 ring-red-100' : 'border-gray-200 text-gray-300'}`}>
                {idx < currentStep ? '✓' : idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* 按钮交互区 */}
        <div className="grid grid-cols-2 gap-3">
          {buttonLabels.map((label) => {
            const isFinished = LEVEL1_SEQUENCE.slice(0, currentStep).some(s => s.name === label);
            return (
              <button
                key={label}
                disabled={isFinished}
                onClick={() => handleStepClick(label)}
                className={`relative overflow-hidden transition-all duration-200 py-4 rounded-xl flex flex-col items-center justify-center text-base font-black border-b-4 active:translate-y-1 active:border-b-0 ${
                  isFinished 
                  ? 'bg-amber-400 border-amber-500 text-white cursor-default opacity-50' 
                  : 'bg-amber-50 border-amber-200 text-red-700 hover:bg-amber-100'
                }`}
              >
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        <div className="h-10 mt-4 flex items-center justify-center">
          {feedback && (
            <div className={`px-4 py-2 rounded-full text-sm font-black animate-bounce shadow-sm ${feedback.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
              {feedback.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Level1;
