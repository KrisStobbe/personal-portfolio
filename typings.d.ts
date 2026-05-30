/**
 * Ambient module declaration for `.svg` imports.
 *
 * Lets TypeScript treat `import logo from './x.svg'` as a value rather than
 * raising a "cannot find module" error.
 */
declare module '*.svg' {
  const content: any
  export default content
}
