import spawn from 'nano-spawn'

export function runNodeCommand(args: (string | string[])[] = []) {
  const controller = new AbortController()

  const subprocess = spawn('node', args.flat(), {
    signal: controller.signal,
    stdio: 'inherit',
    stderr: 'inherit',
    stdin: 'inherit',
  })

  return {
    controller,
    subprocess,
  }
}
