import { reactive } from "vue";
const state = reactive({
    questions:[],
})
const methods = {
    addQuestion(q){
        state.questions.push(q)
    },

}

export default{
    state,
    methods
}