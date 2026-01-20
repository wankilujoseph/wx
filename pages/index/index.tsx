
import React from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { BRAND_NAME, PRODUCT_SUBTITLE } from '../../constants'

const Index = () => {
  const [stats, setStats] = React.useState({ highScore: 0, bestTitle: '暂无' })

  useDidShow(() => {
    const highScore = Taro.getStorageSync('baby_guardian_high_score') || 0
    const bestTitle = Taro.getStorageSync('baby_guardian_best_title') || '暂无'
    setStats({ highScore, bestTitle })
    // 初始化当前得分
    Taro.setStorageSync('current_game_score', 0)
  })

  const getLevelInfo = () => {
    const score = stats.highScore
    if (score === 0) return { title: '实习守护官', avatar: '/assets/avatar_1.png', color: '#94a3b8' }
    if (score > 100) return { title: '至臻守护官', avatar: '/assets/avatar_3.png', color: '#ef4444' }
    if (score >= 50) return { title: '金牌育儿师', avatar: '/assets/avatar_2.png', color: '#f59e0b' }
    return { title: '新手爸妈', avatar: '/assets/avatar_1.png', color: '#3b82f6' }
  }

  const level = getLevelInfo()

  const startNewGame = () => {
    Taro.navigateTo({ url: '/pages/level1/index' })
  }

  return (
    <View className='flex flex-col items-center justify-center p-6 animate-fadeIn min-h-screen'>
      <View className='text-center mt-10'>
        <View className='relative inline-block'>
          <View className='w-48 h-48 rounded-full flex items-center justify-center mx-auto shadow-2xl p-1 bg-white border-4' style={{ borderColor: level.color }}>
             <Image src={level.avatar} className='w-40 h-40' mode='aspectFit' />
          </View>
          <View className='absolute -bottom-2 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-6 py-1 rounded-full shadow-lg' style={{ backgroundColor: level.color }}>
            {level.title}
          </View>
        </View>

        <View className='mt-8'>
          <Text className='text-2xl font-black text-red-700 block'>{BRAND_NAME}</Text>
          <Text className='text-amber-800 font-bold text-sm opacity-80 block'>{PRODUCT_SUBTITLE}</Text>
        </View>
      </View>

      <View className='w-full grid grid-cols-2 gap-4 mt-8'>
        <View className='bg-white rounded-2xl p-4 shadow-sm border border-amber-100 flex flex-col items-center'>
          <Text className='text-[10px] text-amber-600 font-bold'>最高守护分</Text>
          <Text className='text-2xl font-black text-red-600'>{stats.highScore}</Text>
        </View>
        <View className='bg-white rounded-2xl p-4 shadow-sm border border-amber-100 flex flex-col items-center'>
          <Text className='text-[10px] text-amber-600 font-bold'>解锁成就</Text>
          <Text className='text-sm font-black text-amber-800 mt-1'>{level.title}</Text>
        </View>
      </View>

      <View className='w-full mt-10'>
        <Button 
          onClick={startNewGame}
          className='w-full bg-red-600 text-white font-bold py-4 rounded-full shadow-xl text-lg flex items-center justify-center'
          style={{ height: '110rpx', lineHeight: '110rpx' }}
        >
          {stats.highScore === 0 ? '开启守护官之旅' : '挑战更高级别'}
        </Button>
      </View>

      <View className='mt-10 bg-amber-100/30 rounded-xl p-4 border border-dashed border-amber-200 w-full'>
        <Text className='text-[11px] text-amber-900/70 leading-relaxed block'>
          完成挑战后，系统将根据最终得分自动晋升头像形象。冲奶关快速点击、状态关连续答对、知识关满分，是解锁至臻专家头像的关键！
        </Text>
      </View>
    </View>
  )
}

export default Index
