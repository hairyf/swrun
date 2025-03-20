import type { Options } from './types'
import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { transform } from '@swc/core'
import { hash } from 'ohash'
import { createContext } from './context'

export const swrun = Object.assign(
  async (scripts: string | string[]) => {
    const options: Options = { scripts: [scripts].flat() }
    const ctx = createContext(options)
    await ctx.run()
  },

  {
    async transform(id: string, code?: string) {
      if (!code)
        code = await fs.readFile(id, 'utf8')
      const output = await transform(code, { filename: id })

      return {
        get code() {
          return output.code
        },
        get map() {
          return output.map
        },
      }
    },

    async import<T = any>(id: string) {
      const { code } = await this.transform(id)
      const key = hash({ id, code })
      const outfile = resolve(process.cwd(), `swrun.${key}.mjs`)

      try {
        await fs.writeFile(outfile, code, 'utf8')
        const mod = await import(outfile)
        return mod as T
      }
      finally {
        fs.unlink(outfile)
      }
    },
  },
)
