import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../actions/projects';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const projects = useSelector((state) => state?.reducers?.projects)

  return (
    projects.map((project) =>
      <React.Fragment key={project?._id}>
        <ProjectCard project={project} />
      </React.Fragment>)
  )
}

export default Projects