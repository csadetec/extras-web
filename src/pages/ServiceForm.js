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
		'confirm': '',
		'reason_name': '',
		'date': '',
		'start': '',
		'end': '',
		'employees': [],
		'obs': ''
	})

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
			console.log(data)
			data.employees.map( r=> 
				r.start = r.pivot.start
			)
			data.employees.map( r=> 
				r.end = r.pivot.end
			)
			setService(data)
			setH2(`Editar Serviço Nº ${id}`)
			setLoading(false)
			document.title = `Editar Serviço Nº ${id}`
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
		<>
			{loading ?
				<Loading />
				:

				<div className="container-fluid pb-5">

					<div className="row mb-4 border-bottom">
						<div className="col-md-6">
							<h2>{h2}</h2>
						</div>
						<div className="col-md-6">
							<button onClick={handleSubmit} className="btn btn-outline-success float-right" type="submit" disabled={btn.disabled}>{btn.label}</button>
							<Link className="btn btn-outline-danger float-right" to='/servicos'>Fechar</Link>
						</div>
					</div>
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
												<select id="confirm" name="confirm" className="form-control" value={service.confirm} onChange={updateField}>
													<option value="0">PENDENTE</option>
													<option value="1">VALIDADO</option>
												</select>
											</div>

										</div>
										<div className="form-row ">

											<div className="col-md-6 mb-3 " >
												<select name="reason_name" id="reason_name" className="form-control"
													value={service.reason_name} onChange={updateField} required>
													<option value="">SELECIONE O MOTIVO</option>
													{reasons.map(r =>
														<option key={r.id} value={r.name}>{r.name}</option>
													)}

												</select>
											</div>
											<div className="col-md-6 mb-3 ">
												<input type="date" name="data" id="data" className="form-control"
													value={service.date} onChange={updateField} required />
											</div>
										</div>

										<div className="form-row mb-3">
											<div className="col-md-6">
												<label htmlFor="start" >Início</label>
												<input type="time" name="start" id="start" className="form-control" value={service.start}
													onChange={updateField} required />
											</div>
											<div className="col-md-6">
												<label htmlFor="end">Fim</label>
												<input type="time" name="end" id="end" className="form-control"
													value={service.end} onChange={updateField} required />

											</div>
										</div>
										<div className="md-form mb-3">
											<input className="form-control form-control-lg " type="search" autoComplete="off" placeholder="Pesquisar Colaborador" id="employees" list="employees" />
											<datalist id="employees">

											</datalist>
										</div>
										<div className="form-row">
											<textarea value={service.obs} onChange={updateField} className="form-control" name="obs" id="obs" placeholder="Observações">

											</textarea>
										</div>
									</form>
								</div>
							</div>

						</div>
						<div className="col-md-6">
							<div className="card">
								<h5 className="card-header green white-text text-center py-4">
									<strong>Colaboradores</strong>
								</h5>
								<div className="card-body px-lg-5">
									<table className="table">
										<tbody>
											{service.employees.map(r =>
												<tr key={r.id}>
													<td>{r.name}</td>
													<td>{r.start}</td>
													<td>{r.end}</td>
												</tr>
											)}

										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			}
		</>
	)
}

export default ServiceForm