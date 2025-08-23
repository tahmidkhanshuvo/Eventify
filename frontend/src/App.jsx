import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginPage from './login/login.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <LoginPage />
    </div>
  )
}

export default App
