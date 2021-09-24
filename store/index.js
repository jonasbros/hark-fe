export const state = () => ({
    isPageLoading: false
})
  
export const mutations = {
    TOGGLE_IS_PAGE_LOADING(state, payload) {
        state.isPageLoading = payload
    }
}

export const actions = {
    UPDATE_IS_PAGE_LOADING({state, commit}, payload) {
        if( payload != state.isPageLoading ) {
            commit('TOGGLE_IS_PAGE_LOADING', payload)
        }
    },

    async nuxtServerInit({ dispatch, commit }, { res }) {
        if (res && res.locals && res.locals.user) {
          const { allClaims: claims, idToken: token, ...authUser } = res.locals.user
      
          await dispatch('firebaseAuth/ON_AUTH_STATE_CHANGED_ACTION', {
            authUser,
            claims,
            token
          })

        }
    },

}

export const getters = {

}
