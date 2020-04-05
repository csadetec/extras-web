import React, { useState, useEffect } from 'react'
import { formatDate } from '../utils/helpers'
import api from '../service/api'
import { saveAs } from 'file-saver'

function ReportList() {
	const [reports] = useState(JSON.parse(localStorage.getItem('reports')))
	//console.log(users)
	const [date, setDate] = useState({ start: '', end: '' })

	let cont = 1
	useEffect(() => {
		document.title = 'Relatório'

		setDate({start:Date.now(), end:Date.now()})
	
	},[])
/*
	const inputStyle = {
		border: 'none',
		borderBottom: '2px solid #495057',
		borderRadius: 0,
		marginLength: '3px',
		paddingTop: '1px'
	
	}
		/** */
	const updateField = ({ target: { name, value } }) => {
		setDate({ ...date, [name]: value })
	}

	const handleSubmit = () => {
		//e.preventDefault()
		//console.log(date)
		
		api.post('/pdf', date)
			.then(() => api.get('/pdf', { responseType: 'blob' }))
			.then((res) => {
				const pdfBlob = new Blob([res.data], { type: 'application/pdf' })
				saveAs(pdfBlob, `${date.start} - ${date.end}.pdf`)
			})
		/** */
	}

	return (
		<div className="container-fluid " >
			<div className="row justify-content mb-3 border-bottom">
				<div className="col-md-12">
					<h2>Relatório</h2>

				</div>

			</div>

			<div className="row">
				<div className="col-md-3 mb-3">
					<div className="card">
						<h5 className="card-header green white-text text-center py-2">
							<strong>Burcar Intervalo</strong>

						</h5>
						<div className="card-body pl-3 pr-3">
							<div className="form-row mb-3">
								<label htmlFor="start">Início</label>
								<input type="date" className="form-control"  name="start"
									value={date.start} onChange={updateField} />

							</div>
							<div className="form-row mb-3">
								<label htmlFor="end">Fim</label>
								<input type="date" className="form-control"  name="end"
									value={date.end} onChange={updateField} />

							</div>

							<button onClick={handleSubmit} className="btn btn-outline-danger btn-block" >Gerar PDF</button>

						</div>
					</div>
				</div>
				<div className="col-md-9">
					<div className="card">
						<h5 className="card-header green white-text text-center py-2">
							<strong>Colaboradores e seus serviços</strong>
						</h5>
						<div className="card-body pt-0">
							<table className="table">
								<thead>
									<tr>
										{/*<th scope="col">Nº</th>*/}
										<th scope="col">Nome</th>
										<th scope="col">Motivo</th>
										<th scope="col">Date</th>
										<th scope="col">Qtd. Horas</th>

									</tr>
								</thead>
								<tbody>

									{reports.map(r =>
										<tr key={cont++} >
											{/*<th>{cont++}</th>*/}
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

				</div>
			</div>
		</div >
	)
}

export default ReportList