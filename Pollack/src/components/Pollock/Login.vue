<template>
<div id="login-page">

<v-card>

    <!-- Back Button -->
    <v-btn 
        id="back" 
        icon="mdi-arrow-left"
        color="black"
        @click="router.back">
    </v-btn>

    <h1 class="text-h5">Log-In</h1>

    <v-text-field 
        v-model="username"
        prepend-inner-icon="mdi-email-outline" 
        clearable 
        label="Username"
        variant="outlined"/>

    <v-text-field 
        v-model="password"
        prepend-inner-icon="mdi-lock-outline" 
        clearable 
        label="Password"
        variant="outlined"
        :type="showPassword ? 'text' : 'password'" 
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="showPassword = !showPassword"/>

    <v-btn
        prepend-icon="mdi-account-circle"
        rounded="lg"
        color="green"
        class="login_button"
        @click="login()">
        Login
    </v-btn>
    <p>Noch keinen Account? <router-link to="/pollock/register">Hier registrieren!</router-link></p>

</v-card>

</div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();

const username = ref('');
const password = ref('');

function login(){
    console.log(username.value)
    console.log(password.value)
 
    router.push(`/poll/${token}`)
    
}

</script>
  
  
  
<style scoped>
* {
        margin: auto;
        text-align: center;
    }

    #login-page {
        width: 100%;
        height: 100%;
        padding-top: 11%;
        width: unset;
    }

    #back{
        position: absolute;
        margin-left: -45%;
        margin-top: -2em;
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
    
    .login_button {
        width: 200px;
        margin-bottom: 2em;
    }

    .text-h5 {
        margin-bottom: 15px;
    }

    p {
        font-size: large;
    }

    /* Mobile App Design */
    @media screen and (max-width: 600px){
        #login-page {
            width: 100%;
            height: 100%;
        }

        .v-card {
            width: 80%;
            height: 80%;
            height: auto;
            padding-bottom: 25px;
        }

        .v-text-field {
            width: 80%;
        }
    }
</style>