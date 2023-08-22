import { createContext, useEffect, useReducer } from "react";

export const AuthContext=createContext();

const initialValue={user:null}

const reducer=(state,action)=>{
switch(action.type){
case "login":
return {user:action.payload}

case "logout":
return {user:null}

default:
return state
}
}

const AuthProvider=({children})=>{
const[state,dispatch]=useReducer(reducer,initialValue)

function Login(userDetails){
dispatch({
type:"login",
payload:userDetails
})
}

return(
<AuthContext.Provider value={{state,Login}}>
{children}
</AuthContext.Provider>
)

}
export default AuthProvider;