import type { createContext } from './context'

export interface Options {
  scripts: string[]
  root?: string
  ignore?: string[]
  watch?: false | string[]
}

export type SwrunContext = ReturnType<typeof createContext>
