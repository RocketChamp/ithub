import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],   
    [{ font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'script': 'sub'}, { 'script': 'super' }],  
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }], 
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

const CreateBlogPost = () => {

  const handleCreateBlogpost = () => {
    
  }
  
  return (
    <Container fluid>
      <Row>
        <Col className='d-flex flex-column my-4'>
          <ReactQuill modules={modules} theme='snow' />
          <Button variant="darktheme" onClick={handleCreateBlogpost}>Post</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateBlogPost