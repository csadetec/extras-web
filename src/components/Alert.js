import React from 'react'

function Alert({ message = false, color = 'info' }) {
  //let color 
  return (
    <>
      {message &&
        
        <div className={`alert alert-${color} justify-content-center col-md-12 mb-0 mt-3`} role="alert">
          {message}
        </div>
      }
    </>

  )
}

export default Alert