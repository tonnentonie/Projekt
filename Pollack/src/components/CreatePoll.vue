
<template>
    <v-card>
        <v-text-field clearable label="Frage:" variant="outlined" v-model="question">
        </v-text-field>


        <v-text-field clearable label="Antwort" variant="outlined" v-model="answer1">
        </v-text-field>  
        
        <v-text-field clearable label="Antwort" variant="outlined" v-model="answer2">
        </v-text-field>


        <v-card-actions>
            <v-btn @click="sendQuestion()" variant="outlined">
                Erstellen
            </v-btn>
        </v-card-actions>

    </v-card>
</template>
  
  
<script setup>
import store from "../store/index"
import { ref, watch } from "vue";
var question = ref();
var answer1 = ref();
var answer2 = ref();
console.log(question)

watch(question, (newX) => {
    console.log(`question is ${newX}`)
    store.methods.addAnswer("");
})
function sendQuestion(){
    store.state.question.question = question;
    store.state.question.answer1 = answer1;
    store.state.question.answer2 = answer2;
    store.methods.testlog();
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
  