import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { setupVuetify } from '../test-utils'
const vuetify = setupVuetify()
import HorseIcon from '@/components/icons/HorseIcon.vue'

describe('HorseIcon.vue', () => {
  it('renders with default color', () => {
    const wrapper = mount(HorseIcon, {
      global: { plugins: [vuetify] },
    })
    expect(wrapper.html()).toContain('stroke="grey"')
  })

  it('renders with custom color', () => {
    const wrapper = mount(HorseIcon, {
      props: { color: '#FF5733' },
      global: { plugins: [vuetify] },
    })
    expect(wrapper.html()).toContain('fill="#FF5733"')
  })
})
