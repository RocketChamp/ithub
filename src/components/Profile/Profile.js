import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button, Image } from 'react-bootstrap'
import { followUser, getUsers, unfollowUser } from "../../actions/users";
import { NavLink, Routes, Route, useParams, Link } from "react-router-dom";
import Info from './Info';
import Posts from './Posts.js';
import ProjectsContainer from "./ProjectsContainer";
import { BsFillGearFill } from 'react-icons/bs';
import ProfileNav from "./ProfileNav";
import AddNewPost from "../Posts/AddNewPost";

const Profile = ({ }) => {
  const dispatch = useDispatch();

  let currentUser = JSON.parse(localStorage.getItem("profile")).result || JSON.parse(localStorage.getItem("profile"));
  const id = currentUser?._id;

  
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, id]);

  let { username } = useParams();
  const [currentId, setCurrentId] = useState(null);
  const user = useSelector((state) => state?.reducers?.users.find((user) => user.username === username));

  let [followState, setFollowState] = useState();

  useEffect(() => {
    setFollowState(currentUser?.friends?.includes(user?._id))
  }, [currentUser.friends])

  const handleFollow = () => {
    if (followState === false) {
      console.log("Following user...");
      dispatch(followUser(user?._id, id))
      setFollowState(true);
    } else if (followState) {
      dispatch(unfollowUser(user?._id, id))
      setFollowState(false);
    }
  }

  const users = useSelector(state => state?.reducers?.users);

  let friends = [];
  user?.friends.forEach(friendId => {
    friends.push(users.find(e => e?._id === friendId))
  });

  return (<>
    {(user) ? <>
      <Container className='profile-container' >
        <Row className='d-flex justify-content-center mt-3'>
          <Col className="d-flex justify-content-between align-items-center page-wrapper p-3" xs={11} sm={11} md={11} lg={6} >
            <div className="d-flex flex-row justify-content-center align-items-center">
              <img src={user.imageUrl} className='profile_avatar' alt='profile' />
              <div className="d-flex flex-column m-2 justify-content-center">
                <h4>@{user.username}</h4>
                <h3>{user.name}</h3>
              </div>
            </div>
            {user?._id === id ?
              <>
                <NavLink to={`/${username}/edit`} className="d-flex justify-content-center align-items-center" >
                  <BsFillGearFill size="30px" className="gearsvg" />
                </NavLink>
              </> :
              <>
                <div className="d-flex align-items-center mx-2">
                  {console.log("I am following this user - ", currentUser?.friends?.includes(user?._id), " this user id is - ", user?._id)}
                  <Button variant={followState ? "ithub" : "darktheme"} style={{ border: "1px solid #0b5ed7" }} onClick={handleFollow} >{followState ? "Unfollow" : "Follow"}</Button>
                </div>
              </>}

          </Col>
        </Row>
        <Row className='d-flex flex-column align-content-center justify-content-center mt-3'>
          {user?.bio ?
            <Col className="d-flex flex-column page-wrapper p-3 mb-3 px-4" xs={11} sm={11} md={11} lg={6} >
              <h4>About </h4>
              <div>{user?.bio}</div>
            </Col> :
            <></>
          }
          {friends.length !== 0 ?
            <>
              <Col className="d-flex flex-column page-wrapper p-3 px-4" xs={11} sm={11} md={11} lg={6} >
                <h4>Following</h4>
                <div>
                  {friends?.map(friend => friend !== undefined ?
                    <Link key={friend?._id} to={`/${friend?.username}`}>
                      <img className="navbar_avatar m-1" src={friend?.imageUrl} alt={friend?.username} />
                    </Link> :
                    <></>)}
                </div>
              </Col>
            </> :
            <></>}

        </Row>
        {user?._id === id ? <><AddNewPost currentId={currentId} setCurrentId={setCurrentId} /></> : <></>}
        <ProfileNav />
        <Row className='d-flex justify-content-center mt-3'>
          <Routes >
            <Route index element={<Info />} />
            <Route path="/info" element={<Info />} />
            <Route path="/posts" element={<Posts currentId={currentId} setCurrentId={setCurrentId} />} />
            <Route path="/projects" element={<ProjectsContainer />} />
          </Routes>
        </Row>
      </Container>
    </> : <>No user</>}

  </>
  )
}

export default Profile