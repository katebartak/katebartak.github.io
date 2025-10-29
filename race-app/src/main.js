import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

// Vuetify

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import colors from 'vuetify/util/colors';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.blue.darken2, // #1976D2
          secondary: colors.blue.lighten4, // #BBDEFB
          accent: colors.blue.accent2, // #448AFF
          info: colors.blue.lighten1, // #42A5F5
          success: colors.green.base, // #4CAF50
          warning: colors.amber.base, // #FFC107
          error: colors.red.base, // #F44336
          grey: colors.grey.base, // #9E9E9E
          orange: colors.orange.base, // #FF9800
        },
      },
    },
  },
});

const app = createApp(App);

app.use(store);
app.use(router);
app.use(vuetify);

app.mount('#app');
