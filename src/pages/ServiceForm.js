import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'
import './Service.css'

import logout from '../utils/logout'

import Alert from '../components/Alert'
import Loading from '../components/Loading'
import { imageExists,  diffHours } from '../utils/helpers'
import { loadServices } from '../utils/load'

const ServiceForm = (props) => {
	/** */
	const [service, setService] = useState({
		'confirm': '0',
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
	const [logged] = useState(JSON.parse(localStorage.getItem('logged')))
	const [employees] = useState(JSON.parse(localStorage.getItem('employees')))
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState('')
	const [h2, setH2] = useState('Cadastrar Usuário')
	const [btn, setBtn] = useState({ label: 'Salvar', disabled: false })
	const [disabled, setDisabled] = useState(true)
	const [obs, setObs] = useState('teste')

	const { id } = props.match.params

	const history = useHistory()

	useEffect(() => {
		if (id === undefined) {
			document.title = 'Cadastrar Usuário'
			setDisabled(false)
			setLoading(false)
			return
		}
		async function load() {
			//console.log('load user')
			const { data } = await api.get(`/services/${id}`)
			data.employees.map(r =>
				r.reason_name = r.pivot.reason_name
			)
			data.employees.map(r =>
				r.date = r.pivot.date
			)
			data.employees.map(r =>
				r.start = r.pivot.start
			)
			data.employees.map(r =>
				r.end = r.pivot.end
			)
			data.employees.map(r =>
				r.qtd_hours = r.pivot.qtd_hours
			)
			data.employees.map( r => 
				r.pivot = undefined
			)
			/** */
			//console.log(data)
			setService(data)
			setLoading(false)
			if (logged.id === data.user_id) {
				setDisabled(false)
			}
			setH2(`Editar Serviço Nº ${id} | ${data.user.name}`)
			document.title = `Editar Serviço Nº ${id}`
		}
		load()

	}, [id, logged.id])
	/** */
	async function handleSubmit(e) {
		//e.preventDefault()

		setBtn({ label: 'Salvando...', disabled: true })
		/**/
		//console.log(service)
		try {
			if (id) {
				const { status, data/*, message*/ } = await api.put(`/services/${id}`, service)
				//console.log(data)
				if (data.status) {
					setAlert({ message: 'Usuario já cadastrado', color: 'warning' })
					setBtn({ label: 'Salvar', disabled: false })

					return
				}
				if (status === 200) {
					setAlert({ message: 'Serviço Atualizado com Sucesso!', color: 'success' })
					setBtn({ label: 'Salvar', disabled: false })
					loadServices()
					//console.log('atualizado com sucesso')
					return;
				}
			}

			const { data } = await api.post('/services', service)
			const { message } = data

			if (message) {
				setAlert({ message, color: 'warning' })
				setBtn({ label: 'Salvar', disabled: false })
				return;
			}
			loadServices()
			setAlert({ message: 'Cadastrado com Sucesso', color: 'success' })
			setBtn({ label: 'Salvar', disabled: false })
			/*
			console.log('push nao carai')
			console.log(data)
			/** */
			history.push(`/servicos/${data.id}`)


		} catch (e) {
			console.log(e)

			logout()
		}
	}

	const handleAddEmployee = (e) => {
		setAlert(false)
		const employeeSearch = e.target.value
		setSearch(employeeSearch)

	
		let employeeVerify = employees.filter(r => {
			return r.name === employeeSearch
		})

		if (employeeVerify[0] === undefined) {
			return
		}

		const haveEmployee = service.employees.filter(r => {
			return r.id === employeeVerify[0].id
		})

		if (haveEmployee.length === 0) {
			employeeVerify = employeeVerify[0]
			employeeVerify = ({
				...employeeVerify, reason_name: service.reason_name, date: service.date,
				start: service.start, end: service.end, qtd_hours: (diffHours(service.start, service.end))
			})

			const employeesMy = ([...service.employees, employeeVerify])
			setService({ ...service, employees: employeesMy })
			setSearch('')
			return
		}
		setSearch(`${employeeSearch} | ADICIONE OUTRA OPÇÃO`)

		//console.log(e.target.value)
		/** */
	}

	const handleDelEmployee = (id) => {
		if (disabled) {
			return
		}
		const employeesActual = service.employees.filter(r => {
			return r.id !== id
		})


		setService({ ...service, employees: employeesActual })
		//console.log(employeesActual)
	}

	const handleUpdateEmployee = (id, e) => {
		let employeesUpdate = service.employees.filter( r => {

			if(r.id === id){

				switch(e.target.name){
					case 'reason_name':
						r.reason_name = e.target.value
						break
					case 'start':
						r.start = e.target.value
						r.qtd_hours = diffHours(r.start, r.end)
						break
					case 'end':
						r.end = e.target.value
						r.qtd_hours = diffHours(r.start, r.end)
						break
					default:
						return r
				}
			}
			return r
		})
		
		setService({...service, employees:employeesUpdate})


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
							{!disabled &&
								<button onClick={handleSubmit} className="btn btn-outline-success float-right" type="submit" disabled={btn.disabled}>{btn.label}</button>
							}

							<Link className="btn btn-outline-danger float-right" to='/servicos'>Fechar</Link>
						</div>
					</div>
					<div className="row">

						<div className="col-md-6">
							<div className="card">
								<h5 className="card-header green white-text text-center py-2">
									<strong>Informações do Serviço</strong>

								</h5>
								<div className="card-body px-lg-2">
									<form onSubmit={e => e.preventDefault()} >
										<div className="form-row mb-3">
											<div className="col-md-12">
												<select id="confirm" name="confirm" className="form-control" value={service.confirm} onChange={updateField} disabled={disabled}>
													<option value="0">PENDENTE</option>
													<option value="1">VALIDADO</option>
												</select>
											</div>

										</div>
										<div className="form-row ">

											<div className="col-md-6 mb-2 " >
												<select name="reason_name" id="reason_name" className="form-control"
													value={service.reason_name} onChange={updateField} disabled={disabled} required>
													<option value="">SELECIONE O MOTIVO</option>
													{reasons.map(r =>
														<option key={r.id} value={r.name}>{r.name}</option>
													)}

												</select>
											</div>
											<div className="col-md-6 mb-2 ">
												<input type="date" name="date" className="form-control"
													value={service.date} onChange={updateField} disabled={disabled} required />
											</div>
										</div>

										<div className="form-row mb-2">
											<div className="col-md-6">
												<label htmlFor="start" >Início</label>
												<input type="time" name="start" id="start" className="form-control" value={service.start}
													onChange={updateField} disabled={disabled} required />
											</div>
											<div className="col-md-6">
												<label htmlFor="end">Fim</label>
												<input type="time" name="end" id="end" className="form-control"
													value={service.end} onChange={updateField} required />

											</div>
										</div>
										{!disabled &&

											<div className="md-form mb-2">
												<input className="form-control form-control-lg" type="search" autoComplete="off" placeholder="Pesquisar Colaborador" list="employeeSearch"
													value={search} onChange={handleAddEmployee} />
												<datalist id="employeeSearch">
													{employees.map(r =>
														<option key={r.id} value={r.name} />
													)}
												</datalist>

											</div>
										}
										<div className="form-row">
								
											<textarea 
											autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
												value={obs} onChange={e => setObs(e.target.value)} 
											className="form-control" name="obs" placeholder="Observações" rows="3" disabled={disabled}>

											</textarea>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="card">
								<h5 className="card-header green white-text text-center py-2">
									<strong>Colaboradores</strong>
								</h5>
								<div className="card-body px-lg-2">
									<table className="table">
										<tbody>
											{service.employees.map(r =>
												<tr key={r.id} title={r.name} >
													<td onDoubleClick={() => handleDelEmployee(r.id)}
														className={`${!disabled && `cursor-pointer`} pt-2 pb-0 pr-0`}
														title={!disabled ? `Tirar do serviço!\n${r.name}` : r.name}
													>
														<img className="img-icon" src={imageExists(r.id)} alt={r.name} />
													</td>

													<td className="pl-0">
														{disabled ? r.reason_name
															:
															<select name="reason_name" id="" className="input-employee" value={r.reason_name} 
																onChange={ e => handleUpdateEmployee(r.id, e) } >
																<option value="">Motivo</option>
																{reasons.map(r =>
																	<option key={r.id} value={r.name}>{r.name}</option>
																)}
															</select>
														}
													</td>
													{disabled ?
														<td>r.start - r.end</td>
														:
														<>
															<td className="pl-0">
																<input type="time" className="input-employee-time" name="start" value={r.start} onChange={e => handleUpdateEmployee(r.id, e)} />
															</td>
															<td className="pl-0">
																<input type="time" className="input-employee-time" name="end" value={r.end} onChange={e => handleUpdateEmployee(r.id, e)} />
															</td>
														</>
													}
													<td className="pl-0">
														{disabled ? 
															r.qtd_hours
														:
														<input type="time" className="input-employee-time" value={r.qtd_hours} disabled={true} />

														}
													</td>
												</tr>
											)}

										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<Alert message={alert.message} color={alert.color} />
				</div>
			}
		</>
	)
}

export default ServiceForm