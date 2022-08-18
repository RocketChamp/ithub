import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../actions/projects';
import ProjectCard from '../Projects/ProjectCard';
import CreateProject from '../Projects/CreateProject'
import { useParams } from 'react-router-dom';

const ProjectsContainer = () => {
  const dispatch = useDispatch();
  const username = useParams().username;
  const currentUser = JSON.parse(localStorage.getItem("profile"))?.result;
  const id = currentUser?._id;

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch, username])

  const user = useSelector((state) => state?.reducers?.users.find(user => user?.username === username))
  console.log(user)
  const projects = useSelector((state) => state?.reducers?.projects.find(project => project.creator === user?._id));
  console.log(projects)

  return (
    <Container fluid>
      <Row className='d-flex flex-column align-items-center mt-3 justify-content-center'>
        {currentUser?.username === username ?
          <>
            <Col className='d-flex-inline justify-content-center page-wrapper p-3' sm={11} lg={6}>
              <CreateProject />
            </Col></> :
          <></>}
        {projects && Array.isArray(projects) ?
          <>
            {projects.map((project) =>
              <React.Fragment key={project?._id}>
                <Col className='d-flex-inline justify-content-center page-wrapper p-3' sm={11} lg={6}>
                  <ProjectCard project={project} />
                </Col>
              </React.Fragment>)}
          </> : projects && typeof projects === 'object' ?
            <>
              <Col className='d-flex-inline justify-content-center page-wrapper p-3 mt-3' sm={11} lg={6}>
                <ProjectCard project={projects} />
              </Col>
            </> : 
            <></>}
      </Row>
    </Container>
  )
}

export default ProjectsContainer