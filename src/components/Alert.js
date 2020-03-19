import React from 'react'

function Alert(props) {
  return (
    <div className="alert alert-info mt-2 col-md-12 mb-2" role="alert">
      {props.msg}
    </div>      
  )
}

export default Alert