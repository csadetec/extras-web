import React, {useState} from 'react'

import {diffHours} from '../utils/helpers'

const ServiceEmployeeList = (props) => {

  const [disabled, setDisabled] = useState(false)

  const handleAddEmployee = (e) => {
  }

  const handleDelEmployee = (id) => {
    console.log('delete ',id)
    /*
    if (disabled) {
      return
    }
    setServiceEmployees(serviceEmployees.filter(r => {
      return r.id !== id
    }))
    /** */
  }

  const handleUpdateEmployee = (id, e) => {
    console.log('update ', id)
    /*
    let employeesUpdate = service.employees.filter(r => {

      if (r.id === id) {

        switch (e.target.name) {
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

    setService({ ...service, employees: employeesUpdate })
    /** */


  }

  return (

    <div className="card">
      {console.log(props.service)}
      <h5 className="card-header green white-text text-center py-2">
        <strong>Colaboradores</strong>
      </h5>
      <div className="card-body px-lg-2">
        <table className="table">
          <tbody>
            {props.service.employees.map(r =>
              <tr key={r.id} title={r.name} >
                <td onDoubleClick={() => handleDelEmployee(r.id)}
                  className={`cursor-pointer pt-2 pb-0 pr-0`}
                  title={r.name}
                >
                  <img className="img-icon" src={`https://visiografo.netlify.com/${r.id}.JPG`} alt={r.name} />
                </td>

                <td className="pl-0">
                  <select name="reason_name" id="" className="input-employee" value={r.reason_name}
                    onChange={e => handleUpdateEmployee(r.id, e)} disabled={disabled} >
                    <option value="">Motivo</option>
                    {props.reasons.map(r =>
                      <option key={r.id} value={r.name}>{r.name}</option>
                    )}
                  </select>
                </td>

                <td className="pl-0">
                  <input type="time" className="input-employee-time" name="start" value={r.start} onChange={e => handleUpdateEmployee(r.id, e)} />
                </td>
                <td className="pl-0">
                  <input type="time" className="input-employee-time" name="end" value={r.end} onChange={e => handleUpdateEmployee(r.id, e)} />
                </td>

                <td className="pl-0">
                  <input type="time" className="input-employee-time" value={r.qtd_hours} disabled={true} />
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  )

}


export default ServiceEmployeeList