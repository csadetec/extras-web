import React from 'react'

function Alert({ msg = false, color = 'info' }) {
  //let color 
  return (
    <>
      {msg &&
        
        <div className={`alert alert-${color} justify-content-center col-md-12 mb-0 mt-3`} role="alert">
          {msg}
        </div>
      }
    </>

  )
}

export default Alert