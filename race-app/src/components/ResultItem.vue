<template>
  <div
    ref="rootEl"
    class="result-item"
    role="region"
    :aria-label="`Results for Race ${result.raceId} - ${result.distance}m`"
  >
    <div class="result-header">
      <div class="result-title">
        <span class="result-number">{{ result.raceId }}</span>
        <span class="result-distance">{{ result.distance }}m</span>
        <v-chip size="x-small" color="success" class="ml-2"> Complete </v-chip>
      </div>
      <div class="completion-time">
        {{ formatCompletionTime(new Date(result.completedAt)) }}
      </div>
    </div>
    <div class="results-table">
      <div class="results-table-header">
        <span class="position-col">Position</span>
        <span class="name-col">Name</span>
        <span class="time-col">Time</span>
      </div>
      <div
        v-for="resultEntry in result.results"
        :key="`${result.raceId}-${resultEntry.horse.id}`"
        class="result-row"
        :class="getPositionClass(resultEntry.position)"
      >
        <span class="position-cell">
          <v-icon
            v-if="resultEntry.position <= 3"
            :color="getPositionIconColor(resultEntry.position)"
            small
          >
            {{ getPositionIcon(resultEntry.position) }}
          </v-icon>
          <span v-else class="position-number">{{ resultEntry.position }}</span>
        </span>
        <span class="name-cell">{{ resultEntry.horse.name }}</span>
        <span class="time-cell">{{ formatRaceTime(resultEntry.time) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getPositionIcon, getPositionIconColor, getPositionClass } from '../utils/position-utils';
import { formatCompletionTime, formatRaceTime } from '../utils/date-utils';

interface ResultEntry {
  position: number;
  time: number;
  horse: { id: string | number; name: string };
}

interface Result {
  raceId: number;
  distance: number;
  completedAt: string;
  results: ResultEntry[];
}

const props = defineProps<{ result: Result }>();
const rootEl = ref<HTMLElement | null>(null);

defineExpose({ el: rootEl });
</script>

<style scoped>
.result-item {
  border-bottom: 1px solid rgb(var(--v-theme-outline));
  background-color: rgb(var(--v-theme-background));
}
.result-item:last-child {
  border-bottom: none;
}
.result-header {
  padding: 8px 12px;
  border-bottom: 1px solid rgb(var(--v-theme-outline));
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(var(--v-theme-background));
}
.result-title {
  display: flex;
  align-items: center;
  font-weight: bold;
}
.result-number {
  background: rgb(var(--v-theme-success));
  color: rgb(var(--v-theme-on-success));
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-right: 8px;
}
.result-distance {
  font-size: 14px;
}
.completion-time {
  font-size: 12px;
  color: #666;
  font-family: monospace;
}
.results-table {
  background: white;
}
.results-table-header {
  display: flex;
  padding: 8px 12px;
  background-color: rgb(var(--v-theme-secondary));
  border-bottom: 1px solid rgb(var(--v-theme-outline));
  font-size: 11px;
  font-weight: bold;
  color: rgb(var(--v-theme-on-secondary));
  text-transform: uppercase;
}
.position-col {
  width: 80px;
  flex-shrink: 0;
}
.name-col {
  flex: 1;
}
.time-col {
  width: 80px;
  flex-shrink: 0;
  text-align: right;
}
.result-row {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 12px;
  transition: all 0.2s ease;
}
.result-row:hover {
  background-color: rgba(0, 0, 0, 0.04) !important;
}
.result-row:last-child {
  border-bottom: none;
}
.result-row.position-first {
  border-left: 4px solid rgb(var(--v-theme-warning));
}
.result-row.position-second {
  border-left: 4px solid rgb(var(--v-theme-grey));
}
.result-row.position-third {
  border-left: 4px solid rgb(var(--v-theme-orange));
}
.position-cell {
  width: 80px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.position-number {
  font-weight: bold;
  color: rgb(var(--v-theme-on-background));
  margin-left: 4px;
}
.name-cell {
  flex: 1;
  font-weight: 500;
}
.time-cell {
  width: 80px;
  flex-shrink: 0;
  text-align: right;
  font-family: monospace;
  font-weight: bold;
  color: rgb(var(--v-theme-on-background));
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
