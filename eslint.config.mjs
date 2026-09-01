import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

/**
 * ESLint flat config.
 *
 * eslint-config-next 16 ships native flat configs, so they are spread in
 * directly. The FlatCompat/eslintrc shim that older Next templates use
 * crashes on these with a circular-structure error during validation.
 */
const config = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: [
      '_previews/**', // standalone design comparisons, not part of the build
      '.next/**',
      'node_modules/**',
    ],
  },
];

export default config;
