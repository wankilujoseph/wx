
import React from 'react';
import { UserStats } from '../types';
import { BRAND_NAME, PRODUCT_SUBTITLE } from '../constants';

interface HomeProps {
  onStart: () => void;
  history: UserStats;
}

const Home: React.FC<HomeProps> = ({ onStart, history }) => {
  const score = history.highScore;

  /**
   * 严格按照用户需求定义头像路径
   * 建议文件名：
   * avatar_1.png (爸爸形象)
   * avatar_2.png (妈妈形象)
   * avatar_3.png (医生形象)
   */
  const getAvatarPath = () => {
    if (score === 0 || score < 50) {
      return "./avatar_1.png"; // 第一张：爸爸 (初始/低分)
    } else if (score >= 50 && score <= 100) {
      return "./avatar_2.png"; // 第二张：妈妈 (达人)
    } else {
      return "./avatar_3.png"; // 第三张：医生 (至臻)
    }
  };

  const getLevelInfo = () => {
    if (score === 0) return { title: '实习守护官', color: 'from-slate-300 to-slate-400', badge: 'bg-slate-500' };
    if (score > 100) return { title: '至臻守护官', color: 'from-red-500 to-orange-400', badge: 'bg-red-600' };
    if (score >= 50) return { title: '金牌育儿师', color: 'from-amber-400 to-yellow-500', badge: 'bg-amber-600' };
    return { title: '新手爸妈', color: 'from-blue-300 to-blue-400', badge: 'bg-blue-500' };
  };

  const level = getLevelInfo();
  const avatarPath = getAvatarPath();

  return (
    <div className="flex flex-col items-center justify-center space-y-6 animate-fadeIn h-full pb-8">
      {/* 头像展示区 */}
      <div className="text-center">
        <div className="relative inline-block">
          {/* 外圈装饰 */}
          <div className={`w-48 h-48 bg-gradient-to-tr ${level.color} rounded-full flex items-center justify-center mx-auto shadow-2xl p-1`}>
            {/* 纯白内圈 */}
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white shadow-inner">
              <img 
                src={avatarPath} 
                alt="守护官头像"
                className="w-[90%] h-[90%] object-contain transition-transform duration-500 hover:scale-110"
                style={{ filter: score === 0 ? 'grayscale(0.2)' : 'none' }}
                onError={(e) => {
                  // 后备方案：如果图片确实找不到，显示一个带文字的圆形
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<div class="text-4xl">👶</div>`;
                  }
                }}
              />
            </div>
          </div>

          {/* 等级标牌 */}
          <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 ${level.badge} text-white text-sm font-black px-6 py-1.5 rounded-full shadow-lg border-2 border-white animate-bounce-in whitespace-nowrap`}>
            {level.title}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-black text-red-700 tracking-tight">{BRAND_NAME}</h2>
          <p className="text-amber-800 font-bold text-sm opacity-80">{PRODUCT_SUBTITLE}</p>
        </div>
      </div>

      {/* 数据卡片 */}
      <div className="w-full grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100 flex flex-col items-center">
          <span className="text-[10px] text-amber-600 font-bold uppercase">最高守护分</span>
          <span className="text-2xl font-black text-red-600">{score}</span>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100 flex flex-col items-center">
          <span className="text-[10px] text-amber-600 font-bold uppercase">解锁成就</span>
          <span className="text-sm font-black text-amber-800 mt-1">{level.title}</span>
        </div>
      </div>

      {/* 按钮区 */}
      <div className="w-full space-y-3 pt-2">
        <button 
          onClick={onStart}
          className="w-full bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-white font-black py-4 rounded-2xl shadow-xl shadow-red-100 text-lg"
        >
          {score === 0 ? '开启守护官之旅' : '挑战更高级别'}
        </button>
        <p className="text-[10px] text-center text-amber-800/40">
          *完成挑战后，系统将根据最终得分自动晋升头像形象
        </p>
      </div>

      {/* 底部贴片 */}
      <div className="bg-amber-100/30 rounded-xl p-3 border border-dashed border-amber-200 w-full">
        <div className="flex items-start gap-2">
          <span className="text-lg">🎖️</span>
          <p className="text-[11px] text-amber-900/70 leading-relaxed">
            <strong>晋升小贴士：</strong><br/>
            冲奶关快速点击、状态关连续答对、知识关满分，是解锁<b>至臻专家头像</b>的关键！
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
