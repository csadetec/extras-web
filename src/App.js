import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import {loadServices, loadEmployees ,loadUsers, loadProfiles, loadReasons} from './utils/load'


import './pages/style.css'
//components default
import Navbar from './components/Navbar'
import Footer from './components/Footer'

//pages basic
import Home from './pages/Home'
import Login from './pages/Login'

//pages Service
import ServiceList from './pages/ServiceList'
import ServiceForm from './pages/ServiceForm'

//pages  reports
import ReportList from './pages/ReportList'

//pages users
import UserList from './pages/UserList'
import UserForm from './pages/UserForm'

function App() {
  const token = localStorage.getItem('token_extras')

  useEffect(() => {
    if(token){
     loadServices()
     loadEmployees()
     loadUsers()
     loadProfiles()
     loadReasons()
    }

  },[token])
  return (
    <>
      {token ?
        <Router>
          <Navbar />
          <Switch>
            <Route exact={true} path='/' component={Home} />
            <Route path='/home' component={Home} />

            <Route exact={true} path='/servicos' component={ServiceList}/>
            <Route path='/servicos/:id' component={ServiceForm}/>
            
            <Route exact={true} path='/relatorios' component={ReportList} />

            <Route exact={true} path='/usuarios' component={UserList} />
            <Route path='/usuarios/cadastrar' component={UserForm} />
            <Route path='/usuarios/:id' component={UserForm} />            
            
          </Switch>
          <Footer />
        </Router>
        :
        <Router>
          <Route exact={true} path='/' component={Login} />
          <Redirect path='*' to='/' />
        </Router>
      }

    </>
  );
}

export default App;
