import React, { useState, useEffect } from 'react'

const Input = ({type, name, label, value, updateField, required=false }) => {

  const[valueField, setValueField ] = useState(value)

  /*
  useEffect(() => {
    setValueField(value)
  })
  /**/
  const update = (e) => {
    updateField({[e.target.name]: e.target.value})
    //console.log(e.target.name, e.target.value)
		setValueField(e.target.value )
    //updateField(value)
  }

  return (
    <div className="md-form mt-3">
      <input type={type} name={name} id={name} className="form-control"
        value={valueField}
        onChange={update} placeholder={label}
        required={required}
      />
      {value &&
        <label htmlFor={name} >{label}</label>
      }

    </div>

  )
}

export default Input