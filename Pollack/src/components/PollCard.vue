
<template>
  <v-card>
    <v-text-field clearable label="Frage:" variant="outlined">
    </v-text-field>

    <v-select variant="outlined" label="Art" :items=
    "['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']">
    </v-select>

    <v-text-field clearable label="Antwort" variant="outlined" v-for="Antwort in store.state.answers">
    </v-text-field>


    <v-card-actions>
      <v-btn variant="outlined">
        Erstellen
      </v-btn>
    </v-card-actions>

  </v-card>
</template>


<script setup>
import store from "../store/index"
</script>



<style scoped>
.v-card {
  background-color: white;
  margin: 1em auto;
  padding: 1em;
  width: 90%;
}
</style>
