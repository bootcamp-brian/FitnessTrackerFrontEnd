import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import NotFound from "./NotFound";
import Activities from "./pages/Activities";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyRoutines from "./pages/MyRoutines";
import Register from "./pages/Register";
import Root from "./pages/Root";
import Routines from "./pages/Routines";
import RoutinesByActivity from "./pages/RoutinesByActivity";
import RoutinesByUser from "./pages/RoutinesByUser";

const router = createBrowserRouter([
  {
      path: "/",
      element: <Root />,
      errorElement: <NotFound />,
      children: [
          {
            path: "activities",
            element: <Activities />,
          },
          {
            path: "routines",
            element: <Routines />,
          },
          {
            path: "myroutines",
            element: <MyRoutines />,
          },
          {
            path: "routinesbyuser/:username",
            element: <RoutinesByUser />,
          },
          {
            path: "routinesbyactivity/:activityId/:activityName",
            element: <RoutinesByActivity />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "home",
            element: <Home />,
          },
        ],
  },
]);

function App() {
  return (
      <div className="App">
          <RouterProvider router={router} />
      </div>
  )
}

export default App;