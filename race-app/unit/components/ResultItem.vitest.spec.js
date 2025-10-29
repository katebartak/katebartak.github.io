import { mount } from '@vue/test-utils'
import ResultItem from '@/components/ResultItem.vue'
import { describe, it, expect } from 'vitest'
import { setupVuetify } from '../test-utils'
const vuetify = setupVuetify()

describe('ResultItem.vue', () => {
  const result = {
    raceId: 1,
    distance: 1200,
    completedAt: new Date().toISOString(),
    results: [
      { position: 1, time: 123.45, horse: { id: 1, name: 'Thunder' } },
      { position: 2, time: 130.12, horse: { id: 2, name: 'Lightning' } },
    ],
  }
  it('renders race result info', () => {
    const wrapper = mount(ResultItem, {
      props: { result },
      global: { plugins: [vuetify] },
    })
    expect(wrapper.text()).toContain('1200m')
    expect(wrapper.text()).toContain('Thunder')
    expect(wrapper.text()).toContain('Lightning')
  })
  it('renders correct number of result rows', () => {
    const wrapper = mount(ResultItem, {
      props: { result },
      global: { plugins: [vuetify] },
    })
    expect(wrapper.findAll('.result-row').length).toBe(2)
  })
})
