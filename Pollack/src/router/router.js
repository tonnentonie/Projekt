
import { createRouter, createWebHistory } from 'vue-router';

import Pollock from '../pages/Pollock.vue'
import Pollack from '../pages/Pollack.vue'
import store from "../store/index.js"



const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: Pollack, meta: { requiresAuth: false }},
      { path: '/:notFound(.*)', component: Pollack, meta: { requiresAuth: false }}
    ]
  });

  router.beforeEach((to,_,next) => {
    if(to.meta.requiresAuth){
      next('/')
    }else{
      next()
    }
    
  })
  
  export default router;