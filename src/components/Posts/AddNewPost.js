import React from 'react';
import {Row, Col} from 'react-bootstrap';
import FormComp from "./FormComp";


const AddNewPost = ({currentId, setCurrentId}) => {
  return (
    <>
      <Row className="justify-content-center" >
        <Col className="p-3 page-wrapper mt-3" xs={11} sm={11} md={11} lg={6} >
          <FormComp currentId={currentId} setCurrentId={setCurrentId} />
        </Col>
      </Row>
    </>
  )
}

export default AddNewPost