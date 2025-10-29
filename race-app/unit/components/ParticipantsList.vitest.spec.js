import { mount } from '@vue/test-utils'
import ParticipantsList from '@/components/ParticipantsList.vue'
import { describe, it, expect } from 'vitest'

describe('ParticipantsList.vue', () => {
  const participants = [
    { id: 1, name: 'Thunder', color: '#FF5733', condition: 80 },
    { id: 2, name: 'Lightning', color: '#33FF57', condition: 90 },
  ]
  it('renders all participants', () => {
    const wrapper = mount(ParticipantsList, {
      props: { participants },
    })
    expect(wrapper.text()).toContain('Thunder')
    expect(wrapper.text()).toContain('Lightning')
  })
  it('renders correct number of rows', () => {
    const wrapper = mount(ParticipantsList, {
      props: { participants },
    })
    expect(wrapper.findAll('.participant-row').length).toBe(2)
  })
})
