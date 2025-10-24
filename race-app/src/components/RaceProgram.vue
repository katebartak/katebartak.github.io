<template>
  <CardHolder title="Race Program">
    <v-card-text class="program-content">
      <div
        v-if="!isScheduleGenerated"
        class="no-program-message"
        role="status"
        aria-live="polite"
      >
        <v-icon
          large
          color="grey"
        >
          mdi-calendar-blank
        </v-icon>
        <p>Generate race schedule to see program</p>
        <v-btn
          color="primary"
          class="mt-4"
          @click="generateRaceSchedule"
        >
          Generate Program
        </v-btn>
      </div>

      <div
        v-else
        class="race-list"
      >
        <div
          v-for="race in allRaces"
          :key="race.id"
          :ref="
            currentRace && currentRace.id === race.id ? 'currentRaceItem' : null
          "
          class="race-item"
          :class="{
            'race-completed': race.completed,
            'race-current': currentRace && currentRace.id === race.id,
            'race-upcoming':
              !race.completed && (!currentRace || race.id > currentRace.id),
          }"
          role="region"
          :aria-label="`Race ${race.id} - ${race.distance}m`"
        >
          <div class="race-header">
            <div class="race-title">
              <span class="race-number">{{ race.id }}</span>
              <span class="race-distance">{{ race.distance }}m</span>
              <v-chip
                v-if="race.completed"
                size="x-small"
                color="blue"
                class="ml-2"
                variant="flat"
              >
                Completed
              </v-chip>
              <v-chip
                v-else-if="currentRace && currentRace.id === race.id"
                size="x-small"
                class="ml-2"
                color="blue"
                variant="flat"
              >
                Current
              </v-chip>
            </div>
          </div>

          <div class="participants-list">
            <div
              v-for="(horse, index) in race.participants"
              :key="horse.id"
              class="participant-row"
            >
              <span class="position">{{ index + 1 }}</span>
              <span class="horse-name">{{ horse.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
  </CardHolder>
</template>

<script>
import { mapGetters } from "vuex";
import CardHolder from "@/components/CardHolder.vue";
import { scrollToChildInContainer } from "@/utils/helper";

export default {
  name: "RaceProgram",
  components: {
    CardHolder,
  },
  computed: {
    ...mapGetters("races", ["allRaces", "currentRace", "isScheduleGenerated"]),
  },
  watch: {
    currentRace() {
      this.$nextTick(() => {
        const el = this.$refs.currentRaceItem;
        const container = this.$el.querySelector('.program-content');
        if (el && el[0] && container) {
          scrollToChildInContainer(el[0], container);
        }
      });
    },
  },
  methods: {
    generateRaceSchedule() {
      this.$store.dispatch("races/generateRaceSchedule");
    },
  },
};
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

.participants-header {
  display: flex;
  padding: 4px 12px;
  background-color: rgb(var(--v-theme-secondary));
  border-bottom: 1px solid rgb(var(--v-theme-outline));
  font-size: 11px;
  font-weight: bold;
  color: rgb(var(--v-theme-on-secondary));
  text-transform: uppercase;
}

.position-label {
  flex-shrink: 0;
}

.name-label {
  flex: 1;
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
  .participants-header,
  .participant-row {
    padding: 4px 8px;
  }

  .race-header {
    padding: 6px 8px;
  }

  .horse-name {
    font-size: 11px;
  }
}
</style>
