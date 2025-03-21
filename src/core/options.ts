import type { Options } from './types'
import process from 'node:process'
import { destr as _destr } from 'destr'
import mri from 'mri'

const destr = (value: string) => _destr<string>(value)
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
    root: [root].flat()[0] ?? process.cwd(),
    ignore: [exclude].flat().filter(Boolean),
    get watch() {
      if (!watch)
        return false
      if (!include)
        return [process.cwd()]
      const flat = [include].flat()
      return flat.map(destr)
    },
  }
}
