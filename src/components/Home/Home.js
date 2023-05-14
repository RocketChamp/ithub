import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Posts from "../../components/Posts/Posts.js";
import ProjectCard from "../Projects/ProjectCard.js";
import FeedSwitch from "./FeedSwitch.jsx";

const Home = ({ setCurrentId, posts, projects, users }) => {
  const [mode, setMode] = useState("discover");

  return (
    <>
      {!posts.length ? (
        <>No posts here yet...</>
      ) : (
        <Col
          className="d-flex flex-column gap-3 p-0 "
          xs={12}
          sm={10}
          md={8}
          lg={6}
        >
          <FeedSwitch setMode={setMode} />
          <Posts
            setCurrentId={setCurrentId}
            mode={mode}
            users={users}
            posts={posts}
          />
        </Col>
      )}
      {!projects.length ? (
        <>No projects here yet...</>
      ) : (
        <Col
          className="d-flex flex-column gap-3 h-auto"
          xs={12}
          sm={10}
          md={8}
          lg={4}
        >
          <Row>
            <Col style={{ paddingTop: "6px", paddingBottom: "6px" }}>
              <div>Projects</div>
            </Col>
          </Row>
          {projects.map((project) => (
            <Row>
              <Col className="p-3 page-wrapper">
                <ProjectCard project={project} />
              </Col>
            </Row>
          ))}
        </Col>
      )}
    </>
  );
};

export default Home;
