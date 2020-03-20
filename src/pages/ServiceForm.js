import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'
import logout from '../utils/logout'

import Alert from '../components/Alert'
import Loading from '../components/Loading'

import { loadServices } from '../utils/load'

const ServiceForm = (props) => {
	/** */
	const [service, setService] = useState({
		'email': '',
		'password': '',
		'name': '',
		'profile_name': ''
	})

	const [profiles] = useState(JSON.parse(localStorage.getItem('profiles')))
	const [reasons] = useState(JSON.parse(localStorage.getItem('reasons')))
	const [alert, setAlert] = useState({
		'message': '',
		'color': ''
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
			const { data } = await api.get(`/services/${id}`)
			setService(data)
			setH2('Editar Servico')
			setLoading(false)
			document.title = 'Editar Usuário'
		}
		load()

	}, [id])
	/** */
	async function handleSubmit(e) {
		e.preventDefault()
		setBtn({ label: 'Salvando...', disabled: true })

		console.log(service)
		return;
		/** */
		try {
			if (id) {
				const { status } = await api.put(`/services/${id}`, service)

				//console.log(data)
				if (status === 200) {

					//setAlert('Usuário Atualizado com Sucesso')
					setAlert({ message: 'Usuário Atualizado com Sucesso!', color: 'success' })
					setBtn({ label: 'Salvar', disabled: false })
					loadServices()
					return;
				}
			}

			const { data } = await api.post('/services', service)
			const { message } = data
			console.log(data)
			if (message) {
				setAlert({ message, color: 'warning' })
				setBtn({ label: 'Salvar', disabled: false })
				return;
			}
			await loadServices()
			history.push('/usuarios/listar')


		} catch (e) {

			logout()
		}
	}

	const updateField = (e) => {

		setAlert(false)
		setService({ ...service, [e.target.name]: e.target.value })

	}
	return (
		<div className="container-fluid pb-5">
			<div className="row mb-4">
				<div className="col-md-12 border-bottom">
					<h2>{h2}</h2>
				</div>
			</div>
			<div className="row">
				<button className="btn btn-outline-indigo btn-rounded  z-depth-0 my-4 waves-effect" type="submit" disabled={btn.disabled}>{btn.label}</button>
				<Link className="btn btn-outline-danger" to='/usuarios'>Fechar</Link>

			</div>
			{loading ?
				<Loading />
				:
				<div className="row">
					<div className="col-md-6">
						<div className="card">
							<h5 className="card-header green white-text text-center py-4">
								<strong>Informações do Serviço</strong>
								<Alert msg={alert.message} color={alert.color} />
							</h5>
							<div className="card-body px-lg-5">
								<form >
									<div className="form-row mb-3">
										<div className="col-md-12">
											<select id="reasons" name="reasons" className="form-control">
												<option value="0">PENDENTE</option>
												<option value="1">VALIDADO</option>
											</select>
										</div>

									</div>
									<div className="form-row ">

										<div className="col-md-6 mb-3 " >
											<select name="id_motivo" id="id_motivo" className="form-control" required>
												<option value="">SELECIONE O MOTIVO</option>
												{reasons.map(r =>
													<option key={r.id} value={r.name}>{r.name}</option>
												)}

											</select>
										</div>
										<div className="col-md-6 mb-3 ">
											<input type="date" name="data" id="data" className="form-control" required />
										</div>
									</div>

									<div className="form-row mb-3">
										<div className="col-md-6">
											<label htmlFor="start" >Início</label>
											<input type="time" name="start" id="start" className="form-control" required />
										</div>
										<div className="col-md-6">
											<label htmlFor="end">Fim</label>
											<input type="time" name="end" id="end" className="form-control" required />

										</div>
									</div>
									<div className="md-form mb-3">
										<input className="form-control form-control-lg " type="search" autoComplete="off" placeholder="Pesquisar Colaborador" id="employees" list="employees" />
										<datalist id="employees">

										</datalist>
									</div>
									<div className="form-row">
										<textarea className="form-control" name="obs" id="obs" placeholder="Observações"></textarea>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>

			}
		</div>
	)
}

export default ServiceForm