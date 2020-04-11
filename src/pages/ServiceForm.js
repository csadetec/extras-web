import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../service/api'
import './Service.css'

import logout from '../utils/logout'

import AlertModal from '../components/AlertModal'
import Loading from '../components/Loading'
import { diffHours } from '../utils/helpers'
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
	const [h2, setH2] = useState('Cadastrar Serviço')
	const [btn, setBtn] = useState({ label: 'Salvar', disabled: false })
	const [disabled, setDisabled] = useState(true)
	//const [obs, setObs] = useState('teste')

	let  { id } = props.match.params

	const history = useHistory()

	useEffect(() => {
		if (id === undefined) {
			document.title = 'Cadastrar Serviço'
			setDisabled(false)
			setLoading(false)
			return
		}
		async function load() {
			//console.log('load user')
			const { data } = await api.get(`/services/${id}`)

			data.employees.map(r => {
				r.reason_name = r.pivot.reason_name
				r.start = r.pivot.start
				r.end = r.pivot.end
				r.qtd_hours = r.pivot.qtd_hours
				r.pivot = undefined

				return r
			})
      if(!data.obs) data.obs = undefined
      if(!data.date) data.date = undefined
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
	async function handleSubmit() {
    //e.preventDefault()

    if(validation()){
      return
    }
		setBtn({ label: 'Salvando...', disabled: true })
		/**/
    //console.log(service)
		try {
			if (id) {
				const { status, data/*, message*/ } = await api.put(`/services/${id}`, service)
				//console.log(data)
				if (data.status) {
          let find =  employees.filter( r => {
            return data.find.employee_id === r.id
          })
          data.find = ({...data.find, name:find[0].name})
          /*
          console.log(find)
          console.log(data.find)
          /** */
					setAlert({ message: 'Colaborador agendado em outro serviço', color: 'warning', employee:data.find })
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
		
			history.push(`/servicos/editar/${data.id}`)


		} catch (e) {
			console.log(e)

			logout()
		}
	}

	const handleAddEmployee = (e) => {
		setAlert(false)

		let employeeSearch = e.target.value
		setSearch(employeeSearch)

		
		employeeSearch = employeeSearch.replace(' | ', '')
		employeeSearch = employeeSearch.replace('PROFESSOR', '')
		employeeSearch = employeeSearch.replace('ANALISTA DE ÁREA DO CONHECIMENTO SÊNIOR', '')
		/**/
		//console.log(employeeSearch)
	
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

			employeesMy.sort(function(a, b){
				let x = a.name 
				let y = b.name

				return x < y ? -1 : x > y ? 1 : 0
			})

			//console.log(employeesMy)
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

  const handleSyncHours = () => {
    console.log('sicronizar horario')

    let myEmployees = service.employees.map( r => {
      r.start = service.start
      r.end = service.end
      r.qtd_hours = diffHours(r.start, r.end)
      return r
    })

    setService({...service, employees:myEmployees})

  }

  async function handleDuplicate(){
    //console.log('duplicate service')
    const serviceDuplicate = ({...service, date:null})
    
    serviceDuplicate.employees.map( r => 
      r.date = null
    )
    //console.log(serviceDuplicate)
    const { data } = await api.post('/services', serviceDuplicate)
    const { message } = data
    if (message) {
      setAlert({ message, color: 'warning' })
      setBtn({ label: 'Salvar', disabled: false })
      return;
    }
    await loadServices()
    
    setAlert({ message: 'Duplicado com Sucesso', color: 'success' })
    setBtn({ label: 'Salvar', disabled: false })
    console.log(serviceDuplicate)
    console.log(data)
    if(data.id){
      history.push(`/servicos/editar/${data.id}`)
      window.location.reload()
    }
   
  }
  const validation = () => {
  
    if(!service.date){
      let txt = `Data é Obrigatório`
      setAlert({color:'warning', message:txt})
      return true

    }

    return false
	}
	
	const title = (employee) => {
		let txt =``
		if(!disabled)txt += 'Clique Duas vezes para retirar\n'
		
		if(employee.function !== 'PROFESSOR'){
			employee.function = 'ANALISTA'
		}

		txt += `${employee.name} | ${employee.function}`
		
		return txt
	}
 	const updateField = (e) => {
    setAlert(false)
    
		setService({ ...service, [e.target.name]: e.target.value })

  }
  
  const td = {
    paddingLeft:3,    
    paddingBottom:15,
    paddingTop:5,
    borderBottom: '1px solid #ddd'
  }
  const timeStyle = {
    background:'white', borderRadius:4, padding:2, border:'1px solid #ddd', marginRight:3
  }
	return (
		<>
			{loading ?
				<Loading />
				:
				<div className="container-fluid">

					<div className="row  border-bottom " style={{marginBottom:10}}>
						<div className="col-md-5">
							<h2>{h2}</h2>
							{service.employees.length > 0 &&
								<h3>Colaboradores: {service.employees.length} | <i className="far fa-clone cursor-pointer" title="Duplicar Serviço" onClick={handleDuplicate}></i></h3> 
							}
						</div>
						<div className="col-md-7">
              <Link className="btn btn-outline-danger float-right"  to='/servicos'>Fechar</Link>

							{!disabled &&
								<button onClick={handleSubmit} className="btn btn-outline-success float-right" data-toggle="modal" data-target="#alertModal" disabled={btn.disabled}>{btn.label}</button>
							}
						</div>
					</div>
					<div className="row">

						<div className="col-md-6 mb-3">
							<div className="card">
								<h5 className="card-header green white-text text-center py-2">
									<strong>Informações do Serviço
										
									</strong>

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
													value={service.date || ''} onChange={updateField} disabled={disabled}  />
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
													value={service.end} onChange={updateField} disabled={disabled} required />

											</div>
										</div>
										{!disabled && service.reason_name && service.date && service.start && service.end  &&

											<div className="md-form mb-2">
												<input className="form-control form-control-lg" type="search" autoComplete="off" placeholder="Pesquisar Colaborador" list="employeeSearch"
													value={search} onChange={handleAddEmployee} />
													
												<datalist id="employeeSearch">
													{employees.map(r =>
														<option key={r.id} value={r.name + ' | ' + r.function}  />
														
													)}
												</datalist>
													
											</div>
										}
										<div className="form-row">
								
											<textarea 
												value={service.obs} onChange={updateField} 
												className="form-control" name="obs" placeholder="Observações" rows="3" disabled={disabled}>

											</textarea>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="card">
								<h5 className="card-header green white-text text-center  ">
									<strong>Colaboradores<i className="fas fa-sync float-right cursor-pointer" title="Sicronizar horário" onClick={handleSyncHours}></i></strong>
								</h5>
								<div className="card-body px-lg-2">
									<table className="" style={{width:'100%', borderCollapse:'collapse' }} >
										<tbody>
											{service.employees.map(r =>
												<tr key={r.id} title={r.name} className="cursor-pointer"  >
													<td onDoubleClick={() => handleDelEmployee(r.id)} style={td}
                            title={title(r)}	>
														<img style={{width:49, borderRadius:50, height:46}} 
															src={`https://visiografo.netlify.com/${r.id}.JPG`} 
															onError={(e) => {e.target.onerror = null; e.target.src='https://visiografo.netlify.com/generico.png'}}
															alt={r.name} />
													</td>
                          <td style={td}>
                            {r.name}
                            <br/>
                            <sub>
                              {r.function}
                            </sub>
                          </td>
                          <td style={td}>
														<select name="reason_name"  value={r.reason_name} style={{background:'white', borderRadius:4, padding:2, marginBottom:4}}
															onChange={ e => handleUpdateEmployee(r.id, e) } disabled={disabled} >
															<option value="">Motivo</option>
															{reasons.map(r =>
																<option key={r.id} value={r.name}>{r.name}</option>
															)}
														</select>
                            <br/>
                            <input type="time"  name="start" value={r.start} style={timeStyle} onChange={e => handleUpdateEmployee(r.id, e)}  disabled={disabled}/>
                            <input type="time"  name="end" value={r.end} style={timeStyle} onChange={e => handleUpdateEmployee(r.id, e)} disabled={disabled}/>
                            <span style={{    background:'white', borderRadius:4, padding:5, border:'1px solid #ddd', marginRight:3}}>
                              {r.qtd_hours}
                            </span>
                         
													</td>
                     
												</tr>
											)}

										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
          <AlertModal 
            color={alert.color}
            message={alert.message}
            employee={alert.employee}
          />
				</div>
			}
		</>
	)
}

export default ServiceForm