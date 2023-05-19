<template>
    <div id="welcome-page">
        <v-card>
            <h1 class="text-h5">Webprogrammierung (SoSe 23)</h1>
            <h2>Gruppe 12</h2>
            <v-btn
                prepend-icon="mdi-lock-open-variant"
                rounded="lg"
                color="green"
                @click="router.push('/pollack')">
                Pollack
            </v-btn>
            <p>oder</p>
            <v-btn 
                prepend-icon="mdi-lock"
                rounded="lg"
                color="blue-grey"
                @click="router.push('/pollock')">
                Pollock
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

#welcome-page {
    width: 100%;
    height: 100%;
    padding-top: 11%;
}

.v-card {
    background-color: white;
    width: 500px;
    height: 450px;
    margin: auto;
}
    
.v-btn {
    width: 200px;
    margin: 20px;
}
h1{
    margin-top: 4em;
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
