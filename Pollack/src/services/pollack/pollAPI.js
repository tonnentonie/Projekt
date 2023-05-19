import axios from 'axios'

function createPoll(titel, description, options, settings, fixed){
    const response = axios.post('http://localhost:3000/poll/lack', {
        title: titel,
        description: description,
        options: options,
        setting: settings,
        fixed: fixed
      })
  return response;
}

function getPoll(shareToken){
  const response = axios.get('http://localhost:3000/poll/lack/' + shareToken)
return response;
}

function putPoll(adminToken, titel, description, options, settings, fixed){
  const response = axios.put('http://localhost:3000/poll/lack/' + adminToken, {
      title: titel,
      description: description,
      options: options,
      setting: settings,
      fixed: fixed
    })
return response;
}

function deletePoll(adminToken){
  const response = axios.delete('http://localhost:3000/poll/lack/' + adminToken)
return response;
}

export default {
    createPoll,
    getPoll,
    putPoll,
    deletePoll
};