import React from "react";
import { Col, Row } from "react-bootstrap";
import { useStore } from "react-redux";
import { MdWork, MdSchool, MdGames } from "react-icons/md";
import { SiApplemusic } from "react-icons/si";
import { GiFilmProjector } from "react-icons/gi";
import { Link, useParams } from "react-router-dom";
import { getRandomColor } from "../../utils/utils.js";

const Info = () => {
  const username = useParams().username;
  const store = useStore();

  const user = store
    .getState()
    .reducers.users.find((user) => user.username === username);

  const prefsStyles = {
    display: "flex",
    justifyContent: "start",
    backgroundColor: getRandomColor(),
    borderRadius: "15px",
    paddingLeft: "10px",
    paddingRight: "10px",
  };

  const beginWorkDate = new Date(user.work.beginDate);
  const finishWorkDate = new Date(user.work.finishDate);
  const beginStudiesDate = new Date(user.studies.beginDate);
  const finishStudiesDate = new Date(user.studies.finishDate);

  if (user) {
    return (
      <>
        <Row className="d-flex justify-content-center">
          <Col
            className="d-flex flex-column page-wrapper p-3"
            xs={12}
            sm={10}
            md={8}
            lg={6}
          >
            <div className="d-flex align-items-center">
              <MdWork className="gearsvg mx-1" size="35" />
              <h4>Employment</h4>
            </div>
            <div className="mx-1">
              {user.work.title} at {user.work.company}
            </div>
            <div className="mx-1">
              {beginWorkDate.getMonth() +
                1 +
                "/" +
                beginWorkDate.getDate() +
                "/" +
                beginWorkDate.getFullYear()}{" "}
              -{" "}
              {finishWorkDate.getMonth() +
                1 +
                "/" +
                finishWorkDate.getDate() +
                "/" +
                finishWorkDate.getFullYear()}
            </div>
            <div className="d-flex">
              {user.work.skills.map((skill, index) => (
                <Link
                  to={`/`}
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "",
                    transition: "500ms",
                    padding: "0 5px",
                    borderRadius: "15px",
                    backgroundColor: getRandomColor(),
                    margin: "5px",
                    color: "white",
                  }}
                >
                  #{skill}
                </Link>
              ))}
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col
            className="d-flex flex-column page-wrapper p-3"
            xs={12}
            sm={10}
            md={8}
            lg={6}
          >
            <div className="d-flex align-items-center">
              <MdSchool className="gearsvg mx-1" size="35" />
              <h4>Studies</h4>
            </div>
            <div className="mx-1">
              {user.studies.field} at {user.studies.school}
            </div>
            <div className="mx-1">
              {beginStudiesDate.getMonth() +
                1 +
                "/" +
                beginStudiesDate.getDate() +
                "/" +
                beginStudiesDate.getFullYear()}{" "}
              -{" "}
              {finishStudiesDate.getMonth() +
                1 +
                "/" +
                finishStudiesDate.getDate() +
                "/" +
                finishStudiesDate.getFullYear()}
            </div>
          </Col>
        </Row>

        {user?.preferences.musicgenre.length !== 0 ? (
          <Row className="d-flex justify-content-center">
            <Col
              className="d-flex flex-column page-wrapper p-3"
              xs={12}
              sm={10}
              md={8}
              lg={6}
            >
              <h4>Preferences</h4>
              <Row className="d-flex align-items-center justify-content-center">
                {user?.preferences.musicgenre.length !== 0 ||
                user?.preferences.musicbest.length !== 0 ? (
                  <>
                    <Col className="d-flex flex-column align-items-center justify-content-center">
                      <h5>
                        {" "}
                        <SiApplemusic className="gearsvg" /> Music
                      </h5>
                      <div className="d-flex flex-row text-center my-1 align-items-center">
                        {user.preferences.musicgenre.map((genre) => (
                          <div
                            style={{
                              ...prefsStyles,
                              backgroundColor: getRandomColor(),
                            }}
                          >
                            {" "}
                            <div className="d-flex flex-column"></div>
                            {genre}{" "}
                          </div>
                        ))}
                      </div>
                      <div className="d-flex flex-row text-center my-1 align-items-center">
                        {user.preferences.musicbest.map((best) => (
                          <div
                            style={{
                              ...prefsStyles,
                              backgroundColor: getRandomColor(),
                            }}
                          >
                            {best}{" "}
                          </div>
                        ))}
                      </div>
                    </Col>
                  </>
                ) : (
                  <></>
                )}
                {user?.preferences.mooviesgenre.length !== 0 ||
                user?.preferences.mooviesbest.length !== 0 ? (
                  <>
                    <Col className="d-flex flex-column align-items-center justify-content-center">
                      <h5>
                        {" "}
                        <GiFilmProjector className="gearsvg" /> Moovies
                      </h5>
                      <div className="d-flex flex-row text-center my-1 align-items-center">
                        {user.preferences.mooviesgenre.map((genre) => (
                          <div
                            style={{
                              ...prefsStyles,
                              backgroundColor: getRandomColor(),
                            }}
                          >
                            {" "}
                            <div className="d-flex flex-column"></div>
                            {genre}{" "}
                          </div>
                        ))}
                      </div>
                      <div className="d-flex flex-row text-center my-1 align-items-center">
                        {user.preferences.mooviesbest.map((best) => (
                          <div
                            style={{
                              ...prefsStyles,
                              backgroundColor: getRandomColor(),
                            }}
                          >
                            {best}{" "}
                          </div>
                        ))}
                      </div>
                    </Col>
                  </>
                ) : (
                  <></>
                )}
                {user?.preferences.gamesgenre.length !== 0 ||
                user?.preferences.gamesbest.length !== 0 ? (
                  <>
                    <Col className="d-flex flex-column align-items-center justify-content-center">
                      <h5>
                        {" "}
                        <MdGames className="gearsvg" /> Games
                      </h5>
                      <div className="d-flex flex-row text-center my-1 align-items-center">
                        {user.preferences.gamesgenre.map((genre) => (
                          <div
                            style={{
                              ...prefsStyles,
                              backgroundColor: getRandomColor(),
                            }}
                          >
                            {" "}
                            <div className="d-flex flex-column"></div>
                            {genre}{" "}
                          </div>
                        ))}
                      </div>
                      <div className="d-flex flex-row text-center my-1 align-items-center">
                        {user.preferences.gamesbest.map((best) => (
                          <div
                            style={{
                              ...prefsStyles,
                              backgroundColor: getRandomColor(),
                            }}
                          >
                            {best}{" "}
                          </div>
                        ))}
                      </div>
                    </Col>
                  </>
                ) : (
                  <></>
                )}
              </Row>
            </Col>
          </Row>
        ) : (
          <></>
        )}
      </>
    );
  } else {
    return <h1>User not loaded</h1>;
  }
};

export default Info;
