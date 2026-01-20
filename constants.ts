
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
    question: "新生儿（0–28 天）正常呼吸频率大约是？",
    options: ["10–20 次/分钟", "20–30 次/分钟", "30–60 次/分钟", "60–90 次/分钟"],
    answerIndex: 2
  },
  {
    id: 2,
    question: "婴儿发热时，家用体温计测量更推荐哪种方式？",
    options: ["额温枪永远最准", "耳温一定比腋温准", "腋温更方便，注意按压到位", "用手摸额头最可靠"],
    answerIndex: 2
  },
  {
    id: 3,
    question: "母乳喂养的宝宝，通常什么时候需要额外补水？",
    options: ["一出生就必须补水", "夏天必须每天喂水", "6 个月内一般不需要额外补水", "只要哭就喂水"],
    answerIndex: 2
  },
  {
    id: 4,
    question: "给宝宝冲奶粉，最正确的顺序是？",
    options: ["先加奶粉再加水", "先加水到刻度线，再加奶粉", "随便，能冲开就行", "用开水直接冲最干净"],
    answerIndex: 1
  },
  {
    id: 5,
    question: "奶瓶清洗后，最推荐的消毒方法是？",
    options: ["冷水冲一下就行", "用洗洁精泡一晚", "沸水煮/蒸汽消毒后自然晾干", "用酒精喷雾消毒最方便"],
    answerIndex: 2
  },
  {
    id: 6,
    question: "宝宝夜里睡觉更安全的睡姿是？",
    options: ["趴睡更踏实", "侧睡更不呛奶", "仰睡更安全", "怎么睡都一样"],
    answerIndex: 2
  },
  {
    id: 7,
    question: "以下哪种情况更像“需要就医评估的黄疸”？",
    options: ["出生后 2–3 天出现", "宝宝精神差、吃奶差、嗜睡明显", "皮肤有点黄但能吃能睡", "大便小便正常"],
    answerIndex: 1
  },
  {
    id: 8,
    question: "宝宝开始添加辅食的常见建议时间是？",
    options: ["2 个月", "4–6 个月", "9 个月", "1 岁以后"],
    answerIndex: 1
  },
  {
    id: 9,
    question: "宝宝打完疫苗后，哪些反应更常见、通常可观察？",
    options: ["持续高烧 40℃ 不退", "注射部位轻微红肿、低热", "呼吸困难、全身风团", "抽搐、意识不清"],
    answerIndex: 1
  },
  {
    id: 10,
    question: "预防婴儿猝死综合征（SIDS），哪项做法更正确？",
    options: ["盖厚被子捂热一点", "睡床上放枕头更舒服", "婴儿单独睡平整床垫、避免松软物", "越软越安全"],
    answerIndex: 2
  }
];

export const TITLES = [
  { threshold: 0, name: '新手爸妈', color: 'text-gray-500', avatar: './avatar_1.png' },
  { threshold: 50, name: '育儿达人', color: 'text-amber-600', avatar: './avatar_2.png' },
  { threshold: 101, name: '至臻守护官', color: 'text-red-600', avatar: './avatar_3.png' }
];
