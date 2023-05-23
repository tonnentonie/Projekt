<template>
  <v-card>
    <v-text-field 
      clearable 
      label="Dein Name:" 
      variant="outlined"
      v-model="name">
    </v-text-field>
    <v-text-field 
      readonly 
      label="Frage:" 
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
      <v-btn @click="sendAnswer()" variant="outlined">
        Abstimmen!
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import store from "../store/index"
import { onMounted, ref, watch } from "vue";
import { useRoute } from 'vue-router';

const route = useRoute();

var selected = ref([]);
var name = ref('');

onMounted(() => {
  store.methods.getPoll(route.params.token)
})

watch(selected, (newSelected) => {
  if (newSelected.length > store.state.question.setting.votes) {
      selected.value = newSelected.slice(1);
    }
})

function sendAnswer(){
  console.log(name.value)
  console.log(selected)
}
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
