import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

// Tailwind CSS
import './index.css'

// 自訂樣式
import './style/global.sass';

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
