<template>
  <v-row class="mb-4">
    <v-col>
      <v-card
        class="control-panel"
        color="primary"
      >
        <v-card-title class="text-primary d-flex flex-wrap ga-4">
          <v-btn
            color="white"
            variant="flat"
            :disabled="isRacing"
            class="mr-2"
            aria-label="Regenerate horse list"
            @click="regenerateHorseList"
          >
            <v-icon
              left
              color="primary"
            >
              mdi-refresh
            </v-icon>
            REGENERATE HORSE LIST
          </v-btn>
          <v-btn
            color="white"
            variant="flat"
            :disabled="isRacing"
            class="mr-2"
            :aria-label="
              isScheduleGenerated
                ? 'Regenerate race program'
                : 'Generate race program'
            "
            @click="generateProgram"
          >
            <v-icon
              left
              color="primary"
            >
              mdi-calendar-plus
            </v-icon>
            {{
              isScheduleGenerated ? "REGENERATE PROGRAM" : "GENERATE PROGRAM"
            }}
          </v-btn>
          <v-btn
            color="white"
            variant="flat"
            :disabled="!canStartRace"
            :aria-label="isRacing ? 'Race in progress' : 'Start next race'"
            @click="startNextRace"
          >
            <v-icon
              left
              color="primary"
            >
              {{ isRacing ? "mdi-dots-horizontal" : "mdi-play" }}
            </v-icon>
            {{ isRacing ? "RACING..." : "START" }}
          </v-btn>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HeaderControls",
  computed: {
    ...mapGetters("horses", ["allHorses"]),
    ...mapGetters("races", [
      "isScheduleGenerated",
      "isRacing",
      "nextRaceIndex",
    ]),
    canStartRace() {
      return (
        this.isScheduleGenerated && !this.isRacing && this.nextRaceIndex >= 0
      );
    },
  },
  methods: {
    ...mapActions("horses", ["generateHorses"]),
    ...mapActions("races", ["generateRaceSchedule", "startRace", "resetRaces"]),

    async generateProgram() {
      try {
        if (this.allHorses.length === 0) {
          await this.generateHorses(20);
        }
        this.resetRaces();
        await this.generateRaceSchedule();
      } catch (error) {
        console.log("Error generating Program:", error);
      }
    },

    async regenerateHorseList() {
      await this.generateHorses(20);
      this.resetRaces();
    },

    async startNextRace() {
      if (!this.canStartRace) return;
      try {
        const raceIndex = this.nextRaceIndex;
        await this.startRace(raceIndex);
      } catch (error) {
        console.log("Error starting race:", error);
      }
    },
  },
};
</script>

<style scoped>
.control-panel {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  background: rgb(var(--v-theme-secondary));
}
</style>
