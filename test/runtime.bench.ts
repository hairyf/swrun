import spawn from 'cross-spawn'
import { bench, describe } from 'vitest'

function runSwrunCommand(path = '') {
  return spawn('node', [
    './bin/swrun.js',
    path,
  ])
}

function runJitiCommand(path = '') {
  return spawn('jiti', [
    path,
    '--fs-cache',
    'false',
    '--module-cache',
    'false',
  ])
}

function runTsxCommand(path = '') {
  return spawn('tsx', [
    path,
    '--no-cache',
    'true',
  ])
}

function runTsNodeCommand(path = '') {
  return spawn('ts-node', [path])
}

describe('fibonacci', async () => {
  bench('swrun', () => {
    runSwrunCommand('./test/fixtures/fibonacci.ts')
  })

  bench('jiti (no-cache)', () => {
    runJitiCommand('./test/fixtures/fibonacci.ts')
  })

  bench('tsx (no-cache)', () => {
    runTsxCommand('./test/fixtures/fibonacci.ts')
  })

  bench('ts-node', () => {
    runTsNodeCommand('./test/fixtures/fibonacci.ts')
  })
})
