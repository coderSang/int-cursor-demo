import { shallowRef } from 'vue'
// 引入主题
import theme_light from './light'
import theme_dark from './dark'

// 定义在全局的样式变量
const theme = shallowRef<Record<string, string>>({})
const light = ref<string | null>('light')
export function useTheme() {
  // 尝试从本地读取
  const localTheme = localStorage.getItem('theme')
  theme.value = localTheme ? (localTheme === 'light' ? theme_light : theme_dark) : theme_light
  light.value = localTheme
  const setLightTheme = () => {
    theme.value = theme_light
    light.value = 'light'
    localStorage.setItem('theme', 'light')
  }

  const setDarkTheme = () => {
    theme.value = theme_dark
    light.value = 'dark'
    localStorage.setItem('theme', 'dark')
  }

  return {
    theme,
    setLightTheme,
    setDarkTheme,
    light
  }
}
export function useDarkTheme() {
  // 尝试从本地读取

  return {
    theme: theme_dark
  }
}
