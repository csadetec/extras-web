import React, {useState} from 'react'

import {Button, Modal} from 'react-bootstrap'
function Example() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const headerStyle = {
    background:'#fb3',  color:'#fff',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
    border:0
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal variant="warning" show={show} onHide={handleClose}>
        <Modal.Header style={headerStyle} variant="warning" closeButton>
          <Modal.Title style={{fontSize:'1.15em'}}>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign:'center'}} >
          <i className="fas fa-check fa-4x mb-3 animated rotateIn" style={{color:'#fb3'}}></i>
          <p style={{color:'#616161'}}>
            Woohoo, you're reading this text in a modal!

          </p>
        </Modal.Body>
        <Modal.Footer style={{justifyContent:'center'}}>
          <Button variant="warning" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-warning" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example