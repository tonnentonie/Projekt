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
        result: {
            votes: [],
            count: 0,
        },
        share: null,
        admin: null,
    },
    vote: {
        name: null,
        options: [],
        edit: null,
    },
    error: null
})

const methods = {
    getFilledOptions(inputOptions){
        const filledOptions = inputOptions.filter((option) => option.trim() !== '');
        const outputOptions = [];
        filledOptions.map((option, i) => {
            outputOptions.push({id: i, title: option});
        });
        return outputOptions;
    },
    async postPoll(question){
        const options = this.getFilledOptions(question.options);
    
        const response = await pollackApi.poll.requests.createPoll(question.title, question.description, options, question.setting, question.fixed);
        if(response.status == 200){
            state.error = null
            state.question.share = response.data.share
            state.question.admin = response.data.admin
        }else{
            console.log(response.data.message)
            state.error = response.data.message
        }
        return response.status
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
            state.question.result.count = 0
            state.question.result.votes = []
            response.data.options.map((option) => {
                state.question.result.votes.push(option.voted)
                state.question.result.count = state.question.result.count + option.voted.length
            })
            return 200
        }else{
            state.error = response.data.message
            return response.status
        }
    },
    async putPoll(adminToken, question){
        const options = this.getFilledOptions(question.options);
        const response = await pollackApi.poll.putPoll(adminToken, question.title, question.description, options, question.setting, question.fixed);

        if(response.status == 200){
            state.error = null
        }else{
            console.log('error')
            //console.log(response.data.message)
            state.error = response.data.message
        }
        return response.status
    },
    async deletePoll(adminToken){
        const response = await pollackApi.poll.deletePoll(adminToken);

        if(response.status == 200){
            state.error = null
        }else{
            console.log(response.data.message)
            state.error = response.data.message
        }
        return response.status
    },
    async postVote(shareToken, vote){
        const choices = [];

        vote.options.map((voteId) => {
            choices.push({id: voteId, worst: false});
        });

        console.log(choices)

        const response = await pollackApi.vote.createVote(shareToken, vote.name, choices);
        console.log(response)
        if(response.status == 200){
            state.error = null
            state.vote.edit = response.data.edit
        }else{
            console.log(response.data.message)
            state.error = response.data.message
        }
        return response.status
    },
    async getVote(editToken){
        const response = await pollackApi.vote.getVote(editToken);

        if(response.status == 200){
            state.error = null
            state.question.title = response.data.poll.body.title
            state.question.description = response.data.poll.body.description
            state.question.options = response.data.poll.body.options
            state.question.setting = response.data.poll.body.setting
            state.question.fixed = response.data.poll.body.fixed
            state.question.share = response.data.poll.share
            state.vote.name = response.data.vote.owner
            state.vote.options = response.data.vote.choice
            return 200
        }else{
            state.error = response.data.message
            return response.status
        }
    },
    async putVote(editToken, vote){
        const choices = [];

        vote.options.map((voteId) => {
            choices.push({id: voteId, worst: false});
        });

        const response = await pollackApi.vote.putVote(editToken, vote.name, choices);
        if(response.status == 200){
            state.error = null
            state.vote.edit = response.data.edit
        }else{
            console.log(response.data.message)
            state.error = response.data.message
        }
        return response.status
    },
    async deleteVote(editToken){
        const response = await pollackApi.vote.deleteVote(editToken);

        if(response.status == 200){
            state.error = null
        }else{
            console.log(response.data.message)
            state.error = response.data.message
        }
        return response.status
    },


}

export default{
    state,
    methods,
    pollack,
    pollock,
    user
}