<template>
  <v-card v-if="!editPollBool">
    <v-text-field clearable label="Dein Name:" variant="outlined" v-model="name">
    </v-text-field>
    <v-text-field id="question" readonly label="Frage:"
      :hint="'Maximal ' + store.state.question.setting?.votes + ' Stimmen.'" persistent-hint variant="outlined"
      v-model="store.state.question.title">
    </v-text-field>
    <v-textarea v-if="store.state.question.description != ''" readonly label="Beschreibung:" variant="outlined"
      v-model="store.state.question.description">
    </v-textarea>
    <div id="select" v-for="option, i in store.state.question.options">
      <v-checkbox-btn :value="option.id" v-model="selected"></v-checkbox-btn>
      <v-text-field readonly hide-details :label="`Option ${i + 1}:`" variant="outlined"
        v-model="option.title"></v-text-field>
    </div>

    <v-card-actions>
      <v-btn @click="sendAnswer()" variant="outlined">
        Jetzt Abstimmen!
      </v-btn>
      <v-btn id="admin" @click="showAdminInput = !showAdminInput" variant="outlined">
        Umfrage bearbeiten
      </v-btn>
    </v-card-actions>
    <div id="adminPanel" v-if="showAdminInput">
      <v-text-field clearable hint="Bitte gebe den AdminToken ein um die Umfrage zu bearbeiten." persistent-hint
        label="AdminToken:" variant="outlined" v-model="adminToken"></v-text-field>
      <v-btn @click="switchEditPoll()" variant="outlined">
        Umfrage jetzt bearbeiten!
      </v-btn>
    </div>
  </v-card>
  <v-card class="editPoll" v-if="editPollBool">
    <v-text-field clearable label="Frage:" variant="outlined" v-model="question.title">
    </v-text-field>
    <v-switch v-model="description" :label="`Beschreibung hinzufügen (${description})`"></v-switch>
    <v-textarea v-if="description" clearable label="Beschreibung:" variant="outlined" v-model="question.description">
    </v-textarea>
    <div id="options">
      <v-text-field v-for="(option, i) in question.options" :label="`Option ${i + 1}:`" variant="outlined"
        v-model="question.options[i]">
      </v-text-field>
    </div>
    <div id="settings" v-if="showSettings">
      <div id="votes" v-if="filledOptions.length > 2">
        <v-label>Anzahl Votes pro Benutzer:</v-label>
        <v-slider v-model="votesModel" :ticks="optionTickLabels()"
          :max="filledOptions.length - 1 < 2 ? 2 : filledOptions.length - 1" step="1" show-ticks="always"
          tick-size="4"></v-slider>
      </div>
      <v-label>Gültigkeit hinzufügen zu: {{ new Date(question.setting.deadline) }}</v-label>
      <v-slider v-model="expiryModel" :ticks="expiryTickLabels" :max="11" step="1" show-ticks="always"
        tick-size="4">
      </v-slider>
      <v-btn id="DeletePoll" @click="deletePoll()" variant="outlined">
        Umfrage löschen!
      </v-btn>
      <v-text-field clearable hint="Bitte bestätige den AdminToken um die Umfrage zu löschen." persistent-hint
        label="AdminToken:" variant="outlined" v-model="adminToken">
      </v-text-field>
      <div>

      </div>
    </div>
    <v-card-actions>
      <v-btn :icon="showSettings ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="showSettings = !showSettings">
      </v-btn>
      <v-label>Einstellungen {{ showSettings ? 'schließen' : 'öffnen' }}</v-label>
      <v-btn id="ChangePoll" @click="sendEditPoll()" variant="outlined">
        Änderungen übernehmen!
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import store from "../store/index"
import { onMounted, ref, watch, reactive } from "vue";
import { useRoute } from 'vue-router';

const route = useRoute();

var showAdminInput = ref(false)
const showSettings = ref(false)
var adminToken = ref('')
var editPollBool = ref(false)
var selected = ref([]);
var name = ref('');
var expiryModel = ref(0)
var votesModel = ref(1)
var question = reactive({
  title: '',
  description: '',
  options: [],
  setting: {
    votes: 1,
    worst: false,
    deadline: '',
  },
  fixed: [false]
});
var description = ref(false)
var filledOptions = ref([])

onMounted(() => {
  loadData()
})

async function loadData() {
  const status = await store.methods.getPoll(route.params.token)
  if (status != 200) {
    router.push('/pollack/error')
  }
}

watch(selected, (newSelected) => {
  if (newSelected.length > store.state.question.setting.votes) {
    selected.value = newSelected.slice(1);
  }
})

async function sendAnswer() {
  const options = []
  selected.value.forEach((option) => {
    options.push(option)
  })
  const vote = {
    name: name.value,
    options: options
  }
  console.log(vote)
  const response = await store.methods.postVote(store.state.question.share.value, vote)
  console.log(response)
  if (response != 200) {
    router.push('/pollack/error')
  }
}

function switchEditPoll() {
  question.title = store.state.question.title
  if(store.state.question.description != ''){
    description.value = true
    question.description = store.state.question.description
  }
  store.state.question.options.map((option) => {
    question.options.push(option.title)
  })
  question.setting = store.state.question.setting
  question.fixed = store.state.question.fixed

  editPollBool.value = !editPollBool.value
}

async function sendEditPoll() {
  question.setting.votes = getVotesModel()
    question.setting.deadline = getExpiryDate()
    const response = await store.methods.postPoll(question);
    if(response != 200){
      router.push('/pollack/error')
    }else{
      loadData();
      editPollBool.value = !editPollBool.value
    }
}

const expiryTickLabels = {
  0: '0',
  1: '1h',
  2: '2h',
  3: '4h',
  4: '8h',
  5: '12h',
  6: '24h',
  7: '3d',
  8: '7d',
  9: '1m',
  10: '1y',
  11: 'infinity',
}

function getExpiryDate() {
  var currentDate = new Date(question.setting.deadline)

  switch (expiryModel.value) {
    case 11:
      currentDate = 'undefinded'
      return 'undefinded';
    case 1:
      currentDate.setHours(currentDate.getHours() + 1);
      break;
    case 2:
      currentDate.setHours(currentDate.getHours() + 2);
      break;
    case 3:
      currentDate.setHours(currentDate.getHours() + 4);
      break;
    case 4:
      currentDate.setHours(currentDate.getHours() + 8);
      break;
    case 5:
      currentDate.setHours(currentDate.getHours() + 12);
      break;
    case 6:
      currentDate.setDate(currentDate.getDate() + 1);
      break;
    case 7:
      currentDate.setDate(currentDate.getDate() + 3);
      break;
    case 8:
      currentDate.setDate(currentDate.getDate() + 7);
      break;
    case 9:
      currentDate.setMonth(currentDate.getMonth() + 1);
      break;
    case 10:
      currentDate.setFullYear(currentDate.getFullYear() + 1);
      break;
    default:
      currentDate = new Date(question.setting.deadline)
      break;
  }

  return currentDate.toISOString();
}

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
  () => filledOptions, (newOption) => {
    if (newOption.value.length > 2) {
      votesModel.value = newOption.value.length;
    } else {
      votesModel.value = 1;
    }
  },
  { deep: true } // Dies ermöglicht die Überwachung von Änderungen in verschachtelten Eigenschaften
);

function optionTickLabels() {
  var tickLabels = {}
  for (var i = 0; i < question.options.length - 1; i++) {
    tickLabels[i] = `${i + 1}`;
  }
  return tickLabels
}

function getVotesModel() {
  if (filledOptions.value.length > 2) {
    votesModel.value++
    if (votesModel.value > filledOptions.value.length) {
      votesModel.value = filledOptions.value.length
    }
  }
  return votesModel.value
}

</script>

<style scoped>
.v-card {
  background-color: white;
  margin: 5em auto;
  padding: 1em;
  width: 60%;
}

.v-textarea {
  margin-top: 1em;
}

#select {
  display: flex;
}

#select>.v-text-field {
  padding: 0.5em;
  margin-left: -85%;
}

#admin {
  margin-left: auto;
}

#adminPanel {
  margin-top: 1em;
  display: flex;
}

#adminPanel>.v-btn {
  margin: 0.7em;
}

#ChangePoll {
  margin-left: auto;
}
#DeletePoll{
  margin-bottom: 1em;
}
</style>
