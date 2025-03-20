import { createContext } from './core/context'
import { resolveOptions } from './core/options'
import { swrun } from './core/swrun'

export async function main() {
  const options = resolveOptions()
  const ctx = createContext(options)
  ctx.setup()
  await ctx.run()
}

export { swrun }

export default swrun
