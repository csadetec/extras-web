import React, { /*useState,*/ useEffect } from 'react'
import api from '../service/api'
import {formatDate} from '../utils/helpers'


const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');

pdfMake.vfs = pdfFonts.pdfMake.vfs;


function ReportList() {
  //const [reports, setReports] = useState([])

  useEffect(() => {
    document.title = 'teste de pdf'
    async function load(){  
      
      const {data} = await api.get('/reports')

      let sourceData = data

      let bodyData = []

      let dataRow = []
    
      dataRow.push('Nome', 'Motivo', 'Data', /*'Início', 'Fim',*/' QTD. Horas')


      bodyData.push(dataRow)
      /**/
      sourceData.forEach(function (sourceData) {
        let dataRow = []

        dataRow.push(sourceData.employee.name + ' | ' + sourceData.employee.id)
        dataRow.push(sourceData.reason_name)
        dataRow.push(formatDate(sourceData.date))
        /*
        dataRow.push(sourceData.start)
        dataRow.push(sourceData.end)
        /**/
        dataRow.push(sourceData.qtd_hours)

        bodyData.push(dataRow)

      })
      const docDefinition = {

        content: [
          // optional
          { text: 'Relatório dos serviços extras', style: { fontSize: 20 } },
          {text:'Perído: 04/05/2020 à 04/06/2020', margin:[0, 10, 0, 10]},
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
             
            table: { headerRows: 1, body: bodyData },
            style:{fontSize:9}
          
          },
          {text:'Assinatura:', margin:[0, 20, 0, 0 ]},
          {canvas: [{ type: 'line', x1: 0, y1: 5, x2: 250, y2: 5, lineWidth: 0.4 }]}
    
        ]
      }


    pdfMake.createPdf(docDefinition).open();


    }
    load()
    


  }, [])




  return (
    <div className="container-fluid " >
      <h2>teste do pdf</h2>
    </div>


  )
}

export default ReportList