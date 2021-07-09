import * as types from "../constants/student.constants";
import api from "../api";
import { routeActions } from "./route.actions";
import { toast } from "react-toastify";
import { attendanceActions } from ".";

const getStudent = () => async (dispatch) => {
  dispatch({ type: types.GET_STUDENT_REQUEST, payload: null });
  try {
    const res = await api.get(`/student`);
    dispatch({
      type: types.GET_STUDENT_REQUEST_SUCCESS,
      payload: { student: res.data.data },
    });
  } catch (error) {
    dispatch({ type: types.GET_STUDENT_REQUEST_FAILURE, payload: error });
  }
};

const getSingleStudent = (studentId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_STUDENT_REQUEST, payload: null });
  try {
    const res = await api.get(`/student/${studentId}`);
    dispatch({
      type: types.GET_SINGLE_STUDENT_REQUEST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_STUDENT_REQUEST_FAILURE,
      payload: error,
    });
  }
};

const registerStudent = (formData) => async (dispatch) => {
  dispatch({ type: types.CREATE_STUDENT_REQUEST, payload: null });
  console.log("formdata?", formData);

  try {
    console.log("register student:", formData);
    const res = await api.post(`/student`, { students: [{ ...formData }] });
    dispatch({
      type: types.CREATE_STUDENT_REQUEST_SUCCESS,
      payload: res.data.data,
    });
    toast.success("New student has been added!");
    dispatch(routeActions.redirect("__GO_BACK__"));
    dispatch(getStudent());
  } catch (error) {
    dispatch({ type: types.CREATE_STUDENT_REQUEST_FAILURE, payload: error });
  }
};

const updateStudent = (studentId, formData) => async (dispatch) => {
  dispatch({ type: types.UPDATE_STUDENT_REQUEST, payload: null });
  try {
    const res = await api.put(`/student/${studentId}`, formData);
    dispatch({
      type: types.UPDATE_STUDENT_REQUEST_SUCCESS,
      payload: res.data.data,
    });
    toast.success("The student has been updated!");
    dispatch(routeActions.redirect("/student"));
    // dispatch(getStudent());
  } catch (error) {
    dispatch({ type: types.UPDATE_STUDENT_REQUEST_FAILURE, payload: error });
  }
};

const deleteStudent = (studentId) => async (dispatch) => {
  dispatch({ type: types.DELETE_STUDENT_REQUEST, payload: null });
  try {
    const res = await api.delete(`/student/${studentId}`);
    dispatch({
      type: types.DELETE_STUDENT_REQUEST_SUCCESS,
      payload: res.data,
    });
    toast.success("The student has been deleted!");
    dispatch(routeActions.redirect("__GO_BACK__"));
    dispatch(getStudent());
  } catch (error) {
    dispatch({ type: types.DELETE_STUDENT_REQUEST_FAILURE, payload: error });
  }
};

const registerStudentList = (formData, selectedSession) => async (dispatch) => {
  dispatch({ type: types.CREATE_STUDENT_LIST_REQUEST, payload: null });
  try {
    const res = await api.post(`/student/list`, {
      data: formData,
      sessionId: selectedSession,
    });

    dispatch({
      type: types.CREATE_STUDENT_LIST_REQUEST_SUCCESS,
      payload: res.data.data,
    });
    dispatch(attendanceActions.getAttendanceBySessionId(selectedSession));
  } catch (error) {
    dispatch({
      type: types.CREATE_STUDENT_LIST_REQUEST_FAILURE,
      payload: error,
    });
  }
};

export const studentActions = {
  getStudent,
  getSingleStudent,
  registerStudent,
  deleteStudent,
  updateStudent,
  registerStudentList,
};
