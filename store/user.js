export const state = () => ({
    currentProfileOwner: null,
})


export const mutations = {
    SET_CURRENT_PROFILE_OWNER(state, user) {
        state.currentProfileOwner = user
    }
}

export const actions = {
    FETCH_USER(__, url) {
        return this.$axios.get(`/api/user?url=${url}`)
    },

    async GET_CURRENT_PROFILE_OWNER({ dispatch, commit }, url) {
        let user = await dispatch('FETCH_USER', url)
        commit('SET_CURRENT_PROFILE_OWNER', user.data)
        
        return user.data
    }
}