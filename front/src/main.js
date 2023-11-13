import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// Orion Components
import OrionUsers from  './components/OrionUsers.vue'
import OrionTalk from  './components/OrionTalk.vue'

const app = createApp(App)
app.component('orion-users', OrionUsers)
app.component('orion-talk', OrionTalk)
app.use(ElementPlus)
app.mount('#app')
