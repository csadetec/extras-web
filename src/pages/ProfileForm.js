import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'
import logout from '../utils/logout'

//import Alert from '../components/Alert'
import Loading from '../components/Loading'
import AlertModal from '../components/AlertModal'

import { loadUsers, loadProfiles} from '../utils/load'

const UserForm = (props) => {
	/** */
	const [profile, setProfile] = useState({
		'name': '',
	})

	const [alert, setAlert] = useState({
		message:'',
    color:'',
  
	})
	const [loading, setLoading] = useState(true)
	const [h2, setH2] = useState('Cadastrar Perfil')
	const [btn, setBtn] = useState({ label: 'Salvar', disabled: false })
	const { id } = props.match.params

	const history = useHistory()

	useEffect(() => {
		if (id === undefined) {
			document.title = 'Cadastrar Perfil'
			setLoading(false)
			return
		}
		async function load() {
			const { data } = await api.get(`/profiles/${id}`)
			setProfile(data)
			setH2('Editar Perfil')
			setLoading(false)
			document.title = 'Editar Perfil'
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
				const { status } = await api.put(`/profiles/${id}`, profile)

				//console.log(data)
				if (status === 200) {
        
					setAlert({message:'Perfil Atualizado com Sucesso!', color:'success'})
					setBtn({ label: 'Salvar', disabled: false })
					loadProfiles()
					loadUsers()
					//loadLogged(logg)
					return;
				}
			}

			const { data } = await api.post('/profiles', profile)
			const { message } = data
			console.log(data)
			if (message) {
				setAlert({message, color:'warning'})
				setBtn({ label: 'Salvar', disabled: false })
				return;
			}
			/*
			await loadUsers()
			await loadProfiles()
			/**/
			history.push('/perfis')

      window.location.reload()



		} catch (e) {

			logout()
		}
	}

	const updateField = (e) => {
	
		setAlert(false)
		setProfile({ ...profile, [e.target.name]:e.target.value })


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
								<strong>Informações do Perfil</strong>
                {/*
								<Alert msg={alert.message} color={alert.color} />
                */}

							</h5>
							<div className="card-body px-lg-5">

								<form className="text-center" onSubmit={handleSubmit}>

								  <div className="md-form mt-3">
							      <input type="text" name="name" id="name" className="form-control" value={profile.name}
							        onChange={updateField} placeholder="Name" required  />
							      {profile.name &&
							        <label htmlFor="name" >Nome</label>
							      }
							    </div>
			 
									<button className="btn btn-outline-indigo btn-rounded" type="submit" disabled={btn.disabled} data-toggle="modal" data-target="#alertModal">{btn.label}</button>
									<Link className="btn btn-outline-danger" to='/perfis'>Fechar</Link>

								</form>
							</div>

						</div>
					</div>
				}
			</div>
      <AlertModal 
        color={alert.color}
        message={alert.message}
      />
    </div>
	)
}

export default UserForm