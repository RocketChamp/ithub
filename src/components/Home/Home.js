import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Posts from "../../components/Posts/Posts.js";
import { getPosts } from "../../actions/posts.js";
import { getUsers } from "../../actions/users.js";
import Projects from "../Projects/Projects.js";
import { fetchProjects } from "../../actions/projects.js";
import ProjectCard from "../Projects/ProjectCard.js";


const Home = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch])

  const users = useSelector((state) => state?.reducers?.users);
  const projects = useSelector((state) => state?.reducers?.projects);
  const posts = useSelector((state) => state?.reducers?.posts);

  const [mode, setMode] = useState("discover");

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        {posts.length === 0 ? <></> : <>
          <Col className="d-flex flex-column justify-content-center mt-3" sm={11} md={7} lg={5} xl={4}>
            <div className="d-flex flex-row justify-content-center">
              <Button className="mx-1" name="myfeed" style={{ borderRadius: "20px", backgroundColor: "#222222" }} onClick={(e) => setMode(e.target.name)}>My feed</Button>
              <Button className="mx-1" name="discover" style={{ borderRadius: "20px" }} onClick={(e) => setMode(e.target.name)}>Discover</Button>
            </div>
            <Posts setCurrentId={setCurrentId} users={users} mode={mode} />
          </Col>
        </>}
        {projects.length === 0 ? <></> :
          <>
            <Col sm={11} md={4} lg={3} xl={3}>
              <h4 className="mt-3">Interesting projects</h4>
              {projects.map((project) =>
                <>
                  <React.Fragment key={project?._id}>
                    <Col className="page-wrapper mt-4 p-3">
                      <ProjectCard project={project} />
                    </Col>
                  </React.Fragment>
                </>)}
            </Col>
          </>}
      </Row>
    </Container>
  );
};

export default Home;
