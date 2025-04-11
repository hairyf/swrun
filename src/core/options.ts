import type { Options } from './types'
import path from 'node:path'
import process from 'node:process'
import { destr } from 'destr'
import mri from 'mri'

const argv = process.argv.slice(2)

let { _: scripts, include, root, exclude } = mri<Record<string, string | string[]>>(argv, {
  default: {
    ignore: '',
  },
})
const watch = scripts[0] === 'watch'
scripts = scripts.filter(s => s !== 'watch')

export function resolveOptions(): Options {
  return {
    scripts,
    root: resolves(root)[0] ?? process.cwd(),
    ignore: resolves(exclude),
    get watch() {
      if (!watch)
        return false
      if (!include)
        return [process.cwd()]
      return resolves(include)
    },
  }
}

function resolves(paths: string | string[]) {
  return [paths]
    .flat()
    .filter(Boolean)
    .map((p => destr<string>(p)))
    .map(p => path.resolve(p))
}
