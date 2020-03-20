import React, { useState, useEffect } from 'react'
import api from '../service/api'


function Login() {
  const [loggin, setLoggin] = useState({
    'email':'teste@gmail.com',
    'password':'teste'
  })
  const [alert, setAlert] = useState(false)
  const [btnLabel, setBtnLabel] = useState('ENTRAR')
  const [btnStatus, setBtnStatus] = useState(false)

  useEffect(() => {
    document.title = 'Extras | Login'
  })

  async function handleSubmit(e) {
    e.preventDefault()
    setBtnLabel('Carregando ...')
    setBtnStatus(true)
   
    try {

      const { data } = await api.post('/login', loggin)
      //console.log(data)

      localStorage.setItem('logged', JSON.stringify(data.user))
      localStorage.setItem('token_extras', data.token)
      window.location.reload()
      /** */
    } catch (e) {
      setBtnLabel('ENTRAR')
      setBtnStatus(false)
      console.log(e)
      if (!e.response) {
        return setAlert('Erro no Servidor!')
      }

      let { field } = e.response.data[0]
      console.log(field)

      if (field === 'email') {
        setAlert('E-mail não cadastrado')
        return false;
      }

      setAlert('Senha Errada')

    }


  }

  const updateField =(e) =>{
    setAlert(false)
    setLoggin({...loggin, [e.target.name]:e.target.value })
  }
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <h5 className="card-header green white-text text-center py-4">
            {alert ?
              alert
            :
              <strong>Extras</strong>
            }

          </h5>
          <div className="card-body px-lg-5 pt-0">
            <form className="text-center" onSubmit={handleSubmit}>
              <div className="md-form">
                <input type="text" name="email" className="form-control" placeholder={'Email'}
                  value={loggin.email} onChange={updateField} autoFocus />
                {
                <label htmlFor="email" >E-mail</label>}
              </div>
              <div className="md-form">
                <input type="password" id="password" name="password" className="form-control" 
                  placeholder={'Senha'} value={loggin.password} onChange={updateField} />
                <label htmlFor="password">Senha</label>
              </div>
              <button disabled={btnStatus} className="btn btn-outline-success btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">
                {btnLabel}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login