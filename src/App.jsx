import React from 'react'
import Hero from "./components/Hero"
import Leader from "./components/Leader"
import Creations from './components/Creations'

const App = () => {
  return (
    <div className='border-2 border-red-400'>
      <Hero/>
      <Leader/>
      <Creations/>
    </div>
  )
}

export default App