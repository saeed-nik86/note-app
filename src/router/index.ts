import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Note/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/addNote',
    name: 'AddNote',
    component: () => import("@/views/Note/AddNote.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
