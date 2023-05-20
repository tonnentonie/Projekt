<template>
    <v-card>
        <v-text-field 
            clearable 
            label="Name wählen:" 
            variant="outlined" 
            v-model="name">
        </v-text-field>
        <v-text-field 
            clearable 
            label="Passwort wählen:" 
            variant="outlined" 
            v-model="password">
        </v-text-field>
        <v-card-actions>
            <v-btn @click="einrichten()" variant="outlined">
                Account einrichten
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';

import store from "../../store/index"


const router = useRouter();

const name = ref('');
const password = ref('');

function einrichten() {
    console.log(name);
    console.log(password);
    const status = store.pollock.user(name, password);
    console.log(status.value);
    if(status != 200){
        router.push('/pollack/error')
    }

   
    store.state.dialog = true
}

</script>
  
  
  
<style scoped>
.v-card {
    margin: 5em auto;
    padding: 1em;
    width: 60%;
}
</style>