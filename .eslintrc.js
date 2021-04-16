module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  // extends: ['@nuxtjs', 'prettier/vue', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],
  extends: ['@nuxtjs', 'prettier', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],
  plugins: ['prettier'],
  rules: { 'no-console': 'off', 'vue/no-v-html': 'off' },
}
