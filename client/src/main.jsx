import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./components/Home.jsx";
import Products from "./components/Products.jsx";
import SignIn from "./components/SignIn.jsx";
import Addcart from "./components/Addcart.jsx";
import SignUp from "./components/SignUp.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.jsx";
import Admin from "./components/Admin.jsx";
import DashBoard from "./components/DashBoard.jsx";
import Addproduct from "./components/Addproduct.jsx";
import ViewProduct from "./components/ViewProduct.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import RestPassword from "./components/RestPassword.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import VerificationOtp from "./components/VerificationOtp.jsx";

const GoogleAuthWrapper = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <SignIn></SignIn>
    </GoogleOAuthProvider>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/signIn",
        element: <GoogleAuthWrapper />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:token",
        element: <RestPassword />,
      },
      {
        path: "/verification-Otp",
        element:<VerificationOtp/>
      },
      {
        path: "/Addcart",
        element: <Addcart />,
      },
      {
        path: "/Addcart/:id",
        element: <Addcart />,
      },
      {
        path: "/ProductDetails/:id",
        element: <ProductDetails />,
      },
      {
        path: "/Admin/:id",
        element: <Admin />,
      },
      {
        path: "/Admin",
        element: <Admin />,
        children: [
          {
            path: "/Admin/dashboard",
            element: <DashBoard />,
          },
          {
            path: "/Admin/addproduct",
            element: <Addproduct />,
          },
          {
            path: "/Admin/viewproduct",
            element: <ViewProduct />,
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
