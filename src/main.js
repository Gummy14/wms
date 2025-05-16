import './assets/main.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//Components
import App from './App.vue'
import router from './router'
import store from './stores/store.js'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
    // aliases,
    // sets: {
    //   mdi
    // }
  }
})

const app = createApp(App)

app.config.devtools = true;
app.use(store)
app.use(router)
app.use(vuetify)

app.mount('#app')
