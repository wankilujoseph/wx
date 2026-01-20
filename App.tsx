
import React, { useState, useEffect } from 'react';
import { GameState, UserStats } from './types';
import Home from './components/Home';
import Level1 from './components/Level1';
import Level2 from './components/Level2';
import Level3 from './components/Level3';
import Result from './components/Result';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.HOME);
  const [currentScore, setCurrentScore] = useState(0);
  const [history, setHistory] = useState<UserStats>({
    score: 0,
    highScore: parseInt(localStorage.getItem('baby_guardian_high_score') || '0'),
    title: '',
    bestTitle: localStorage.getItem('baby_guardian_best_title') || '暂无'
  });

  const updateScore = (points: number) => {
    setCurrentScore(prev => prev + points);
  };

  const startNewGame = () => {
    setCurrentScore(0);
    setGameState(GameState.LEVEL1);
  };

  const handleGameOver = (finalTitle: string) => {
    const newHighScore = Math.max(history.highScore, currentScore);
    localStorage.setItem('baby_guardian_high_score', newHighScore.toString());
    const bestTitle = newHighScore >= 85 ? '至臻守护官' : (newHighScore >= 50 ? '育儿达人' : '新手爸妈');
    localStorage.setItem('baby_guardian_best_title', bestTitle);

    setHistory(prev => ({
      ...prev,
      highScore: newHighScore,
      bestTitle: bestTitle
    }));
    setGameState(GameState.RESULT);
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-amber-50 shadow-xl flex flex-col relative overflow-hidden">
      {/* Brand Header */}
      <div className="bg-white p-4 flex justify-between items-center border-b border-amber-100 z-10">
        <h1 className="text-xl font-bold text-red-600 flex flex-col leading-tight">
          <span className="text-xs text-amber-600 font-normal">伊利金领冠</span>
          <span>珍护 · 守护官挑战赛</span>
        </h1>
        <div className="text-sm font-bold px-3 py-1 bg-red-600 text-white rounded-full shadow-sm">
          积分: {currentScore}
        </div>
      </div>

      <main className="flex-1 flex flex-col p-6 overflow-y-auto">
        {gameState === GameState.HOME && (
          <Home onStart={startNewGame} history={history} />
        )}
        
        {gameState === GameState.LEVEL1 && (
          <Level1 
            onSuccess={() => setGameState(GameState.LEVEL2)} 
            onUpdateScore={updateScore} 
          />
        )}

        {gameState === GameState.LEVEL2 && (
          <Level2 
            onSuccess={() => setGameState(GameState.LEVEL3)} 
            onUpdateScore={updateScore} 
          />
        )}

        {gameState === GameState.LEVEL3 && (
          <Level3 
            onFinish={handleGameOver} 
            onUpdateScore={updateScore} 
            finalScore={currentScore}
          />
        )}

        {gameState === GameState.RESULT && (
          <Result 
            score={currentScore} 
            onRestart={() => setGameState(GameState.HOME)} 
            highScore={history.highScore}
          />
        )}
      </main>

      {/* Decorative Brand Background Elements */}
      <div className="absolute top-20 right-[-40px] w-64 h-64 bg-amber-200 rounded-full blur-[100px] opacity-40 -z-0"></div>
      <div className="absolute bottom-10 left-[-40px] w-48 h-48 bg-red-100 rounded-full blur-[80px] opacity-30 -z-0"></div>
    </div>
  );
};

export default App;
