import React from 'react'
import Layout from '../components/Layout.jsx'

const Home = () => {
  return (
    <div>
      <Layout/>
      <div className="home-content">
      <h1>Welcome to Eventify</h1>
      </div>
      <Layout/>
    </div>
  )
}

export default Home