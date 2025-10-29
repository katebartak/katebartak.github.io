<template>
  <CardHolder title="Race Program">
    <div class="program-content" ref="programContent">
      <div v-if="!isScheduleGenerated" class="no-program-message" role="status" aria-live="polite">
        <v-icon large color="grey"> mdi-calendar-blank </v-icon>
        <p>Generate race schedule to see program</p>
        <v-btn color="primary" class="mt-4" @click="generateRaceSchedule"> Generate Program </v-btn>
      </div>

      <div v-else class="race-list">
        <RaceItem
          v-for="race in allRaces"
          :key="race.id"
          :race="race"
          :isCurrent="currentRace && currentRace.id === race.id"
          :ref="currentRace && currentRace.id === race.id ? 'currentRaceItem' : null"
        />
      </div>
    </div>
  </CardHolder>
</template>

<script setup lang="ts">
import { computed, watch, nextTick, ref } from 'vue';
import { useStore } from 'vuex';
import CardHolder from '@/components/CardHolder.vue';
import RaceItem from '@/components/RaceItem.vue';
import { scrollToChildInContainer } from '@/utils/helper';

const store = useStore();
const allRaces = computed(() => store.getters['races/allRaces']);
const currentRace = computed(() => store.getters['races/currentRace']);
const isScheduleGenerated = computed(() => store.getters['races/isScheduleGenerated']);
const currentRaceItem = ref<any>(null);
const programContent = ref<HTMLElement | null>(null);

watch(currentRace, async () => {
  await nextTick();
  // currentRaceItem may be null, array, or object depending on v-for and ref usage
  let el = null;
  if (Array.isArray(currentRaceItem.value) && currentRaceItem.value.length > 0) {
    el = currentRaceItem.value[0]?.el;
  } else if (currentRaceItem.value && typeof currentRaceItem.value === 'object') {
    el = currentRaceItem.value.el;
  }
  const container = programContent.value;
  if (el && container) {
    scrollToChildInContainer(el, container);
  }
});

function generateRaceSchedule() {
  store.dispatch('races/generateRaceSchedule');
}

defineOptions({ name: 'RaceProgram' });
</script>

<style scoped>
.race-program {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.program-header {
  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
  flex-shrink: 0;
}

.program-content {
  flex: 1;
  padding: 0;
  overflow-y: auto;
  max-height: 500px;
}

.no-program-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #666;
  padding: 16px;
}

.no-program-message p {
  margin-top: 16px;
  font-size: 14px;
}

.race-list {
  display: flex;
  flex-direction: column;
}
</style>
