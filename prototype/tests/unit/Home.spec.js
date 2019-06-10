import { shallowMount, createLocalVue } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

describe('Home.vue', () => {
  const localVue = createLocalVue()

  it('Renders welcome message', () => {
    const wrapper = shallowMount(Home, {
      localVue,
    })

    expect(wrapper.find('h1').text()).toBe("Welcome to my response to the Deputy Frontend Challenge!");

    expect(wrapper.find('v-btn-stub.navigate-to-employee-list').text()).toMatch("Go to Employee List")
  })
})
