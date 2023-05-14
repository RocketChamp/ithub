import React from "react";
import FormComp from "./FormComp";

const AddNewPost = ({ currentId, setCurrentId }) => {
  return (
    <>
      <FormComp currentId={currentId} setCurrentId={setCurrentId} />
    </>
  );
};

export default AddNewPost;
