import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://realestate-trn6.onrender.com/api",
  withCredentials: true,
});
export default apiRequest;