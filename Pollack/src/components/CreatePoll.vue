
<template>
    <v-card>
        <v-text-field 
            clearable 
            label="Frage:" 
            variant="outlined" 
            v-model="question.q">
        </v-text-field>

        <v-text-field 
            clearable 
            label="Antwort" 
            variant="outlined" 
            v-model="question.a[0]">
        </v-text-field>

        <v-text-field 
            clearable 
            label="Antwort" 
            variant="outlined" 
            v-model="question.a[1]">
        </v-text-field>


        <v-card-actions>
            <v-switch
                v-model="multipleAnswers"
                hide-details
                :label="`Mehrere Antworten erlauben (${multipleAnswers})`"
            ></v-switch>
            <v-btn @click="sendQuestion()" variant="outlined">
                Erstellen
            </v-btn>
        </v-card-actions>

    </v-card>
</template>
  
  
<script setup>
import store from "../store/index"
import { reactive, ref } from "vue";

var multipleAnswers = ref()

var question = reactive({
    q: '',
    a: []
})

function sendQuestion() {
    let q = JSON.parse(JSON.stringify(question))
    store.methods.addQuestion(q)
    clearQuestion()
}
function clearQuestion(){
    question.q = '';
    question.a = [];
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
  