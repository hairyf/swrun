import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

export function resolveRootPackage(root = process.cwd()): Record<string, any> {
  const packFilepath = find(root, 'package.json')
  if (!packFilepath) {
    return {}
  }
  return JSON.parse(fs.readFileSync(packFilepath, 'utf8'))
}

function find(root: string, file: string): string | undefined {
  let currentDir = root

  while (currentDir !== path.parse(currentDir).root) {
    const envPath = path.join(currentDir, file)
    if (fs.existsSync(envPath)) {
      return envPath
    }
    currentDir = path.dirname(currentDir)
  }

  return undefined
}
