import { initialState } from "./defaults"

export const status = {
  state: {
    ...initialState.status,
  },
  mutations: {
    updateStatus(state, status) {
      state.list = status
    },
  },
  actions: {
    resetStatus({ commit }) {
      commit("updateStatus", initialState.status)
    },
  },
}
