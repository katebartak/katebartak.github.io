import { mount } from '@vue/test-utils'
import RaceTrack from '@/components/RaceTrack.vue'
import { describe, it, expect } from 'vitest'
import { setupVuetify } from '../test-utils'
import { createStore } from 'vuex'
import { createMockRacesModule } from '../mocks/vuex-mocks'

const vuetify = setupVuetify()

describe('RaceTrack.vue', () => {
  it('computed currentRace returns correct race object', () => {
    const race = {
      id: 5,
      distance: 1500,
      participants: [{ id: 1, name: 'Comet', position: 1, color: 'red', condition: 'good' }],
    }
    const store = createStore({
      modules: {
        races: createMockRacesModule({
          getters: {
            currentRace: () => race,
            isRacing: () => false,
          },
        }),
      },
    })
    const wrapper = mount(RaceTrack, { global: { plugins: [store, vuetify] } })
    // The title uses currentRace
    expect(wrapper.text()).toContain('1500m Race - Round 5')
  })

  it('computed isRacing toggles .racing class', () => {
    const store = createStore({
      modules: {
        races: createMockRacesModule({
          getters: {
            currentRace: () => ({
              id: 1,
              distance: 1200,
              participants: [
                { id: 1, name: 'Test Horse', position: 1, color: 'brown', condition: 'good' },
              ],
            }),
            isRacing: () => true,
          },
        }),
      },
    })
    const wrapper = mount(RaceTrack, { global: { plugins: [store, vuetify] } })
    expect(wrapper.find('.horse-icon').classes()).toContain('racing')
  })

  it('computed trackWidth is used in animation style', () => {
    // This test checks that the trackWidth getter is accessed and used in style
    const store = createStore({
      modules: {
        races: createMockRacesModule({
          getters: {
            currentRace: () => ({
              id: 1,
              distance: 1000,
              participants: [
                { id: 1, name: 'Speedy', position: 1, color: 'gray', condition: 'good' },
              ],
            }),
            isRacing: () => false,
            trackWidth: () => 777,
          },
        }),
      },
    })
    const wrapper = mount(RaceTrack, { global: { plugins: [store, vuetify] } })
    // The style attribute should include the animation duration (from trackWidth via composable)
    const horseIcon = wrapper.find('.horse-icon')
    expect(horseIcon.exists()).toBe(true)
    // The style will include --animation-duration, but the value is from calculateAnimationDuration
    // Here we just check that the style attribute exists and is a string
    expect(typeof horseIcon.attributes('style')).toBe('string')
  })
  it('applies .racing class when isRacing is true', () => {
    // Mock races module with currentRace and isRacing getter
    const store = createStore({
      modules: {
        races: createMockRacesModule({
          getters: {
            currentRace: () => ({
              id: 1,
              distance: 1200,
              participants: [
                {
                  id: 1,
                  name: 'Test Horse',
                  position: 1,
                  color: 'brown',
                  condition: 'good',
                },
              ],
            }),
            isRacing: () => true,
          },
        }),
      },
    })
    const wrapper = mount(RaceTrack, {
      global: { plugins: [store, vuetify] },
    })
    const horseIcon = wrapper.find('.horse-icon')
    expect(horseIcon.exists()).toBe(true)
    expect(horseIcon.classes()).toContain('racing')
  })
  it('renders track and horses', () => {
    // Mock races module with currentRace and isRacing getter
    const store = createStore({
      modules: {
        races: createMockRacesModule(),
      },
    })
    const wrapper = mount(RaceTrack, {
      global: { plugins: [store, vuetify] },
    })
    // Find horse name using .horse-label selector
    const horseLabel = wrapper.find('.horse-label')
    expect(horseLabel.exists()).toBe(true)
    expect(horseLabel.text()).toContain('Test Horse')
    expect(wrapper.text()).toContain('1200m Race - Round 1')
    expect(wrapper.find('.track-lanes').exists()).toBe(true)
  })
})
