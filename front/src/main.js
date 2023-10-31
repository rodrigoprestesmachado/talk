import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import OrionTalk from  './components/OrionTalk.vue'

const app = createApp(App)
app.component('orion-talk', OrionTalk)
app.mount('#app')
