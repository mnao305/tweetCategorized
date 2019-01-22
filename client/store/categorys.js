export const state = () => ({
  flag: null,
  // テストデータ
  categorys: [
    {
      id: 0,
      title: '後で見る',
      description: 'メモ'
    },
    {
      id: 1,
      title: '有能',
      description: ''
    }
  ]
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
