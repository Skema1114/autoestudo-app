import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://192.168.1.201:3333'
  baseURL: 'http://192.168.2.130:3333'
  //baseURL: 'http://localhost:3333'
});

export default api;