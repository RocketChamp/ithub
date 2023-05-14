import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route, useParams, Link } from "react-router-dom";
import Info from "./Info";
import Posts from "./Posts.js";
import ProjectsContainer from "./ProjectsContainer";
import ProfileNav from "./ProfileNav/ProfileNav";
import AddNewPost from "../Posts/AddNewPost";
import ProfileHeader from "./ProfileHeader";
import { getLocalStorageUser } from "../../utils/utils.js";

const Profile = (users) => {
  const [currentId, setCurrentId] = useState(null);
  const localUser = getLocalStorageUser();
  const { username } = useParams();

  const user = useSelector((state) =>
    state?.reducers?.users.find((user) => user.username === username)
  );

  const friends = [];

  user?.friends.forEach((friendId) => {
    friends.push(users.find((user) => user?._id === friendId));
  });

  return (
    <>
      {user ? (
        <>
          <Container className="d-flex flex-column gap-3 profile-container">
            {/* ############################## PROFILE HEADER ############################## */}
            <Row className="d-flex justify-content-center">
              <Col
                className="d-flex justify-content-between align-items-center page-wrapper p-3 "
                xs={12}
                sm={10}
                md={8}
                lg={6}
              >
                <ProfileHeader
                  user={user}
                  localId={localUser?._id}
                  usernameParam={username}
                  localUser={localUser}
                />
              </Col>
            </Row>
            {/* ############################## USER BIO ############################## */}
            {user?.bio ? (
              <Row className="d-flex flex-column align-content-center justify-content-center">
                <Col
                  className="d-flex flex-column page-wrapper p-3 px-4"
                  xs={12}
                  sm={10}
                  md={8}
                  lg={6}
                >
                  <h4>About </h4>
                  <div>{user?.bio}</div>
                </Col>
              </Row>
            ) : (
              <></>
            )}
            {/* ############################## FOLLOWING ############################## */}
            {friends.length !== 0 ? (
              <>
                <Row className="d-flex flex-column align-content-center justify-content-center">
                  <Col
                    className="d-flex flex-column page-wrapper p-3 px-4"
                    xs={12}
                    sm={10}
                    md={8}
                    lg={6}
                  >
                    <h4>Following</h4>
                    <div>
                      {friends?.map((friend) =>
                        friend !== undefined ? (
                          <Link key={friend?._id} to={`/${friend?.username}`}>
                            <img
                              className="navbar_avatar m-1"
                              src={friend?.imageUrl}
                              alt={friend?.username}
                            />
                          </Link>
                        ) : (
                          <></>
                        )
                      )}
                    </div>
                  </Col>
                </Row>
              </>
            ) : (
              <></>
            )}
            {/* ############################## ADD NEW POST ############################## */}
            {user?._id === localUser?._id ? (
              <>
                <Row className="justify-content-center">
                  <Col
                    className="p-3 page-wrapper"
                    xs={12}
                    sm={10}
                    md={8}
                    lg={6}
                  >
                    <AddNewPost
                      currentId={currentId}
                      setCurrentId={setCurrentId}
                    />
                  </Col>
                </Row>
              </>
            ) : (
              <></>
            )}
            {/* ############################## PROFILE NAVIGATION ############################## */}
            <Row className="d-flex justify-content-center">
              <Col
                className="d-flex flex-row p-0 align-content-between justify-content-evenly"
                xs={12}
                sm={10}
                md={8}
                lg={6}
              >
                <ProfileNav />
              </Col>
            </Row>
            <Routes>
              <Route index element={<Info />} />
              <Route path="/info" element={<Info />} />
              <Route
                path="/posts"
                element={
                  <Posts currentId={currentId} setCurrentId={setCurrentId} />
                }
              />
              <Route path="/projects" element={<ProjectsContainer />} />
            </Routes>
          </Container>
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default Profile;
