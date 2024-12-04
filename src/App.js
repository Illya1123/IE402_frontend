import { useEffect } from "react";
// import { Routes, Route } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Modal from 'react-modal';
import SignUpForm from './components/auth/SignUpForm';
import SignInForm from './components/auth/SignInForm';
import Layout from './components/Layout';
import Home from './pages/Home/Home.jsx';
import TouristAccount from './pages/Tourist/TouristAccount.jsx';
import TouristBooking from './pages/Tourist/TouristBooking.jsx';
import TouristFavourite from './pages/Tourist/TouristFavourite.jsx';
import StaffManager from "./components/Layout/staff.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <TouristAccount /> },
      { path: "/register", element: <SignUpForm /> },
      { path: "/login", element: <SignInForm /> },
      { path: "/home", element: <Home /> },
      { path: "/tourist-account", element: <TouristAccount /> },
      { path: "/tourist-booking", element: <TouristBooking /> },
      { path: "/tourist-favourite", element: <TouristFavourite /> },
    ],
  },
  {
    path: "/staff/*",
    element: <StaffManager />,
  },
]);

function App() {
  useEffect(() => {
    Modal.setAppElement(document.getElementById("root"));
  }, []);
  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
