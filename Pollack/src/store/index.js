import { reactive } from "vue";
import pollack from "../services/pollackApi"
import pollackApi from "../services/pollackApi";
import pollock from "../services/pollockApi";
import user from "../services/pollock/userAPI";


const state = reactive({
    question: {
        title: null,
        description: null,
        options: [],
        setting: null,
        fixed: null,
        share: null,
        admin: null,
    },
    error: null,
    dialog: true,
})

const methods = {
    createQuestions(test){
        pollackApi.poll.createPoll(test, test, 'test1', 'test2');
    },
    getDialogStatus(){
        return state.dialog;
    },
    setDialogStatus(status){
        state.dialog = status;
    },
    async postPoll(question, desc){
        const filledOptions = question.options.filter((option) => option.trim() !== '');
        const options = [];
        filledOptions.map((option, i) => {
            options.push({id: i, title: option});
        });
        const response = await pollackApi.poll.createPoll(question.title, question.description, options, question.setting, question.fixed);
        if(response.status == 200){
            state.error = null
            state.question.share = response.data.body.share
            state.question.admin = response.data.body.admin
            return response.status
        }else{
            console.log(response.data.message)
            state.error = response.data.message
            return response.status
        }
    },
    async getPoll(shareToken){
        const response = await pollackApi.poll.getPoll(shareToken);

        if(response.status == 200){
            state.error = null
            state.question.title = response.data.body.title
            state.question.description = response.data.body.description
            state.question.options = response.data.body.options
            state.question.setting = response.data.body.setting
            state.question.fixed = response.data.body.fixed
            state.question.share = response.data.body.share
            state.question.admin = response.data.body.admin
            return 200
        }else{
            console.log(response.data)
            state.error = response.data.message
            return 404
        }
    },
    async putPoll(adminToken, question){
        const response = await pollackApi.poll.putPoll(adminToken, question.title, question.description, question.options, question.setting, question.fixed);

        if(response.status == 200){
            state.error = null
        }else{
            console.log(response.data.message)
            state.error = response.data.message
        }
    }


}

export default{
    state,
    methods,
    pollack,
    pollock,
    user
}