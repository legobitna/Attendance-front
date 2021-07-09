import * as types from "../constants/student.constants";
const initialState = {
  students: [],
  selectedStudent: {},
  //   accessToken: localStorage.getItem("accessToken"),
  //   isAuthenticated: false,
  loading: false,
};

const studentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_STUDENT_REQUEST:
      return { ...state, loading: true };
    case types.GET_STUDENT_REQUEST_SUCCESS:
      return {
        ...state,
        students: payload.student,
        loading: false,
      };
    case types.GET_STUDENT_REQUEST_FAILURE:
      return { ...state, loading: false };

    case types.GET_SINGLE_STUDENT_REQUEST:
      return { ...state, loading: true };
    case types.GET_SINGLE_STUDENT_REQUEST_SUCCESS:
      console.log("student reducer:", payload);
      return {
        ...state,
        selectedStudent: payload,
        loading: false,
      };
    case types.GET_SINGLE_STUDENT_REQUEST_FAILURE:
      return { ...state, loading: false };

    case types.CREATE_STUDENT_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_STUDENT_REQUEST_FAILURE:
      return { ...state, loading: false };
    case types.CREATE_STUDENT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case types.UPDATE_STUDENT_REQUEST:
      return { ...state, loading: true };
    case types.UPDATE_STUDENT_REQUEST_SUCCESS:
      return { ...state, loading: false };
    case types.UPDATE_STUDENT_REQUEST_FAILURE:
      return { ...state, loading: false };

    case types.DELETE_STUDENT_REQUEST:
      return { ...state, loading: true };
    case types.DELETE_STUDENT_REQUEST_FAILURE:
      return { ...state, loading: false };
    case types.DELETE_STUDENT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedStudent: {},
      };

    default:
      return state;
  }
};

export default studentReducer;
