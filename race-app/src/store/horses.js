/**
 * Horse module for Vuex
 * @module store/horses
 */

import { getRandomUniqueColorList } from '@/utils/helper';

const state = () => ({
  horses: [],
});

const mutations = {
  SET_HORSES(state, horses) {
    state.horses = horses;
  },
};

const actions = {
  generateHorses({ commit }, count = 20) {
    // Get unique names
    const nameList = [
      'Thunder Bolt',
      'Lightning Strike',
      'Storm Chaser',
      'Wind Runner',
      'Fire Spirit',
      'Silver Arrow',
      'Golden Flash',
      'Star Dancer',
      'Moon Walker',
      'Sun Rider',
      'Night Shadow',
      'Dawn Breaker',
      'Wild Heart',
      'Free Spirit',
      'Brave Soul',
      'Swift Wind',
      'Magic Touch',
      'Royal Pride',
      'Diamond Dust',
      'Crystal Clear',
    ];

    // Shuffle names
    const shuffledNames = [...nameList].sort(() => 0.5 - Math.random());

    const horses = Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name:
        shuffledNames[i % shuffledNames.length] + (i >= shuffledNames.length ? ` ${i + 1}` : ''),
      color: getRandomUniqueColorList(count)[i],
      condition: Math.floor(Math.random() * 100) + 1,
    }));
    commit('SET_HORSES', horses);
  },
};

const getters = {
  allHorses: (state) => state.horses,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
