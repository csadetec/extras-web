import React, { useState, useEffect } from 'react'
import { formatDate } from '../utils/helpers'
import api from '../service/api'
import { saveAs } from 'file-saver'

function ReportList() {
	const [reports, setReports] = useState([])
	//console.log(users)
	const [date, setDate] = useState({ start: '', end: '' })

	let cont = 1
	useEffect(() => {
    document.title = 'Relatório'
    
    let date = new Date()
    const yaer = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()

    if(month++ < 10)month='0'+month
    if(day < 10) day='0'+day

    date = `${yaer}-${month}-${day}`

		setDate({start:date, end:date})
	
	},[])

	const updateField = ({ target: { name, value } }) => {
		setDate({ ...date, [name]: value })
	}

	const handleFilter = () => {
    if(validation()) return;
    api.get(`/services/employees/${date.start}/${date.end}`)
      .then((res) => {
        const { data } = res
        setReports(data)
        //console.log(data)
      })
	}


	const handleMakePdf = () => {
		//e.preventDefault()
		console.log(date)
    
    
		api.post('/pdf', date)
			.then(() => api.get(`/pdf`, { responseType: 'blob' }))
			.then((res) => {
				const pdfBlob = new Blob([res.data], { type: 'application/pdf' })
				saveAs(pdfBlob, `${date.start} - ${date.end}.pdf`)
			})
			.then(() => {
				window.location.reload()
			})
		/** */
	}
  const validation = () => {
    if(!date.start || !date.end){
      window.alert('Preencha todos os campos')
      return true
    }
    return false
  }
	return (
		<div className="container-fluid " >
			<div className="row justify-content mb-3 border-bottom">
				<div className="col-md-12">
					<h2>Relatório</h2>

				</div>

			</div>

			<div className="row">
				<div className="col-md-2 mb-3">
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
							<button onClick={handleFilter} className="btn btn-outline-info btn-block mb-3" >Buscar</button>

							<button onClick={handleMakePdf} className="btn btn-outline-danger btn-block" >Gerar PDF</button>

						</div>
					</div>
				</div>
				<div className="col-md-10">
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
                    <th scope="col">Início</th>
                    <th scope="col">Fim</th>
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
                      <td>{r.start}</td>
											<td>{r.end}</td>

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