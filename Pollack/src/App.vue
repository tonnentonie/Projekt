<script setup>
import PollCard from './components/PollCard.vue'
import ButtonCard from './components/ButtonCard.vue'

</script>

<template>
  <v-app>
    <v-main>
      <PollCard/>
      <ButtonCard/>
    </v-main>
  </v-app>

</template>

<style scoped>
.v-main {
    background-color: #181818;
  }

  body {
    margin: 0 auto;
  }
</style>
