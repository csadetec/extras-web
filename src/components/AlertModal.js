import React from 'react'

function AlertModal() {
  return (
    <>

      <div className="modal fade" id="centralModalSuccess" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-notify modal-success" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <p className="heading lead">Modal Success</p>

              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" className="white-text">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="text-center">
                <i className="fas fa-check fa-4x mb-3 animated rotateIn"></i>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit iusto nulla aperiam blanditiis
                ad consequatur in dolores culpa, dignissimos, eius non possimus fugiat. Esse ratione fuga, enim,
             ab officiis totam.</p>
              </div>
            </div>

            <div className="modal-footer justify-content-center">
              <button className="btn btn-success">Get it now <i className="far fa-gem ml-1 text-white"></i></button>
              <button className="btn btn-outline-success waves-effect" data-dismiss="modal">No, thanks</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AlertModal