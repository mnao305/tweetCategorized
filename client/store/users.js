import firebase from '~/plugins/firebase'
const db = firebase.firestore()

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
    state.user = null
  }
}

export const actions = {
  setUser({ commit, dispatch }, payload) {
    const userID = payload.uid

    db.collection('users')
      .doc(userID)
      .get()
      .then(doc => {
        if (!doc.exists) {
          db.collection('users')
            .doc(userID)
            .set(
              {
                userID: userID,
                created_at: new Date()
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
          const data = doc.data().userID
          dispatch('categorys/setCategorys', data, { root: true })
        }
      })
      .catch(error => {
        console.log('Error getting document:', error)
      })

    commit('setUser', payload)
  },
  logout({ commit }) {
    commit('logout')
    commit('categorys/clearCategorys', null, { root: true })
    firebase.auth().signOut()
  }
}
