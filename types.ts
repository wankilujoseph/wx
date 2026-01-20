
export enum GameState {
  HOME = 'HOME',
  LEVEL1 = 'LEVEL1',
  LEVEL2 = 'LEVEL2',
  LEVEL3 = 'LEVEL3',
  RESULT = 'RESULT'
}

export interface UserStats {
  score: number;
  highScore: number;
  title: string;
  bestTitle: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
}

export interface BabyStatus {
  status: '哭闹' | '困倦' | '饥饿';
  action: '换尿布' | '哄睡' | '喂奶';
  description: string;
  image: string;
}
