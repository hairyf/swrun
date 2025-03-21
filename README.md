# swrun

[![NPM version](https://img.shields.io/npm/v/swrun)](https://www.npmjs.com/package/swrun)

forked from [oxrun](https://github.com/tmg0/oxrun), the swc version of oxrun (swrun)

Typescript node runtime powered by [swc-node](https://github.com/swc-project/swc-node)

## Feature

🚀 Super fast typescript transformer by [swc](https://github.com/swc-project/swc)

🧭 Run ts file with a single command

🙅 No installation required

👜 Import typescript in nodejs as a module

## Usage

### `CLI`

```bash
npx swrun hello.ts
```

or install as dependency

```bash
pnpm add swrun -D
```

```json
{
  "scripts": {
    "dev": "swrun scripts/dev.ts"
  }
}
```

### `Watch`

Swrun supports watch mode with `watch` and this will automatically re-run your script whenever any of files under root dir changed.

```bash
npx swrun watch hello.ts
```

### `Programmatic`

```ts
// hello.ts
const msg = 'hello'
console.log(msg)
export default msg
```

```js
// entry.js
import swrun from 'swrun'

(async () => {
  await swrun('./hello.ts') // output: hello
  const mod = await swrun.import('./hello.ts')
  console.log(mod.default) // output: hello
})()
```

## Props

### `props.include`

- Type: `string` | `string[]`
- Default: `false`

Watch can be a boolean or string (Can be set to a string of the path), empty string `''` will be parse as a truthy value like `true`.

```sh
swrun watch hello.ts --include ./other-dep.txt --include "./other-deps/*"
```

### `props.exclude`

- Type: `string`
- Default: `undefined`

```sh
swrun watch hello.ts --exclude ./**/*.test.js
```

## Development

- Clone this repository
- Install dependencies using `pnpm install`
- Run `pnpm build`
- Run `pnpm test`

## Credits

The swrun project is heavily inspired by:

- [bundle-require](https://github.com/egoist/bundle-require), created by [EGOIST](https://github.com/egoist)
- [jiti](https://github.com/unjs/jiti), created by [pi0](https://github.com/pi0) and maintained by [unjs](https://github.com/unjs)
- [tsx](https://github.com/privatenumber/tsx), created by [Hiroki Osame](https://github.com/privatenumber)

## License

Made by 💛 [MIT](./LICENSE) License © 2024-PRESENT [Hairyf](https://github.com/hairyf)
