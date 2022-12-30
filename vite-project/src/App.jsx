import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {

  return (
    <div className="App">
      
    <form action ="/signin" method='post'>
    <h2>Login Page</h2>
      <input type="text" name = "email" placeholder='Please enter email'/>
      <input type="text" name = "password" placeholder='Please enter password'/>
      <input type="submit" value= "Signup"/>
    </form>
    </div>
  )
}

export default App
