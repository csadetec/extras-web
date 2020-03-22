import React, { useState, useEffect } from 'react'

function ReportList(){
	const [report, setReport] = useState(JSON.parse(localStorage.getItem('reports')))


	useEffect(() => {
		document.title = 'Relatórios'
	})

	return (
		<div className="container">
			
			<h2>lista dos relatorios</h2>
		</div>
	)
}

export default ReportList