import type { createContext } from './context'

export interface Options {
  scripts: string[]
  ignore?: string[]
  watch?: false | string[]
  root?: string
}

export type SwrunContext = ReturnType<typeof createContext>
