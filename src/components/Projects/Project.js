import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { fetchProjects } from "../../actions/projects";
import { BsFillPersonPlusFill, BsFillGearFill } from "react-icons/bs";
import { getUsers } from "../../actions/users";
import CreateBlogPost from "./CreateBlogPost";

const Project = () => {
  const dispatch = useDispatch();
  const projectId = useParams().projectId;
  const currentUser = JSON.parse(localStorage.getItem("profile"))?.result;
  const id = currentUser?._id;

  console.log("projectId", projectId);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, id]);

  const users = useSelector((state) => state?.reducers?.users);
  const project = useSelector((state) =>
    state?.reducers?.projects.find((project) => project._id === projectId)
  );
  console.log("project", project);

  return (
    <Container>
      <Row className="d-flex justify-content-center mt-3">
        <Col
          className="d-flex justify-content-between align-items-center page-wrapper p-3"
          xs={12}
          sm={10}
          md={8}
          lg={6}
        >
          <div className="d-flex flex-row justify-content-center align-items-center">
            <img
              src={project?.image}
              className="profile_avatar"
              alt="profile"
            />
            <div className="d-flex flex-column m-2 justify-content-center">
              <h4>{project?.pname}</h4>
            </div>
          </div>
          {project?.creator === id ? (
            <>
              <NavLink
                to={`/project/${projectId}/edit`}
                className="d-flex justify-content-center align-items-center"
              >
                {" "}
                <BsFillGearFill size="30px" className="gearsvg" />
              </NavLink>
            </>
          ) : (
            <>
              <div className="d-flex align-items-center mx-2">
                <BsFillPersonPlusFill size="30px" className="gearsvg" />
              </div>
            </>
          )}
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mt-3">
        <Col
          className="d-flex flex-column page-wrapper p-3 px-4"
          xs={12}
          sm={10}
          md={8}
          lg={6}
        >
          <div>{project?.description}</div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mt-3">
        <Col
          className="d-flex page-wrapper flex-wrap p-3 px-4"
          xs={12}
          sm={10}
          md={8}
          lg={6}
        >
          {users.map((user) => (
            <>
              <Link to={`/${user?.username}`}>
                <img
                  src={user?.imageUrl}
                  style={{
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                  className="d-flex m-1"
                  alt={user.username + "id"}
                />
              </Link>
            </>
          ))}
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mt-3">
        <Col className="d-flex page-wrapper" xs={12} sm={10} md={8} lg={6}>
          <CreateBlogPost />
        </Col>
      </Row>
    </Container>
  );
};

export default Project;
