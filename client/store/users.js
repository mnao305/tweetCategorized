import { db, FieldValue } from '~/plugins/firestore'
import auth from '~/plugins/auth'

export const state = () => ({
  user: null,
  token: null
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
    state.user = null
  },
  setToken(state, token) {
    state.token = token
  }
}

export const actions = {
  setUser({ commit, dispatch }, { user, uid, token }) {
    db.collection('users')
      .doc(uid)
      .get()
      .then(doc => {
        if (!doc.exists) {
          db.collection('users')
            .doc(uid)
            .set(
              {
                userID: user.uid,
                created_at: FieldValue.serverTimestamp(),
                update_at: FieldValue.serverTimestamp()
              },
              { merge: true }
            )
            .then(function() {
              console.log('set')
            })
            .catch(function(error) {
              console.error('Error adding document: ', error)
            })
        } else {
          dispatch('categorys/setCategorys', null, { root: true })
        }
      })
      .catch(error => {
        console.log('Error getting document:', error)
      })

    commit('setToken', token)
    commit('setUser', user)
  },
  logout({ commit }) {
    commit('logout')
    commit('categorys/clearCategorys', null, { root: true })
    auth.logout()
  }
}
