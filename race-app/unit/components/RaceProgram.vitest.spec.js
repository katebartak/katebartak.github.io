import { mount } from '@vue/test-utils'
import RaceProgram from '@/components/RaceProgram.vue'
import RaceItem from '@/components/RaceItem.vue'
import { describe, it, expect } from 'vitest'
import { createStore } from 'vuex'
import { setupVuetify } from '../test-utils'
const vuetify = setupVuetify()

describe('RaceProgram.vue', () => {
  const races = [
    {
      id: 1,
      distance: 1200,
      completed: false,
      participants: [
        { id: 1, name: 'Thunder', color: '#FF5733', condition: 80 },
        { id: 2, name: 'Lightning', color: '#33FF57', condition: 90 },
      ],
    },
  ]
  const store = createStore({
    getters: {
      'races/allRaces': () => races,
      'races/currentRace': () => races[0],
      'races/isScheduleGenerated': () => true,
    },
  })
  it('renders race list and RaceItem', () => {
    const wrapper = mount(RaceProgram, {
      global: { plugins: [store, vuetify], components: { RaceItem } },
    })
    expect(wrapper.findComponent(RaceItem).exists()).toBe(true)
    expect(wrapper.text()).toContain('1200m')
    expect(wrapper.text()).toContain('Thunder')
  })
  it('shows empty state when no schedule', () => {
    const storeEmpty = createStore({
      getters: {
        'races/allRaces': () => [],
        'races/currentRace': () => null,
        'races/isScheduleGenerated': () => false,
      },
    })
    const wrapper = mount(RaceProgram, {
      global: { plugins: [storeEmpty, vuetify] },
    })
    expect(wrapper.text()).toContain('Generate race schedule to see program')
  })
})
