import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Post from "./Post.js";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { getLocalStorageUser } from "../../utils/utils.js";

const Posts = ({ setCurrentId, mode, posts, users }) => {
  const dispatch = useDispatch();
  const localUser = getLocalStorageUser();

  const user = useSelector((state) =>
    state?.reducers?.users.find((user) => user?._id === localUser?._id)
  );

  const getFriendsPosts = () => {
    let friendsPosts = [];
    posts.forEach(
      (post) => user?.friends.includes(post?.creator) && friendsPosts.push(post)
    );
    return friendsPosts;
  };

  const [friendsPosts, setFriendsPosts] = useState(getFriendsPosts());

  useEffect(() => {
    setFriendsPosts(getFriendsPosts());
  }, [dispatch]);

  return (
    <Row>
      {mode === "discover" ? (
        <Col className="d-flex flex-column-reverse gap-3">
          {!posts.length ? (
            <>
              <Spinner className="spinnner" animation="border" role="status" />
            </>
          ) : (
            posts.map((post) => (
              <Post
                key={post?._id}
                setCurrentId={setCurrentId}
                post={post}
                user={users.find((user) => user?._id === post?.creator)}
              />
            ))
          )}
        </Col>
      ) : (
        <Col className="d-flex flex-column-reverse gap-3">
          {friendsPosts.map((post) => (
            <Post
              key={post?._id}
              post={post}
              setCurrentId={setCurrentId}
              user={users.find((user) => user?._id === post?.creator)}
            />
          ))}
        </Col>
      )}
    </Row>
  );
};

export default Posts;
