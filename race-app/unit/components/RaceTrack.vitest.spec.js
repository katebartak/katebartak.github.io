import { mount } from "@vue/test-utils";
import RaceTrack from "@/components/RaceTrack.vue";
import { describe, it, expect } from "vitest";
import { setupVuetify } from "../test-utils";
const vuetify = setupVuetify();
import { createStore } from "vuex";
import { createMockRacesModule } from "../mocks/vuex-mocks";

describe("RaceTrack.vue", () => {
  it("applies .racing class when isRacing is true", () => {
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
                  name: "Test Horse",
                  position: 1,
                  color: "brown",
                  condition: "good",
                },
              ],
            }),
            isRacing: () => true,
          },
        }),
      },
    });
    const wrapper = mount(RaceTrack, {
      global: { plugins: [store, vuetify] },
    });
    const horseIcon = wrapper.find(".horse-icon");
    expect(horseIcon.exists()).toBe(true);
    expect(horseIcon.classes()).toContain("racing");
  });
  it("renders track and horses", () => {
    // Mock races module with currentRace and isRacing getter
    const store = createStore({
      modules: {
        races: createMockRacesModule(),
      },
    });
    const wrapper = mount(RaceTrack, {
      global: { plugins: [store, vuetify] },
    });
    // Find horse name using .horse-label selector
    const horseLabel = wrapper.find(".horse-label");
    expect(horseLabel.exists()).toBe(true);
    expect(horseLabel.text()).toContain("Test Horse");
    expect(wrapper.text()).toContain("1200m Race - Round 1");
    expect(wrapper.find(".track-lanes").exists()).toBe(true);
  });
});
