import type { Options } from './types'
import process from 'node:process'
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
    root: rs(root)[0] ?? process.cwd(),
    ignore: rs(exclude),
    get watch() {
      if (!watch)
        return false
      if (!include)
        return [process.cwd()]
      return rs(include)
    },
  }
}

function rs(paths: string | string[]) {
  return [paths].flat().filter(Boolean)
}
