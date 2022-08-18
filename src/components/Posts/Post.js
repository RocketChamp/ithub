import React, { useState } from "react";
import moment from "moment";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs'
import { FaComment } from 'react-icons/fa'
import {
  BsThreeDotsVertical
} from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import PromptSignin from "../Home/PromptSignin";
import { deletePost, likePost } from "../../actions/posts";
import { Link, useParams } from "react-router-dom";


function Post({ setCurrentId, post }) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const currentUser = JSON.parse(localStorage.getItem("profile"))?.result
  const id = currentUser?._id;

  const imgPlaceholder = "https://matematego.com/assets/noimage-cf86abd9b579765c1131ec86cb1e70052199ddadfecf252e5cb98e50535d11f3.png";

  const user = useSelector((state) => state?.reducers?.users.find((user) => user._id === post.creator));

  const getRandomColor = () => {
    return "hsl(" + Math.random() * 360 + ", 40%, 40%)";
  }

  const handleLike = () => {
    if (id) {
      dispatch(likePost(post?._id));
    } else {
      setShow(true);
    }
  }

  return (
    <div className="d-flex flex-column mt-3 justify-content-between post">
      <div className="d-flex flex-row justify-content-between align-items-center post-top-bar mx-3">
        <Link to={`/${user?.username}`} className="d-flex align-items-center justify-content-center">
          <img className="post_avatar" alt="avatar" src={user?.imageUrl} />
          <h6 className="text-center align-self-center my-1 mx-1">@{user?.username}</h6>
        </Link>
        <div className="functions-post">
          <Dropdown>
            <Dropdown.Toggle variant="ligth" id="dropdown-basic">
              <BsThreeDotsVertical className="postthreedots" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {
                post.creator === currentUser?._id || post.creator === currentUser?.googleId ?
                  <>
                    <Dropdown.Item key='edit'
                      onClick={() => {
                        setCurrentId(post._id);
                      }}
                    >
                      <span>Edit</span>
                    </Dropdown.Item>
                    <Dropdown.Item key='remove'
                      onClick={() => dispatch(deletePost(post._id))}
                    >
                      <span style={{ color: "red" }}>Remove</span>
                    </Dropdown.Item>
                  </> : <></>}
              <Dropdown.Item key='share'>
                <span style={{ color: "black" }}>Share</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div>
        {!post.selectedFile ? (
          <img alt='placeholder_image' className="custom-card-image" src={imgPlaceholder} />
        ) : (
          <>
            <img alt="post_image"
              className="custom-card-image"
              src={post.selectedFile}
            />
          </>
        )}
        <div className="d-flex justify-content-start align-items-center">
          <Button
            size="lg"
            variant="like"
            onClick={handleLike}
          >
            {!post.likes.includes(currentUser?._id) ? <>
              <BsSuitHeart size="25" className="likebutton" />
            </> :
              <>
                <BsSuitHeartFill size="25" className="likebutton" style={{ transition: "500ms", fill: "#0b5ed7" }} />
              </>}
          </Button>
          {show ?
            <PromptSignin handleShow={handleShow} handleClose={handleClose} show={show} /> :
            <></>}
          <Button
            size="lg"
            variant="like"
          > <FaComment color="whitesmoke" size="25" /> </Button>
        </div>
        <span className="likescounter px-3">{(post.likes.length === 1 && post.likes.length !== 0) ? post.likes.length + " Like" : post.likes.length + " Likes"}</span>
        <div className="p-3" >
          <p>{post.description}</p>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-row flex-wrap" >
              {post.tags.map((tag, index) => <a href="/" key={index} style={{ display: "flex", flexDirection: "", transition: "500ms", padding: "0 5px", borderRadius: "15px", backgroundColor: getRandomColor(), margin: "5px", color: "white" }} >#{tag}</a>)}
            </div>
            <div className="text-end">{moment(post.createdAt).fromNow()}</div>
          </div>
        </div>


      </div>
    </div>
  );
}

export default Post;
