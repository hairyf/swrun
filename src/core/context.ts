import type { Options } from './types'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { resolve } from 'import-meta-resolve'
import { createRerunWatcher, type FSWatcher } from 'rerun-watcher'
import { runNodeCommand } from './node'
import { isFeatureSupported, moduleRegister } from './node-features'
import { resolveRootPackage } from './resolve-root-package'

export function createContext(options: Options) {
  let watcher: FSWatcher | undefined

  const ctx = {
    options,
    watcher,
    watch,
    run,
  }

  async function watch() {
    if (options.watch && options.watch.length) {
      ctx.watcher = await createRerunWatcher(
        options.watch,
        run,
        { name: 'swrun' },
      )
    }
  }

  async function run() {
    const { json: { type } } = resolveRootPackage()
    const { file } = resolveRootPackage(import.meta.dirname)
    const replacePrefix = process.platform === 'win32' ? 'file:///' : 'file://'
    const loaders = (type === 'module')
      ? (isFeatureSupported(moduleRegister))
          ? ['--import', `file:///${join(dirname(file), 'esm-register.mjs')}`]
          : ['--loader', resolve('@swc-node/register/esm', import.meta.url)]
      : ['--require', resolve('@swc-node/register', import.meta.url).replace(replacePrefix, '')]

    return runNodeCommand([
      loaders,
      options.scripts,
    ])
  }

  return ctx
}
