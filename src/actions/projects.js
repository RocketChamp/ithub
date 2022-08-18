import * as api from "../api";
import {
  FETCH_PROJECTS,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from "../constants/actionTypes.js";

// Action Creators
export const fetchProjects = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProjects();

    dispatch({ type: FETCH_PROJECTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createProject = (project) => async (dispatch) => {
  console.log(project)
  try {
    const { data } = await api.createProject(project);

    dispatch({ type: CREATE_PROJECT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateProject = (id, project) => async (dispatch) => {
  try {
    const { data } = await api.updateProject(id, project);
    console.log(data)
    console.log(id)

    dispatch({ type: UPDATE_PROJECT, payload: data });
  } catch (error) {
    console.log(project)
    console.log(error);
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    await api.deleteProject(id);

    dispatch({ type: DELETE_PROJECT, payload: id });
  } catch (error) {
    console.log(error);
  }
};

// export const likeProject = (id) => async (dispatch) => {
//   try {
//     const { data } = await api.likeProject(id);

//     dispatch({ type: LIKE_PROJECT, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };
