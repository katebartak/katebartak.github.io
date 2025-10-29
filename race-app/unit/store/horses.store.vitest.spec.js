import { createStore } from "vuex";
import horsesModule from "@/store/horses";
import { describe, it, expect } from "vitest";

describe("horses Vuex module", () => {
  it("returns all horses from getter", () => {
    const store = createStore({
      modules: { horses: horsesModule },
    });
    store.commit("horses/SET_HORSES", [{ id: 1, name: "Test Horse" }]);
    expect(store.getters["horses/allHorses"]).toEqual([
      { id: 1, name: "Test Horse" },
    ]);
  });
});
