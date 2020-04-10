import React from 'react'

import {Button, Modal} from 'react-bootstrap'
function AlertModal(props) {

  const color = () => {
    if(props.color === 'warning')
      return '#fb3'
    if(props.color === 'success')
      return '#00c851';   
  }

  const headerStyle = {
    background:color(),  
    color:'#fff',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
    border:0
  }

  return (
    <>
    
      <Modal {...props}>
        <Modal.Header style={headerStyle}  closeButton>
          <Modal.Title style={{fontSize:'1.15em'}}>{props.message}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign:'center'}} >
          <i className="fas fa-check fa-4x mb-3 animated rotateIn" style={{color:color()}}></i>
          <p style={{color:'#616161'}}>
            {props.field && props.field( r =>

              <p>{r}</p> 
            )}

          </p>
        </Modal.Body>
        <Modal.Footer style={{justifyContent:'center'}}>

          <Button variant={`outline-${props.color}`} onClick={props.onHide}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AlertModal