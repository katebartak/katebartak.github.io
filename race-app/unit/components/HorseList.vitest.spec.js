import { mount } from "@vue/test-utils";
import HorseList from "@/components/HorseList.vue";
import { createStore } from "vuex";
import { createMockHorsesModule, createMockRacesModule } from "../mocks/vuex-mocks";
import { describe, it, expect } from "vitest";
import { setupVuetify } from "../test-utils";
const vuetify = setupVuetify();

describe("HorseList.vue", () => {
  it("renders no horses message when empty", () => {
    const store = createStore({
      modules: {
        horses: createMockHorsesModule(),
        races: createMockRacesModule(),
      },
    });
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store, vuetify],
      },
    });
    expect(wrapper.text()).toContain("No horses generated yet");
  });

  it("renders horse rows with correct data", () => {
    const horses = [
      { id: 1, name: "Thunder Bolt", color: "#FF5733", condition: 50 },
      { id: 2, name: "Lightning Strike", color: "#33FF57", condition: 80 },
    ];
    const store = createStore({
      modules: {
        horses: createMockHorsesModule({ getters: { allHorses: () => horses } }),
        races: createMockRacesModule(),
      },
    });
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store, vuetify],
      },
    });
    const rows = wrapper.findAll(".horse-row");
    expect(rows.length).toBe(2);
    expect(rows[0].text()).toContain("Thunder Bolt");
    expect(rows[0].text()).toContain("50");
    expect(rows[1].text()).toContain("Lightning Strike");
    expect(rows[1].text()).toContain("80");
  });

  it("sets correct aria-labels for accessibility", () => {
    const horses = [
      { id: 1, name: "Thunder Bolt", color: "#FF5733", condition: 50 },
    ];
    const store = createStore({
      modules: {
        horses: createMockHorsesModule({ getters: { allHorses: () => horses } }),
        races: createMockRacesModule(),
      },
    });
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store, vuetify],
      },
    });
    const rows = wrapper.findAll(".horse-row");

    expect(rows.length).toBeGreaterThan(0);
    expect(rows[0].attributes("aria-label")).toBe(
      "Thunder Bolt, condition 50, color #FF5733",
    );
  });
});
