import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

//components default
import Navbar from './components/Navbar'
import Footer from './components/Footer'

//pages basic
import Home from './pages/Home'
import Login from './pages/Login'

//pages Service
import ServiceList from './pages/ServiceList'




function App() {
  const token = localStorage.getItem('token_extras')

  useEffect(() => {
    if(token){
      console.log('teste')
    }else{
      console.log('sem token')
    }

  },[token])
  return (
    <>
      {token ?
        <Router>
          <Navbar />
          <Switch>
            <Route exact={true} path='/' component={Home} />

            <ServiceList exact={true} path='/servicos'/>
            
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
