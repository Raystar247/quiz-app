import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Glasslike } from './components/glasslike'

function App() {

  return (
    <>
      <Glasslike colorScheme="blue" hoverEffect style={{ padding: '2rem' }}>
        Default (div)
      </Glasslike>
    </>
  )
}

export default App
