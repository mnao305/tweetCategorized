import { db, FieldValue } from '~/plugins/firestore'

export const state = () => ({
  flag: false,
  fromCategory: null,
  tweets: []
})

export const getters = {
  tweets: state => state.tweets
}

export const mutations = {
  toggleFlag(state, val) {
    state.flag = val
  },
  changeFromCatagory(state, fromCategory) {
    state.fromCategory = fromCategory
  },
  pushTweet(state, { newTweet }) {
    state.tweets[state.fromCategory].tweet.push(newTweet)
  },
  pushCategory(state, { payload }) {
    state.tweets.push(payload)
  },
  setTweets(state, payload) {
    state.tweets = payload
  },
  clearTweets(state) {
    state.tweets = []
  }
}

export const actions = {
  async addTweet({ commit }, { newTweet }) {
    // TODO:データ保存処理
    commit('pushTweet', { newTweet })
  },
  async addCategory({ commit, rootState }, nextID) {
    const payload = {
      id: `${nextID}`,
      tweet: []
    }
    db.collection('users')
      .doc(rootState.users.user.uid)
      .update({ tweets: FieldValue.arrayUnion(payload) })

    commit('pushCategory', { payload })
  }
}
