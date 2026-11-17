import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Tasklist from "./Tasklist";

const App = () => {
  const route = createBrowserRouter([
    {
      path:"/",
      element: <Navbar />
    },
    {
      path: "/register",
      element: <RegisterPage />
    },
    {
      path:"/login",
      element:<LoginPage />
    }
  ]);

  return (
    <RouterProvider router={route} />
  );
};

export default App;