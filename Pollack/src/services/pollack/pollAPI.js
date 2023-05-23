import axios from 'axios'
const url = "http://localhost:49712/poll/lack/"

function createPoll(titel, description, options, settings, fixed){
    const response = axios.post(url, {
        title: titel,
        description: description,
        options: options,
        setting: settings,
        fixed: fixed
      })
  return response;
}

function getPoll(shareToken){
  const response = axios.get(url + shareToken)
return response;
}


function putPoll(adminToken, titel, description, options, settings, fixed){
  const response = axios.put(url + adminToken, {
      title: titel,
      description: description,
      options: options,
      setting: settings,
      fixed: fixed
    })
return response;
}

function deletePoll(adminToken){
  const response = axios.delete(url + adminToken)
return response;
}

const requests = {
    	createPoll(titel, description, options, settings, fixed){
      const response = axios.post(url, {
        title: titel,
        description: description,
        options: options,
        setting: settings,
        fixed: fixed
      })
    return response;
    }

}

export default {
    requests,
    createPoll,
    getPoll,
    putPoll,
    deletePoll
};