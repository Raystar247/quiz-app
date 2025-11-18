import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Glasslike } from './components/glasslike'
import SignInPage from './features/user/interfaces/SignInPage'

function App() {

  return (
    <>
      <Glasslike colorScheme="blue" style={{ padding: '2rem' }}>
        Default (div)
      </Glasslike>
      <SignInPage />
    </>
  )
}

export default App
