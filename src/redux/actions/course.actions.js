import * as types from "../constants/course.constants";
import api from "../api";
import { routeActions } from "./route.actions";
import { toast } from "react-toastify";

const getCourse = () => async (dispatch) => {
  dispatch({ type: types.GET_COURSE_REQUEST, payload: null });
  try {
    const res = await api.get(`/course`);
    dispatch({
      type: types.GET_COURSE_REQUEST_SUCCESS,
      payload: { course: res.data.data },
    });
  } catch (error) {
    dispatch({ type: types.GET_COURSE_REQUEST_FAILURE, payload: error });
  }
};

const getSingleCourse = (courseId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_COURSE_REQUEST, payload: null });
  try {
    const res = await api.get(`/course/${courseId}`);
    dispatch({
      type: types.GET_SINGLE_COURSE_REQUEST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_COURSE_REQUEST_FAILURE,
      payload: error,
    });
  }
};

const registerCourse = (formData) => async (dispatch) => {
  dispatch({ type: types.CREATE_COURSE_REQUEST, payload: null });
  try {
    const res = await api.post(`/course`, formData);
    dispatch({
      type: types.CREATE_COURSE_REQUEST_SUCCESS,
      payload: res.data.data,
    });
    toast.success("New course has been added!");
    dispatch(routeActions.redirect("__GO_BACK__"));
    dispatch(getCourse());
  } catch (error) {
    dispatch({ type: types.CREATE_COURSE_REQUEST_FAILURE, payload: error });
  }
};

const updateCourse = (courseId, formData) => async (dispatch) => {
  dispatch({ type: types.UPDATE_COURSE_REQUEST, payload: null });
  try {
    const res = await api.put(`/course/${courseId}`, formData);
    dispatch({
      type: types.UPDATE_COURSE_REQUEST_SUCCESS,
      payload: res.data.data,
    });
    toast.success("The course has been updated!");
    dispatch(routeActions.redirect("/course"));
    // dispatch(getCourse());
  } catch (error) {
    dispatch({ type: types.UPDATE_COURSE_REQUEST_FAILURE, payload: error });
  }
};

const deleteCourse = (courseId) => async (dispatch) => {
  dispatch({ type: types.DELETE_COURSE_REQUEST, payload: null });
  try {
    const res = await api.delete(`/course/${courseId}`);
    dispatch({
      type: types.DELETE_COURSE_REQUEST_SUCCESS,
      payload: res.data,
    });
    toast.success("The course has been deleted!");
    dispatch(routeActions.redirect("__GO_BACK__"));
    dispatch(getCourse());
  } catch (error) {
    dispatch({ type: types.DELETE_COURSE_REQUEST_FAILURE, payload: error });
  }
};

export const courseActions = {
  getCourse,
  getSingleCourse,
  registerCourse,
  updateCourse,
  deleteCourse,
};
