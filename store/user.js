export const actions = {
    FETCH_USER(__, url) {
        return this.$axios.get(`/api/user?url=${url}`)
        .then(response => {
            return response.data
        })
        .catch((e) => {
            return e.response.status;
        })
    }
}