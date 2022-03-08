const warnLimits = {
  maxLen: 100,
  maxLines: 500,
  maxLinesPerFunction: 170,
  maxStatements: 40,
  maxParams: 6,
  maxDepth: 5,
};

module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['react-hooks', 'prettier', 'import'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    // project: './dentalapp-frontend/tsconfig.json',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  parser: '@babel/eslint-parser',
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            modules: ['node_modules'],
          },
        },
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.slice.ts'],
        paths: ['src'],
      },
    },
  },
  rules: {
    camelcase: ['warn'],
    'spaced-comment': [0],
    'react/no-deprecated': 'error',
    'react/no-danger': 'error',
    'no-unused-vars': 'error',
    'prettier/prettier': 'error',
    'react/destructuring-assignment': [0],
    'react/jsx-filename-extension': ['off'],
    'react/jsx-props-no-spreading': [0],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'error',
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': [0],
    'import/no-cycle': 'error',
    'import/order': 'warn',
    'no-console': 'warn',
    'no-underscore-dangle': 'warn',
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'jsx-a11y/interactive-supports-focus': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/media-has-caption': ['off'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/namespace': [
      'error',
      {
        allowComputed: true,
      },
    ],
    'import/extensions': 'off',
    'max-len': [
      'warn',
      {
        code: warnLimits.maxLen,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'max-lines': [
      'warn',
      {
        max: warnLimits.maxLines,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'max-lines-per-function': [
      'warn',
      {
        max: warnLimits.maxLinesPerFunction,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'max-statements': [
      'warn',
      {
        max: warnLimits.maxStatements,
      },
    ],
    'max-params': [
      'warn',
      {
        max: warnLimits.maxParams,
      },
    ],
    'max-depth': [
      'warn',
      {
        max: warnLimits.maxDepth,
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
      ],
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-inferrable-types': ['off'],
        'react/jsx-filename-extension': ['off'],
        'react/prop-types': ['off'],
        'react/require-default-props': ['off'],
        '@typescript-eslint/no-explicit-any': ['off'], // temporary off
        // note you must disable the base rule as it can report incorrect errors
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
      },
    },
  ],
};
