import NotFound from "components/NotFound";
import SideBar from "components/SideBar";
import React, { useEffect } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router";
import CourseDetail from "./pages/CourseDetail";
import CreateCourse from "./pages/CreateCourse";


function Course(props) {
  const match = useRouteMatch();
  const history = useHistory()
  useEffect(() => {
    //temp init course detail
    history.push('course/1')
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
