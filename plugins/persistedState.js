import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    key: 'authUserInfo',
    paths: ['firebaseAuth.authUserInfo']
  })(store)
}