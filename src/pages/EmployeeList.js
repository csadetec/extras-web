import React, { useState, useEffect } from 'react'

function EmployeeList() {
  const [employees] = useState(JSON.parse(localStorage.getItem('employees')))
  //console.log(users)
  //const [employees] = useState([])
  let cont = 1
  useEffect(() => {
    document.title = 'Funcionários'
  }, [])


  return (
    <div className="container" >
      <div className="row justify-content-center">
        {/*}
				<div className="col-md-2 mb-3">

					<div className="card">
						<h5 className="card-header green white-text text-center py-2">
							<strong>Ações</strong>

						</h5>
						<div className="card-body pl-3 pr-3">
							<div className="form-row mb-3">
							
							</div>
              {/*}
							<button onClick={} className="btn btn-outline-info btn-block mb-3" >Buscar</button>

							<button onClick={} className="btn btn-outline-danger btn-block" >Gerar PDF</button>
            </div>
            
						</div>
          */}

        <div className="col-md-10">
          <div className="card">
            <h5 className="card-header green white-text text-center py-4">
              <strong>Colaboradores</strong>
            </h5>
            <div className="card-body pt-0">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Nº</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Registro</th>
                    <th scope="col">Função</th>
                  </tr>
                </thead>
                <tbody>

                  {employees.map(r =>
                    <tr key={r.id} >
                      <th>{cont++}</th>
                      <td>{r.name} </td>
                      <td>{r.id}</td>
                      <td>{r.function}</td>
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

export default EmployeeList