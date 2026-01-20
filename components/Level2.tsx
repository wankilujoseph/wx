
import React, { useState, useEffect } from 'react';
import { BABY_STATUSES } from '../constants';
import { BabyStatus } from '../types';

interface Level2Props {
  onSuccess: () => void;
  onUpdateScore: (points: number) => void;
}

const Level2: React.FC<Level2Props> = ({ onSuccess, onUpdateScore }) => {
  const [currentStatus, setCurrentStatus] = useState<BabyStatus>(BABY_STATUSES[0]);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [stage, setStage] = useState<'intro' | 'playing' | 'cleared'>('intro');

  useEffect(() => {
    const timer = setTimeout(() => setStage('playing'), 1500);
    return () => clearTimeout(timer);
  }, []);

  const nextStatus = () => {
    const randomIndex = Math.floor(Math.random() * BABY_STATUSES.length);
    setCurrentStatus(BABY_STATUSES[randomIndex]);
    setFeedback(null);
  };

  useEffect(() => {
    nextStatus();
  }, []);

  const handleAction = (action: string) => {
    if (stage !== 'playing') return;

    if (action === currentStatus.action) {
      const newCount = correctCount + 1;
      setCorrectCount(newCount);
      onUpdateScore(15);
      setFeedback('太棒了！');
      
      if (newCount >= 3) {
        setStage('cleared');
        setTimeout(() => onSuccess(), 1500);
      } else {
        setTimeout(() => nextStatus(), 800);
      }
    } else {
      setCorrectCount(0);
      onUpdateScore(-10);
      setFeedback(`答错了`);
      setTimeout(() => nextStatus(), 1500);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
       {/* Intro Layer */}
       {stage === 'intro' && (
        <div className="absolute inset-0 z-50 bg-amber-50 flex items-center justify-center p-6 text-center">
          <div className="animate-intro">
            <div className="text-6xl mb-4">👂</div>
            <h2 className="text-3xl font-black text-red-600 mb-2">第二关</h2>
            <p className="text-amber-800 font-bold text-xl">懂心守护挑战</p>
          </div>
        </div>
      )}

      {/* Clearance Layer */}
      {stage === 'cleared' && (
        <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center">
          <div className="relative">
             <div className="absolute inset-0 animate-star text-amber-400 text-6xl">✨</div>
             <div className="animate-bounce-in text-center">
                <div className="text-7xl mb-4">💖</div>
                <h3 className="text-3xl font-black text-red-600">心有灵犀！</h3>
                <p className="text-gray-500 mt-2 font-medium">即将进入下一关</p>
             </div>
          </div>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">第二关：宝宝状态判断</h2>
        <p className="text-gray-500 text-sm">观察宝宝状态并采取正确应对措施</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-100 flex-1 flex flex-col space-y-4">
        <div className="flex justify-center gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`w-3 h-3 rounded-full ${i <= correctCount ? 'bg-red-500' : 'bg-gray-200'}`}></div>
          ))}
          <span className="text-xs text-gray-400 ml-2">连续答对3次过关</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center bg-amber-50/50 rounded-2xl p-4 border-2 border-amber-100 relative overflow-hidden min-h-[240px]">
          <img 
            src={currentStatus.image} 
            alt={currentStatus.status} 
            className="w-full h-full object-contain animate-fadeIn"
          />
          <div className="absolute bottom-4 left-0 right-0 text-center px-4">
             <h3 className="text-xl font-black text-red-600 bg-white/60 backdrop-blur-sm inline-block px-4 py-1 rounded-full border border-red-100">{currentStatus.status}</h3>
             <p className="text-gray-600 text-xs italic mt-2 font-medium">{currentStatus.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {['喂奶', '哄睡', '换尿布'].map((action) => (
            <button
              key={action}
              onClick={() => handleAction(action)}
              className="w-full py-4 bg-white border-2 border-amber-200 text-red-600 rounded-2xl font-black hover:bg-amber-50 active:scale-95 transition-all shadow-sm"
            >
              {action}
            </button>
          ))}
        </div>

        {feedback && (
          <div className={`text-center font-black text-sm h-6 ${feedback.includes('错') ? 'text-red-500' : 'text-green-500'}`}>
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
};

export default Level2;
