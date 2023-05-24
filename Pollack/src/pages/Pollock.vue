<template>
  <div id="Pollack">
    <NavigationBarLock v-if="showNavBar()"></NavigationBarLock>
    <router-view></router-view>
  </div>
</template>

<script setup>
import PollCard from '../components/PollCard.vue'
import NavigationBarLock from '../components/Pollock/NavigationBarLock.vue';
import { useRouter } from 'vue-router';
import store from '../store';
import { onBeforeUpdate } from 'vue';
import axios from 'axios';



const router = useRouter();

function showNavBar() {
  // Hide NavigationBar for HomePage, LoginPage and RegisterPage
  return router.currentRoute.value.fullPath != '/pollock/home' && router.currentRoute.value.fullPath != '/pollock/login' && router.currentRoute.value.fullPath != '/pollock/register'
}



onBeforeUpdate(() => {
  autolog()
})

//Loggt den User automatisch aus, wenn die Credentials nicht mehr stimmen
async function autolog() {
  //console.log("autologTest1")
  if (localStorage.getItem('apiToken') == null || localStorage.getItem('name') == null) {
    router.push('/pollock/login')
  }
  //console.log("test2")
  try {
    axios.defaults.headers.common['api_key'] = localStorage.getItem('apiToken');
    const res = await store.user.getUser(localStorage.getItem('name'));
    //console.log("test3" + res.data)
  } catch (error) {

    router.push('/pollock/login')

  }




}

</script>



<style scoped></style>
