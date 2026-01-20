
import React, { useEffect, useState } from 'react'
import { View, Text, Canvas, Image, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { BRAND_NAME } from '../../constants'

const Result = () => {
  const [score] = useState(Taro.getStorageSync('current_game_score') || 0)
  const [highScore, setHighScore] = useState(0)
  const [posterUrl, setPosterUrl] = useState('')

  useEffect(() => {
    const oldHigh = Taro.getStorageSync('baby_guardian_high_score') || 0
    const newHigh = Math.max(oldHigh, score)
    Taro.setStorageSync('baby_guardian_high_score', newHigh)
    setHighScore(newHigh)
    
    const bestTitle = newHigh >= 101 ? '至臻守护官' : (newHigh >= 50 ? '育儿达人' : '新手爸妈')
    Taro.setStorageSync('baby_guardian_best_title', bestTitle)

    // 在小程序中生成海报
    generatePoster()
  }, [])

  const generatePoster = () => {
    const query = Taro.createSelectorQuery()
    query.select('#posterCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = Taro.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)

        // 绘制逻辑简略版（由于Canvas API在小程序与H5有细微差异，此处实现核心绘制）
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, 375, 667)
        
        ctx.fillStyle = '#ef4444'
        ctx.font = 'bold 30px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(BRAND_NAME, 187, 80)
        
        ctx.fillStyle = '#333333'
        ctx.font = '20px sans-serif'
        ctx.fillText('宝宝守护挑战赛', 187, 120)
        
        ctx.fillStyle = '#ef4444'
        ctx.font = 'bold 60px sans-serif'
        ctx.fillText(score.toString(), 187, 220)
        
        ctx.font = '16px sans-serif'
        ctx.fillText('GUARD SCORE', 187, 250)

        // 生成临时文件
        setTimeout(() => {
          Taro.canvasToTempFilePath({
            canvasId: 'posterCanvas',
            canvas: canvas,
            success: (fileRes) => {
              setPosterUrl(fileRes.tempFilePath)
            }
          })
        }, 500)
      })
  }

  const handleRestart = () => {
    Taro.reLaunch({ url: '/pages/index/index' })
  }

  const handleSave = () => {
    if (!posterUrl) return
    Taro.saveImageToPhotosAlbum({
      filePath: posterUrl,
      success: () => Taro.showToast({ title: '已保存到相册' }),
      fail: () => Taro.showToast({ title: '保存失败', icon: 'none' })
    })
  }

  return (
    <View className='p-6 flex flex-col items-center min-h-screen'>
      <View className='text-center mb-10 mt-10'>
        <Text className='text-2xl font-black text-red-700 block'>挑战完成！</Text>
        <Text className='text-gray-500 text-sm mt-2 block'>每一个细微的守护，都是宝宝成长的基石</Text>
      </View>

      <View className='w-full bg-white rounded-3xl p-8 shadow-xl flex flex-col items-center border-t-8 border-red-500'>
        <View className='mb-6'>
          <Text className='text-sm font-bold text-gray-400 block'>本次得分</Text>
          <Text className='text-5xl font-black text-red-600 block mt-2'>{score}</Text>
        </View>

        <Canvas id='posterCanvas' canvasId='posterCanvas' type='2d' style={{ width: '300px', height: '400px', position: 'fixed', left: '-1000px' }} />

        {posterUrl && (
          <Image src={posterUrl} mode='aspectFit' className='w-48 h-64 shadow-lg rounded-xl mb-8' />
        )}

        <View className='w-full space-y-4 flex flex-col'>
          <Button 
            onClick={handleSave}
            className='w-full bg-red-600 text-white font-bold py-3 rounded-full'
          >
            保存荣誉海报
          </Button>
          <Button 
            onClick={handleRestart}
            className='w-full bg-white border-2 border-amber-200 text-gray-600 font-bold py-3 rounded-full'
          >
            返回首页
          </Button>
        </View>
      </View>
    </View>
  )
}

export default Result
