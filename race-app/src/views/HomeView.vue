<template>
  <main class="main-bg">
    <v-container fluid class="horse-racing-app" style="max-width: 1600px; margin: 0 auto">
      <!-- Header with controls -->
      <HeaderControls />

      <!-- Main content grid -->
      <v-row>
        <!-- Left column: Horse List -->
        <v-col cols="12" md="3">
          <HorseList />
        </v-col>

        <!-- Center column: Race Track -->
        <v-col cols="12" md="5">
          <RaceTrack />
        </v-col>

        <!-- Right column: Program and Results -->
        <v-col cols="12" md="2">
          <RaceProgram />
        </v-col>

        <v-col cols="12" md="2">
          <RaceResults />
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import HorseList from '@/components/HorseList.vue';
import RaceTrack from '@/components/RaceTrack.vue';
import RaceProgram from '@/components/RaceProgram.vue';
import RaceResults from '@/components/RaceResults.vue';
import HeaderControls from '@/components/HeaderControls.vue';

const store = useStore();
const allHorses = computed(() => store.getters['horses/allHorses']);

onMounted(async () => {
  if (allHorses.value.length === 0) {
    await store.dispatch('horses/generateHorses', 20);
  }
});
</script>

<style scoped>
.horse-racing-app {
  min-height: 100vh;
  padding: 24px;
  background: rgb(var(--v-theme-background));
}

.v-row {
  align-items: flex-start;
}

.control-panel {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  background: rgb(var(--v-theme-secondary));
}

.v-btn {
  font-weight: bold;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

/* Main background for the whole page */
.main-bg {
  background: #f5f5f7;
  min-height: 100vh;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .horse-racing-app {
    padding: 8px;
  }
  .control-panel .v-card-title {
    flex-direction: column;
    gap: 8px;
  }
  .control-panel .v-btn {
    width: 100%;
    margin: 0 !important;
  }
}

@media (max-width: 600px) {
  .horse-racing-app {
    padding: 2px;
  }
  .control-panel .v-card-title {
    padding: 12px;
  }
  .v-btn {
    font-size: 12px;
  }
}
</style>
