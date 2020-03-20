import React, { useState } from 'react'

const Input = ({ name, label, value, options, updateField }) => {

  const [valueField, setValueField] = useState(value)

  const update = (e) => {
 
    updateField({ [e.target.name]: e.target.value })

    setValueField(e.target.value)
    //updateField(value)
  }

  return (
    <div className="form-row">
      <select value={value} className="form-control" name={name}  
        onChange={update} required>
        <option value="">{label}</option>
        {options.map(r =>
          <option key={r.id} value={r.name}>{r.name}</option>
        )}
      </select>
    </div>

  )
}

export default Input