import React, { useEffect } from 'react'

function Home() {

  useEffect(() => {
    document.title = 'Home'
  })
  return (
    <div className="container">
      <h2>Home</h2>
      <p>
        Aplicação para gerenciar horas extras
      </p>
      <p>teste </p>
    
    </div>

  )
}

export default Home