import React, { useState } from "react";
import moment from "moment";
import { Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import PromptSignin from "../Home/PromptSignin";
import { deletePost, likePost } from "../../actions/posts";
import { Link } from "react-router-dom";
import { getLocalStorageUser, getRandomColor } from "../../utils/utils";

function Post({ setCurrentId, post }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const localUser = getLocalStorageUser();

  const user = useSelector((state) =>
    state?.reducers?.users.find((user) => user._id === post.creator)
  );

  const handleLike = () => {
    if (localUser?._id) {
      dispatch(likePost(post?._id));
    } else {
      setShow(true);
    }
  };

  return (
    <Col className="d-flex flex-column justify-content-between page-wrapper">
      <div className="d-flex flex-row justify-content-between align-items-center post-top-bar mx-3">
        <Link to={`/${user?.username}`} className="d-flex">
          <img className="post_avatar" alt="avatar" src={user?.imageUrl} />
          <div className="d-flex mx-2">
            <h5>
              <strong>{user?.name}</strong>
            </h5>
            <div className="">@{user?.username}</div>
            <span className="mx-1">
              <strong>·</strong>
            </span>
            <span>{moment(post.createdAt).fromNow()}</span>
          </div>
        </Link>
        <div className="functions-post">
          <Dropdown>
            <Dropdown.Toggle variant="ligth" id="dropdown-basic">
              <BsThreeDots className="postthreedots" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {post.creator === localUser?._id ||
              post.creator === localUser?.googleId ? (
                <>
                  <Dropdown.Item
                    key="edit"
                    onClick={() => {
                      setCurrentId(post._id);
                    }}
                  >
                    <span>Edit</span>
                  </Dropdown.Item>
                  <Dropdown.Item
                    key="remove"
                    onClick={() => dispatch(deletePost(post._id))}
                  >
                    <span style={{ color: "red" }}>Remove</span>
                  </Dropdown.Item>
                </>
              ) : (
                <></>
              )}
              <Dropdown.Item key="share">
                <span style={{ color: "black" }}>Share</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div>
        {post.selectedFile ? (
          <>
            <img
              alt="post_image"
              className="custom-card-image"
              src={post.selectedFile}
            />
          </>
        ) : (
          <></>
        )}
        <div className="d-flex justify-content-start align-items-center">
          <Button size="lg" variant="like" onClick={handleLike}>
            {!post.likes.includes(localUser?._id) ? (
              <>
                <BsSuitHeart size="25" className="likebutton" />
              </>
            ) : (
              <>
                <BsSuitHeartFill
                  size="25"
                  className="likebutton"
                  style={{ transition: "500ms", fill: "#0b5ed7" }}
                />
              </>
            )}
          </Button>
          {show ? (
            <PromptSignin
              handleShow={handleShow}
              handleClose={handleClose}
              show={show}
            />
          ) : (
            <></>
          )}
          <Button size="lg" variant="like">
            {" "}
            <FaComment color="whitesmoke" size="25" />{" "}
          </Button>
        </div>
        <span className="likescounter px-3">
          {post.likes.length === 1 && post.likes.length !== 0
            ? post.likes.length + " Like"
            : post.likes.length + " Likes"}
        </span>
        <div className="p-3">
          <p>{post.description}</p>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-row flex-wrap">
              {post.tags.map((tag, index) => (
                <a
                  href="/"
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
                  #{tag}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
}

export default Post;
