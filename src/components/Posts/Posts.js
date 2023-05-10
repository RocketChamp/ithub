import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Post from "./Post.js";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { getUsers } from "../../actions/users.js";
import { NavLink, Routes, Route } from "react-router-dom";
import { getPosts } from "../../actions/posts.js";

const Posts = ({ setCurrentId, mode }) => {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("profile"))?.result;
  const id = currentUser?._id;

  const user = useSelector((state) => state?.reducers?.users.find(user => user?._id === id));
  const users = useSelector((state) => state?.reducers?.users);
  const posts = useSelector((state) => state?.reducers?.posts);

  const getFriendsPosts = () => {
    let friendsPosts = [];
    posts.forEach(post => user?.friends.includes(post?.creator) && friendsPosts.push(post));
    return friendsPosts;
  }

  const [friendsPosts, setFriendsPosts] = useState(getFriendsPosts());

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch, id, friendsPosts])

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch, id])

  useEffect(() => {
    setFriendsPosts(getFriendsPosts());
  }, [dispatch])

  // console.log(getFriendsPosts());

  return (
    <Row>
      {mode === "discover" ? <>
        <Col className="d-flex flex-column-reverse">
          {!posts.length ? (
            <>
              <Spinner className="spinnner" animation="border" role="status" />
            </>
          ) : (
            posts.map((post) =>
              <React.Fragment key={post?._id}>
                <Post setCurrentId={setCurrentId} post={post} user={users.find((user) => user?._id === post?.creator)} />
              </React.Fragment>)
          )}
        </Col>
      </> :
        <>
          <Col className="d-flex flex-column-reverse">
            {friendsPosts.map(post =>
              <React.Fragment key={post?._id}>
                <Post post={post} setCurrentId={setCurrentId} user={users.find(user => user?._id === post?.creator)} />
              </React.Fragment>
            )}
          </Col>
        </>}
    </Row >
  );
};

export default Posts;
