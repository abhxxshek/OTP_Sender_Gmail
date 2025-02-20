import React from 'react'
import Form from './components/Form'
import { Route, Routes } from 'react-router-dom'
import SuccessPage from './components/SuccessPage'
import './App.css'

const App = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Form/>}></Route>
        <Route path='/success-page' element={<SuccessPage/>}></Route>
    </Routes>
     
    </>
  )
}

export default App