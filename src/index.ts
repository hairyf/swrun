import { createContext } from './core/context'
import { resolveOptions } from './core/options'
import { swrun } from './core/swrun'

export async function main() {
  const options = resolveOptions()
  const ctx = createContext(options)
  if (options.watch)
    await ctx.watch()
  else
    await ctx.run()
}

export { swrun }

export default swrun
