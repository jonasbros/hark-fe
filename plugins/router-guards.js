export default ({ app, store }) => {
    app.router.beforeEach((to, from, next) => {
        store.dispatch('UPDATE_IS_PAGE_LOADING', true);
        next()
    });
  
  }