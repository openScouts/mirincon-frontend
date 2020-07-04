'use strict'

module.exports = {
  mode: 'spa',
  /* Encabezados de la página. */
  head: {
    title: 'Mi Rincon Scout',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Sistema de Gestion Scout - OpenScouts',
      },
    ],
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
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // '@nuxtjs/laravel-echo',
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
    resetOnError: true, // Si está habilitado, el usuario redireccionará a la ruta protegida original en lugar de redirect.home.
    rewriteRedirects: true,
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/main',
      home: '/main',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: 'token',
          },
          logout: false,
          user: { url: '/user', method: 'get', propertyName: 'data' },
        },
        tokenRequired: true,
        token_type: 'Bearer',
        response_type: 'token',
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
    extendRoutes() {},
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend() {},
  },
}
