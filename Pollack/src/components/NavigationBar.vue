<template>
    <div>
        <v-btn
            @click="router.push('/pollack/create')">
            <v-icon>mdi-chat-question</v-icon>
            Frage stellen!
        </v-btn>
        <v-btn
            @click="router.push('/pollack/search')">
            <v-icon>mdi-forum</v-icon>
            Frage beantworten!
        </v-btn>
        <v-btn
            @click="getMode()">
            <v-icon>mdi-chat-question</v-icon>
            Frage bearbeiten!
        </v-btn>
        <v-btn
            @click="router.push('/pollack/search')">
            <v-icon>mdi-forum</v-icon>
            Antwort bearbeiten!
        </v-btn>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

</script>

<style scoped>
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

