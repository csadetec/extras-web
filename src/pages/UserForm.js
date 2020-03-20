import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'
import logout from '../utils/logout'

import Alert from '../components/Alert'
import Loading from '../components/Loading'

import { loadUsers, loadServices } from '../utils/load'

const UserForm = (props) => {
	/** */
	const [user, setUser] = useState({
		'email': '',
		'password': '',
		'name': '',
		'profile_name': ''
	})

	const [profiles] = useState(JSON.parse(localStorage.getItem('profiles')))
	const [alert, setAlert] = useState({
		'message':'',
		'color':''
	})
	const [loading, setLoading] = useState(true)
	const [h2, setH2] = useState('Cadastrar Usuário')
	const [btn, setBtn] = useState({ label: 'Salvar', disabled: false })
	const { id } = props.match.params

	const history = useHistory()

	useEffect(() => {
		if (id === undefined) {
			document.title = 'Cadastrar Usuário'
			setLoading(false)
			return
		}
		async function load() {
			console.log('load user')
			const { data } = await api.get(`/users/${id}`)
			setUser({ ...data, password: '' })
			setH2('Editar Usuário')
			setLoading(false)
			document.title = 'Editar Usuário'
		}
		load()

	}, [id])
	/** */
	async function handleSubmit(e) {
		e.preventDefault()
		setBtn({ label: 'Salvando...', disabled: true })
		/*
		console.log(user)
		return ;
		/** */
		try {
			if (id) {
				const { status } = await api.put(`/users/${id}`, user)

				//console.log(data)
				if (status === 200) {

					//setAlert('Usuário Atualizado com Sucesso')
					setAlert({message:'Usuário Atualizado com Sucesso!', color:'success'})
					setBtn({ label: 'Salvar', disabled: false })
					loadUsers()
					loadServices()
					return;
				}
			}

			const { data } = await api.post('/users', user)
			const { message } = data
			console.log(data)
			if (message) {
				setAlert({message, color:'warning'})
				setBtn({ label: 'Salvar', disabled: false })
				return;
			}
			await loadUsers()
			await loadServices()
			history.push('/usuarios/listar')


		} catch (e) {

			logout()
		}
	}

	const updateField = (e) => {
	
		setAlert(false)
		setUser({ ...user, [e.target.name]:e.target.value })

		console.log(user)

	}
	return (
		<div className="container pb-5">
			<div className="row mb-4">
				<div className="col-md-12 border-bottom">
					<h2>{h2}</h2>
				</div>
			</div>
			<div className="row justify-content-center">
				{loading ?
					<Loading />
					:
					<div className="col-md-8">

						<div className="card">

							<h5 className="card-header green white-text text-center py-4">
								<strong>Informações do Usuário</strong>
								<Alert msg={alert.message} color={alert.color} />
							

							</h5>
							<div className="card-body px-lg-5">

								<form className="text-center" onSubmit={handleSubmit}>

								  <div className="md-form mt-3">
							      <input type="email" name="email" id="email" className="form-control" value={user.email}
							        onChange={updateField} placeholder="Email" required  />
							      {user.email &&
							        <label htmlFor="email" >E-mail</label>
							      }
							    </div>
			  					<div className="md-form mt-3">
							      <input type="password" name="password" id="password" className="form-control" value={user.password}
							        onChange={updateField} placeholder="Password"  />
							      {user.password &&
							        <label htmlFor="email" >Password</label>
							      }
							    </div>
			    				<div className="md-form mt-3">
							      <input type="text" name="name" id="name" className="form-control" value={user.name}
							        onChange={updateField} placeholder="Name"  />
							      {user.name &&
							        <label htmlFor="name" >Name</label>
							      }
							    </div>

					  			<div className="form-row">
							      <select value={user.profile_name} className="form-control"  
							        onChange={updateField} required>
							        <option value="">Selecione o Perfil</option>
							        {profiles.map(r =>
							          <option key={r.id} value={r.name}>{r.name}</option>
							        )}
							      </select>
							    </div>

									<button className="btn btn-outline-indigo btn-rounded  z-depth-0 my-4 waves-effect" type="submit" disabled={btn.disabled}>{btn.label}</button>
									<Link className="btn btn-outline-danger" to='/usuarios'>Fechar</Link>

								</form>
							</div>

						</div>
					</div>
				}
			</div>
		</div>
	)
}

export default UserForm