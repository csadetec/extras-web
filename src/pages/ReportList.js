import React, { useState, useEffect } from 'react'
import { formatDate } from '../utils/helpers'
import api from '../service/api'
import {saveAs} from 'file-saver'

function ReportList() {
	const [reports] = useState(JSON.parse(localStorage.getItem('reports')))
	//console.log(users)
	const [date, setDate] = useState({ start: '2020-01-01', end: '2020-12-12' })

	let cont = 1
	useEffect(() => {
		document.title = 'Relatório'

		const date = new Date()

		const day = date.getDay()
		console.log(day)

		//console.log(reports)
	})

	const inputStyle = {
		border: 'none',
		borderBottom: '2px solid #495057',
		borderRadius: 0,
		marginLength: '3px',
		paddingTop: '1px'
		/** */
	}
	const updateField = ({ target: { name, value } }) => {
		setDate({ ...date, [name]: value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		api.post('/pdf', date)
			.then(() => api.get('/pdf', {responseType:'blob'}))
			.then((res) => {
				const pdfBlob = new Blob([res.data], {type: 'application/pdf'})
				saveAs(pdfBlob, `${date.start} - ${date.end}.pdf`)
			})

	}

	return (
		<div className="container " >
			<div className="row justify-content mb-3 border-bottom">
				<div className="col-md-6">
					<h2>Relatório</h2>

				</div>
				<div className="col-md-6">
					<form onSubmit={handleSubmit} className="form-inline">
						<div className="form-row ml-5">
								<input type="date" className="form-control" style={inputStyle} name="start"
									value={date.start} onChange={updateField} required />
							-	<input type="date" className="form-control" style={inputStyle} name="end"
									value={date.end} onChange={updateField} required />

						</div>
						<button type="submit" className="btn btn-outline-danger float-right ml-3" >Gerar PDF</button>
					</form>

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
								<tr key={cont++} >
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