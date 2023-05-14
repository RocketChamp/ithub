import React from "react";
import { Button } from "react-bootstrap";

const FeedSwitch = ({ setMode }) => {
  return (
    <div className="d-flex flex-row justify-content-center">
      <Button
        className="mx-1"
        name="myfeed"
        style={{ borderRadius: "20px", backgroundColor: "#222222" }}
        onClick={(e) => setMode(e.target.name)}
      >
        My feed
      </Button>
      <Button
        className="mx-1"
        name="discover"
        style={{ borderRadius: "20px" }}
        onClick={(e) => setMode(e.target.name)}
      >
        Discover
      </Button>
    </div>
  );
};

export default FeedSwitch;
