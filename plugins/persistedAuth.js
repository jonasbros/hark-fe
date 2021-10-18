import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie';
import cookie from 'cookie';

//persist user info
function authUserInfo(store) {
  createPersistedState({
    key: 'user',
    paths: ['firebaseAuth.authUserInfo'],
    storage: {
      getItem: (key) => {
          // See https://nuxtjs.org/guide/plugins/#using-process-flags
          if (process.server) {
              const parsedCookies = cookie.parse(req.headers.cookie)
              return parsedCookies[key]
          } else {
            return Cookies.get(key)
          }
      },
      // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
      setItem: (key, value) => {
        Cookies.set(key, value, { expires: 365, secure: false })
      },
      removeItem: key => Cookies.remove(key)
    }
  })(store)
}

//persist auth token, look for more secure methods 
function authToken(store, $axios) {    
  createPersistedState({
    key: 'token',
    paths: ['firebaseAuth.authToken'],
    storage: {
      getItem: (key) => {
        if( !Cookies.get(key) ) return

        let token = JSON.parse(Cookies.get(key))
        store.dispatch('firebaseAuth/UPDATE_AUTH_HEADER_TOKEN', token.firebaseAuth.authToken)
        return Cookies.get(key)
      },
      // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
      setItem: (key, value) => {
        Cookies.set(key, value, { expires: 365, secure: false })
      },
      removeItem: key => Cookies.remove(key)
    }
  })(store)
}

export default ({store, $axios}) => {

  authUserInfo(store)
  authToken(store, $axios)
}