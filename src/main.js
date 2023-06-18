import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueCreditCardValidation from 'vue-credit-card-validation'

const app = createApp(App)
app.use(VueCreditCardValidation)
app.mount('#app')
