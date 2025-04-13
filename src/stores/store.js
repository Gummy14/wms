import { createStore } from 'vuex'

const store = createStore({
  devtools: true,
  state () {
    return {
      activeOrder: null
    }
  },
  mutations: {
    updateActiveOrder (state, value) {
      state.activeOrder = value
    }
  }
})

export default store

