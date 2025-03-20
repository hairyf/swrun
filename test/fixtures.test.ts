import { execa } from 'execa'
import { describe, expect, it } from 'vitest'

describe.only('fixtures', async () => {
  it('fibonacci', async () => {
    const { stdout } = await execa('node', [
      './bin/swrun.js',
      './test/fixtures/fibonacci.ts',
    ])

    expect(stdout).toMatchSnapshot()
  })
})
