import { reactive } from "vue";
const state = reactive({
    answers:[0,1],
    question:{
        question:"",
        answer1:"",
        answer2:""
    },
})
const methods = {
    addAnswer(answer){
        state.answers.push(answer)
    },

    createPollCard(){

    },


    testlog(){
        console.log(state.question);
    }



}






export default{
    state,
    methods
}