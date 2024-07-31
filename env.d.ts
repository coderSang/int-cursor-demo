/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.png' {
  const value: any
  export = value
}
declare module '*.svg' {
  const value: any
  export = value
}