import { createStore } from "vuex";
import racesModule from "@/store/races";
import { describe, it, expect } from "vitest";

describe("races Vuex module", () => {
  it("initial state is correct", () => {
    const store = createStore({ modules: { races: racesModule } });
    expect(store.state.races.races).toEqual([]);
    expect(store.state.races.currentRaceIndex).toBe(-1);
    expect(store.state.races.raceResults).toEqual([]);
    expect(store.state.races.isRacing).toBe(false);
  });

  it("SET_RACE_SCHEDULE mutation sets races and resets results", () => {
    const store = createStore({ modules: { races: racesModule } });
    const races = [
      { id: 1, distance: 1200, participants: [], completed: false },
      { id: 2, distance: 1400, participants: [], completed: false },
    ];
    store.commit("races/SET_RACE_SCHEDULE", races);
    expect(store.state.races.races).toEqual(races);
    expect(store.state.races.currentRaceIndex).toBe(0);
    expect(store.state.races.raceResults).toEqual([]);
  });

  it("START_RACE mutation sets currentRaceIndex and isRacing", () => {
    const store = createStore({ modules: { races: racesModule } });
    store.commit("races/START_RACE", 1);
    expect(store.state.races.currentRaceIndex).toBe(1);
    expect(store.state.races.isRacing).toBe(true);
  });

  it("END_RACE mutation sets isRacing to false and adds result", () => {
    const store = createStore({ modules: { races: racesModule } });
    const result = { raceId: 1, results: [] };
    store.commit("races/END_RACE", result);
    expect(store.state.races.isRacing).toBe(false);
    expect(store.state.races.raceResults[0]).toEqual(result);
    expect(store.state.races.currentRaceIndex).toBe(0); // increments after END_RACE
  });

  it("RESET_RACES mutation resets all state", () => {
    const store = createStore({ modules: { races: racesModule } });
    store.state.races.races = [{ id: 1 }];
    store.state.races.currentRaceIndex = 1;
    store.state.races.raceResults = [{ raceId: 1 }];
    store.state.races.isRacing = true;
    store.commit("races/RESET_RACES");
    expect(store.state.races.races).toEqual([]);
    expect(store.state.races.currentRaceIndex).toBe(-1);
    expect(store.state.races.raceResults).toEqual([]);
    expect(store.state.races.isRacing).toBe(false);
  });

  it("getters return correct values", () => {
    const store = createStore({ modules: { races: racesModule } });
    const races = [
      { id: 1, distance: 1200, participants: [], completed: false },
      { id: 2, distance: 1400, participants: [], completed: false },
    ];
    store.commit("races/SET_RACE_SCHEDULE", races);
    expect(store.getters["races/allRaces"]).toEqual(races);
    expect(store.getters["races/currentRace"]).toEqual(races[0]);
    expect(store.getters["races/raceResults"]).toEqual([]);
    expect(store.getters["races/isRacing"]).toBe(false);
    expect(store.getters["races/isScheduleGenerated"]).toBe(true);
    expect(store.getters["races/nextRaceIndex"]).toBe(0);
  });
});
