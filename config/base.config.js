'use strict'

module.exports = {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  /* Encabezados de la página. */
  head: {
    title: 'Mi Rincon Scout',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Mi Rincon Scouts - OpenScouts',
      },
      { name: 'userreport:mediaId', value: '275ee6b7-f711-426b-811f-a4bff548a681' },
    ],
    script: [{ src: 'https://sak.userreport.com/openscouts/launcher.js', id: 'userreport-launcher-script' }],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://webfonts.openscouts.com.ar/css/open-scouts-iconos-fonts.css',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Roboto',
      },
    ],
  },
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,
  /* Personaliza el color de la barra de progreso. */
  loading: '~/components/loading.vue',
  loadingIndicator: {
    name: 'fading-circle',
    color: '#4285f4',
  },

  // loading: '~/components/loading.vue',
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/style.scss', '@/assets/css/main.css'],
  /* Plugins para cargar antes de montar la aplicación */
  plugins: [
    { src: '~/plugins/core/index', ssr: false },
    { src: '~/plugins/notificaciones', ssr: false },
    { src: '~/plugins/core/axios/axios', ssr: false },
    { src: '~/plugins/globales', ssr: false },
    { src: '~/plugins/componentes', ssr: false },
    { src: '~/plugins/acl', ssr: false },
    { src: '~/plugins/vueTable', ssr: false },
  ],

  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],
  echo: {
    broadcaster: 'pusher',
    key: '66d940f7630c3b7e5b8c',
    cluster: 'us2',
    encrypted: true,
    connectOnLogin: true,
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'bootstrap-vue/nuxt',
    ['@nuxtjs/pwa', { icon: true }], //, { icon: false }
    '@nuxtjs/dotenv',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: true, // Or `bvCSS: false`
  },
  manifest: {
    name: 'Mi Rincón Scout',
    short_name: 'Mi Rincón',
    description: 'Sistema de gestión Scout',
    lang: 'es',
    background_color: '#FFFFFF',
    display: 'standalone',
    orientation: 'portrait',
    theme_color: '#FFFFFF',
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'access_token',
          },
          logout: {
            url: '/auth/logout',
            method: 'post',
          },
          user: { url: '/user', method: 'get', propertyName: 'data' },
        },
      },
    },
  },
  messages: {
    loading: 'Loading...',
    error_404: 'Esta página no se pudo encontrar',
    server_error: 'Error del Servidor',
    nuxtjs: 'Nuxt.js',
    back_to_home: 'Volver a la página de inicio',
    server_error_details:
      'Ocurrió un error en la aplicación y su página no pudo ser servida. Si usted es el propietario de la aplicación, revise sus registros para más detalles.',
    client_error: 'Error',
    client_error_details:
      'Se produjo un error al crear la página. Verifique la consola de herramientas para desarrolladores para más detalles.',
  },
  router: {
    linkActiveClass: 'active',
    mode: 'history',
    middleware: ['auth'],
  },
  /*
   ** Build configuration
   */
  build: {},
  generate: {
    fallback: true,
  },
}
