import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Activities from "./pages/Activities";
import Home from "./pages/Home";
import MyRoutines from "./pages/MyRoutines";
import Routines from "./pages/Routines";

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
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "/",
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