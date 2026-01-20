
import { Question, BabyStatus } from './types';

export const BRAND_NAME = "金领冠 珍护";
export const PRODUCT_SUBTITLE = "1段婴幼儿配方奶粉";

export const LEVEL1_SEQUENCE = ['洗手', '加水', '加奶粉', '摇匀'];

export const BABY_STATUSES: BabyStatus[] = [
  { status: '哭闹', action: '换尿布', description: '宝宝脸涨得通红，身体扭动，可能是纸尿裤不舒服。' },
  { status: '困倦', action: '哄睡', description: '宝宝揉眼睛，打哈欠，表现出明显的倦意。' },
  { status: '饥饿', action: '喂奶', description: '宝宝寻找奶头，吸吮手指，这是该补充营养的信号。' }
];

export const NUTRITION_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "金领冠珍护1段奶粉适用于哪个年龄段的宝宝？",
    options: ["0-6月龄", "6-12月龄", "1-3岁"],
    answerIndex: 0
  },
  {
    id: 2,
    question: "根据成分表，每100g金领冠珍护1段奶粉中DHA的含量是？",
    options: ["50mg", "100mg", "130mg"],
    answerIndex: 1
  },
  {
    id: 3,
    question: "金领冠珍护1段中含有AA/ARA，每100g的含量是多少？",
    options: ["100mg", "110mg", "130mg"],
    answerIndex: 2
  },
  {
    id: 4,
    question: "冲调奶粉时，为了保护营养活性，建议水温通常是多少？",
    options: ["20℃", "40-50℃", "100℃"],
    answerIndex: 1
  },
  {
    id: 5,
    question: "金领冠珍护1段成分表中的‘二十二碳六烯酸’通常被称为什么？",
    options: ["DHA", "ARA", "叶酸"],
    answerIndex: 0
  }
];

export const TITLES = [
  { threshold: 0, name: '新手爸妈', color: 'text-gray-500' },
  { threshold: 50, name: '育儿达人', color: 'text-amber-600' },
  { threshold: 85, name: '至臻守护官', color: 'text-red-600' }
];
