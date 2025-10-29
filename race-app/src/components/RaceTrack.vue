<template>
  <CardHolder
    :title="currentRace ? `${currentRace.distance}m Race - Round ${currentRace.id}` : 'Race Track'"
  >
    <v-card-text class="race-track">
      <div
        v-if="currentRace"
        class="track-lanes"
        role="region"
        :aria-label="`Race track for ${currentRace?.distance || ''}m race`"
      >
        <div
          v-for="(horse, index) in currentRace?.participants || []"
          :key="`${currentRace.id}-${horse.id}`"
          class="lane"
          :style="{ '--lane-index': index }"
        >
          <div class="lane-number">
            {{ index + 1 }}
          </div>
          <div ref="trackSurface" class="track-surface">
            <div class="lane-markers" />
            <div
              :ref="`horse-${horse.id}`"
              class="horse-icon"
              :class="{ racing: isRacing }"
              :style="{
                '--animation-duration':
                  calculateAnimationDuration(currentRace?.distance, horse.condition, trackWidth) +
                  'ms',
                '--animation-delay': '0ms',
              }"
              :aria-label="`${horse.name} racing`"
            >
              <div class="horse-label text-body-2 text-center">
                {{ horse.name }}
              </div>
              <HorseIcon :color="horse.color" />
            </div>
          </div>
          <div class="finish-line">FINISH</div>
        </div>
      </div>

      <div v-else class="no-race-message" role="status" aria-live="polite">
        <v-icon large> mdi-horse </v-icon>
        <p>Generate race schedule to see the track</p>
        <v-btn color="primary" class="mt-4" @click="generateRaceSchedule"> Generate Program </v-btn>
      </div>
    </v-card-text>
  </CardHolder>
</template>

<script setup lang="ts">
import { computed, onMounted, onUpdated, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import CardHolder from '@/components/CardHolder.vue';
import { HorseIcon } from '@/components/icons';
import { calculateAnimationDuration } from '@/utils/race-timing';
import { useTrackWidth } from '@/composables/useTrackWidth';

const store = useStore();
const currentRace = computed(() => store.getters['races/currentRace']);
const isRacing = computed(() => store.getters['races/isRacing']);
const trackWidth = computed(() => store.getters['races/trackWidth']);
const { trackSurface, updateTrackWidth } = useTrackWidth();

function generateRaceSchedule() {
  store.dispatch('races/generateRaceSchedule');
}

function handleResize() {
  updateTrackWidth();
}

onMounted(() => {
  updateTrackWidth();
  window.addEventListener('resize', handleResize);
});

onUpdated(() => {
  updateTrackWidth();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

defineOptions({ name: 'RaceTrack' });
</script>

<style scoped>
.race-track {
  padding: 0;
  background: rgb(var(--v-theme-background));
  min-height: 400px;
}

.track-lanes {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 16px;
}

.lane {
  display: flex;
  align-items: center;
  height: 4rem;
  background: rgb(var(--v-theme-success));
  border-radius: 4px;
  border: 1px solid rgb(var(--v-theme-outline));
  position: relative;
  overflow: hidden;
}

.lane-number {
  width: 30px;
  min-width: 30px;
  text-align: center;
  font-weight: bold;
  color: rgb(var(--v-theme-on-primary));
  background: rgb(var(--v-theme-primary));
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.track-surface {
  flex: 1;
  position: relative;
  height: 100%;
  max-width: 100%;
  background: rgba(255, 255, 255, 0.5);
}

.lane-markers {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: repeating-linear-gradient(
    90deg,
    white 0px,
    white 5px,
    transparent 5px,
    transparent 15px
  );
  transform: translateY(-50%);
}

.horse-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  transition: transform 0.1s ease;
  z-index: 10;
}

.horse-icon svg {
  transform: translateX(-180);
}

.horse-icon.racing {
  animation: gallop var(--animation-duration) linear var(--animation-delay) forwards;
}

@keyframes gallop {
  0% {
    transform: translateY(-50%) translateX(0);
  }
  100% {
    /* Move to the end of the track-surface minus horse width */
    transform: translateY(-50%) translateX(calc(var(--track-width, 500px)));
  }
}

.finish-line {
  width: 60px;
  background: rgb(var(--v-theme-error));
  color: rgb(var(--v-theme-on-error));
  font-size: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.no-race-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #666;
}

.no-race-message p {
  margin-top: 16px;
  font-size: 16px;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .horse-icon.racing {
    animation-duration: 0.1s;
  }

  @keyframes gallop {
    0%,
    100% {
      transform: translateY(-50%) translateX(calc(100% + 500px));
    }
  }
}
</style>
