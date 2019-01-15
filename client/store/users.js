export const state = () => ({
  user: null,
  token: null,
  secret: null
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
  setToken(state, { token, secret }) {
    state.token = token
    state.secret = secret
  },
  logout(state) {
    state.user = null
    state.token = null
    state.secret = null
  }
}

export const actions = {
  setUser({ commit }, payload) {
    commit('setUser', payload)
  },
  setToken({ commit }, { token, secret }) {
    commit('setToken', { token, secret })
  }
}
