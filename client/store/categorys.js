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
  async newCategory({ commit }, { payload }) {
    // TODO:データ保存処理
    commit('pushCategory', { payload })
  }
}
