import { createStore } from 'vuex';

import horses from './horses';
import races from './races';

export default createStore({
  modules: {
    horses,
    races,
  },
});
