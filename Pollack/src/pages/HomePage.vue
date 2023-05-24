<template>
    <div id="home-page">
        <v-card>
            <v-btn
                prepend-icon="mdi-chat-question"
                rounded="lg"
                color="blue-grey"
                @click="router.push('/pollack/create')">
                Frage Stellen!
            </v-btn>
            <br/>
            <v-btn 
                prepend-icon="mdi-forum"
                rounded="lg"
                color="blue-grey"
                @click="router.push('/pollack/search')">
                Token eingeben!
            </v-btn>
        </v-card>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

</script>

<style scoped>

* {
        margin: auto;
        text-align: center;
}

#home-page {
    width: 100%;
    height: 100%;
    padding-top: 11%;
}

.v-card {
    background-color: white;
    width: 500px;
    height: 500px;
    margin: auto;
    padding-top: 9em;
}
    
.v-btn {
    height: 20em;
    width: 30em;
    margin: 2em;
}

/* Mobile App Design */
@media screen and (max-width: 600px){
#welcome-page {
        width: 100%;
        height: 100%;
}

.v-card {
    width: 80%;
    height: 80%;
}
}

</style>
