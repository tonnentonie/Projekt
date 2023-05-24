import axios from 'axios'
const url = "http://localhost:12/user/"




function createUser(name, password){
    const response = axios.post(url, {
        name: name,
        password: password
      })
  return response;
}

function createAPIKey(name, password){
  const response = axios.post(url + "key", {
    name: name,
    password: password
  })
return response;
}

function getUser(name){
  const response = axios.get(url + name)
  return response;
}

function deleteUser(){

}

export default {
  createUser,
  createAPIKey,
  getUser,
  deleteUser
  
};