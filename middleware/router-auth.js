export default function({ $fire, store, redirect, error, route, app }) {
    let email = $fire.auth.currentUser ? $fire.auth.currentUser.email : null

    app.router.beforeResolve((to, from, next) => {
      if ( !$fire.auth.currentUser && requireAuthentication(route) ){
        next({ name: 'login' })
      }else {
        next()
      }

      if( !store.state.firebaseAuth.authUserInfo && !ignoredRoutes(route) ) {

      }
    })
    


    // else if (!isAdmin(store.state.user) && requireAdmin(route))
    //   // redirect('/error_admin_only')
    //   // redirect('/error', { code: 'require_admin' })
    //   error({
    //     statusCode: 401,
    //     message: 'Only Admin is allowed to access this page'
    //   })    
  }
    
  function requireAuthentication(route) {
    // return !['/', '/about', '/login'].includes(route.path) // || !route.path.startswith('/error_')
    return ['/newsfeed'].includes(route.path)
  }

  function ignoredRoutes(route) {
    return ['/signin',  '/login'].includes(route.path)
  }
  
  function isAdmin(user) {
    return user && user.admin
  }
  
  function requireAdmin(route) {
    return ['/admin'].includes(route.path)
  }