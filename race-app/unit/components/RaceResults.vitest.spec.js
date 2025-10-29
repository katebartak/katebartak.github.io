import { mount } from '@vue/test-utils'
import RaceResults from '@/components/RaceResults.vue'
import ResultItem from '@/components/ResultItem.vue'
import { describe, it, expect } from 'vitest'
import { createStore } from 'vuex'
import { setupVuetify } from '../test-utils'
const vuetify = setupVuetify()

describe('RaceResults.vue', () => {
  const raceResults = [
    {
      raceId: 1,
      distance: 1200,
      completedAt: new Date().toISOString(),
      results: [
        { position: 1, time: 123.45, horse: { id: 1, name: 'Thunder' } },
        { position: 2, time: 130.12, horse: { id: 2, name: 'Lightning' } },
      ],
    },
  ]
  const store = createStore({
    getters: {
      'races/raceResults': () => raceResults,
      'races/currentRace': () => ({ id: 2 }),
    },
  })
  it('renders results list and ResultItem', () => {
    const wrapper = mount(RaceResults, {
      global: { plugins: [store, vuetify], components: { ResultItem } },
    })
    expect(wrapper.findComponent(ResultItem).exists()).toBe(true)
    expect(wrapper.text()).toContain('1200m')
    expect(wrapper.text()).toContain('Thunder')
  })
  it('shows empty state when no results', () => {
    const storeEmpty = createStore({
      getters: {
        'races/raceResults': () => [],
        'races/currentRace': () => null,
      },
    })
    const wrapper = mount(RaceResults, {
      global: { plugins: [storeEmpty, vuetify] },
    })
    expect(wrapper.text()).toContain('Race results will appear here')
  })
})
