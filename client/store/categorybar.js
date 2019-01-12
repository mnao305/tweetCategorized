export const state = () => ({
  flag: null
})

export const mutations = {
  toggleFlag(state, val) {
    state.flag = val
  }
}
