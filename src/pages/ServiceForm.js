import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'
import logout from '../utils/logout'

import Alert from '../components/Alert'
import Loading from '../components/Loading'
import {imageExists, formatDate} from '../utils/helpers'
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
	const [employees] =  useState(JSON.parse(localStorage.getItem('employees')))
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState('')
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
			//console.log('load user')
			const { data } = await api.get(`/services/${id}`)
			data.employees.map( r => 
				r.reason_name = r.pivot.reason_name
			)
			data.employees.map( r => 
				r.date = r.pivot.date
			)
			data.employees.map( r => 
				r.start = r.pivot.start
			)
			data.employees.map( r=> 
				r.end = r.pivot.end
			)
			data.employees.map( r => 
				r.qtd_hours = r.pivot.qtd_hours
			)
			/** */
			//console.log(data)
			setService(data)
			
			setH2(`Editar Serviço Nº ${id}`)
			setLoading(false)
			document.title = `Editar Serviço Nº ${id}`
		}
		load()

	}, [id])
	/** */
	async function handleSubmit(e) {
		//e.preventDefault()
		
		setBtn({ label: 'Salvando...', disabled: true })
		/**/
		//console.log(service)
		try {
			if (id) {
				const { status, data, message } = await api.put(`/services/${id}`, service)
				console.log(data)
				if(data.status){
					setAlert({message:'Usuario já cadastrado', color:'warning'})
					setBtn({ label: 'Salvar', disabled: false })

					return 
				}
				if (status === 200) {
					setAlert({ message: 'Serviço Atualizado com Sucesso!', color: 'success' })
					setBtn({ label: 'Salvar', disabled: false })
					loadServices()
					console.log('atualizado com sucesso')
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
			setAlert({ message:'Cadastrado com Sucesso', color: 'success' })
			setBtn({ label: 'Salvar', disabled: false })
			console.log('push nao carai')
			console.log(data)
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

		let employeeVerify = employees.filter( r => { 
			return r.name === employeeSearch
		})	

		if(employeeVerify[0]  === undefined ){
			return
		}

		const haveEmployee = service.employees.filter( r => {
			return r.id === employeeVerify[0].id
		})

		if(haveEmployee.length === 0){
			employeeVerify = employeeVerify[0]
			employeeVerify = ({...employeeVerify, reason_name:service.reason_name, date:service.date, 
				start:service.start, end: service.end, qtd_hours:(diffHours(service.start, service.end))})

			const employeesMy = ([...service.employees, employeeVerify])
			setService({...service, employees:employeesMy })
			setSearch('')
			return
		}
		setSearch(`${employeeSearch} | ADICIONE OUTRA OPÇÃO`)

		//console.log(e.target.value)
	}

	const diffHours = (startComplete, endComplete) => {
		
		const start = startComplete.split(':')
		const end = endComplete.split(':')

		const minuteStart = parseInt(start[0]*60) + parseInt(start[1])
		const minuteEnd = parseInt(end[0]*60) + parseInt(end[1])

		let minuteDiff = minuteEnd - minuteStart
			
		if(minuteDiff < 0){
			minuteDiff = (24*60) -minuteDiff
		}

		let hours = Math.floor( minuteDiff / 60 )
		let minutes = minuteDiff%60

		hours = hours < 9 ? `0${hours}` : hours
		minutes = minutes < 9 ? `0${minutes}` : minutes

		return `${hours}:${minutes}`
	}

	const handleDelEmployee = (id) => {
		const employeesActual = service.employees.filter( r=> {
			return r.id !== id
		})


		setService({...service, employees:employeesActual})
		//console.log(employeesActual)
	}


	const updateField = (e) => {

		//setAlert(false)
		let dateForm = service.date
		let employeesUpdate = service.employees
		employeesUpdate.map( r => 
			r.date = dateForm
		)
		console.log(dateForm)
		console.log(employeesUpdate)
		setService({...service, employees:employeesUpdate})
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

						<div className="col-md-5">
							<div className="card">
								<h5 className="card-header green white-text text-center py-4">
									<strong>Informações do Serviço</strong>
						
								</h5>
								<div className="card-body px-lg-2">
									<form onSubmit={e => e.preventDefault()} >
										<div className="form-row mb-3">
											<div className="col-md-12">
												<select id="confirm" name="confirm" className="form-control" value={service.confirm} onChange={updateField}>
													<option value="0">PENDENTE</option>
													<option value="1">VALIDADO</option>
												</select>
											</div>

										</div>
										<div className="form-row ">

											<div className="col-md-6 mb-2 " >
												<select name="reason_name" id="reason_name" className="form-control"
													value={service.reason_name} onChange={updateField} required>
													<option value="">SELECIONE O MOTIVO</option>
													{reasons.map(r =>
														<option key={r.id} value={r.name}>{r.name}</option>
													)}

												</select>
											</div>
											<div className="col-md-6 mb-2 ">
												<input type="date" name="date"  className="form-control"
													value={service.date} onChange={updateField} required />
											</div>
										</div>

										<div className="form-row mb-2">
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
										<div className="md-form mb-2">
											<input className="form-control form-control-lg" type="search" autoComplete="off" placeholder="Pesquisar Colaborador" list="employeeSearch" 
												value={search} onChange={handleAddEmployee}/>
											<datalist id="employeeSearch">
												{employees.map( r => 
													<option key={r.id} value={r.name} />
												)}
											</datalist>
										</div>
										<div className="form-row">
											<textarea value={service.obs} onChange={updateField} className="form-control" name="obs" id="obs" placeholder="Observações" rows="2">

											</textarea>
										</div>
									</form>
								</div>
							</div>

						</div>
						<div className="col-md-7">
							<div className="card">
								<h5 className="card-header green white-text text-center py-4">
									<strong>Colaboradores</strong>
								</h5>
								<div className="card-body px-lg-2">
									<table className="table">
										<tbody>
											{service.employees.map(r =>
												<tr key={r.id} >
													<td onDoubleClick={() => handleDelEmployee(r.id)} 
														className="pt-1 pb-1 cursor-pointer" 
														title="Dois cliques para excluir do serviço" >
														
														<img className="img-icon" src={imageExists(r.id)} alt={r.name}/>
														{r.name}
													</td>
													<td>{r.reason_name}</td>
													<td>{r.start} - {r.end}</td>
													<td>{formatDate(r.date)} - {r.qtd_hours}</td>
											
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