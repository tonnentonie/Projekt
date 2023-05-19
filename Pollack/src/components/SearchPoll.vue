
<template>
    <v-card>
        <v-text-field 
            clearable 
            label="Token eingeben:" 
            variant="outlined" 
            v-model="token">
        </v-text-field>
        <v-card-actions>
            <v-switch
                v-model="toggle"
                :label="toggle?'AdminToken':'ShareToken'"
            ></v-switch>
            <v-btn @click="openPoll()" variant="outlined">
                Umfrage öffnen!
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import store from "../store";
const router = useRouter();

const toggle = ref(false);
const token = ref('');

async function openPoll(){
    if(!toggle.value){
        if(token.value != ''){
            console.log(await store.methods.getPoll(token.value))
            if(store.state.error != null){
                router.push(`/pollack/error`)
            }else{
                router.push(`/pollack/poll/${token.value}`)
            }
        }
    }
    else{
        if(token.value != ''){
            router.push(`/pollack/admin/${token.value}`)
        }
        
    }
}   

</script>
  
  
  
<style scoped>
.v-card {
    margin: 5em auto;
    padding: 1em;
    width: 60%;
}
</style>
  