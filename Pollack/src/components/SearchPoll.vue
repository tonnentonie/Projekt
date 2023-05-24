
<template>
    <v-card>
        <v-text-field 
            clearable 
            label="ShareToken eingeben:" 
            variant="outlined" 
            v-model="shareToken">
        </v-text-field>
        <v-btn block  @click="openPoll()" variant="outlined">
                Umfrage öffnen!
        </v-btn>
        
        <v-text-field 
            clearable 
            label="EditToken eingeben:" 
            variant="outlined" 
            v-model="editToken">
        </v-text-field>
        <v-btn block @click="editVote()" variant="outlined">
                Vote bearbeiten!
        </v-btn>

    </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();

const shareToken = ref('');
const editToken = ref('');

function openPoll(){
    router.push(`/pollack/poll/${shareToken.value}`)
} 
function editVote(){
    router.push(`/pollack/vote/${editToken.value}`)
}

</script>
  
  
  
<style scoped>
.v-card {
    margin: 5em auto;
    padding: 1em;
    width: 60%;
}
.v-btn{
    margin-bottom: 1em;
}
.v-btn:hover{
    background-color: lavender;
}
</style>
  