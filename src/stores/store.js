import { createStore } from 'vuex'

const store = createStore({
  devtools: true,
  state () {
    return {
      activeOrder: null,
      activeShipment: null
    }
  },
  mutations: {
    updateActiveOrder (state, value) {
      state.activeOrder = value
    },
    updateActiveShipment (state, value) {
      state.activeShipment = value
    }
  }
})

export default store

