
<template>
    <v-dialog transition="dialog-top-transition" width="auto">
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-toolbar
            id="dialog-toolbar"
            color="#181818"
            title="Succesfull Created Poll"
          ></v-toolbar>
          <v-card-text>
            Speichern Sie den ShareToken um die Umfrage zu teilen.
            <br />
            Speichern Sie den AdminToken um die Umfrage zu bearbeiten oder zu
            löschen.
            <br />
          </v-card-text>
          <v-text-field readonly label="AdminToken:" variant="outlined" v-model="adminToken"></v-text-field>
          <v-text-field readonly label="ShareToken:" variant="outlined" v-model="shareToken"></v-text-field>
          <v-card-actions class="justify-end">
            <v-btn variant="text" @click="isActive.value = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </template>

  
<script setup>
import { ref, inject, watch } from "vue";
import store from "../store/index"

watch(store.methods.getDialogStatus, (newVal) => {
    console.log(newVal)
  if(newVal == true){
    isActive.value = true
  }else{
    isActive.value = false
  } 
})

function closeDialog(){
  isActive.value = false
  store.methods.setDialogStatus(isActive.value)
}

</script>
  
  
  
<style scoped>
#dialog-toolbar {
    color: white;
}   
</style>
  