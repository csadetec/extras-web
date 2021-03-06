import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


import './Navbar.css'

const Navbar = () => {
  const [home, setHome] = useState('nav-item active')

  const [servicos, setServicos] = useState('nav-item')
  const [relatorios, setRelatorios] = useState('nav-item')
  //const [teste, setTeste] = useState('nav-item')
  /*
  const [usuarios, setUsuarios] = useState('nav-item')
  const [colaboradores, setColaboradores] = useState('nav-item')
  /** */
  const [logged] = useState(JSON.parse(localStorage.getItem('logged')))

  useEffect(() => {
    handleActive()
  }, [])


  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
    //console.log('baiii')
  }

  const handleActive = () => {
    setHome('nav-item')
    setServicos('nav-item')
    setRelatorios('nav-item')
    //setTeste('nav-item')
    /*
    setUsuarios('nav-item')
    setColaboradores('nav-item')
    /** */
    let pathname = window.location.pathname
    /// console.log(pathname)
    if (pathname === '/servicos')
      return setServicos('nav-item active')

    if (pathname === '/relatorios')
      return setRelatorios('nav-item active')

    if(pathname === '/home')
      return setHome('nav-item active')
    /*
    if (pathname === '/teste')
      return setTeste('nav-item active')
/*
    if (pathname === '/colaboradores')
      return setColaboradores('nav-item active')
    /** */
  }
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark green mb-4 fixed-top">
        <a className="navbar-brand" href="/">Extras</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="basicExampleNav">
          <ul className="navbar-nav ml-auto mr-5 " onClick={handleActive}>
            <li className={home}>
              <Link className="nav-link" to="/home">Home</Link>
            </li>

            <li className={servicos}>
              <Link className="nav-link" to="/servicos">Serviços</Link>
            </li>
            <li className={relatorios}>
              <Link className="nav-link" to="/relatorios">Relatórios</Link>
            </li>
            {/*}
            <li className={teste}>
              <Link className="nav-link" to="/teste">teste pdf</Link>
            </li>
            */}
            <li className="nav-item dropdown">
              <div className="nav-link dropdown-toggle " id="navbarDropdownMenuLink" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" style={{cursor:'pointer'}}  >{logged.name} | {logged.profile_name}</div>
              <div className="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                <Link className="dropdown-item" to="/usuarios" onClick={handleActive}  >Usuários</Link>
                <Link className="dropdown-item" to="/colaboradores" onClick={handleActive}  >Colaboradores</Link>
                <Link className="dropdown-item" to="/perfis" onClick={handleActive}  >Perfis</Link>

                <a className="dropdown-item" href="/" onClick={handleLogout}>Sair</a>
              </div>
            </li>

          </ul>
        </div>
      </nav>
    </header>
  )

}

export default Navbar