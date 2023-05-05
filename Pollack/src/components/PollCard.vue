
<template>
  <div id='card' >
    <v-card>
      <v-text-field
        clearable
        label="Frage:"
        prepend-inner-icon="mdi-vuetify"
        variant="outlined"
      ></v-text-field>
    </v-card>
  </div>


</template>


<script setup>
  let str = "Hello j!";

  </script>



<style scoped>
  .v-card{
    background-color: white;
    margin: 1em auto;
    padding: 1em;
    width: 90%;
  }
</style>
