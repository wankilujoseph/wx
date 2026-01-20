
import React, { useState, useEffect, useMemo } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { NUTRITION_QUESTIONS } from '../../constants'

const Level3 = () => {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [timeLeft, setTimeLeft] = useState(5)
  const [score, setScore] = useState(Taro.getStorageSync('current_game_score') || 0)
  
  const gameQuestions = useMemo(() => {
    return [...NUTRITION_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 5)
  }, [])

  useEffect(() => {
    if (timeLeft <= 0) {
      handleNext()
      return
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const handleNext = (selectedIdx?: number) => {
    const isCorrect = selectedIdx === gameQuestions[currentIdx].answerIndex
    let newScore = score
    if (isCorrect) newScore += 10
    
    setScore(newScore)

    if (currentIdx + 1 < gameQuestions.length) {
      setCurrentIdx(prev => prev + 1)
      setTimeLeft(5)
    } else {
      Taro.setStorageSync('current_game_score', newScore)
      Taro.navigateTo({ url: '/pages/result/index' })
    }
  }

  return (
    <View className='p-6 flex flex-col min-h-screen'>
      <View className='mb-6 flex justify-between items-end'>
        <View>
          <Text className='text-xl font-bold text-gray-800 block'>第三关：智力巅峰问答</Text>
          <Text className='text-gray-500 text-sm block'>进度: {currentIdx + 1}/{gameQuestions.length}</Text>
        </View>
        <Text className='text-red-600 font-bold'>{timeLeft}s</Text>
      </View>

      <View className='bg-white rounded-3xl p-6 shadow-sm border border-amber-100 flex-1 flex flex-col space-y-6'>
        <View className='w-full h-1 bg-gray-100 rounded-full overflow-hidden'>
          <View className='h-full bg-amber-500' style={{ width: `${(timeLeft / 5) * 100}%`, transition: 'width 1s linear' }} />
        </View>

        <View className='flex-1 flex flex-col justify-center'>
          <Text className='text-lg font-bold text-gray-800 mb-8 block'>{gameQuestions[currentIdx].question}</Text>
          <View className='space-y-4 flex flex-col'>
            {gameQuestions[currentIdx].options.map((option, idx) => (
              <Button 
                key={idx}
                onClick={() => handleNext(idx)}
                className='bg-amber-50 text-red-800 font-bold rounded-2xl py-3 text-left px-6 border-2 border-transparent flex items-center justify-between'
                style={{ textAlign: 'left', justifyContent: 'space-between' }}
              >
                <Text>{option}</Text>
                <Text>→</Text>
              </Button>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}

export default Level3
