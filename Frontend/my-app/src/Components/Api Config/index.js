import axios from "axios"

const token=JSON.parse(localStorage.getItem("Token"))
if(token){
var api=axios.create({
baseURL: "http://localhost:8000/api/v1",
headers:{"Authorization":`Bearer${token}`}
})
}
else{
    var api = axios.create({
        baseURL: 'http://localhost:8000/api/v1'
    })
}
export default api;