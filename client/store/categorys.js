import { db, FieldValue } from '~/plugins/firestore'

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
  async setCategorys({ commit }, id) {
    const payload = []
    await db
      .collection('users')
      .doc(id)
      .collection('categorys')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          payload.push(doc.data())
        })
      })
      .catch(err => {
        console.log('Error getting documents', err)
      })
    commit('setCategorys', payload)
  },
  newCategory({ commit, rootState }, { payload }) {
    const ID = payload.id
    db.collection('users')
      .doc(rootState.users.user.uid)
      .collection('categorys')
      .doc(ID)
      .set(payload)

    commit('pushCategory', { payload })
  },
  async addTweet({ commit, rootState, state }, { newTweet }) {
    await db
      .collection('users')
      .doc(rootState.users.user.uid)
      .collection('categorys')
      .doc(state.fromCategory)
      .update({
        tweets: FieldValue.arrayUnion(newTweet)
      })
    commit('pushTweet', { newTweet })
  }
}
