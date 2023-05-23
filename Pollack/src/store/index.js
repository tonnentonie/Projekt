import { reactive } from "vue";
import pollack from "../services/pollackApi"
import pollackApi from "../services/pollackApi";
import pollock from "../services/pollockApi";


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
    error: null
})

const methods = {
    async postPoll(question){
        const filledOptions = question.options.filter((option) => option.trim() !== '');
        const options = [];
        filledOptions.map((option, i) => {
            options.push({id: i, title: option});
        });
        const response = await pollackApi.poll.requests.createPoll(question.title, question.description, options, question.setting, question.fixed);
        if(response.status == 200){
            console.log(response.data)
            state.error = null
            state.question.share = response.data.share
            state.question.admin = response.data.admin
            console.log(state.question.share)
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
            return 200
        }else{
            state.error = response.data.message
            return response.status
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
    pollock
}