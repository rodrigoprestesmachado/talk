import { createApp } from 'vue'
import Toast from 'vue-toastification'
import VueScrollTo from 'vue-scrollto'
import 'lightgallery.js'

import router from '/@src/router'
import App from '/@src/App.vue'

import '@fortawesome/fontawesome-free/scss/fontawesome.scss'
import '@fortawesome/fontawesome-free/scss/regular.scss'
import '@fortawesome/fontawesome-free/scss/solid.scss'
import '@fortawesome/fontawesome-free/scss/brands.scss'
import 'lightgallery.js/dist/css/lightgallery.css'
import 'vue-toastification/dist/index.css'

import '/@src/assets/scss/main.scss'

const app = createApp(App)

app.use(router)
app.use(VueScrollTo)
app.use(Toast)
app.mount('#app')
