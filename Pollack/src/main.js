import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as mdi from'@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  mdi
})

createApp(App).use(vuetify).mount('#app')


