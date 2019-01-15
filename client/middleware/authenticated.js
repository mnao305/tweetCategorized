export default function({ store, route, redirect }) {
  if (!store.getters.isAuthenticated && route.name === 'dashboard') {
    redirect('/')
  }
}
