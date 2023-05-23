<template>
     <div id="Pollack">
        <NavigationBar v-if="showNavBar()"></NavigationBar>
        <router-view></router-view>
    </div>
</template>

<script setup>
import PollCard from '../components/PollCard.vue'
import NavigationBar from '../components/NavigationBar.vue';
import { useRouter } from 'vue-router';


const router = useRouter();

function showNavBar() {
  // Hide NavigationBar for HomePage, LoginPage and RegisterPage
  return router.currentRoute.value.fullPath != '/pollock/home' && router.currentRoute.value.fullPath != '/pollock/login' && router.currentRoute.value.fullPath != '/pollock/register'
}

function login (){


}

</script>



<style scoped>

</style>
