
import { parkings as parkingsStub } from '../../services/stubs'
import fetchData from '../../services/api'

export default {
  state: {
    parkings: []
  },
  getters: {
    parkings(state) {
      return state.parkings
    }
  },
  mutations: {
    parkingsRequest(state) {
      state.parkings = []
      state.isLoading = true
    },
    parkingsSuccess(state, parkings) {
      state.parkings = parkings
      state.isLoading = false
    },
    parkingsFailure(state) {
      state.parkings = []
      state.isLoading = false
    },
  },
  actions: {
    async fetchParkings({ commit }) {
      commit('parkingsRequest')

      const response = await fetchData(parkingsStub)();

        if (response.status === 200) {
          commit('parkingsSuccess', response.data)
        } else {
          commit('parkingsFailure')
        }
    },
  }
}