
<template>
    <v-card>
        <v-text-field 
            readonly 
            label="Error Message:" 
            variant="outlined" 
            v-model="store.state.error">
        </v-text-field>
        <v-card-actions>
            <v-btn @click="router.back()" variant="outlined">
                Umfrage öffnen!
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from "vue";
import store from "../store/index"

const router = useRouter();

onMounted(() => {
  console.log(store.state.error)
})

</script>
  
  
  
<style scoped>
.v-card {
    margin: 5em auto;
    padding: 1em;
    width: 60%;
}
</style>
  