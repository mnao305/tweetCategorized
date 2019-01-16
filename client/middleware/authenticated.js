import firebase from '~/plugins/firebase'

export default function({ store, route, redirect }) {
  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      // サインインしていない状態
      if (/^dashboard.*$/.test(route.name)) {
        redirect('/')
      }
      store.commit('users/logout')
    } else {
      // サインイン済み
      const payload = firebase.auth().currentUser.providerData[0]
      store.dispatch('users/setUser', payload)
    }
  })
}
