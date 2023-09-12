import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path)

// Code snippet from c:\Users\edwin\Documents\Desarrollo web\Desarrollo Backend\curso de Node\clase-3\schemas\movies.js
