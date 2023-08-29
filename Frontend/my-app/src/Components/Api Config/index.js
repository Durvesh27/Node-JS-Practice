import axios from "axios"

const token=JSON.parse(localStorage.getItem("Token"))

const api=axios.create({
baseURL: "http://localhost:8000",
headers:{"Authorization":`Bearer${token}`}
})

export default api;