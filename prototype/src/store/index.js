import Vue from "vue"
import Vuex from "vuex"
import VuexPersist from 'vuex-persist'
import { employees } from "./module.employees"
import { locations } from "./module.locations"
import { status } from "./module.status"

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: process.env.VUE_APP_NAME,
  storage: localStorage,
})

let store = false

// This slightly more complex pattern allows for possible async rehydration
// Example use case: IndexedDb with localForage
export async function createStore() {
  if (!store) {
    store = new Vuex.Store({
      modules: {
        employees,
        locations,
        status,
      },
      plugins: [vuexPersist.plugin],
    })
  }

  return store
}
