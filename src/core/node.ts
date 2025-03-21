import type { StdioOptions } from 'node:child_process'
import spawn from 'cross-spawn'

export function runNodeCommand(args: (string | string[])[] = []) {
  const stdio: StdioOptions = [
    'inherit', // stdin
    'inherit', // stdout
    'inherit', // stderr
  ]
  return spawn('node', args.flat(), {
    stdio,
  })
}
