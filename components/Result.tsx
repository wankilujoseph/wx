
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
  
  // 获取海报配置主题
  const getPosterTheme = () => {
    if (score < 50) {
      return {
        name: '实习守护官',
        tag: 'GROWING UP',
        label: '# 初见守护 #',
        quote: '守护的第一步已经迈出，宝宝正因你的爱而成长',
        colors: {
          bgStart: '#F0F9FF',
          bgEnd: '#E0F2FE',
          accent: '#0284C7',
          textMain: '#0369A1',
          badge: '#0EA5E9',
          decoration: 'circle'
        },
        avatar: './avatar_1.png'
      };
    } else if (score <= 100) {
      return {
        name: '金牌育儿师',
        tag: 'PROFESSIONAL',
        label: '# 科学育儿 #',
        quote: '纯熟的技巧让守护更有力，你已成为宝宝的头号护卫',
        colors: {
          bgStart: '#FFFBEB',
          bgEnd: '#FEF3C7',
          accent: '#D97706',
          textMain: '#92400E',
          badge: '#F59E0B',
          decoration: 'wave'
        },
        avatar: './avatar_2.png'
      };
    } else {
      return {
        name: '至臻守护官',
        tag: 'ULTIMATE GUARDIAN',
        label: '# 至臻专家 #',
        quote: '完美诠释科学与爱的结合，你就是宝宝的超级英雄',
        colors: {
          bgStart: '#FFF1F2',
          bgEnd: '#FFE4E6',
          accent: '#E11D48',
          textMain: '#9F1239',
          badge: '#F43F5E',
          decoration: 'star'
        },
        avatar: './avatar_3.png'
      };
    }
  };

  const theme = getPosterTheme();

  const generatePoster = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. 动态背景颜色
    const grad = ctx.createLinearGradient(0, 0, 0, 1334);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.3, theme.colors.bgStart);
    grad.addColorStop(1, theme.colors.bgEnd);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 750, 1334);

    // 2. 绘制装饰背景 (更细腻的纹理)
    ctx.save();
    ctx.strokeStyle = theme.colors.accent + '15';
    ctx.lineWidth = 1.5;
    if (theme.colors.decoration === 'circle') {
      for(let i=0; i<20; i++) {
        ctx.beginPath();
        ctx.arc(Math.random()*750, Math.random()*1100, 5 + Math.random()*60, 0, Math.PI*2);
        ctx.stroke();
      }
    } else if (theme.colors.decoration === 'wave') {
      for(let i=0; i<12; i++) {
        ctx.beginPath();
        ctx.moveTo(-50, 300 + i*70);
        ctx.bezierCurveTo(200, 200 + i*70, 500, 600 + i*70, 800, 300 + i*70);
        ctx.stroke();
      }
    } else {
      ctx.fillStyle = theme.colors.accent + '10';
      for(let i=0; i<40; i++) {
        const x = Math.random()*750, y = Math.random()*1100, r = 3+Math.random()*10;
        ctx.beginPath();
        ctx.moveTo(x, y-r);
        ctx.lineTo(x+r, y); ctx.lineTo(x, y+r); ctx.lineTo(x-r, y);
        ctx.closePath(); ctx.fill();
      }
    }
    ctx.restore();

    // 3. 顶部品牌区
    // 绘制Logo底纹
    ctx.fillStyle = theme.colors.accent + '10';
    ctx.beginPath();
    ctx.roundRect(40, 60, 280, 80, 40);
    ctx.fill();

    ctx.textAlign = 'left';
    ctx.fillStyle = theme.colors.accent;
    ctx.font = 'bold 38px sans-serif';
    ctx.fillText('伊利', 80, 112);
    ctx.fillStyle = theme.colors.textMain;
    ctx.font = '26px sans-serif';
    ctx.fillText('| 金领冠', 170, 112);

    // 4. 副标题与主标题
    ctx.textAlign = 'center';
    ctx.fillStyle = theme.colors.accent;
    ctx.font = 'bold 24px sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText(theme.tag, 375, 230);
    ctx.letterSpacing = '0px';

    ctx.fillStyle = theme.colors.textMain;
    ctx.font = 'bold 72px sans-serif';
    ctx.shadowBlur = 4;
    ctx.shadowColor = 'rgba(0,0,0,0.1)';
    ctx.fillText(BRAND_NAME, 375, 310);
    ctx.shadowBlur = 0;
    
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText('宝宝守护挑战赛', 375, 375);

    // 5. 分数展示区 (层次化圆环)
    const circleX = 375, circleY = 560;
    
    // 外发光
    ctx.save();
    ctx.shadowBlur = 50;
    ctx.shadowColor = theme.colors.accent + '30';
    ctx.beginPath();
    ctx.arc(circleX, circleY, 165, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.restore();

    // 进度条背景
    ctx.strokeStyle = theme.colors.accent + '20';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(circleX, circleY, 150, 0, Math.PI * 2);
    ctx.stroke();

    // 进度条激活态 (根据分数绘制弧度)
    ctx.strokeStyle = theme.colors.accent;
    ctx.lineCap = 'round';
    const angle = (Math.min(score, 150) / 150) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(circleX, circleY, 150, -Math.PI/2, -Math.PI/2 + angle);
    ctx.stroke();

    ctx.fillStyle = theme.colors.accent;
    ctx.font = 'bold 130px sans-serif';
    ctx.fillText(score.toString(), circleX, circleY + 20);
    ctx.font = '28px sans-serif';
    ctx.fillStyle = theme.colors.textMain + '80';
    ctx.fillText('GUARD SCORE', circleX, circleY + 70);

    // 6. 称号勋章卡片
    // 卡片阴影
    ctx.save();
    ctx.shadowBlur = 20;
    ctx.shadowColor = theme.colors.badge + '40';
    ctx.fillStyle = theme.colors.badge;
    ctx.beginPath();
    ctx.roundRect(140, 780, 470, 110, 55);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 48px sans-serif';
    ctx.fillText(theme.name, 375, 850);

    // 7. 专属标签与激励语
    ctx.fillStyle = theme.colors.accent;
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(theme.label, 375, 935);

    ctx.fillStyle = theme.colors.textMain;
    ctx.font = '28px sans-serif';
    // 简单的文本折行逻辑
    const quote = theme.quote;
    if (quote.length > 18) {
       ctx.fillText(quote.slice(0, 18), 375, 985);
       ctx.fillText(quote.slice(18), 375, 1025);
    } else {
       ctx.fillText(quote, 375, 985);
    }

    // 8. 角色形象 (Avatar) - 放在一个装饰框里
    const avatarY = 1130;
    ctx.save();
    // 装饰框
    ctx.strokeStyle = theme.colors.accent;
    ctx.lineWidth = 4;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(375, avatarY, 85, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // 裁剪头像
    ctx.beginPath();
    ctx.arc(375, avatarY, 75, 0, Math.PI * 2);
    ctx.clip();
    
    try {
      const img = new Image();
      img.src = theme.avatar;
      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
      if (img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, 300, avatarY - 75, 150, 150);
      } else {
        ctx.fillStyle = theme.colors.bgEnd;
        ctx.fillRect(300, avatarY - 75, 150, 150);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '70px sans-serif';
        ctx.fillText('👶', 375, avatarY + 25);
      }
    } catch (e) {
      ctx.fillStyle = '#EEE';
      ctx.fillRect(300, avatarY - 75, 150, 150);
    }
    ctx.restore();

    // 9. 底部行动条
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 1220, 750, 114);
    
    // 模拟QR码
    ctx.fillStyle = theme.colors.textMain;
    ctx.fillRect(610, 1235, 85, 85);
    ctx.fillStyle = '#FFF';
    ctx.fillRect(625, 1250, 55, 55);
    ctx.fillStyle = theme.colors.textMain;
    ctx.fillRect(635, 1260, 35, 35);
    
    ctx.textAlign = 'left';
    ctx.fillStyle = theme.colors.accent;
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('科学营养 · 守护成长', 60, 1270);
    ctx.fillStyle = '#64748B';
    ctx.font = '20px sans-serif';
    ctx.fillText('亿万级益生菌助力母爱更亲和', 60, 1300);

    setPosterUrl(canvas.toDataURL('image/png', 0.9));
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
    alert('正在为您生成高清海报，请在弹出窗口长按保存');
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn items-center">
      <div className="text-center mb-5">
        <h2 className={`text-2xl font-black ${score < 50 ? 'text-sky-700' : score <= 100 ? 'text-amber-700' : 'text-red-700'}`}>
          {score < 50 ? '继续努力，守护官！' : score <= 100 ? '表现出色，育儿达人！' : '至臻表现，全能守护！'}
        </h2>
        <p className="text-gray-500 font-medium text-sm mt-1">你的每一步努力，都在为宝宝加冕</p>
      </div>

      <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-t-8 transition-all duration-500" style={{ borderColor: theme.colors.accent }}>
        <div className="relative z-10 text-center">
            <div className={`text-[11px] font-bold uppercase tracking-[0.2em] mb-1 opacity-70`} style={{ color: theme.colors.accent }}>{theme.label}</div>
            <div className={`text-4xl font-black mb-6 drop-shadow-sm`} style={{ color: theme.colors.textMain }}>{theme.name}</div>
            
            <div className="flex justify-center gap-4 mb-6">
              <div className="px-6 py-3 rounded-2xl border flex flex-col items-center min-w-[120px]" style={{ backgroundColor: theme.colors.bgStart + '50', borderColor: theme.colors.accent + '20' }}>
                <div className="text-[10px] opacity-60" style={{ color: theme.colors.textMain }}>当前战力</div>
                <div className="text-2xl font-black" style={{ color: theme.colors.accent }}>{score}</div>
              </div>
              <div className="px-6 py-3 rounded-2xl border flex flex-col items-center min-w-[120px]" style={{ backgroundColor: theme.colors.bgStart + '50', borderColor: theme.colors.accent + '20' }}>
                <div className="text-[10px] opacity-60" style={{ color: theme.colors.textMain }}>最高战力</div>
                <div className="text-2xl font-black" style={{ color: theme.colors.textMain }}>{highScore}</div>
              </div>
            </div>

            <canvas ref={canvasRef} width="750" height="1334" className="hidden" />

            {posterUrl && (
              <div className="mb-6 relative group inline-block">
                <div className="absolute -inset-1 rounded-2xl blur opacity-30 animate-pulse" style={{ backgroundColor: theme.colors.accent }}></div>
                <img 
                  src={posterUrl} 
                  alt="荣誉海报" 
                  className="relative w-48 mx-auto rounded-xl shadow-2xl border-4 border-white transition-transform hover:scale-105 cursor-pointer" 
                  onClick={() => window.open(posterUrl)} 
                />
                <div className="mt-3 text-[10px] text-gray-400 italic">点击预览高清海报</div>
              </div>
            )}
        </div>

        <div className="space-y-3">
          <button 
            onClick={handleSave}
            className="w-full text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            style={{ background: `linear-gradient(to right, ${theme.colors.accent}, ${theme.colors.badge})` }}
          >
            保存{theme.name.slice(0, 2)}海报 📥
          </button>
          <button 
            onClick={onRestart}
            className="w-full bg-white border-2 text-gray-600 font-bold py-3 rounded-2xl transition-all hover:bg-gray-50"
            style={{ borderColor: theme.colors.bgEnd }}
          >
            返回守护大厅
          </button>
        </div>
      </div>

      <div className="mt-auto py-4 text-center">
        <p className="text-[10px] text-gray-400 leading-relaxed">
          金领冠珍护：亿万级益生菌 · 吸收更亲和<br/>
          *活动解释权归品牌方所有
        </p>
      </div>
    </div>
  );
};

export default Result;
