
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
        <div id="settings" v-if="showSettings">
            <div id="votes" v-if="filledOptions.length > 2">
                <v-label>Anzahl Votes pro Benutzer:</v-label>
                <v-slider
                    v-model="votesModel"
                    :ticks="optionTickLabels()"
                    :max="filledOptions.length-1 < 2 ? 2 : filledOptions.length-1"
                    step="1"
                    show-ticks="always"
                    tick-size="4"
                ></v-slider>
            </div>
            <v-label>Gültigkeit:</v-label>
            <v-slider
                v-model="expiryModel"
                :ticks="expiryTickLabels"
                :max="10"
                step="1"
                show-ticks="always"
                tick-size="4"
            ></v-slider>
        </div>

        <v-card-actions>
            <v-btn
                :icon="showSettings ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="showSettings = !showSettings">
            </v-btn>
            <v-label>Einstellungen {{ showSettings ? 'schließen' : 'öffnen' }}</v-label>
            <v-btn 
                id="CreatePoll"
                @click="sendQuestion()"
                variant="outlined">
                Erstellen
            </v-btn>
        </v-card-actions>
    </v-card>
    <v-card class="TokenCard" v-if="showToken">
        <v-text-field 
            readonly 
            label="ShareToken:" 
            variant="outlined" 
            v-model="store.state.question.share.value">
        </v-text-field>
        <v-text-field 
            readonly 
            label="AdminToken:" 
            variant="outlined" 
            v-model="store.state.question.admin.value">
        </v-text-field>
    </v-card>
</template>

  
<script setup>
import store from "../store/index"
import { reactive, ref, watch } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

const showSettings = ref(false)
var showToken = ref(false)
const expiryTickLabels =  {
          0: '1h',
          1: '2h',
          2: '4h',
          3: '8h',
          4: '12h',
          5: '24h',
          6: '3d',
          7: '7d',
          8: '1m',
          9: '1y',
          10: 'infinity',
}

var expiryModel = ref(0)

function getExpiryDate() {
  const currentDate = new Date();

  switch (expiryModel.value) {
    case 10:
      currentDate = 'undefinded'
      return 'undefinded';
    case 0:
      currentDate.setHours(currentDate.getHours() + 1);
      break;
    case 1:
      currentDate.setHours(currentDate.getHours() + 2);
      break;
    case 2:
      currentDate.setHours(currentDate.getHours() + 4);
      break;
    case 3:
      currentDate.setHours(currentDate.getHours() + 8);
      break;
    case 4:
      currentDate.setHours(currentDate.getHours() + 12);
      break;
    case 5:
      currentDate.setDate(currentDate.getDate() + 1);
      break;
    case 6:
      currentDate.setDate(currentDate.getDate() + 3);
      break;
    case 7:
      currentDate.setDate(currentDate.getDate() + 7);
      break;
    case 8:
      currentDate.setMonth(currentDate.getMonth() + 1);
      break;
    case 9:
      currentDate.setFullYear(currentDate.getFullYear() + 1);
      break;
    default:
      currentDate = 'undefinded'
      return 'undefinded';
  }

  return currentDate.toISOString();
}

var description = ref(false)

var filledOptions = ref([])
var votesModel = ref(1)

var question = reactive({
    title: '',
    description: '',
    options: ['',''],
    setting: {
        votes: 1,
        worst: false,
        deadline: getExpiryDate()
    },
    fixed: [false]
});

watch(
  () => question.options,
  (newOptions) => {
    filledOptions.value = newOptions.filter((option) => option.trim() !== '');
    if (filledOptions.value.length >= 2 && filledOptions.value.length === newOptions.length) {
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

watch(
  () => filledOptions,(newOption) => {
    if(newOption.value.length > 2){
        votesModel.value = newOption.value.length;
    }else{
        votesModel.value = 1;
    }
  },
  { deep: true } // Dies ermöglicht die Überwachung von Änderungen in verschachtelten Eigenschaften
);

function optionTickLabels(){
    var tickLabels = {}
    for(var i = 0; i < question.options.length-1; i++){
        tickLabels[i] = `${i + 1}`;
    }
    return tickLabels
}

async function sendQuestion() {
    question.setting.votes = votesModel.value + 1
    question.setting.deadline = getExpiryDate()
    const response = await store.methods.postPoll(question);
    console.log(response)
    if(response != 200){
        router.push('/pollack/error')
    }
    showToken.value = !showToken.value
    showSettings.value = false
    description.value = false

    clearQuestion()
}
function clearQuestion(){
    question.title = '';
    question.description = '';
    question.options = ['',''];
}
</script>
  
  
  
<style scoped>
.CreatePoll {
    margin: 5em auto;
    padding: 1em;
    width: 60%;
}
#CreatePoll{
    margin-left: auto;
}
.TokenCard {
    margin: auto;
    padding: 1em;
    width: 60%;
}
</style>
  