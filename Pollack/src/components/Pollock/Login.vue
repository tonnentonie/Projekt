<template>
    <v-card>
        <v-text-field 
            clearable 
            label="Name eingeben:" 
            variant="outlined" 
            v-model="name">
        </v-text-field>
        <v-text-field 
            clearable 
            label="Passwort eingeben:" 
            variant="outlined" 
            v-model="password">
        </v-text-field>
        <v-card-actions>
            <v-btn @click="anmelden()" variant="outlined">
                Anmelden
            </v-btn>
            <v-btn @click="makeUser()" variant="outlined">
                Account erstellen
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();

const name = ref('');
const password = ref('');

function anmelden(){
    console.log(name.value)
    console.log(password.value)
 
    router.push(`/poll/${token}`)
    
}   

function makeUser(){
    console.log("makeUser")
    router.push(`/pollock/makeuser`)

}

</script>
  
  
  
<style scoped>
.v-card {
    margin: 5em auto;
    padding: 1em;
    width: 60%;
}
</style>