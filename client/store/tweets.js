export const state = () => ({
  flag: false,
  fromCategory: null,
  tweets: [
    {
      id: 0,
      tweet: [
        {
          id: '1084378745568354304',
          description: 'hoigehoge'
        },
        {
          id: '1072787982413754368',
          description: 'hoigehoge'
        },
        {
          id: '1083332271292235776',
          description: 'hoigehoge'
        },
        {
          id: '1084367818198474752',
          description: 'hoigehoge'
        },
        {
          id: '1084363838907019266',
          description: 'hoigehoge'
        },
        {
          id: '1079307918401368064',
          description: 'hoigehoge'
        }
      ]
    },
    {
      id: 1,
      tweet: [
        {
          id: '1084378745568354304',
          description: 'hoigehoge'
        },
        {
          id: '1072787982413754368',
          description: 'hoigehoge'
        },
        {
          id: '1083332271292235776',
          description: 'hoigehoge'
        },
        {
          id: '1084367818198474752',
          description: 'hoigehoge'
        },
        {
          id: '1084363838907019266',
          description: 'hoigehoge'
        },
        {
          id: '1079307918401368064',
          description: 'hoigehoge'
        }
      ]
    }
  ]
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
  async addCategory({ commit }, nextID) {
    const payload = {
      id: `${nextID}`,
      tweet: []
    }
    // TODO:データ保存処理
    commit('pushCategory', { payload })
  }
}
