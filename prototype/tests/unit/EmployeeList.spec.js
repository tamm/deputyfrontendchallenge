import { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import { locations } from '@/store/module.locations.js'
import { employees } from '@/store/module.employees.js'
import EmployeeList from '@/views/EmployeeList.vue'
import Vuetify from 'vuetify';

Vue.use(Vuetify);
// Hardcoded employee test data
const testEmployee = {"name":{"title":"ms","first":"aada","last":"harju"},"location":{"name":"Sydney","id":"sydney"},"email":"aada.harju@example.com","dob":{"date":"1986-03-23","age":33},"phone":"02-576-975","cell":"048-715-70-86","picture":{"large":"https://randomuser.me/api/portraits/women/53.jpg","medium":"https://randomuser.me/api/portraits/med/women/53.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/53.jpg"},"id":4439,"address":{"street":"2618 mechelininkatu","city":"savitaipale","state":"central finland","postcode":63576,"coordinates":{"latitude":"77.4165","longitude":"-125.3822"},"timezone":{"offset":"+3:00","description":"Baghdad, Riyadh, Moscow, St. Petersburg"}},"status":{"name":"Employed","id":"employed"},"extraFields":[]}

describe('EmployeeList.vue', () => {
  const localVue = createLocalVue()
  let store
  let actions

  beforeEach(() => {
    // Make sure Vuetify doesn't complain about data-app attribute when doing full mount
    const el = document.createElement('div')
    el.setAttribute('data-app', true)
    document.body.appendChild(el)

    localVue.use(Vuex)
    actions = {
      getEmployees: jest.fn(),
      resetEmployees: jest.fn(),
      updateEmployee: jest.fn(),
    }

    store = new Vuex.Store({
      modules: {
        locations,
        employees: {
          ...employees,
          actions,
        },
      },
    })
  })

  it("Shows empty list of employees when mounted, and tries to fetch employees", (done) => {
    const wrapper = mount(EmployeeList, {
      store,
      localVue,
    })

    expect(wrapper.vm.employees.length).toBe(0)

    expect(wrapper.find('.v-datatable tbody').text()).toBe("No data to show")

    wrapper.vm.$nextTick(() => {
      expect(actions.getEmployees).toHaveBeenCalled()
      done()
    })
  })

  it("Shows list of employees when mounted with populated store, and doesn't try to fetch employees", (done) => {
    employees.state.list = [testEmployee]
    const wrapper = mount(EmployeeList, {
      store,
      localVue,
    })

    expect(wrapper.vm.employees.length).toBe(1)
    expect(wrapper.findAll('.v-datatable tbody tr').length).toBe(1)

    wrapper.vm.$nextTick(() => {
      expect(actions.getEmployees).not.toHaveBeenCalled()
      done()
    })
  })

  it("Tries to fetch more employees when load more button clicked", (done) => {
    employees.state.list = [testEmployee]
    const wrapper = mount(EmployeeList, {
      store,
      localVue,
    })

    wrapper.find('.v-btn.control-load-more').trigger('click')

    wrapper.vm.$nextTick(() => {
      expect(actions.getEmployees).toHaveBeenCalled()
      done()
    })
  })

  it("Tries to fetch a huge amount more employees when load a huge amount more button clicked", (done) => {
    employees.state.list = [testEmployee]
    const wrapper = mount(EmployeeList, {
      store,
      localVue,
    })

    wrapper.find('.v-btn.control-load-huge-amount').trigger('click')

    wrapper.vm.$nextTick(() => {
      expect(actions.getEmployees).toHaveBeenCalled()
      done()
    })
  })

  it("Tries to reset and fetch employees when reset button is clicked", (done) => {
    employees.state.list = [testEmployee]
    const wrapper = mount(EmployeeList, {
      store,
      localVue,
    })

    wrapper.find('.v-btn.control-reset').trigger('click')

    wrapper.vm.$nextTick(() => {
      expect(actions.resetEmployees).toHaveBeenCalled()
      done()
    })
  })
})
