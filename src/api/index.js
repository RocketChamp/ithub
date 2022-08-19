import axios from "axios";

const API = axios.create({ baseURL: process.env.baseURL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = () => API.get("/post");

export const createPost = (newPost) => API.post("/post", newPost);

export const likePost = (id) => API.patch(`/post/${id}/likePost`);

export const updatePost = (id, updatedPost) =>
  API.patch(`/post/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/post/${id}`);

export const fetchProjects = () => API.get("/project");

export const createProject = (newProject) => API.post("/project", newProject);

export const updateProject = (id, updatedProject) =>
  API.patch(`/project/${id}`, updatedProject);

export const deleteProject = (id) => API.delete(`/project/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);

export const signUp = (formData) => API.post("/user/signup", formData);

export const getUsers = () => API.get(`/user`);

export const updateUser = (id, updatedUser) =>
  API.post(`/user/${id}`, updatedUser);

export const deleteUser = (id) => API.post(`/user/${id}`);

export const followUser = (id, followingId) =>
  API.post(`/user/${id}/${followingId}/follow`);

export const unfollowUser = (id, unfollowingId) =>
  API.post(`/user/${id}/${unfollowingId}/unfollow`);
