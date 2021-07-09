import * as types from "../constants/course.constants";
const initialState = {
  courses: [],
  selectedCourse: {},
  //   accessToken: localStorage.getItem("accessToken"),
  //   isAuthenticated: false,
  loading: false,
};

const courseReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_COURSE_REQUEST:
      return { ...state, loading: false };
    case types.GET_COURSE_REQUEST_SUCCESS:
      return {
        ...state,
        courses: payload.course,
        loading: false,
      };
    case types.GET_COURSE_REQUEST_FAILURE:
      return { ...state, loading: false };

    case types.GET_SINGLE_COURSE_REQUEST:
      return { ...state, loading: false };
    case types.GET_SINGLE_COURSE_REQUEST_SUCCESS:
      return {
        ...state,
        selectedCourse: payload,
        loading: false,
      };
    case types.GET_SINGLE_COURSE_REQUEST_FAILURE:
      return { ...state, loading: false };

    case types.CREATE_COURSE_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_COURSE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.CREATE_COURSE_REQUEST_FAILURE:
      return { ...state, loading: false };

    case types.DELETE_COURSE_REQUEST:
      return { ...state, loading: true };
    case types.DELETE_COURSE_REQUEST_FAILURE:
      return { ...state, loading: false };
    case types.DELETE_COURSE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        // selectedCourse: {},
      };

    case types.UPDATE_COURSE_REQUEST:
      return { ...state, loading: true };
    case types.UPDATE_COURSE_REQUEST_SUCCESS:
      return { ...state, loading: false };
    case types.UPDATE_COURSE_REQUEST_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default courseReducer;
