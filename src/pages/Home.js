import React, {useEffect} from 'react'

function Home() {

  useEffect(() => {
    document.title = 'Home'
  })
  return(
    <div className="container">
      <h2>Home</h2>
      <p>Aplicação para organização das Horas extras dos professores</p>
      <p>terçou 13:23</p>
    </div>

  )
}

export default Home