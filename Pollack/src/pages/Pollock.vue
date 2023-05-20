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
  // Hide NavigationBar for HomePage
  return router.currentRoute.value.fullPath != '/Pollack/home'
}

function login (){


}

</script>



<style scoped>

</style>
