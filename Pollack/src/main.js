import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'

// Vuetify
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
//import * as mdi from'@mdi/font/css/materialdesignicons.css'
import * as mdi from'@mdi/font/css/materialdesignicons.css?inline'

const vuetify = createVuetify({
  components,
  mdi
})

createApp(App).use(vuetify).use(router).mount('#app')


