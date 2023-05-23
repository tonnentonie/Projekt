
<template>
    <v-card>
      <v-text-field 
        :readonly="true" 
        label="Dein Name:" 
        variant="outlined"
        v-model="store.state.vote.name.name">
      </v-text-field>
      <v-text-field 
        readonly 
        label="Frage:"
        :hint="'Maximal ' + store.state.question.setting?.votes + ' Stimmen.' "
        persistent-hint 
        variant="outlined"
        v-model="store.state.question.title">
      </v-text-field>
      <v-textarea
        v-if="store.state.question.description != ''"
        readonly  
        label="Beschreibung:" 
        variant="outlined"
        v-model="store.state.question.description">
      </v-textarea>
      <div id="select" v-for="option, i in store.state.question.options">
        <v-checkbox-btn
            :disabled="true"
            :value="option.id"
            v-model="selected"
          ></v-checkbox-btn>
          <v-text-field
            readonly
            hide-details
            :label="`Option ${i+1}:`"
            variant="outlined" 
            v-model="option.title"
          ></v-text-field>
      </div>
      
      <v-card-actions>
        <v-btn @click="loadData()" variant="outlined">
          Bearbeiten!
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from 'vue-router';
import store from "../store/index"

const route = useRoute();

var selected = ref([]);
var name = ref('');

onMounted(() => {
  loadData();
})

async function loadData() {
    await store.methods.getVote(route.params.token)
    var choices = []
    store.state.vote.options.map(function(value) {
     choices.push(value.id);
   });
    selected.value = choices;
}

watch(selected, (newSelected) => {
  if (newSelected.length > store.state.question.setting.votes) {
      selected.value = newSelected.slice(1);
    }
})


</script>
  
  
  
<style scoped>
.v-card {
  background-color: white;
  margin: 5em auto;
  padding: 1em;
  width: 60%;
}
#select{
  display: flex;
}
#select > .v-text-field{
  padding: 0.5em;
  margin-left: -85%;
} 
</style>
  