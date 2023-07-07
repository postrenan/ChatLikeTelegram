import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',

  state: () => ({
    name: ""
  }),
  getters: {
    doubleCount: (state) => state.name
  },
  actions: {
    increment(nickname) {
      this.name = nickname;
    }
  }
})
