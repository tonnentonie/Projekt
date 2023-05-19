
import { createRouter, createWebHistory } from 'vue-router';

//Pages
import Pollack from '../pages/Pollack.vue'
import Pollock from '../pages/Pollock.vue'
import StartPage from '../pages/StartPage.vue'
import HomePage from '../pages/HomePage.vue'

//Components
import PollCard from '../components/PollCard.vue'
import CreatePoll from '../components/CreatePoll.vue'
import SearchPoll from '../components/SearchPoll.vue'
import AdminCard from '../components/AdminCard.vue'
import AnswerCard from '../components/AnswerCard.vue'
import ErrorCard from '../components/ErrorCard.vue'



const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: StartPage, meta: { requiresAuth: false }},
      { path: '/Pollack', component: Pollack, redirect: { path: 'Pollack/home' }, meta: { requiresAuth: false}, children: [
        { path: 'home', component: HomePage, meta: { requiresAuth: false }},
        { path: 'create', component: CreatePoll, meta: { requiresAuth: false }},
        { path: 'search', component: SearchPoll, meta: { requiresAuth: false }},
        { path: 'error', component: ErrorCard, meta: { requiresAuth: false }},
        { path: 'poll/:token', component: PollCard, meta: { requiresAuth: false }},
        { path: 'admin/:token', component: AdminCard, meta: { requiresAuth: false }},
        { path: 'answer/:token', component: AnswerCard, meta: { requiresAuth: false }},
      ]},
      { path: '/Pollock', component: Pollock, meta: { requiresAuth: false }, children: []},
      { path: '/:notFound(.*)', component: StartPage, meta: { requiresAuth: false }}
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