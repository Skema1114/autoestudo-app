import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://192.168.1.203:3333'
  baseURL: 'http://192.168.2.71:3333'
  //baseURL: 'http://localhost:3333'
  //baseURL: 'https://autoestudo.herokuapp.com/'
});

export default api;