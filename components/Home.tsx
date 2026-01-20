
import React from 'react';
import { UserStats } from '../types';
import { BRAND_NAME, PRODUCT_SUBTITLE } from '../constants';

interface HomeProps {
  onStart: () => void;
  history: UserStats;
}

const Home: React.FC<HomeProps> = ({ onStart, history }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 animate-fadeIn h-full">
      <div className="text-center">
        <div className="relative inline-block mb-4">
          <div className="w-32 h-32 bg-gradient-to-tr from-amber-400 to-yellow-100 rounded-full flex items-center justify-center mx-auto shadow-lg border-4 border-white">
            <span className="text-6xl">🍼</span>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md">
            1段专属
          </div>
        </div>
        <h2 className="text-2xl font-black text-red-700 mb-1">{BRAND_NAME}</h2>
        <p className="text-amber-700 font-medium text-sm">{PRODUCT_SUBTITLE}</p>
        <p className="text-gray-400 text-xs mt-2 italic">“超级配方，给宝宝至臻守护”</p>
      </div>

      <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-amber-100">
        <h3 className="text-amber-800 text-[10px] font-bold uppercase tracking-widest mb-3 border-b border-amber-50 pb-2 flex justify-between">
          <span>守护记录</span>
          <span className="text-red-500">Lv.{history.highScore > 85 ? '3' : history.highScore > 50 ? '2' : '1'}</span>
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100/50">
            <p className="text-[10px] text-amber-600">巅峰守护分</p>
            <p className="text-xl font-black text-red-600">{history.highScore}</p>
          </div>
          <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100/50">
            <p className="text-[10px] text-amber-600">最高荣誉</p>
            <p className="text-sm font-bold text-red-600 truncate mt-1">{history.bestTitle}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 w-full">
        <button 
          onClick={onStart}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:scale-95 transition-all text-white font-bold py-4 rounded-2xl shadow-xl shadow-red-200 text-lg flex flex-col items-center justify-center leading-tight"
        >
          <span>立即开启挑战</span>
          <span className="text-[10px] opacity-80 font-normal">解锁宝宝营养奥秘</span>
        </button>
      </div>

      <div className="mt-auto w-full p-4 bg-white/50 rounded-xl border border-dashed border-amber-200">
        <div className="flex items-center gap-3">
          <div className="text-2xl">✨</div>
          <div className="text-[11px] text-amber-800 leading-snug">
            <strong>小贴士：</strong> 细心观察宝宝状态，掌握科学冲奶技巧，是成为金领冠“至臻守护官”的关键！
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
