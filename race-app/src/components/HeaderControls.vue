<template>
  <v-row class="mb-4">
    <v-col>
      <v-card class="control-panel" color="primary">
        <v-card-title class="text-primary d-flex flex-wrap ga-4">
          <v-btn
            color="white"
            variant="flat"
            :disabled="isRacing"
            class="mr-2"
            aria-label="Regenerate horse list"
            @click="regenerateHorseList"
          >
            <v-icon left color="primary"> mdi-refresh </v-icon>
            REGENERATE HORSE LIST
          </v-btn>
          <v-btn
            color="white"
            variant="flat"
            :disabled="isRacing"
            class="mr-2"
            :aria-label="isScheduleGenerated ? 'Regenerate race program' : 'Generate race program'"
            @click="generateProgram"
          >
            <v-icon left color="primary"> mdi-calendar-plus </v-icon>
            {{ isScheduleGenerated ? 'REGENERATE PROGRAM' : 'GENERATE PROGRAM' }}
          </v-btn>
          <v-btn
            color="white"
            variant="flat"
            :disabled="!canStartRace"
            :aria-label="isRacing ? 'Race in progress' : 'Start next race'"
            @click="startNextRace"
          >
            <v-icon left color="primary">
              {{ isRacing ? 'mdi-dots-horizontal' : 'mdi-play' }}
            </v-icon>
            {{ isRacing ? 'RACING...' : 'START' }}
          </v-btn>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const allHorses = computed(() => store.getters['horses/allHorses']);
const isScheduleGenerated = computed(() => store.getters['races/isScheduleGenerated']);
const isRacing = computed(() => store.getters['races/isRacing']);
const nextRaceIndex = computed(() => store.getters['races/nextRaceIndex']);
const canStartRace = computed(
  () => isScheduleGenerated.value && !isRacing.value && nextRaceIndex.value >= 0,
);

async function generateProgram() {
  try {
    if (allHorses.value.length === 0) {
      await store.dispatch('horses/generateHorses', 20);
    }
    await store.dispatch('races/resetRaces');
    await store.dispatch('races/generateRaceSchedule');
  } catch (error) {
    console.log('Error generating Program:', error);
  }
}

async function regenerateHorseList() {
  await store.dispatch('horses/generateHorses', 20);
  await store.dispatch('races/resetRaces');
}

async function startNextRace() {
  if (!canStartRace.value) return;
  try {
    const raceIndex = nextRaceIndex.value;
    await store.dispatch('races/startRace', raceIndex);
  } catch (error) {
    console.log('Error starting race:', error);
  }
}

defineOptions({ name: 'HeaderControls' });
</script>

<style scoped>
.control-panel {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  background: rgb(var(--v-theme-secondary));
}
</style>
