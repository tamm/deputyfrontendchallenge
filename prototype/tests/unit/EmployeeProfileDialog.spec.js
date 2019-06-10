import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import { locations } from '@/store/module.locations.js'
import EmployeeProfileDialog from '@/components/EmployeeProfileDialog.vue'
import Vuetify from 'vuetify';

Vue.use(Vuetify);
// Hardcoded employee test data
const testEmployee = {"name":{"title":"ms","first":"aada","last":"harju"},"location":{"name":"Sydney","id":"sydney"},"email":"aada.harju@example.com","dob":{"date":"1986-03-23","age":33},"phone":"02-576-975","cell":"048-715-70-86","picture":{"large":"https://randomuser.me/api/portraits/women/53.jpg","medium":"https://randomuser.me/api/portraits/med/women/53.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/53.jpg"},"id":4439,"address":{"street":"2618 mechelininkatu","city":"savitaipale","state":"central finland","postcode":63576,"coordinates":{"latitude":"77.4165","longitude":"-125.3822"},"timezone":{"offset":"+3:00","description":"Baghdad, Riyadh, Moscow, St. Petersburg"}},"status":{"name":"Employed","id":"employed"},"extraFields":[]}

describe('EmployeeProfileDialog.vue', () => {
  const localVue = createLocalVue()
  let store
  let actions

  beforeEach(() => {
    localVue.use(Vuex)
    actions = {
      updateEmployee: jest.fn(),
    }

    store = new Vuex.Store({
      modules: {
        locations,
      },
      actions,
    })
  })

  it('Has Employee Details data when mounted with value', () => {
    const value = testEmployee
    const wrapper = shallowMount(EmployeeProfileDialog, {
      store,
      localVue,
      propsData: { value },
    })

    expect(wrapper.vm.localEmployee.id).toBe(testEmployee.id)
    expect(wrapper.vm.localEmployee.id).toBe(wrapper.vm.employee.id)
    expect(wrapper.vm.employee.id).toBe(testEmployee.id)

    expect(wrapper.vm.valid).toBe(true)
    expect(wrapper.vm.show).toBe(true)
    expect(wrapper.vm.saving).toBe(false)
    expect(wrapper.vm.datePickerMenu).toBe(false)
  })

  it('Does not show if no Employee in value when mounted', () => {
    const value = false
    const wrapper = shallowMount(EmployeeProfileDialog, {
      store,
      localVue,
      propsData: { value },
    })

    expect(wrapper.vm.show).toBe(false)
    expect(wrapper.find('.profile').exists()).toBe(false);
  })

  it('Renders Employee Details dialog when mounted', () => {
    const value = testEmployee
    const wrapper = shallowMount(EmployeeProfileDialog, {
      store,
      localVue,
      propsData: { value },
    })

    expect(wrapper.find('.profile').exists()).toBe(true);

    expect(wrapper.find('v-avatar-stub img').attributes().src).toMatch(value.picture.large)
    expect(wrapper.find('.employee-name').text()).toMatch(`${value.name.first} ${value.name.last}`)
    expect(wrapper.find('.employee-status').text()).toMatch(`${value.status.name}`)
    expect(wrapper.find('v-text-field-stub[name="email"]').attributes().value).toMatch(`${value.email}`)
    expect(wrapper.find('v-text-field-stub[name="cell"]').attributes().value).toMatch(`${value.cell}`)
    expect(wrapper.find('v-text-field-stub[name="phone"]').attributes().value).toMatch(`${value.phone}`)

    expect(wrapper.find('v-select-stub[name="location"]').attributes().value).toMatch(`${value.location}`)
    expect(wrapper.find('v-menu-stub.dob v-date-picker-stub').attributes().value).toMatch(`${value.dob.date}`)

    expect(wrapper.find('v-text-field-stub[name="street"]').attributes().value).toMatch(`${value.address.street}`)
    expect(wrapper.find('v-text-field-stub[name="city"]').attributes().value).toMatch(`${value.address.city}`)
    expect(wrapper.find('v-text-field-stub[name="state"]').attributes().value).toMatch(`${value.address.state}`)
    expect(wrapper.find('v-text-field-stub[name="postcode"]').attributes().value).toMatch(`${value.address.postcode}`)
  })

  it('Saves Employee Details when save button is clicked', () => {
    const value = testEmployee
    const wrapper = shallowMount(EmployeeProfileDialog, {
      store,
      localVue,
      propsData: { value },
    })

    wrapper.find('v-btn-stub.save-button').trigger('click')
    expect(actions.updateEmployee).toHaveBeenCalled()
  })

  it('Saves Employee Details when enter key is pressed', () => {
    const value = testEmployee

    // Make sure Vuetify doesn't complain about data-app attribute when doing full mount
    const el = document.createElement('div')
    el.setAttribute('data-app', true)
    document.body.appendChild(el)
    const wrapper = mount(EmployeeProfileDialog, {
      store,
      localVue,
      propsData: { value },
    })

    wrapper.find('input[name="email"]').trigger('keyup', {key: 'Enter'})
    expect(actions.updateEmployee).toHaveBeenCalled()
  })
})
