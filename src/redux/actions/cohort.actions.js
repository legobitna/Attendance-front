import * as types from "../constants/cohort.constants";
import { routeActions } from "./route.actions";
import api from "../api";
import { toast } from "react-toastify";

const getCohort = () => async (dispatch) => {
  dispatch({ type: types.GET_COHORT_REQUEST, payload: null });
  try {
    const res = await api.get(`/cohort`);

    dispatch({
      type: types.GET_COHORT_REQUEST_SUCCESS,
      payload: { cohort: res.data.data },
    });
  } catch (error) {
    dispatch({ type: types.GET_COHORT_REQUEST_FAILURE, payload: error });
  }
};

const getSingleCohort = (cohortId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_COHORT_REQUEST, payload: null });
  try {
    const res = await api.get(`/cohort/${cohortId}`);
    dispatch({
      type: types.GET_SINGLE_COHORT_REQUEST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_SINGLE_COHORT_REQUEST_FAILURE,
      payload: error,
    });
  }
};

const registerCohort = (formData) => async (dispatch) => {
  dispatch({ type: types.CREATE_COHORT_REQUEST, payload: null });
  try {
    const res = await api.post(`/cohort`, formData);
    dispatch({
      type: types.CREATE_COHORT_REQUEST_SUCCESS,
      payload: res.data.data,
    });
    toast.success("New cohort has been added!");
    dispatch(routeActions.redirect("__GO_BACK__"));
    dispatch(getCohort());
  } catch (error) {
    dispatch({ type: types.CREATE_COHORT_REQUEST_FAILURE, payload: error });
  }
};

const updateCohort = (cohortId, formData) => async (dispatch) => {
  dispatch({ type: types.UPDATE_COHORT_REQUEST, payload: null });
  try {
    const res = await api.put(`/cohort/${cohortId}`, formData);
    dispatch({
      type: types.UPDATE_COHORT_REQUEST_SUCCESS,
      payload: res.data.data,
    });
    toast.success("The cohort has been updated!");
    dispatch(routeActions.redirect("/cohort"));
    // dispatch(getCohort());
  } catch (error) {
    dispatch({ type: types.UPDATE_COHORT_REQUEST_FAILURE, payload: error });
  }
};

const deleteCohort = (cohortId) => async (dispatch) => {
  dispatch({ type: types.DELETE_COHORT_REQUEST, payload: null });
  try {
    const res = await api.delete(`/cohort/${cohortId}`);
    dispatch({
      type: types.DELETE_COHORT_REQUEST_SUCCESS,
      payload: res.data,
    });
    toast.success("The cohort has been deleted!");
    dispatch(routeActions.redirect("__GO_BACK__"));
    dispatch(getCohort());
  } catch (error) {
    dispatch({ type: types.DELETE_COHORT_REQUEST_FAILURE, payload: error });
  }
};

export const cohortActions = {
  getCohort,
  getSingleCohort,
  registerCohort,
  updateCohort,
  deleteCohort,
};
