
import { fuelChanges as fuelChangesStub } from '../../services/stubs'
import fetchData from '../../services/api'

export default {
  state: {
    fuelChanges: []
  },
  getters: {
    fuelChanges(state) {
      return state.fuelChanges
    }
  },
  mutations: {
    fuelChangesRequest(state) {
      state.fuelChanges = []
      state.isLoading = true
    },
    fuelChangesSuccess(state, fuelChanges) {
      state.fuelChanges = fuelChanges
      state.isLoading = false
    },
    fuelChangesFailure(state) {
      state.fuelChanges = []
      state.isLoading = false
    },
  },
  actions: {
    async fetchfuelChanges({ commit }) {
      commit('fuelChangesRequest')

      const response = await fetchData(fuelChangesStub)();

        if (response.status === 200) {
          commit('fuelChangesSuccess', response.data)
        } else {
          commit('fuelChangesFailure')
        }
    },
  }
}