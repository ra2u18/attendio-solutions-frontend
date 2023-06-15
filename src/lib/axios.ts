import axios from 'axios';

const serverURL = 'http://localhost:5000'; // import.meta.env.VITE_SERVER_URL;

export default axios.create({ baseURL: serverURL });

export const axiosPrivate = axios.create({
  baseURL: serverURL,
  headers: { 'Content-type': 'application/json' },
  withCredentials: true,
});
