import React from 'react'
import {formatDate} from '../utils/helpers'

function AlertModal({ color, message, txt, employee }) {

  //const users = useState(localStorage.getItem(users))

  return (
    <>

      <div className="modal fade show" id="alertModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true"  >
        <div className={`modal-dialog modal-notify modal-${color}`} role="document">
          <div className="modal-content">
            <div className="modal-header">
              <p className="heading lead">{message}</p>

              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" className="white-text">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="text-center">
                {color === 'success' &&
                  <i className="fas fa-check fa-4x mb-3 animated rotateIn "></i>
                }
                {color === 'warning' &&
                  <i className="fas fa-ban fa-4x mb-3 animated rotateIn"></i>
                }
                {employee &&
                  <p className="text-left">
                    <strong>Nome:</strong>  {employee.name} <br/>
                    <strong>Motivo:</strong> {employee.reason_name} <br/>
                    <strong>Data:</strong> {formatDate(employee.date)} <br/>
                    <strong>Horário:</strong> {employee.start} às {employee.end}
                  </p>
                }
                
                {txt && txt.map( r => 
                  <p key={r}>{r}</p> 
                )}
                
              </div>
            </div>

            <div className="modal-footer justify-content-center">
              {color === 'success' || color === 'warning' ?
                <button className={`btn btn-outline-${color}`} data-dismiss="modal">Fechar</button>
                :
                <>
                  <button className={`btn btn-${color}`}>Confirmar</button>
                  <button className={`btn btn-outline-${color}`} data-dismiss="modal">Cancelar</button>
                </>
              }

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AlertModal