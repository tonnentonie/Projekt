<template>
    <div>
        <v-btn
            @click="router.push('/')">
            Start
        </v-btn>
        <v-btn
            @click=logout()>
            Logout
        </v-btn>
        <v-btn
            @click="router.push('/pollock/create')">
            <v-icon>mdi-chat-question</v-icon>
            Frage erstellen!
        </v-btn>
        <v-btn
            @click="router.push('/pollock/search')">
            <v-icon>mdi-forum</v-icon>
            Token eingeben!
        </v-btn>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function logout(){
    localStorage.removeItem('apiToken');
    localStorage.removeItem('name');
    router.push('/pollock/login');
}

</script>

<style scoped>
*{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
}
.v-btn{
    height: 3em;
    width: 25%;
    background-color: #333333;
    color: white;
}
.v-btn:hover{
    background-color: #bbbbbb;
    color: #333333;
}

</style>

