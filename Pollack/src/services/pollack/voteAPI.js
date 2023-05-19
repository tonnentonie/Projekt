import axios from 'axios'

function createVote(shareToken, name, choice){
  const response = axios.post('http://localhost:3000/vote/lack/' + shareToken, {
    owner: {
      name: name
    },
    choice: choice
  })
  return response;
}

function getVote(editToken){
  const response = axios.get('http://localhost:3000/vote/lack/' + editToken)
  return response;
}

function putVote(editToken, name, choice){
  const response = axios.put('http://localhost:3000/vote/lack/' + editToken, {
    owner: {
      name: name
    },
    choice: choice
  })
  return response;
}

function deleteVote(editToken){
  const response = axios.delete('http://localhost:3000/vote/lack/' + editToken)
  return response;
}

export default {
  createVote,
  getVote,
  putVote,
  deleteVote
};