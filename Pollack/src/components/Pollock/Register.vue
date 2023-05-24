<template>
    <div id="register-page">
        <v-card>
            <v-btn 
                id="back" 
                icon="mdi-arrow-left"
                color="black"
                @click="router.back">
            </v-btn>
            <h1 class="text-h5">Register</h1>
            <v-text-field 
                v-model="name"
                prepend-inner-icon="mdi-account-outline" 
                clearable 
                label="Dein Name"
                placeholder="Gruppe 12" 
                variant="outlined"/>

            <v-text-field 
                v-model="password"
                prepend-inner-icon="mdi-lock-outline" 
                clearable 
                label="Passwort"
                variant="outlined"
                counter
                :type="showPassword ? 'text' : 'password'" 
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPassword = !showPassword"/>
            
            <v-text-field 
                prepend-inner-icon="mdi-lock-outline" 
                clearable 
                label="Passwort bestätigen"
                hint="Bitte bestätige dein Passwort."
                variant="outlined"
                counter
                :type="showPassword ? 'text' : 'password'"/>
            <v-btn
                id="register"
                prepend-icon="mdi-account-circle"
                rounded="lg"
                color="black"
                @click="register()">
                Hier registrieren!
            </v-btn>
        </v-card>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';

import store from "../../store/index"


const router = useRouter();

const name = ref('');
const password = ref('');

function register() {
    console.log(name.value);
    console.log(password.value);
    const status = store.pollock.user.createUser(name.value, password.value);
    console.log(status);
    if(status != 200){
        router.push('/pollock/error')
    }
   
    store.state.dialog = true
    router.push('/pollock/login');

}

</script>
  
  
  
<style scoped>

* {
        margin: auto;
        text-align: center;
    }

    #register-page {
        width: 100%;
        height: 100%;
        padding-top: 11%;
    }
    .v-card {
        background-color: white;
        width: 500px;
        height: 500px;
        padding-top: 4em;
    }
    .v-text-field {
        width: 350px;
    }
    .v-btn #register{
        margin-top: 3em;
        width: 200px;
    }

    #back{
        position: absolute;
        margin-left: -45%;
        margin-top: -2em;
    }

    .text-h5 {
        margin-bottom: 15px;
    }

    p {
        font-size: large;
    }

    /* Mobile App Design */
    @media screen and (max-width: 600px){
        #register-page {
            width: 100%;
            height: 100%;
        }

        .v-card {
            width: 80%;
            height: 85%;
            height: auto;
            padding-bottom: 25px;
        }

        .v-text-field {
            width: 80%;
        }
    }

</style>