import { mount } from '@vue/test-utils'
import RaceItem from '@/components/RaceItem.vue'
import ParticipantsList from '@/components/ParticipantsList.vue'
import { describe, it, expect } from 'vitest'
import { setupVuetify } from '../test-utils'
const vuetify = setupVuetify()

describe('RaceItem.vue', () => {
  const race = {
    id: 1,
    distance: 1200,
    completed: false,
    participants: [
      { id: 1, name: 'Thunder', color: '#FF5733', condition: 80 },
      { id: 2, name: 'Lightning', color: '#33FF57', condition: 90 },
    ],
  }
  it('renders race info and participants', () => {
    const wrapper = mount(RaceItem, {
      props: { race, isCurrent: false },
      global: { plugins: [vuetify], components: { ParticipantsList } },
    })
    expect(wrapper.text()).toContain('1200m')
    expect(wrapper.text()).toContain('Thunder')
    expect(wrapper.text()).toContain('Lightning')
  })
  it('applies current class when isCurrent is true', () => {
    const wrapper = mount(RaceItem, {
      props: { race, isCurrent: true },
      global: { plugins: [vuetify], components: { ParticipantsList } },
    })
    expect(wrapper.classes()).toContain('race-current')
  })
})
