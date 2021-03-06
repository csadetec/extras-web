import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { formatDate } from '../utils/helpers'

function ServiceList() {
	const [services] = useState(JSON.parse(localStorage.getItem('services')))
	let history = useHistory()

	useEffect(() => {
		document.title = 'Serviços'
		//console.log(services)

	}, [])

	const handleClick = (id) => {
		//console.log('redirect ', id)
		history.push(`/servicos/editar/${id}`)
  }
  
  const title = (employees) => {
    let txt = ``
    +`Editar Serviço\n\n`
    +`Colaboradores\n`
    
    txt += employees.map( r =>{
      return `\n${r.name} | ${r.function ===  `PROFESSOR`   ? `PROFESSOR` : `ANALISTA`}`
    })
    /** */
    //console.log(services)
    return txt
  }
	return (
		<div className="container" >
			<div className="row mb-3">
				<div className="col-md-12 border-bottom">
					<Link type="button" className="btn btn-outline-green float-right" to='/servicos/cadastrar'>Cadastrar Serviço</Link>

					<h2>Serviços</h2>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">COD.</th>
								<th scope="col">Data</th>
								<th scope="col">Motivo</th>
								<th scope="col">Criador</th>
								<th scope="col">Status</th>
							</tr>
						</thead>
						<tbody>

							{services.map(r =>
                <tr key={r.id}
                  title={title(r.employees)}
									onClick={() => handleClick(r.id)} className="cursor-pointer">
									<th>{r.id}</th>
									<td>
											<strong>{formatDate(r.date)}</strong>
											<br/>
										{r.start} - {r.end}
									</td>
									<td>{r.reason_name}</td>
									<td>{r.user.name}</td>
									<td>
										{r.confirm ?
											<i className="fas fa-check-circle icon-green"></i>
											:
											<i className="fas fa-exclamation-circle icon-orange"></i>
										}
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div >
	)
}

export default ServiceList