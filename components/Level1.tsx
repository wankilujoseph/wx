
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
  // 记录已经正确完成的步骤索引
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // 按钮显示的固定布局（打乱顺序增加挑战性）
  const buttonLabels = ['加水', '加奶粉', '洗手', '摇匀'];

  useEffect(() => {
    const timer = setTimeout(() => setStage('playing'), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleStepClick = (step: string) => {
    if (stage !== 'playing') return;

    const targetStep = LEVEL1_SEQUENCE[currentStep];

    if (step === targetStep) {
      // 步骤正确
      onUpdateScore(10);
      setFeedback({ type: 'success', message: '操作正确！' });
      setCompletedSteps(prev => [...prev, currentStep]);
      
      const nextStepIndex = currentStep + 1;
      
      if (nextStepIndex === LEVEL1_SEQUENCE.length) {
        // 全部完成
        setCurrentStep(nextStepIndex); // 确保进度条全部变绿
        setTimeout(() => {
          setStage('cleared');
          setTimeout(() => onSuccess(), 1500);
        }, 500); // 留出半秒让用户看到最后一步的反馈
      } else {
        setCurrentStep(nextStepIndex);
      }
    } else {
      // 步骤错误
      onUpdateScore(-5);
      setFeedback({ type: 'error', message: `顺序错误，请先执行: ${targetStep}` });
    }

    // 清除反馈提示
    const feedbackTimer = setTimeout(() => setFeedback(null), 1200);
    return () => clearTimeout(feedbackTimer);
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* 入场动画层 */}
      {stage === 'intro' && (
        <div className="absolute inset-0 z-50 bg-amber-50 flex items-center justify-center p-6 text-center">
          <div className="animate-intro">
            <div className="text-6xl mb-4">🥛</div>
            <h2 className="text-3xl font-black text-red-600 mb-2">第一关</h2>
            <p className="text-amber-800 font-bold text-xl">科学冲奶挑战</p>
          </div>
        </div>
      )}

      {/* 通关动画层 */}
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

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">第一关：科学冲奶挑战</h2>
        <p className="text-gray-500 text-sm">请按照正确的科学冲奶顺序依次点击</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-100 flex-1 flex flex-col">
        {/* 顶部进度指示器 */}
        <div className="flex justify-between mb-8 px-2">
          {LEVEL1_SEQUENCE.map((_, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${idx < currentStep ? 'bg-green-500 border-green-500 text-white shadow-lg' : idx === currentStep ? 'border-red-500 text-red-500 ring-4 ring-red-100' : 'border-gray-200 text-gray-300'}`}>
                {idx < currentStep ? '✓' : idx + 1}
              </div>
              <span className={`text-[10px] font-bold ${idx === currentStep ? 'text-red-500' : 'text-gray-400'}`}>
                {LEVEL1_SEQUENCE[idx]}
              </span>
            </div>
          ))}
        </div>

        {/* 按钮交互区 */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          {buttonLabels.map((label) => {
            const isFinished = LEVEL1_SEQUENCE.slice(0, currentStep).includes(label);
            return (
              <button
                key={label}
                disabled={isFinished}
                onClick={() => handleStepClick(label)}
                className={`relative overflow-hidden transition-all duration-200 rounded-2xl flex flex-col items-center justify-center text-lg font-black border-b-4 active:translate-y-1 active:border-b-0 ${
                  isFinished 
                  ? 'bg-amber-400 border-amber-500 text-white cursor-default' 
                  : 'bg-amber-50 border-amber-200 text-red-700 hover:bg-amber-100'
                }`}
              >
                {isFinished && <span className="absolute top-2 right-2 text-xs">✓</span>}
                <span>{label}</span>
                {isFinished && <span className="text-[10px] opacity-70 font-normal">已完成</span>}
              </button>
            );
          })}
        </div>

        {/* 实时反馈 */}
        <div className="h-12 mt-6 flex items-center justify-center">
          {feedback && (
            <div className={`px-4 py-2 rounded-full text-sm font-black animate-bounce shadow-sm ${feedback.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
              {feedback.message}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-[11px] text-amber-800/50">提示：科学冲奶第一步要先洗手哦！</p>
      </div>
    </div>
  );
};

export default Level1;
