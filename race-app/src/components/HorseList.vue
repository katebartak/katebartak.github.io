<template>
  <CardHolder title="Horse List (1-20)">
    <div v-if="horses.length === 0" class="no-horses-message" role="status" aria-live="polite">
      <v-icon large color="grey"> mdi-horse-variant </v-icon>
      <p>No horses generated yet</p>
    </div>

    <div v-else class="horses-table" role="list">
      <div class="horses-table-header">
        <span class="name-col">Name</span>
        <span class="condition-col">Condition</span>
        <span class="color-col">Color</span>
      </div>
      <div
        v-for="horse in horses"
        :key="horse.id"
        class="horse-row"
        :aria-label="`${horse.name}, condition ${horse.condition}, color ${horse.color}`"
        role="listitem"
      >
        <span class="name-cell">{{ horse.name }}</span>
        <span class="condition-cell">{{ horse.condition }}</span>
        <span class="color-cell">
          <HorseIcon :color="horse.color" />
        </span>
      </div>
    </div>
  </CardHolder>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import CardHolder from '@/components/CardHolder.vue';
import { HorseIcon } from '@/components/icons';

const store = useStore();
const horses = computed(() => store.getters['horses/allHorses']);

defineOptions({ name: 'HorseList' });
</script>

<style scoped>
.no-horses-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #666;
  padding: 16px;
}

.no-horses-message p {
  margin-top: 16px;
  font-size: 14px;
}

.horses-table {
  background: white;
}

.horses-table-header {
  display: flex;
  padding: 8px 12px;
  background: rgb(var(--v-theme-secondary));
  border-bottom: 1px solid rgb(var(--v-theme-outline));
  font-size: 12px;
  font-weight: bold;
  color: rgb(var(--v-theme-on-secondary));
  text-transform: uppercase;
}

.name-col {
  flex: 1;
}

.condition-col {
  width: 80px;
  flex-shrink: 0;
  text-align: center;
}

.color-col {
  width: 80px;
  flex-shrink: 0;
  text-align: center;
}

.horse-row {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;
  transition: background-color 0.2s ease;
  border-radius: 8px;
  margin-bottom: 2px;
}

.horse-row:hover {
  background-color: rgb(var(--v-theme-accent)) !important;
}

.horse-row:last-child {
  border-bottom: none;
}

.name-cell {
  flex: 1;
  font-weight: 500;
}

.condition-cell {
  width: 80px;
  flex-shrink: 0;
  text-align: center;
  font-weight: bold;
  color: rgb(var(--v-theme-on-background));
}

.color-cell {
  width: 80px;
  flex-shrink: 0;
  text-align: center;
  font-weight: 500;
  color: rgb(var(--v-theme-on-background));
}

/* Responsive design */
@media (max-width: 600px) {
  .horses-table-header,
  .horse-row {
    padding: 4px 8px;
  }
  .name-cell {
    font-size: 11px;
  }
  .condition-cell,
  .color-cell {
    font-size: 10px;
  }
}
</style>
