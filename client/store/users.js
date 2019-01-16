import firebase from '~/plugins/firebase'

export const state = () => ({
  user: null
})

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  }
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  logout(state) {
    firebase.auth().signOut()
    state.user = null
  }
}

export const actions = {
  setUser({ commit }, payload) {
    commit('setUser', payload)
  }
}
