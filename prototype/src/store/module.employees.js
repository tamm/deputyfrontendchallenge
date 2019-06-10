import { initialState } from "./defaults"
import { apiRequest } from "@/utils/api"
import { unionBy, sample } from "lodash"

export const employees = {
  state: {
    ...initialState.employees,
  },
  mutations: {
    updateEmployees(state, employees) {
      if (employees) {
        state.page = employees.info.page
        state.list = unionBy(state.list, employees.results, 'id')
      } else {
        state.page = false
        state.list = initialState.employees.list
      }
    },
    updateEmployee(state, updatedEmployee) {
      let employee = state.list.find(employee => employee.id === updatedEmployee.id)

      employee = {
        ...employee,
        ...updatedEmployee,
      }

      state.list = unionBy([employee], state.list, 'id')
    },
  },
  actions: {
    resetEmployees({ commit, dispatch }) {
      commit("updateEmployees", false)
      return dispatch("getEmployees")
    },
    getEmployees({ state, rootState, commit }, hugeAmount) {
      // Get a set of employees from the randomuser.me API
      return apiRequest({
        data: {
          seed: 'demo',
          results: hugeAmount ? 1000 : 50,
          page: state.page ? state.page + 1 : 1,
          inc: 'name,location,email,dob,phone,cell,picture',
        },
      }).then(data => {
        if (data.results) {
          // normalize data from API
          data.results = data.results.map((employee, index) => {
            employee.id = (data.info.page * data.info.results) + index
            employee.address = employee.location
            employee.location = sample(rootState.locations.list)
            employee.status = sample(rootState.status.list)
            employee.dob.date = employee.dob.date.substr(0, 10)
            employee.extraFields = []

            return employee
          })
          commit("updateEmployees", data)
        }

        return data
      })
    },
    updateEmployee({ commit }, employee) {
      /*
       * This function would normally connect to a backend,
       * but for this demo we just commit the new information to the Vuex store.
       */

      commit("updateEmployee", employee)
    },
  },
}
