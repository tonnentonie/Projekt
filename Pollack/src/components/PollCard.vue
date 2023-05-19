<template>
  <v-card>
    <v-text-field 
      readonly 
      label="Frage:" 
      variant="outlined"
      v-model="store.state.question.title">
    </v-text-field>
<!-- '    <v-radio-group
      v-model="answer"
      column
      multipleAnswers
    >
      <v-radio
        v-for="option in question.a"
        :label="option"
        :value="question.a.indexOf(option)"
      ></v-radio>
    </v-radio-group>' -->
    <!-- <v-checkbox
      v-model="data.selected"
      :label="option"
      :value="question.a.indexOf(option)"
    ></v-checkbox> -->
    <v-card-actions>
      <v-btn @click="sendAnswer()" variant="outlined">
        Abstimmen!
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import store from "../store/index"
import { onMounted } from "vue";
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {
  store.methods.getPoll(route.params.token)
})

function sendAnswer(){
  if(!question.multipleAnswers){
   console.log(answer.value) 
  }
  else{
   console.log(data.selected) 
  }
  
}
function test(a){ 
  //console.log(store.state.questions.indexOf(a))
  
}
</script>




<style scoped>
.v-card {
  background-color: white;
  margin: 5em auto;
  padding: 1em;
  width: 60%;
}
</style>
