import NotFound from "components/NotFound";
import SideBar from "components/SideBar";
import React, { useEffect } from "react";
import { Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router";
import CourseDetail from "./pages/CourseDetail";
import CreateCourse from "./pages/CreateCourse";
import { _LIST_LINK } from "constant/config";


function Course(props) {
  const match = useRouteMatch();
  const location = useLocation()
  const history = useHistory()
  useEffect(() => {
    if (location.pathname === _LIST_LINK.course) {
      //handle logic push route course dau tien
      history.push('course/1')
    }
  }, []);
  return (
    <div>
      <SideBar />
      <Switch>
        <Route
          path={`${match.path}/create-course/new`}
          component={CreateCourse}
          exact
        />
        <Route
          path={`${match.path}/:courseId`}
          component={CourseDetail}
          exact
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default Course;
