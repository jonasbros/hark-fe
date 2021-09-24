export const state = () => ({
    authUser: null,
    authUserInfo: null,
})
  
export const mutations = {
    SET_USER(state, payload) {
        state.authUser = { ...payload }
    }
}

export const actions = {
    async ON_AUTH_STATE_CHANGED_ACTION({ commit, dispatch }, { authUser, claims }) {
        if (!authUser) {       
            return
        }
        console.log(this.$fire)
        const { uid, email, emailVerified, displayName, photoURL } = authUser

        commit('SET_USER', {
            uid,
            email,
            emailVerified,
            displayName,
            photoURL, // results in photoURL being undefined for server auth
            // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
            isAdmin: claims.custom_claim
        })
    },

    async SAVE_USER_FIRESTORE(context, user) {
        return this.$axios.post('/api/register', user)
    },

    async nuxtServerInit({ dispatch, commit }, { res }) {
        if (res && res.locals && res.locals.user) {
          const { allClaims: claims, idToken: token, ...authUser } = res.locals.user
      
          await dispatch('ON_AUTH_STATE_CHANGED_ACTION', {
            authUser,
            claims,
            token
          })

        }
    }
}
export const getters = {

}
