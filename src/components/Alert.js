import React from 'react'

function Alert({ msg = false, color = 'info' }) {
  //let color 
  return (
    <>
      {msg &&
        <div className={`alert alert-${color}  col-md-12 mb-0 mt-1`} role="alert">
          {msg}
        </div>
      }
    </>

  )
}

export default Alert