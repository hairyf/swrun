import { register } from 'node:module'
import { pathToFileURL } from 'node:url'
import { resolve } from 'import-meta-resolve'

const specifier = resolve('@swc-node/register/esm', import.meta.url)
register(specifier, pathToFileURL('./').toString())
// # sourceMappingURL=esm-register.mjs.map
