import * as types from "../constants/attendance.constants";
const initialState = {
  attendanceList: [],
  notFoundList: [],
  result: "",
  loading: false,
};

const attendanceReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.CREATE_ATTENDANCE_REQUEST:
    case types.GET_ATTENDANCE_REQUEST:
      return { ...state, loading: true };
    case types.GENERATE_ATTENDANCE_REQUEST:
      return { ...state, loading: true, result: "" };
    case types.CREATE_ATTENDANCE_REQUEST_FAILURE:
    case types.GET_ATTENDANCE_REQUEST_FAILURE:
      return { ...state, loading: false };
    case types.GENERATE_ATTENDANCE_REQUEST_FAILURE:
      return { ...state, loading: false, result: "" };
    case types.CREATE_ATTENDANCE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.GET_ATTENDANCE_REQUEST_SUCCESS:
      return {
        ...state,
        attendanceList: [...payload.data.attendance],
        notFoundList: [...payload.data.notFoundList],
        loading: false,
      };
    case types.GENERATE_ATTENDANCE_REQUEST_SUCCESS:
      return {
        ...state,
        result: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default attendanceReducer;
