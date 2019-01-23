import { db, FieldValue } from '~/plugins/firestore'

export const state = () => ({
  flag: true,
  categorys: []
})

export const getters = {
  categorys: state => state.categorys
}

export const mutations = {
  toggleFlag(state, val) {
    state.flag = val
  },
  pushCategory(state, { payload }) {
    state.categorys.push(payload)
  },
  setCategorys(state, payload) {
    state.categorys = payload
  },
  clearCategorys(state) {
    state.categorys = []
  }
}

export const actions = {
  newCategory({ commit, rootState }, { payload }) {
    db.collection('users')
      .doc(rootState.users.user.uid)
      .update({ categorys: FieldValue.arrayUnion(payload) })

    commit('pushCategory', { payload })
  }
}
