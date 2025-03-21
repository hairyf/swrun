import spawn from 'cross-spawn'
import { describe, expect, it } from 'vitest'

describe('fixtures', async () => {
  it('fibonacci', async () => {
    const { stdout } = spawn.sync('node', [
      './bin/swrun.js',
      './test/fixtures/fibonacci.ts',
    ])
    expect(stdout.toString().trim()).toMatchSnapshot()
  })
})
