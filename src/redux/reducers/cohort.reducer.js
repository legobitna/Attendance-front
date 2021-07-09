import * as types from "../constants/cohort.constants";
const initialState = {
  cohorts: [],
  selectedCohort: {},
  loading: false,
};

const cohortReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_COHORT_REQUEST:
      return { ...state, loading: true };
    case types.GET_COHORT_REQUEST_SUCCESS:
      return {
        ...state,
        cohorts: payload.cohort,
        loading: false,
      };
    case types.GET_COHORT_REQUEST_FAILURE:
      return { ...state, loading: false };

    case types.GET_SINGLE_COHORT_REQUEST:
      return { ...state, loading: false };
    case types.GET_SINGLE_COHORT_REQUEST_SUCCESS:
      return {
        ...state,
        selectedCohort: payload,
        loading: false,
      };
    case types.GET_SINGLE_COHORT_REQUEST_FAILURE:
      return { ...state, loading: false };

    case types.CREATE_COHORT_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_COHORT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.CREATE_COHORT_REQUEST_FAILURE:
      return { ...state, loading: false };

    case types.DELETE_COHORT_REQUEST:
      return { ...state, loading: true };
    case types.DELETE_COHORT_REQUEST_FAILURE:
      return { ...state, loading: false };
    case types.DELETE_COHORT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedCohort: {},
      };

    case types.UPDATE_COHORT_REQUEST:
      return { ...state, loading: true };
    case types.UPDATE_COHORT_REQUEST_SUCCESS:
      return { ...state, loading: false };
    case types.UPDATE_COHORT_REQUEST_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default cohortReducer;
