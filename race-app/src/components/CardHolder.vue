<template>
  <v-card class="list-card" outlined>
    <v-card-title v-if="title" class="list-card-header">
      {{ title }}
    </v-card-title>

    <v-card-text class="list-card-content">
      <slot />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{ title?: string }>();

defineOptions({ name: 'CardHolder' });
</script>

<style scoped>
.list-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgb(var(--v-theme-background));
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #eee;
}

.list-card-header {
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
  flex-shrink: 0;
  border-radius: 12px 12px 0 0;
}

.list-card-content {
  flex: 1;
  padding: 0;
  overflow-y: auto;
  max-height: 800px;
}
</style>
