import { FlatCompat } from '@eslint/eslintrc'
import path from 'path'
import { fileURLToPath } from 'url'

// `eslint-config-next` still ships eslintrc-style configs ("plugin:@next/next/…"),
// which flat config cannot read directly. FlatCompat translates them. Importing
// the presets and spreading them instead throws "nextCoreWebVitals is not
// iterable", because they are plain objects in the old format.
const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
  {
    // Build-output.
    ignores: ['.next/**', 'out/**', 'design-system/**'],
  },
]

export default eslintConfig
