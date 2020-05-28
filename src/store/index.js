import Vuex from 'vuex'
import Vue from 'vue'
import moment from 'moment'

import parkings from './modules/parkings'
import fuelChanges from './modules/fuelChanges'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  getters: {
    transportEvents: function ({ parkings, fuelChanges }) {

      let sortedParkings = parkings.parkings.sort((p1, p2) => p1.start_time < p2.start_time).map(p => ({ ...p, type: 'parking' }))
      let sortedFuelChanges = fuelChanges.fuelChanges.sort((fC1, fC2) => fC1.fuel_time_time < fC2.fuel_time_time).map(p => ({ ...p, type: 'fuelChange' }))


      let counter = 0;
      let payload = 0;

      const events = [];

      if (sortedParkings.length && sortedFuelChanges.length) {
        do {
          events[counter + payload] = sortedParkings[counter]
          sortedFuelChanges.forEach(fC => {
            if (fC.fuel_time >= sortedParkings[counter].start_time && fC.fuel_time <= sortedParkings[counter].stop_time) {
              events[counter + ++payload] = fC
            }
          })
          ++counter

        } while (sortedFuelChanges.length - payload + sortedParkings.length - counter > 0)
      }

      const dateFormat = 'HH:mm:ss'

      const formattedEvents = events.map(e => {
        if (e.type === 'parking') {
          return { ...e, title: 'Parking', start_time: moment.utc(e.start_time).local().format(dateFormat), stop_time: moment.utc(e.stop_time).local().format(dateFormat) }
        } else {
          return { ...e, title: 'Fuel change', fuel_time: moment.utc(e.fuel_time).local().format(dateFormat) }
        }
      })

      return formattedEvents;
    }
  },
  actions: {
  },
  modules: {
    parkings,
    fuelChanges
  }
})

export default store
