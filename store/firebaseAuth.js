export const state = () => ({
    authUser: null,
    authUserInfo: null,
})
  
export const mutations = {
    SET_USER(state, payload) {
        state.authUser = { ...payload }
    },
    SET_USER_INFO(state, payload) {
        state.authUserInfo = { ...payload }
    }
}

export const actions = {
    async ON_AUTH_STATE_CHANGED_ACTION({ commit, dispatch }, { authUser, claims }) {
        if (!authUser) {       
            return
        }
        const { uid, email, emailVerified, displayName, photoURL } = authUser

        commit('SET_USER', {
            uid,
            email,
            emailVerified,
            displayName,
            photoURL,
            isAdmin: claims.custom_claim
        })
    },

    async SAVE_USER_FIRESTORE(context, user) {
        return this.$axios.post('/api/register', user)
    },

    async GET_USER_DB({ dispatch }, email) {
        this.$axios.get(`/api/user?email=${email}`)
        .then((response) => {
            dispatch('UPDATE_USER_INFO', response.data.user)
        })
        .catch((e => {
            console.log(e)
        }))
    },

    UPDATE_USER_INFO({ commit }, user) {
        commit('SET_USER_INFO', user)
    }
}
export const getters = {

}
