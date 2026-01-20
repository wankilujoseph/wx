
import React, { useState, useEffect } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { BABY_STATUSES } from '../../constants'

const Level2 = () => {
  const [currentStatus, setCurrentStatus] = useState(BABY_STATUSES[0])
  const [correctCount, setCorrectCount] = useState(0)
  const [score, setScore] = useState(Taro.getStorageSync('current_game_score') || 0)

  const nextStatus = () => {
    const randomIndex = Math.floor(Math.random() * BABY_STATUSES.length)
    setCurrentStatus(BABY_STATUSES[randomIndex])
  }

  const handleAction = (action: string) => {
    if (action === currentStatus.action) {
      const newScore = score + 15
      setScore(newScore)
      const newCount = correctCount + 1
      setCorrectCount(newCount)
      
      if (newCount >= 3) {
        Taro.setStorageSync('current_game_score', newScore)
        Taro.showToast({ title: '关卡解锁!', icon: 'success' })
        setTimeout(() => Taro.navigateTo({ url: '/pages/level3/index' }), 1500)
      } else {
        nextStatus()
      }
    } else {
      setScore(prev => Math.max(0, prev - 10))
      setCorrectCount(0)
      Taro.showToast({ title: '答错了', icon: 'none' })
      nextStatus()
    }
  }

  return (
    <View className='p-6 flex flex-col min-h-screen'>
      <View className='mb-6'>
        <Text className='text-xl font-bold text-gray-800 block'>第二关：宝宝状态判断</Text>
        <Text className='text-gray-500 text-sm block'>当前总分：{score}</Text>
      </View>

      <View className='bg-white rounded-3xl p-6 shadow-sm border border-amber-100 flex-1 flex flex-col space-y-4'>
        <View className='flex justify-center gap-2'>
          {[1, 2, 3].map(i => (
            <View key={i} className={`w-4 h-4 rounded-full ${i <= correctCount ? 'bg-red-500' : 'bg-gray-200'}`} />
          ))}
        </View>

        <View className='flex-1 flex flex-col items-center justify-center bg-amber-50/50 rounded-2xl p-4 border border-amber-100 relative'>
          <Image src={currentStatus.image} mode='aspectFit' className='w-full h-64' />
          <View className='mt-4 text-center'>
            <Text className='text-lg font-bold text-red-600 block'>{currentStatus.status}</Text>
            <Text className='text-xs text-gray-500 italic px-4 block'>{currentStatus.description}</Text>
          </View>
        </View>

        <View className='space-y-3 flex flex-col'>
          {['喂奶', '哄睡', '换尿布'].map(action => (
            <Button 
              key={action}
              onClick={() => handleAction(action)}
              className='bg-white border-2 border-amber-200 text-red-600 font-bold rounded-2xl py-3 flex items-center justify-center'
            >
              {action}
            </Button>
          ))}
        </View>
      </View>
    </View>
  )
}

export default Level2
