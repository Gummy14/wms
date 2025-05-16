import { createStore } from 'vuex'

const store = createStore({
  devtools: true,
  state () {
    return {
      activeOrder: null,
      activeShipment: null,
      user: null
    }
  },
  mutations: {
    updateActiveOrder (state, value) {
      state.activeOrder = value
    },
    updateActiveShipment (state, value) {
      state.activeShipment = value
    },
    updateUser (state, value) {
      state.user = value
    }
  }
})

export default store

