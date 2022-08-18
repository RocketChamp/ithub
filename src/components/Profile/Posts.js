import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Post from '../Posts/Post';
import { getUsers } from '../../actions/users';
import { getPosts } from '../../actions/posts';
import { useParams } from 'react-router-dom';

const Posts = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("profile"))?.result
  const id = currentUser._id;
  let {username} = useParams()
  
  useEffect(() => {
    dispatch(getUsers())
    dispatch(getPosts())
  }, [dispatch, id])
  
  const posts = useSelector((state) => state?.reducers?.posts);
  const user = useSelector((state) => state?.reducers?.users.find((user) => user?.username === username));

  return (
    <>
      <Row className='d-flex justify-content-center'>
        <Col lg={6} className='d-flex flex-column-reverse mt-2'>
          {posts.map((post) => (post.creator === user?._id) ? <Post elementId={post._id} setCurrentId={setCurrentId} post={post} /> : <></>)}
        </Col>
      </Row>
    </>

  )
}

export default Posts