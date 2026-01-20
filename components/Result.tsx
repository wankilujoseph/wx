
import React, { useEffect, useRef, useState } from 'react';
import { TITLES, BRAND_NAME } from '../constants';

interface ResultProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

const Result: React.FC<ResultProps> = ({ score, highScore, onRestart }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  
  const titleInfo = TITLES.reduce((prev, curr) => (score >= curr.threshold ? curr : prev), TITLES[0]);

  const generatePoster = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient (Mocking the flow of the promotional image)
    const grad = ctx.createLinearGradient(0, 0, 0, 1334);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.5, '#fff9f0');
    grad.addColorStop(1, '#fef3c7');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 750, 1334);

    // Decorative Flowing Lines (Simplified for Canvas)
    ctx.strokeStyle = '#fde68a';
    ctx.lineWidth = 2;
    for(let i=0; i<5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 200 + i*100);
        ctx.bezierCurveTo(200, 100 + i*50, 500, 400 + i*50, 750, 300 + i*100);
        ctx.stroke();
    }

    // Top Brand Section
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('伊利', 60, 100);
    ctx.fillStyle = '#92400e';
    ctx.font = '24px sans-serif';
    ctx.fillText('| 金领冠', 140, 100);

    // Main Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 54px sans-serif';
    ctx.fillText(BRAND_NAME + ' · 守护官', 375, 220);
    ctx.font = '32px sans-serif';
    ctx.fillStyle = '#b45309';
    ctx.fillText('科学营养 · 守护成长', 375, 275);

    // Score Circle
    const circleX = 375, circleY = 500;
    ctx.beginPath();
    ctx.arc(circleX, circleY, 140, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 8;
    ctx.stroke();

    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 100px sans-serif';
    ctx.fillText(score.toString(), circleX, circleY + 20);
    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#92400e';
    ctx.fillText('守护分', circleX, circleY + 70);

    // Title Badge
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.roundRect(175, 680, 400, 110, 55);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 46px sans-serif';
    ctx.fillText(titleInfo.name, 375, 752);

    // Product Feature
    ctx.fillStyle = '#78350f';
    ctx.font = 'italic 28px sans-serif';
    ctx.fillText('给宝宝亿万级益生菌与超级配方', 375, 850);

    // User section
    ctx.save();
    ctx.beginPath();
    ctx.arc(375, 1000, 70, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = '#fee2e2';
    ctx.fillRect(305, 930, 140, 140);
    ctx.fillStyle = '#ffffff';
    ctx.font = '70px sans-serif';
    ctx.fillText('👶', 375, 1025);
    ctx.restore();

    // Bottom QR Area
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 1150, 750, 184);
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#000';
    ctx.fillRect(550, 1180, 120, 120); // Placeholder QR
    
    ctx.textAlign = 'left';
    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText('扫码加入守护官行列', 60, 1230);
    ctx.fillStyle = '#6b7280';
    ctx.font = '22px sans-serif';
    ctx.fillText('关注【金领冠】获取更多育儿干货', 60, 1270);

    setPosterUrl(canvas.toDataURL('image/png'));
  };

  useEffect(() => {
    generatePoster();
  }, [score]);

  const handleSave = () => {
    if (!posterUrl) return;
    const link = document.createElement('a');
    link.href = posterUrl;
    link.download = `jinlingguan_guardian_${score}.png`;
    link.click();
    alert('海报已生成，长按可保存至相册');
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn items-center">
      <div className="text-center mb-5">
        <h2 className="text-2xl font-black text-red-700">挑战圆满成功！</h2>
        <p className="text-amber-700 font-medium">您已成功解锁“金领冠”至臻营养奥秘</p>
      </div>

      <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border-t-4 border-red-600 text-center mb-6 overflow-hidden relative">
        <div className="relative z-10">
            <div className={`text-[10px] font-bold uppercase tracking-[0.2em] ${titleInfo.color} mb-1 opacity-70`}>成就等级</div>
            <div className={`text-4xl font-black mb-5 ${titleInfo.color} drop-shadow-sm`}>{titleInfo.name}</div>
            
            <div className="flex justify-center gap-4 mb-6">
              <div className="bg-red-50 px-6 py-3 rounded-2xl border border-red-100">
                <div className="text-[10px] text-red-400">本场分数</div>
                <div className="text-2xl font-black text-red-600">{score}</div>
              </div>
              <div className="bg-amber-50 px-6 py-3 rounded-2xl border border-amber-100">
                <div className="text-[10px] text-amber-500">最高纪录</div>
                <div className="text-2xl font-black text-amber-600">{highScore}</div>
              </div>
            </div>
        </div>

        <canvas ref={canvasRef} width="750" height="1334" className="hidden" />

        {posterUrl && (
          <div className="mb-6 relative group inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-red-500 rounded-2xl blur opacity-25"></div>
            <img 
              src={posterUrl} 
              alt="Result Poster" 
              className="relative w-44 mx-auto rounded-xl shadow-2xl border-4 border-white transition-transform cursor-pointer" 
              onClick={handleSave} 
            />
            <div className="mt-3 flex items-center justify-center gap-1">
               <span className="text-[10px] text-gray-400 italic">点图预览海报</span>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <button 
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-3 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            保存至尊海报 🏆
          </button>
          <button 
            onClick={onRestart}
            className="w-full bg-white border-2 border-red-100 text-red-600 font-bold py-3 rounded-2xl transition-all hover:bg-red-50"
          >
            返回首页
          </button>
        </div>
      </div>

      <div className="mt-auto pb-4 text-center">
        <p className="text-[10px] text-amber-800/60 leading-relaxed font-medium">
          *根据金领冠珍护1段营养成分表编制<br/>
          科学哺育，从了解每一份营养开始
        </p>
      </div>
    </div>
  );
};

export default Result;
