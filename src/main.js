import Vue from 'vue'
import App from './components/App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import converter from './components/converter.vue'

const routes= [{path:'/' ,component: converter}]

const router=new VueRouter({routes
})
    
    
    Vue.use(VueAxios, axios)
    Vue.use(VueRouter)


new Vue({
   render: h => h(App),
   el:'#app',
   router
})
