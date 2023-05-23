<template>
    <div id="Pollack">
        <NavigationBar v-if="showNavBar()"></NavigationBar>
        <router-view></router-view>
    </div>     
</template>

<script setup>
import NavigationBar from '../components/NavigationBar.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function showNavBar() {
  // Hide NavigationBar for HomePage
  return router.currentRoute.value.fullPath != '/pollack/home'
}

</script>

<style scoped>

</style>
