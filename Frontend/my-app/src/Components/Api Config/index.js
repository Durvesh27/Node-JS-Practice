import axios from "axios"

const token=JSON.parse(localStorage.getItem("Token"))
if(token){
var api=axios.create({
baseURL: "https://awdiz-practice-backend.onrender.com/api/v1",
headers:{"Authorization":`Bearer${token}`}
})
}
else{
    var api = axios.create({
        baseURL: 'https://awdiz-practice-backend.onrender.com/api/v1'
    })
}
export default api;