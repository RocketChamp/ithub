import React from 'react'
import { NavLink } from 'react-router-dom';
import {Row, Col} from 'react-bootstrap'
import { BsFillInfoCircleFill, BsFilePostFill, BsFillKanbanFill } from 'react-icons/bs';

const NavLinks = () => {
  return (
    <>
      <Row className='d-flex justify-content-center flex-row mt-3' xs={11} sm={11} md={11} lg={6} >
        <Col className="d-flex justify-content-center align-items-center" >
          <NavLink id="navlinks" className={(navLinkObj) => "active-panel_" + navLinkObj.isActive} to="info" >
            <BsFillInfoCircleFill size="25px" />
            <span>Information</span>
          </NavLink>
        </Col>
        <Col className="d-flex justify-content-center align-items-center" >
          <NavLink id="navlinks" className={(navLinkObj) => "active-panel_" + navLinkObj.isActive} to="posts">
            <BsFilePostFill size="25px" />
            <span>Posts</span>
          </NavLink>
        </Col>
        <Col className="d-flex justify-content-center align-items-center" >
          <NavLink id="navlinks" className={(navLinkObj) => "active-panel_" + navLinkObj.isActive} to="projects">
            <BsFillKanbanFill size="25px" />
            <span>Projects</span>
          </NavLink>
        </Col>
      </Row>
    </>
  )
}

export default NavLinks