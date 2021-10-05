import * as Cookies from 'js-cookie';


export const state = () => ({
    authUser: null,
    authUserInfo: null,
    authToken: null,
})
  
export const mutations = {
    SET_USER(state, user) {
        state.authUser = { ...user }
    },
    SET_USER_INFO(state, userInfo) {
        state.authUserInfo = userInfo
    },
    SET_AUTH_HEADER_TOKEN(state, token) {
        state.authToken = token
    },
    RESET_AUTH_MUTATION(state) {
        state.authToken = null
        state.authUserInfo = null
        state.authUser = null
    }               
}

export const actions = {
    async ON_AUTH_STATE_CHANGED_ACTION({ commit, dispatch }, { authUser, claims }) {
        if (!authUser) {  
            console.log('logged out!')
            // when logging out or failed login
            commit('RESET_AUTH_MUTATION')
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
        return await this.$axios.post('/api/register', user)
    },

    async GET_USER_DB({ commit }, email) {
        return await this.$axios.get(`/api/user?email=${email}`)
    },

    async NUXT_SERVER_INIT({dispatch}, res) {
        if (res && res.locals && res.locals.user) {
            const { allClaims: claims, idToken: token, ...authUser } = res.locals.user

            await dispatch('ON_AUTH_STATE_CHANGED_ACTION', {
                authUser,
                claims,
                token
            })

        }
    },

    UPDATE_AUTH_HEADER_TOKEN({ commit }, authToken) {
        let token = 'Bearer ' + authToken
        this.$axios.setHeader('Authorization', token)
        commit('SET_AUTH_HEADER_TOKEN', token)
    }
}

export const getters = {
    GET_AUTH_USER_URL(state) {
        return state.authUserInfo.custom_url
    },

    GET_USER_INFO(state) {
        let userInfo = !!state.authUserInfo ? state.authUserInfo : null

        return userInfo
    },

    GET_IS_LOGGED_IN(state) {
        return !!state.authUserInfo
    }
}
