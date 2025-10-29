<template>
  <CardHolder title="Race Results">
    <div class="results-content" ref="resultsContent">
      <div
        v-if="raceResults.length === 0"
        class="no-results-message"
        role="status"
        aria-live="polite"
      >
        <v-icon large color="grey"> mdi-podium </v-icon>
        <p>Race results will appear here</p>
      </div>

      <div v-else class="results-list">
        <ResultItem
          v-for="result in raceResults"
          :key="result.raceId"
          :result="result"
          :ref="currentRace && currentRace.id === result.raceId + 1 ? 'currentRaceResult' : null"
        />
      </div>
    </div>
  </CardHolder>
</template>

<script setup lang="ts">
import { computed, watch, nextTick, ref } from 'vue';
import { useStore } from 'vuex';
import ResultItem from '@/components/ResultItem.vue';
import { scrollToChildInContainer } from '@/utils/helper';
import CardHolder from '@/components/CardHolder.vue';

const store = useStore();
const raceResults = computed(() => store.getters['races/raceResults']);
const currentRace = computed(() => store.getters['races/currentRace']);
const currentRaceResult = ref<any>(null);
const resultsContent = ref<HTMLElement | null>(null);

watch(currentRace, async () => {
  await nextTick();
  // ResultItem exposes { el: rootEl } via defineExpose
  let el = null;
  if (Array.isArray(currentRaceResult.value) && currentRaceResult.value.length > 0) {
    el = currentRaceResult.value[0]?.el;
  } else if (currentRaceResult.value && typeof currentRaceResult.value === 'object') {
    el = currentRaceResult.value.el;
  }
  const container = resultsContent.value;
  if (el && container) {
    scrollToChildInContainer(el, container);
  }
});

defineOptions({ name: 'RaceResults' });
</script>

<style scoped>
.results-content {
  flex: 1;
  padding: 0;
  overflow-y: auto;
  max-height: 500px;
}

.no-results-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #666;
  padding: 16px;
}

.no-results-message p {
  margin-top: 16px;
  font-size: 14px;
}

.results-list {
  display: flex;
  flex-direction: column;
}

@media (max-width: 600px) {
  .results-table-header,
  .result-row {
    padding: 4px 8px;
  }

  .result-header {
    padding: 6px 8px;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .name-cell {
    font-size: 11px;
  }

  .time-cell {
    font-size: 10px;
  }
}
</style>
