
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { NUTRITION_QUESTIONS, TITLES } from '../constants';

interface Level3Props {
  onUpdateScore: (points: number) => void;
  onFinish: (title: string) => void;
  finalScore: number;
}

const Level3: React.FC<Level3Props> = ({ onUpdateScore, onFinish, finalScore }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isFinished, setIsFinished] = useState(false);
  const [stage, setStage] = useState<'intro' | 'playing' | 'cleared'>('intro');
  const timerRef = useRef<any | null>(null);

  // 随机抽取5道题目
  const gameQuestions = useMemo(() => {
    const shuffled = [...NUTRITION_QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  }, []);

  const currentQuestion = gameQuestions[currentQuestionIdx];

  useEffect(() => {
    const timer = setTimeout(() => setStage('playing'), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = (selectedIdx?: number) => {
    if (stage !== 'playing') return;
    if (timerRef.current) clearInterval(timerRef.current);

    if (selectedIdx === currentQuestion.answerIndex) {
      onUpdateScore(10);
    }

    if (currentQuestionIdx + 1 < gameQuestions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setTimeLeft(5);
    } else {
      setStage('cleared');
      setIsFinished(true);
      // 计算最终称号（根据当前总分）
      const finalTotal = finalScore + (selectedIdx === currentQuestion.answerIndex ? 10 : 0);
      const titleInfo = TITLES.reduce((prev, curr) => (finalTotal >= curr.threshold ? curr : prev), TITLES[0]);
      setTimeout(() => onFinish(titleInfo.name), 1500);
    }
  };

  useEffect(() => {
    if (isFinished || stage !== 'playing') return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleNext();
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQuestionIdx, isFinished, stage]);

  return (
    <div className="flex flex-col h-full relative">
      {/* Intro Layer */}
      {stage === 'intro' && (
        <div className="absolute inset-0 z-50 bg-amber-50 flex items-center justify-center p-6 text-center">
          <div className="animate-intro">
            <div className="text-6xl mb-4">🧠</div>
            <h2 className="text-3xl font-black text-red-600 mb-2">第三关</h2>
            <p className="text-amber-800 font-bold text-xl">智力巅峰问答</p>
          </div>
        </div>
      )}

      {/* Clearance Layer */}
      {stage === 'cleared' && (
        <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center">
          <div className="relative">
             <div className="absolute inset-0 animate-star text-amber-400 text-6xl">✨</div>
             <div className="animate-bounce-in text-center">
                <div className="text-7xl mb-4">🏆</div>
                <h3 className="text-3xl font-black text-red-600">知识渊博！</h3>
                <p className="text-gray-500 mt-2 font-medium">正在计算守护官勋章...</p>
             </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-gray-800">第三关：知识快问快答</h2>
          <p className="text-gray-500 text-sm">题目随机抽选5道，每题限时5秒</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-400 font-bold">进度: {currentQuestionIdx + 1}/{gameQuestions.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-100 flex-1 flex flex-col space-y-6">
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${timeLeft <= 2 ? 'bg-red-500' : 'bg-amber-500'}`}
            style={{ width: `${(timeLeft / 5) * 100}%` }}
          ></div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-lg font-black text-gray-800 mb-8 leading-relaxed">
            {currentQuestion.question}
          </h3>
          
          <div className="space-y-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleNext(idx)}
                className="w-full p-4 text-left bg-amber-50 hover:bg-amber-100 active:bg-red-100 transition-colors rounded-2xl text-red-800 font-black flex items-center justify-between border-2 border-transparent hover:border-red-200 shadow-sm"
              >
                <span>{option}</span>
                <span className="text-red-300">➜</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level3;
