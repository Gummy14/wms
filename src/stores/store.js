import { createStore } from 'vuex'

const store = createStore({
  devtools: true,
  state () {
    return {
      isinPickingMode: false
    }
  },
  mutations: {
    updatePickingMode (state, value) {
      state.isinPickingMode = value
    }
  }
})

export default store

