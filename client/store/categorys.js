export const state = () => ({
  flag: null,
  // テストデータ
  categorys: [
    {
      id: 0,
      title: 'メチャシコ',
      count: 100,
      description: 'えちえちのえち'
    },
    {
      id: 1,
      title: '有能',
      count: 25,
      description: ''
    },
    {
      id: 2,
      title: '後で見る',
      count: 1,
      description: ''
    },
    {
      id: 3,
      title: '参考メモ',
      count: 12,
      description: '技術系のもの'
    },
    {
      id: 4,
      title: '面白い',
      count: 6,
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
  pushCategory(state, { newCategory }) {
    state.categorys.push(newCategory)
  }
}

export const actions = {
  async addCategory({ commit }, { newCategory }) {
    // TODO:データ保存処理
    commit('pushCategory', { newCategory })
  }
}
