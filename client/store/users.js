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
    firebase.auth().signOut()
    state.user = null
  }
}

export const actions = {
  setUser({ commit }, payload) {
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
                created_at: new Date(),
                tweets: [],
                categorys: []
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
          const data = doc.data()
          commit('categorys/setCategorys', data.categorys, { root: true })
          commit('tweets/setTweets', data.tweets, { root: true })
        }
      })
      .catch(error => {
        console.log('Error getting document:', error)
      })

    commit('setUser', payload)
  }
}
