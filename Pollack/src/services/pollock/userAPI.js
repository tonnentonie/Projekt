import axios from 'axios'
const url = "http://localhost:49712/user"

function user(name, password){
    const response = axios.post(url, {
        name: name,
        password: password
      })
  return response;
}

export default {
  user,
  
};