import { db } from '~/plugins/firestore'
import auth from '~/plugins/auth'
import Vue from 'vue'

export const state = () => ({
  flag: true,
  addTweetFlag: false,
  fromCategory: null,
  categorys: [],
  tweetURL: null
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
    state.flag = true
    state.addTweetFlag = false
    state.fromCategory = null
  },
  pushTweet(state, { newTweet, index }) {
    Vue.set(state.categorys[index].tweets, newTweet.id, newTweet)
    state.categorys[index].lastID++
  },
  setTweetURL(state, tweetURL) {
    state.tweetURL = tweetURL
  },
  clearTweetURL(state) {
    state.tweetURL = null
  },
  categoryDelete(state, id) {
    state.categorys.some((v, i) => {
      if (v.id === id) state.categorys.splice(i, 1)
    })
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
              const data = doc.data()
              data.created_at = data.created_at.toDate()
              payload.push(data)
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
    const date = new Date()
    payload.created_at = date

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

    updateTime(date)

    commit('pushCategory', { payload })
  },
  async addTweet({ commit, state }, { newTweet, index }) {
    const categoryID = state.fromCategory
    const date = new Date()
    newTweet.created_at = date
    const edit = {}
    edit[`tweets.${newTweet.id}`] = newTweet

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
          .update(edit)
        db.collection('users')
          .doc(uid)
          .collection('categorys')
          .doc(categoryID)
          .update({ lastID: state.categorys[index].lastID + 1 })

        updateTime(date)
        commit('pushTweet', { newTweet, index })
      })
      .catch(e => {})
  },
  categoryDelete({ commit }, id) {
    auth
      .auth()
      .then(user => {
        return user.uid
      })
      .then(uid => {
        db.collection('users')
          .doc(uid)
          .collection('categorys')
          .doc(id)
          .delete()
          .then(() => {})
          .catch(e => {
            console.log(e)
          })
      })
    commit('categoryDelete', id)
  }
}

const updateTime = date => {
  auth
    .auth()
    .then(user => {
      return user.uid
    })
    .then(uid => {
      db.collection('users')
        .doc(uid)
        .update({
          update_at: date
        })
    })
}
