
import React, { useState } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { LEVEL1_SEQUENCE } from '../../constants'

const Level1 = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  const handleStepClick = (stepName: string) => {
    const targetStep = LEVEL1_SEQUENCE[currentStep]
    if (stepName === targetStep.name) {
      const newScore = score + 10
      setScore(newScore)
      setFeedback('操作正确！')
      
      const nextStepIndex = currentStep + 1
      if (nextStepIndex === LEVEL1_SEQUENCE.length) {
        Taro.setStorageSync('current_game_score', newScore)
        Taro.showToast({ title: '第一关完成!', icon: 'success' })
        setTimeout(() => {
          Taro.navigateTo({ url: '/pages/level2/index' })
        }, 1500)
      } else {
        setCurrentStep(nextStepIndex)
      }
    } else {
      setScore(prev => Math.max(0, prev - 5))
      setFeedback(`顺序错误，请先执行: ${targetStep.name}`)
    }
    setTimeout(() => setFeedback(null), 1200)
  }

  const buttons = ['加水', '加奶粉', '洗手', '摇匀']

  return (
    <View className='p-6 flex flex-col min-h-screen'>
      <View className='mb-6'>
        <Text className='text-xl font-bold text-gray-800 block'>第一关：科学冲奶挑战</Text>
        <Text className='text-gray-500 text-sm block'>得分：{score}</Text>
      </View>

      <View className='bg-white rounded-3xl p-6 shadow-sm border border-amber-100 flex-1 flex flex-col'>
        <View className='flex-1 bg-amber-50/30 rounded-2xl mb-6 flex items-center justify-center overflow-hidden border border-amber-100 relative'>
          <Image 
            src={currentStep < LEVEL1_SEQUENCE.length ? LEVEL1_SEQUENCE[currentStep].image : LEVEL1_SEQUENCE[3].image} 
            mode='aspectFit'
            className='w-full h-full p-4'
          />
        </View>

        <View className='flex justify-between mb-8 px-2'>
          {LEVEL1_SEQUENCE.map((_, idx) => (
            <View key={idx} className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${idx < currentStep ? 'bg-green-500 text-white' : idx === currentStep ? 'border-2 border-red-500 text-red-500' : 'bg-gray-100 text-gray-300'}`}>
              {idx < currentStep ? '✓' : idx + 1}
            </View>
          ))}
        </View>

        <View className='grid grid-cols-2 gap-4'>
          {buttons.map(label => (
            <Button 
              key={label}
              onClick={() => handleStepClick(label)}
              className='bg-amber-50 border-2 border-amber-100 text-red-700 font-bold rounded-2xl py-4 flex items-center justify-center'
              style={{ height: '120rpx' }}
            >
              {label}
            </Button>
          ))}
        </View>

        {feedback && (
          <View className='text-center mt-4'>
            <Text className='text-xs font-bold text-red-500'>{feedback}</Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default Level1
