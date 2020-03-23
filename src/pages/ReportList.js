import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/helpers'


function ReportList() {
	const [reports, setReports] = useState(JSON.parse(localStorage.getItem('reports')))
	//console.log(users)
	let cont = 1
	useEffect(() => {
		document.title = 'Relatório'
		//console.log(reports)
	})
	return (
		<div className="container" >
			<div className="row mb-3">
				<div className="col-md-12 border-bottom">
					<Link type="button" className="btn btn-green float-right" to='/usuarios/cadastrar'>Cadastrar Usuário</Link>

					<h2>Relatório</h2>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Nº</th>
								<th scope="col">Nome</th>
								<th scope="col">Motivo</th>
								<th scope="col">Date</th>
								<th scope="col">Qtd. Horas</th>

							</tr>
						</thead>
						<tbody>

							{reports.map(r =>
								<tr key={r.id} >
									<th>{cont++}</th>
									<td>{r.employee.name} | {r.employee.id}</td>
									<td>{r.reason_name}</td>
									<td>{formatDate(r.date)}</td>
									<td>{r.qtd_hours}</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div >
	)
}

export default ReportList