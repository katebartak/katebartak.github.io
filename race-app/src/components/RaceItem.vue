<template>
  <div
    ref="rootEl"
    class="race-item"
    :class="itemClass"
    role="region"
    :aria-label="`Race ${race.id} - ${race.distance}m`"
  >
    <div class="race-header">
      <div class="race-title">
        <span class="race-number">{{ race.id }}</span>
        <span class="race-distance">{{ race.distance }}m</span>
        <v-chip v-if="race.completed" size="x-small" color="blue" class="ml-2" variant="flat">
          Completed
        </v-chip>
        <v-chip v-else-if="isCurrent" size="x-small" class="ml-2" color="blue" variant="flat">
          Current
        </v-chip>
      </div>
    </div>
    <ParticipantsList :participants="race.participants" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ParticipantsList from '@/components/ParticipantsList.vue';

interface Horse {
  id: string | number;
  name: string;
  condition: number;
  color: string;
}

interface Race {
  id: string | number;
  distance: number;
  completed: boolean;
  participants: Horse[];
}

const props = defineProps<{ race: Race; isCurrent: boolean }>();
const rootEl = ref<HTMLElement | null>(null);

defineExpose({ el: rootEl });

const itemClass = computed(() => ({
  'race-completed': props.race.completed,
  'race-current': props.isCurrent,
  'race-upcoming': !props.race.completed && !props.isCurrent,
}));
</script>

<style scoped>
.race-item {
  border-bottom: 1px solid #e0e0e0;
  transition: all 0.2s ease;
}
.race-item:last-child {
  border-bottom: none;
}
.race-completed .race-header {
  background-color: rgb(var(--v-theme-success));
}
.race-item.race-upcoming {
  background-color: rgb(var(--v-theme-background));
  border-left: 4px solid rgb(var(--v-theme-outline));
}
.race-header {
  padding: 8px 12px;
  border-bottom: 1px solid #e0e0e0;
  background-color: rgb(var(--v-theme-secondary));
}
.race-title {
  display: flex;
  align-items: center;
  font-weight: bold;
}
.race-number {
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-right: 8px;
  flex-shrink: 0;
}
.race-distance {
  font-size: 14px;
}
/* Responsive design */
@media (max-width: 600px) {
  .race-header {
    padding: 6px 8px;
  }
}
@media (max-width: 600px) {
  .race-header {
    padding: 6px 8px;
  }
}
</style>
