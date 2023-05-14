import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "../Posts/Post";
import { getUsers } from "../../actions/users";
import { getPosts } from "../../actions/posts";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

const Posts = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("profile"))?.result;
  const id = currentUser._id;
  let { username } = useParams();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPosts());
  }, [dispatch, id]);

  const posts = useSelector((state) => state?.reducers?.posts);
  const user = useSelector((state) =>
    state?.reducers?.users.find((user) => user?.username === username)
  );

  return (
    <>
      {posts.map((post) =>
        post.creator === user?._id ? (
          <Row className="d-flex justify-content-center">
            <Col className="d-flex p-0" xs={12} sm={10} md={8} lg={6}>
              <Post
                elementId={post._id}
                setCurrentId={setCurrentId}
                post={post}
              />
            </Col>
          </Row>
        ) : (
          <></>
        )
      )}
    </>
  );
};

export default Posts;
