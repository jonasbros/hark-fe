import colors from 'vuetify/es5/util/colors'

export default {
  env: {
    loginGoogleEndpoint: '/api/loginWithGoogle',
    loginGoogleUserInfoEndpoint: '/api/me',
    postsPerPage: 5,
    commentsPerPage: 5,
    NODE_ENV: 'development'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - hark-fe',
    title: 'hark-fe',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/fontawesome.js', mode: 'client' },
    { src: '~/plugins/filters.js', mode: 'client' },
    { src: '~/plugins/persistedAuth.js', mode: 'client' },

  ],

  router: {
    middleware: 'router-auth'
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components:  {
    dirs: [
      '~/components',
      '~/components/post',
      '~/components/user',
      '~/components/auth',
      '~/components/inputs',
      '~/components/modals'

    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/firebase',
    '@nuxtjs/pwa',
  ],

  firebase: {
    config: {
      apiKey: 'AIzaSyAlbnaH-yyXyUD_NEx5mXdgvMwtb-7Zhe8',
      authDomain: 'www.nuxt-local.com',
      projectId: 'hark-f09f0',
      storageBucket: 'hark-f09f0.appspot.com',
      messagingSenderId: '242238966469',
      appId: '1:242238966469:web:bb745be43bfd567908beac',
      measurementId: 'G-0SE473XHC1'
    },
    services: {
      auth: {
        ssr: true,
        initialize: {
          onAuthStateChangedMutation: false,
          onAuthStateChangedAction: 'firebaseAuth/ON_AUTH_STATE_CHANGED_ACTION',
        },
      },
      firestore: true
    }
  },

  pwa: {
    // disable the modules you don't need
    meta: false,
    icon: false,
    // if you omit a module key form configuration sensible defaults will be applied
    // manifest: false,

    workbox: {
      importScripts: [
        // ...
        '/firebase-auth-sw.js'
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: process.env.NODE_ENV === 'development',
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  proxy: {
    // '/api/': 'http://api.example.com',
    // '/api2/': 'http://api.another-website.com'
    '/api/': 'http://www.lumen.local',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#00FF78',
          accent: '#000D1F',
          secondary: '#FFFFC2',
          dark_grey: '#1E1E1E',
          light_grey: '#454545',
          hark_black: '#0E0E0E',
          grey: '#BDBDBD',
          info: '#909399',
          warning: '#FFB445',
          error: '#FF5050',
          success: '#00FF78'
        }
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
