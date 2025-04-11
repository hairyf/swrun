import { describe, expect, it } from 'vitest'
import { swrun } from '../src'

describe('swrun', async () => {
  it('import default', async () => {
    const mod = await swrun.import('./test/fixtures/fibonacci.ts')
    expect(mod.default).toBe(55)
  })

  it('import const', async () => {
    const mod = await swrun.import('./test/fixtures/fibonacci.ts')
    expect(mod.result).toBe(55)
  })
})
