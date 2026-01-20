
// Fixed: Removed defineAppConfig wrapper as it was not found. 
// Taro supports exporting the config object directly.
export default {
  pages: [
    'pages/index/index',
    'pages/level1/index',
    'pages/level2/index',
    'pages/level3/index',
    'pages/result/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTitleText: '宝宝守护官挑战赛',
    navigationBarTextStyle: 'black'
  }
}
