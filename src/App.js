import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import NavbarComp from "./components/Navbar/Navbar";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
import Profile from "./components/Profile/Profile.js";
import Edit from "./components/Profile/Edit";
import { getUsers } from "./actions/users";
import Footer from "./components/General/Footer";
import Project from "./components/Projects/Project";
import EditProject from "./components/Projects/EditProject";


const App = () => {
  const dispatch = useDispatch();

  const currentUser = JSON.parse(localStorage.getItem("profile")) ? JSON.parse(localStorage.getItem("profile"))?.result : null;
  const id = currentUser?._id;

  const username = useParams();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, id]);
  
  return (
    <BrowserRouter>
      <Container fluid className="app">
        <Row>
          <NavbarComp />
        </Row>
        <Row>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path={`/:username/edit`} element={<Edit />} />
            <Route path={`/:username/*`} element={<Profile />} />
            <Route path={`/project/:projectId`} element={<Project />} />
            <Route path={`/project/:projectId/edit`} element={<EditProject />} />
            {(!currentUser) ? <></> : <></>}
          </Routes>
        </Row>
        <Row>
          <Footer />
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default App;
