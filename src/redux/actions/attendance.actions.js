import * as types from "../constants/attendance.constants";
import { routeActions } from "./route.actions";
import api from "../api";

const getAttendanceBySessionId = (sessionId) => async (dispatch) => {
  dispatch({ type: types.GET_ATTENDANCE_REQUEST, payload: null });
  try {
    const res = await api.get(`/attendance/${sessionId}`);
    console.log("sessionId", sessionId);
    dispatch({
      type: types.GET_ATTENDANCE_REQUEST_SUCCESS,
      payload: { data: res.data.data },
    });
  } catch (error) {
    dispatch({ type: types.GET_ATTENDANCE_REQUEST_FAILURE, payload: error });
  }
};

const generateAttendance = (meetingId) => async (dispatch) => {
  dispatch({ type: types.GENERATE_ATTENDANCE_REQUEST, payload: null });
  try {
    const payload = { meetingId };

    const res = await api.post(`/link`, payload);
    if (res.status == 200) {
      dispatch({
        type: types.GENERATE_ATTENDANCE_REQUEST_SUCCESS,
        payload: `successfully generate meeting ${meetingId} check the attendance menu`,
      });
    }
  } catch (error) {
    dispatch({
      type: types.GENERATE_ATTENDANCE_REQUEST_FAILURE,
      payload: error,
    });
  }
};
// const registerCohort = (formData) => async (dispatch) => {
//   dispatch({ type: types.CREATE_COHORT_REQUEST, payload: null });
//   try {
//     const res = await api.post(`/cohort`, formData);
//     dispatch({
//       type: types.CREATE_COHORT_REQUEST_SUCCESS,
//       payload: res.data.data,
//     });
//     dispatch(routeActions.redirect("goback"));
//   } catch (error) {
//     dispatch({ type: types.CREATE_COHORT_REQUEST_FAILURE, payload: error });
//   }
// };

export const attendanceActions = {
  getAttendanceBySessionId,
  generateAttendance,
};
