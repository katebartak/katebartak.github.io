import { calculateAnimationDuration } from '@/utils/race-timing';

// Race calculation constants
const BASE_SPEED_DIVISOR = 300; // Lower = faster
const CONDITION_FACTOR_MAX = 0.3; // Max 30% speedup for best condition
const RANDOM_FACTOR_MAX = 0.2; // Up to 20% random variation
/**
 * Races module for Vuex
 * @module store/races
 */

const state = () => ({
  races: [],
  currentRaceIndex: -1,
  raceResults: [],
  isRacing: false,
  trackWidth: 500,
});

const mutations = {
  SET_RACE_SCHEDULE(state, races) {
    state.races = races;
    state.currentRaceIndex = 0;
    state.raceResults = [];
  },
  START_RACE(state, raceIndex) {
    state.currentRaceIndex = raceIndex;
    state.isRacing = true;
  },
  END_RACE(state, result) {
    state.isRacing = false;
    state.raceResults.push(result);
    state.currentRaceIndex++;
  },
  SET_TRACK_WIDTH(state, width) {
    state.trackWidth = width;
  },
  RESET_RACES(state) {
    state.races = [];
    state.currentRaceIndex = -1;
    state.raceResults = [];
    state.isRacing = false;
  },
  MARK_RACE_COMPLETED(state, raceIndex) {
    if (state.races[raceIndex]) {
      state.races[raceIndex].completed = true;
    }
  },
};

const actions = {
  generateRaceSchedule({ commit, rootGetters }) {
    const allHorses = rootGetters['horses/allHorses'];
    if (allHorses.length < 10) {
      throw new Error('Need at least 10 horses to generate race schedule');
    }

    const raceDistances = [1200, 1400, 1600, 1800, 2000, 2200];
    const races = raceDistances.map((distance, index) => {
      // Select 10 random horses for each race
      const shuffled = [...allHorses].sort(() => 0.5 - Math.random());
      const participants = shuffled.slice(0, 10);

      return {
        id: index + 1,
        distance,
        participants,
        completed: false,
      };
    });

    commit('SET_RACE_SCHEDULE', races);
  },

  async startRace({ commit, state }, raceIndex) {
    if (raceIndex >= state.races.length) return;

    const race = state.races[raceIndex];
    commit('START_RACE', raceIndex);

    // Waiting for the slowest horse to finish
    const slowestHorseCondition = Math.min(...race.participants.map((item) => item.condition));
    await new Promise((resolve) => {
      setTimeout(
        resolve,
        calculateAnimationDuration(race.distance, slowestHorseCondition, state.trackWidth) + 1000,
      );
    });
    // Calculate race results based on horse performance
    const results = race.participants
      .map((horse) => {
        const baseTime = race.distance / BASE_SPEED_DIVISOR;
        const conditionFactor = (horse.condition / 100) * CONDITION_FACTOR_MAX;
        const randomFactor = Math.random() * RANDOM_FACTOR_MAX;
        const finalTime = baseTime * (1 - conditionFactor + randomFactor);

        return {
          horse,
          time: finalTime,
          position: 0, // Will be set after sorting
        };
      })
      .sort((a, b) => a.time - b.time);

    // Set positions
    results.forEach((result, index) => {
      result.position = index + 1;
    });

    const raceResult = {
      raceId: race.id,
      distance: race.distance,
      results,
      completedAt: new Date(),
    };

    // Mark race as completed
    commit('MARK_RACE_COMPLETED', raceIndex);

    commit('END_RACE', raceResult);
    return raceResult;
  },

  setTrackWidth({ commit }, width) {
    commit('SET_TRACK_WIDTH', width);
  },

  resetRaces({ commit }) {
    if (Array.isArray(state.races) && state.races.length > 0) {
      const allCompleted = state.races.every((race) => race.completed);
      if (allCompleted) {
        commit('RESET_RACES');
      } else {
        console.warn('Cannot reset races: not all races are completed.');
      }
    } else {
      // If races is not an array or is empty, allow reset
      commit('RESET_RACES');
    }
  },
};

const getters = {
  allRaces: (state) => state.races,
  currentRace: (state) =>
    state.currentRaceIndex >= 0 ? state.races[state.currentRaceIndex] : null,
  raceResults: (state) => state.raceResults,
  isRacing: (state) => state.isRacing,
  isScheduleGenerated: (state) => state.races.length > 0,
  nextRaceIndex: (state) => {
    const nextIndex = state.raceResults.length;
    return nextIndex < state.races.length ? nextIndex : -1;
  },
  trackWidth: (state) => state.trackWidth,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
