import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import YouTubeEmbed from 'vue-youtube-embed'

Vue.config.productionTip = false
Vue.use(YouTubeEmbed)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
