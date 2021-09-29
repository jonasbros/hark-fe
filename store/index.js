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
        await dispatch('firebaseAuth/NUXT_SERVER_INIT', res)
    },

}

export const getters = {

}
