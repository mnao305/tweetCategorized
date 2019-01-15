export default function({ store, route, redirect }) {
  if (!store.state.users.user && /^dashboard.*$/.test(route.name)) {
    redirect('/')
  }
}
