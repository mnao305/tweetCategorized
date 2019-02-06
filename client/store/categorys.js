import { db, FieldValue } from '~/plugins/firestore'
import auth from '~/plugins/auth'

export const state = () => ({
  flag: true,
  addTweetFlag: false,
  fromCategory: null,
  categorys: []
})

export const getters = {
  categorys: state => state.categorys
}

export const mutations = {
  toggleFlag(state, val) {
    state.flag = val
  },
  toggleAddTweetFlag(state, val) {
    state.addTweetFlag = val
  },
  changeFromCatagory(state, fromCategory) {
    state.fromCategory = fromCategory
  },
  pushCategory(state, { payload }) {
    state.categorys.push(payload)
  },
  setCategorys(state, payload) {
    state.categorys = payload
  },
  clearCategorys(state) {
    state.categorys = []
  },
  pushTweet(state, { newTweet }) {
    state.categorys[state.fromCategory].tweets.push(newTweet)
  }
}

export const actions = {
  setCategorys({ commit }) {
    auth
      .auth()
      .then(user => {
        return user.uid
      })
      .then(uid => {
        const payload = []
        db.collection('users')
          .doc(uid)
          .collection('categorys')
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              payload.push(doc.data())
            })
            return payload.sort((a, b) => a.id - b.id)
          })
          .then(payload => {
            commit('setCategorys', payload)
          })
          .catch(err => {
            console.log('Error getting documents', err)
          })
      })
  },
  async newCategory({ commit }, { payload }) {
    const ID = payload.id

    auth
      .auth()
      .then(user => {
        return user.uid
      })
      .then(uid => {
        db.collection('users')
          .doc(uid)
          .collection('categorys')
          .doc(ID)
          .set(payload)
      })

    updateTime()

    commit('pushCategory', { payload })
  },
  async addTweet({ commit, state }, { newTweet }) {
    const categoryID = state.fromCategory
    console.log(categoryID)
    console.log(newTweet)

    auth
      .auth()
      .then(user => {
        return user.uid
      })
      .then(uid => {
        db.collection('users')
          .doc(uid)
          .collection('categorys')
          .doc(categoryID)
          .update({
            tweets: FieldValue.arrayUnion(newTweet)
          })
      })

    updateTime()

    commit('pushTweet', { newTweet })
  }
}

const updateTime = () => {
  auth
    .auth()
    .then(user => {
      return user.uid
    })
    .then(uid => {
      db.collection('users')
        .doc(uid)
        .update({
          update_at: FieldValue.serverTimestamp()
        })
    })
}
