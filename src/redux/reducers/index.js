import { combineReducers } from "redux";
import courseReducer from "./course.reducer";
import alertReducer from "./alert.reducer";
import cohortReducer from "./cohort.reducer";
import studentReducer from "./student.reducer";
import routeReducer from "./route.reducer";
import attendanceReducer from "./attendance.reducer";

export default combineReducers({
  course: courseReducer,
  alert: alertReducer,
  cohort: cohortReducer,
  route: routeReducer,
  attendance: attendanceReducer,
  student: studentReducer,
});
