import axios from 'axios'
const url = "http://localhost:12/vote/lack/"

function createVote(shareToken, name, choice){
  const response = axios.post(url + shareToken, {
    owner: {
      name: name
    },
    choice: choice
  })
  return response;
}

function getVote(editToken){
  const response = axios.get(url + editToken)
  return response;
}

function putVote(editToken, name, choice){
  const response = axios.put(url + editToken, {
    owner: {
      name: name
    },
    choice: choice
  })
  return response;
}

function deleteVote(editToken){
  const response = axios.delete(url + editToken)
  return response;
}

export default {
  createVote,
  getVote,
  putVote,
  deleteVote
};