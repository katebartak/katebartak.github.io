// Shared Vuex module mocks for tests

export function createMockRacesModule(overrides = {}) {
  return {
    namespaced: true,
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
      isRacing: () => false,
      trackWidth: () => 500,
      ...(overrides.getters || {}),
    },
    actions: {
      setTrackWidth: () => {},
      ...(overrides.actions || {}),
    },
    ...(overrides.module || {}),
  }
}

export function createMockHorsesModule(overrides = {}) {
  return {
    namespaced: true,
    getters: {
      allHorses: () => [],
      ...(overrides.getters || {}),
    },
    ...(overrides.module || {}),
  }
}
