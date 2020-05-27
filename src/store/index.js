import Vuex from 'vuex'
import Vue from 'vue'

import fetchData from '../services/api'
import { parkings, fuelChanges } from '../services/stubs'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    transportParkings: {
      data: null,
      isLoading: false
    },
    transportFuelChanges: {
      data: null,
      isLoading: false
    }
  },
  mutations: {
    // transoprtParkings mutations
    transoprtParkingsRequest(state) {
      state.transportParkings = {
        ...state.transportParkings,
        data: null,
        isLoading: true,
        
      }
    },
    transoprtParkingsSuccess(state, data) {
      state.transportParkings = {
        ...state.transportParkings,
        data: data,
        isLoading: false,
      }
    },
    transoprtParkingsFailure(state) {
      debugger
      state.transportParkings = {
        ...state.transportParkings,
        data: null,
        isLoading: false,
        
      }
    },

    // transportFuelChanges mutations
    transportFuelChangesRequest(state) {
      state.transportFuelChanges = {
        ...state.transportFuelChanges,
        data: null,
        isLoading: true
      }
    },
    transportFuelChangesSuccess(state, data) {
      state.transportFuelChanges = {
        ...state.transportFuelChanges,
        data: data,
        isLoading: false
      }
    },
    transportFuelChangesFailure(state) {
      state.transportFuelChanges = {
        ...state.transportFuelChanges,
        data: null,
        isLoading: false
      }
    },
  },
  getters: {
    transportParkingsData(state) {
      if (state.transportParkings.data && state.transportParkings.data.length) {
        return state.transportParkings.data
      }
      return []
    },
  },
  actions: {
    async fetchTransportParkings({ commit }) {
      commit('transoprtParkingsRequest')

      const response = await fetchData(parkings)();

      if (response.status === 200) {
        commit('transoprtParkingsSuccess', response.data)
      } else {
        commit('transoprtParkingsFailure')
      }
    },
    async fetchTransportFuelChange({ commit }) {
      commit('transportFuelChangesRequest')

      const response = await fetchData(fuelChanges)();

      if (response.status === 200) {
        commit('transportFuelChangesSuccess', response.data)
      } else {
        commit('transportFuelChangesFailure')
      }
    }
  }
})

export default store
