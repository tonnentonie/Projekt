
<template>
    <v-card class="CreatePoll">
        <v-text-field 
            clearable 
            label="Frage:" 
            variant="outlined" 
            v-model="question.title">
        </v-text-field>
        <v-switch
            v-model="description"
            :label="`Beschreibung hinzufügen (${description})`"
        ></v-switch>
        <v-textarea
            v-if="description" 
            clearable  
            label="Beschreibung:" 
            variant="outlined"
            v-model="question.description">
        </v-textarea>
        <div id="options">
            <v-text-field
                v-for="(option, i) in question.options" 
                :label="`Option ${i+1}:`" 
                variant="outlined" 
                v-model="question.options[i]">
            </v-text-field>    
        </div>

        <v-card-actions>
            <v-switch
                v-model="question.multipleAnswers"
                hide-details
                :label="`Mehrere Antworten erlauben (${question.multipleAnswers})`"
            ></v-switch>
            <v-btn @click="sendQuestion()" variant="outlined">
                Erstellen
            </v-btn>
        </v-card-actions>
    </v-card>
    <CreateDialog/>
</template>

  
<script setup>
import store from "../store/index"
import CreateDialog from "./createDialog.vue";
import { reactive, ref, watch } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();

var description = ref(false)

var question = reactive({
    title: '',
    description: '',
    options: ['',''],
    setting: null,
    fixed: false,
    multipleAnswers: false
});

watch(
  () => question.options,
  (newOptions) => {
    const filledOptions = newOptions.filter((option) => option.trim() !== '');
    if (filledOptions.length >= 2 && filledOptions.length === newOptions.length) {
      // Füge ein leeres Feld hinzu, wenn alle Felder ausgefüllt sind
      question.options.push('');
    }

    const emptyOptions = newOptions.filter((option) => option.trim() === '');
    if (newOptions.length > 2 && emptyOptions.length > 1) {
      // Entferne überflüssige leere Felder
      const updatedOptions = newOptions.filter((option) => option.trim() !== '');
      question.options = updatedOptions.concat('');
    }
  },
  { deep: true } // Dies ermöglicht die Überwachung von Änderungen in verschachtelten Eigenschaften
);

function sendQuestion() {
    const status = store.methods.postPoll(question, description);
    console.log(status.value);
    if(status != 200){
        router.push('/pollack/error')
    }

    clearQuestion()
    store.state.dialog = true
}
function clearQuestion(){
    question.title = '';
    question.description = '';
    question.options = [];
    question.multipleAnswers = false;
}
</script>
  
  
  
<style scoped>
.CreatePoll {
    margin: 5em auto;
    padding: 1em;
    width: 60%;
}
</style>
  