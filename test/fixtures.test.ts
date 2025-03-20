import spawn from 'nano-spawn'
import { describe, expect, it } from 'vitest'

describe.only('fixtures', async () => {
  it('fibonacci', async () => {
    const { stdout } = await spawn('node', [
      './bin/swrun.js',
      './test/fixtures/fibonacci.ts',
    ])

    expect(stdout).toMatchSnapshot()
  })
})
