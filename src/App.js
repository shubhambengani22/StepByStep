import React, { useEffect, useState } from 'react'
import './App.css'
import Editor from './components/EditorWithoutQuestion'
import Landing from './components/Landing'
import Nav from './components/Nav'

function App() {
  return (
    <div className='App'>
      {/* <Nav />
      <Editor /> */}
      <Landing />
    </div>
  )
}

export default App
