<template>
  <div class="participants-list">
    <div v-for="(horse, index) in participants" :key="horse.id" class="participant-row">
      <span class="position">{{ index + 1 }}</span>
      <span class="horse-name">{{ horse.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Horse {
  id: string | number;
  name: string;
  condition: number;
  color: string;
}

const props = defineProps<{ participants: Horse[] }>();
</script>

<style scoped>
.participants-list {
  display: flex;
  flex-direction: column;
}
.participant-row {
  display: flex;
  align-items: center;
  padding: 4px 12px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 12px;
  transition: background-color 0.2s ease;
}
.participant-row:hover {
  background-color: rgba(0, 0, 0, 0.04) !important;
}
.participant-row:last-child {
  border-bottom: none;
}
.position {
  width: 20px;
  flex-shrink: 0;
  font-weight: bold;
  color: rgb(var(--v-theme-on-background));
}
.horse-name {
  flex: 1;
  font-weight: 500;
}

/* Responsive design */
@media (max-width: 600px) {
  .participant-row {
    padding: 4px 8px;
  }
  .horse-name {
    font-size: 11px;
  }
}
</style>
