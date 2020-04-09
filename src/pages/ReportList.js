import React, { useState, useEffect } from 'react'
import { formatDate, formatDateFull } from '../utils/helpers'
import api from '../service/api'
//import { saveAs } from 'file-saver'

var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function ReportList() {
  const [reports, setReports] = useState([])
  //console.log(users)
  const [date, setDate] = useState({ start: '', end: '' })

  let cont = 1
  useEffect(() => {
    document.title = 'Relatório'

    let date = new Date()
    const yaer = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()

    if (month++ < 10) month = '0' + month
    if (day < 10) day = '0' + day

    date = `${yaer}-${month}-${day}`

    setDate({ start: date, end: date })

  }, [])

  const updateField = ({ target: { name, value } }) => {
    setDate({ ...date, [name]: value })
  }

  const handleFilter = () => {
    if (validation()) return;
    api.get(`/services/employees/${date.start}/${date.end}`)
      .then((res) => {
        const { data } = res
        setReports(data)
        //console.log(data)
      })
  }

  const handleMakePdf = () => {



    let sourceData = reports

    let bodyData = []

    let dataRow = []
    dataRow.push('Nome', 'Motivo', 'Data'/*, 'Início', 'Fim'*/, 'QTD.Horas')


    bodyData.push(dataRow)

    sourceData.forEach(function (sourceData) {
      let dataRow = []

      dataRow.push(sourceData.employee.name + ' | '+ sourceData.employee.id )
      dataRow.push(sourceData.reason_name)
      dataRow.push(formatDate(sourceData.date))
      /*
      dataRow.push(sourceData.start)
      dataRow.push(sourceData.end)
      /** */
      dataRow.push(sourceData.qtd_hours)

      bodyData.push(dataRow)




    })
  
    

    const docDefinition = {
      content: [
        // optional
        { text: 'Relatório dos serviços extras', style: { fontSize: 20 } },
        {text: `Perído: ${formatDateFull(date.start)} à ${formatDateFull(date.end)}`, margin:[0, 10, 0, 10]},
        {
          layout: {

            hLineWidth: function (i, node) {
              if (i === 0 || i === node.table.body.length) {
                return 0;
              }
              return (i === node.table.headerRows) ? 2 : 1;
            },
            vLineWidth: function (i) {
              return 0;
            },
            hLineColor: function (i) {
              return i === 1 ? 'black' : '#aaa';
            },
            paddingTop: (i, node) => 7,
            paddingBottom: (i, node) => 7,
            //paddingRight: (i, node) => 10,
   
          },
          widths: [ '*', 'auto', 100, '*' ],
          table: { headerRows: 1, body: bodyData },
          style:{fontSize:9}
        
        },
        {text:'Assinatura:', margin:[0, 20, 0, 0 ]},
        {canvas: [{ type: 'line', x1: 0, y1: 5, x2: 250, y2: 5, lineWidth: 0.4 }]}
  
      ] 
   
    }
    pdfMake.createPdf(docDefinition).open();
    //pdfMake.createPdf(docDefinition).download();

    /** */
  }

  const validation = () => {
    if (!date.start || !date.end) {
      window.alert('Preencha todos os campos')
      return true
    }
    return false
  }
  return (
    <div className="container-fluid " >
      <div className="row justify-content mb-3 border-bottom">
        <div className="col-md-12">
          <h2>Relatório</h2>

        </div>

      </div>

      <div className="row">
        <div className="col-md-2 mb-3">
          <div className="card">
            <h5 className="card-header green white-text text-center py-2">
              <strong>Burcar Intervalo</strong>

            </h5>
            <div className="card-body pl-3 pr-3">
              <div className="form-row mb-3">
                <label htmlFor="start">Início</label>
                <input type="date" className="form-control" name="start"
                  value={date.start} onChange={updateField} />

              </div>
              <div className="form-row mb-3">
                <label htmlFor="end">Fim</label>
                <input type="date" className="form-control" name="end"
                  value={date.end} onChange={updateField} />

              </div>
              <button onClick={handleFilter} className="btn btn-outline-info btn-block mb-3" >Buscar</button>

              <button onClick={handleMakePdf} className="btn btn-outline-danger btn-block" >Gerar PDF</button>

            </div>
          </div>
        </div>
        <div className="col-md-10">
          <div className="card">
            <h5 className="card-header green white-text text-center py-2">
              <strong>Colaboradores e seus serviços</strong>
            </h5>
            <div className="card-body pt-0">
              <table className="table">
                <thead>
                  <tr>
                    {/*<th scope="col">Nº</th>*/}
                    <th scope="col">Nome</th>
                    <th scope="col">Motivo</th>
                    <th scope="col">Data</th>
                    <th scope="col">Início</th>
                    <th scope="col">Fim</th>
                    <th scope="col">Qtd. Horas</th>

                  </tr>
                </thead>
                <tbody>

                  {reports.map(r =>
                    <tr key={cont++} >
                      {/*<th>{cont++}</th>*/}
                      <td>{r.employee.name} | {r.employee.id}</td>
                      <td>{r.reason_name}</td>
                      <td>{formatDate(r.date)}</td>
                      <td>{r.start}</td>
                      <td>{r.end}</td>

                      <td>{r.qtd_hours}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </div>
    </div >
  )
}

export default ReportList