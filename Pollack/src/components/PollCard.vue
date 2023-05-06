<template>
  <v-card v-for="question in store.state.questions" @click="test(question)">
    <v-text-field 
      disabled 
      label="Frage:" 
      variant="outlined"
      v-model="question.q">
    </v-text-field>
    <v-radio-group
      v-if="!question.multipleAnswers"
      v-model="answer"
      column
      multipleAnswers
    >
      <v-radio
        v-for="option in question.a"
        :label="option"
        :value="question.a.indexOf(option)"
      ></v-radio>
    </v-radio-group>
    <v-checkbox
      v-if="question.multipleAnswers"
      v-for="option in question.a"
      v-model="data.selected"
      :label="option"
      :value="question.a.indexOf(option)"
    ></v-checkbox>
    <v-card-actions>
            <v-btn @click="sendAnswer()" variant="outlined">
                Abstimmen!
            </v-btn>
        </v-card-actions>
  </v-card>
</template>

<script setup>
import store from "../store/index"
import { ref, reactive } from "vue";

const answer = ref()
var data = reactive({
  selected: []
});

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
  margin: 1em auto;
  padding: 1em;
  width: 90%;
}
</style>
