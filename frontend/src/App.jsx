import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginPage from './login/login.jsx'
import SignUpPage from './signup/signup.jsx'
function App() {
  const [count, setCount] = useState(0)
// <LoginPage />
  return (
    <div className="w-full h-full">
      <SignUpPage/>
    </div>
  )
}

export default App
