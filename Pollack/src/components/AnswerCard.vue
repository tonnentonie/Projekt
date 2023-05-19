
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
const router = useRouter();

const toggle = ref(false);
const token = ref('');

function openPoll(){
    console.log(token.value)
    if(!toggle.value){
        if(token.value != ''){
            router.push(`/poll/${token}`)
        }
    }
    else{
        if(token.value != ''){
            router.push(`/admin/${token}`)
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
  