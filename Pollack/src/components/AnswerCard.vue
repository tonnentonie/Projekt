
<template>
  <v-card>
    <v-btn
      v-if="!readonly" id="delete" variant="outlined" icon="mdi-delete" @click="deleteVote()"
    ></v-btn>
    <v-text-field readonly label="Dein Name:" variant="outlined" v-model="name">
    </v-text-field>
    <v-text-field id="question" readonly label="Frage:"
      :hint="'Maximal ' + store.state.question.setting?.votes + ' Stimmen.'" persistent-hint variant="outlined"
      v-model="store.state.question.title">
    </v-text-field>
    <v-textarea v-if="store.state.question.description != ''" readonly label="Beschreibung:" variant="outlined"
      v-model="store.state.question.description">
    </v-textarea>
    <div id="select" v-for="option, i in store.state.question.options">
      <v-checkbox-btn
        :readonly="readonly"
        :value="option.id" 
        v-model="selected"></v-checkbox-btn>
      <v-text-field readonly hide-details :label="`Option ${i + 1}:`" variant="outlined"
        v-model="option.title"></v-text-field>
    </div>

    <v-card-actions>
      <v-btn id="edit" v-if="readonly" @click="readonly=false" variant="outlined">
        Vote bearbeiten!
      </v-btn>
      <v-btn id="edit" v-if="!readonly" @click="putVote()" variant="outlined">
        Vote speichern!
      </v-btn>
    </v-card-actions>
  </v-card>
  </template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';
import store from "../store/index"

var readonly = ref(true);
const route = useRoute();
const router = useRouter();

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
    name.value = store.state.vote.name.name;
    selected.value = choices;
}

watch(selected, (newSelected) => {
  if (newSelected.length > store.state.question.setting.votes) {
      selected.value = newSelected.slice(1);
    }
})

async function putVote() {
  const options = []
  selected.value.forEach((option) => {
    options.push(option)
  })
  const vote = {
    name: name.value,
    options: options
  }

  await store.methods.putVote(route.params.token, vote);
  readonly.value = true;
}

async function deleteVote() {
  await store.methods.deleteVote(route.params.token);
  router.push('/pollack/home');
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
#delete{
  margin-left: 95%;
  margin-bottom: 1em;
}
</style>
  