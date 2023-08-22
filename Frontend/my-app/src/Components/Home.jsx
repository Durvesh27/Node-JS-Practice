import React, { useContext } from 'react'
import { AuthContext } from '../MyContext'

const Home = () => {
const {state}=useContext(AuthContext)
console.log(state)
  return (
    <>
    <h1 style={{textAlign:"center"}}>
      HOME 
    </h1>
    <h3 style={{textAlign:"center",color:"grey"}}>{state.user.name}</h3>
    </>
  )
}

export default Home
