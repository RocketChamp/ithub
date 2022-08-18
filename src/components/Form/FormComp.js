import React, { useState, useEffect } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import "./FormComp.css";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const FormComp = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    description: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.reducers.posts.find((p) => p._id === currentId) : null
  );

  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };


  if (!user?.result?.name) {
    return <Alert variant="danger">You need to log in to create a post.</Alert>;
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({
      description: "",
      tags: [],
      selectedFile: "",
    });
  };

  return (
    <Container
      className="p-5 mt-3"
      style={{ backgroundColor: "whitesmoke", borderRadius: "5px" }}
    >
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            placeholder="Enter Description"
            value={postData.description}
            onChange={(e) =>
              setPostData({ ...postData, description: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Tags"
            value={postData.tags}
            onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
          />
        </Form.Group>
        <div className="my-3">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Row className="d-flex flex-row">
          <Col>
            <div className="d-grid">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Col>
          <Col>
            <div className="d-grid">
              <Button variant="info" onClick={clear}>
                Clear
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default FormComp;
