import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BsFillGearFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/users";
import { getLocalStorageUser } from "../../utils/utils";

const ProfileHeader = ({ user, usernameParam }) => {
  const dispatch = useDispatch();
  const localUser = getLocalStorageUser();
  const [followState, setFollowState] = useState();

  useEffect(() => {
    setFollowState(localUser?.friends?.includes(user?._id));
  }, [localUser?.friends, user?._id]);

  const handleFollow = () => {
    if (followState === false) {
      console.log("Following user...");
      dispatch(followUser(user?._id, localUser?.id));
      setFollowState(true);
    } else if (followState) {
      dispatch(unfollowUser(user?._id, localUser?.id));
      setFollowState(false);
    }
  };

  return (
    <>
      <div className="d-flex flex-row justify-content-center align-items-center">
        <img src={user.imageUrl} className="profile_avatar" alt="profile" />
        <div className="d-flex flex-column m-2 justify-content-center">
          <h4>@{user.username}</h4>
          <h3>{user.name}</h3>
        </div>
      </div>
      {user._id === localUser._id ? (
        <>
          <NavLink
            to={`/${usernameParam}/edit`}
            className="d-flex justify-content-center align-items-center"
          >
            <BsFillGearFill size="30px" className="gearsvg" />
          </NavLink>
        </>
      ) : (
        <>
          <div className="d-flex align-items-center mx-2">
            {console.log(
              "I am following this user - ",
              localUser?.friends?.includes(user?._id),
              " this user id is - ",
              user?._id
            )}
            <Button
              variant={followState ? "ithub" : "darktheme"}
              style={{ border: "1px solid #0b5ed7" }}
              onClick={handleFollow}
            >
              {followState ? "Unfollow" : "Follow"}
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileHeader;
