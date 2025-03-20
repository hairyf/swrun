import type { FSWatcher } from 'chokidar'
import type { Options } from './types'
import path, { dirname, join } from 'node:path'
import { resolve } from 'import-meta-resolve'
import { runNodeCommand } from './node'
import { isFeatureSupported, moduleRegister } from './node-features'
import { resolveRootPackage } from './resolve-root-package'
import { createWatcher } from './watch'

export function createContext(options: Options) {
  let watcher: FSWatcher | undefined
  let _controller: AbortController | undefined

  const ctx = {
    options,
    isRunning: false,
    watcher,
    setup,
    run,
    abort,
  }

  function setup() {
    if (options.watch && options.watch.length)
      ctx.watcher = createWatcher(ctx)
  }

  async function run() {
    try {
      if (!options.scripts.length)
        return

      const { json: { type } } = resolveRootPackage()
      const { file } = resolveRootPackage(import.meta.dirname)
      const loaders = (type === 'module')
        ? (isFeatureSupported(moduleRegister))
            ? ['--import', `file:///${join(dirname(file), 'esm-register.mjs')}`]
            : ['--loader', resolve('@swc-node/register/esm', import.meta.url)]
        : ['--require', resolve('@swc-node/register', import.meta.url).replace('file:///', '')]

      const { controller, subprocess } = runNodeCommand([
        loaders,
        options.scripts,
      ])

      _controller = controller
      ctx.isRunning = true
      await subprocess
      ctx.isRunning = false
    }
    catch {
      ctx.isRunning = false
    }
  }

  function abort() {
    _controller?.abort()
    ctx.isRunning = false
  }

  return ctx
}
