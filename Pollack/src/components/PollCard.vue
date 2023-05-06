<template>
  <v-card v-for="question in store.state.questions" @click="test(question)">
    <v-text-field 
      disabled 
      label="Frage:" 
      variant="outlined"
      v-model="question.q">
    </v-text-field>
    <v-radio-group
      v-model="answer"
      column
    >
      <v-radio
        v-for="option in question.a"
        :label="option"
        :value="option"
      ></v-radio>
    </v-radio-group>
    <v-card-actions>
            <v-btn @click="sendAnswer()" variant="outlined">
                Abstimmen!
            </v-btn>
        </v-card-actions>
  </v-card>
</template>

<script setup>
import store from "../store/index"
import { ref } from "vue";

const answer = ref()

function sendAnswer(){
  console.log(answer.value)
}
function test(a){
  console.log(a)
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
