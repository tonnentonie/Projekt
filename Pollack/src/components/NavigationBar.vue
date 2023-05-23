<template>
    <div>
        <v-btn
            @click="router.push('/')">
            Start
        </v-btn>
        <v-btn
            @click="router.push('/pollack/create')">
            <v-icon>mdi-chat-question</v-icon>
            Frage erstellen!
        </v-btn>
        <v-btn
            @click="router.push('/pollack/search')">
            <v-icon>mdi-forum</v-icon>
            Token eingeben!
        </v-btn>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

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
    width: 33.3%;
    background-color: #333333;
    color: white;
}
.v-btn:hover{
    background-color: #bbbbbb;
    color: #333333;
}

</style>

