<template>
  <v-container fluid>
    <v-row class="welcome-page">
      <v-col cols="12" md="8" lg="6">
        <v-card class="welcome-card" elevation="8">
          <v-card-title class="welcome-title">
            <v-icon size="48" color="primary"> mdi-horse-variant-fast </v-icon>
            <span>Welcome to Horse Racing!</span>
          </v-card-title>
          <v-card-text class="welcome-text">
            <p>
              Experience the thrill of virtual horse racing.<br />
              Generate your horses, schedule races, and watch them compete for glory!
            </p>
          </v-card-text>
          <v-card-actions class="welcome-actions">
            <v-btn color="primary" variant="elevated" size="large" large @click="goToMain">
              <v-icon left class="mr-2"> mdi-play-circle </v-icon>
              Start
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function goToMain() {
  router.push({ name: 'Home' });
}
</script>

<style scoped>
.welcome-page {
  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-primary)) 0%,
    rgb(var(--v-theme-secondary)) 100%
  );
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.welcome-card {
  border-radius: 24px;
  padding: 32px 24px;
  background: rgb(var(--v-theme-background));
  text-align: center;
}
.welcome-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  color: rgb(var(--v-theme-primary));
  margin-bottom: 16px;
}
.welcome-title v-icon {
  margin-bottom: 8px;
}
.welcome-text {
  font-size: 1.2rem;
  color: rgb(var(--v-theme-on-background));
  margin-bottom: 24px;
}
.welcome-actions {
  display: flex;
  justify-content: center;
}
</style>
