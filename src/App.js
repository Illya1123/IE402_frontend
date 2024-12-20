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
import Detail from "./pages/TourDetail/detail.jsx";
import AdminDashboard from './pages/AdminPage/Dashboard/AdminDashboard.jsx'
import AdminManageAccounts from './pages/AdminPage/ManageAccounts/AdminManageAccounts.jsx';
import AdminManageTours from './pages/AdminPage/ManageTours/AdminManageTours.jsx';
import AdminManageDestinates from './pages/AdminPage/ManageTours/AdminManageDestinates.jsx';
import AdminManageRoutes from './pages/AdminPage/ManageTours/AdminManageRoutes.jsx';
import AdminManageRouteDestinates from "./pages/AdminPage/ManageTours/AdminManageRouteDestinates.jsx";
import AdminManageBookings from './pages/AdminPage/ManageBooking/AdminManageBookings.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <SignUpForm /> },
      { path: "/login", element: <SignInForm /> },
      { path: "/home", element: <Home /> },
      { path: "/tourist-account", element: <TouristAccount /> },
      { path: "/tourist-booking", element: <TouristBooking /> },
      { path: "/tourist-favourite", element: <TouristFavourite /> },
      { path: "/detail/:id", element: <Detail />},
      { path: "/admin-dashboard", element: <AdminDashboard />},
      { path: "/admin-manage-accounts", element: <AdminManageAccounts />},
      { path: "/admin-manage-tours", element: <AdminManageTours />},
      { path: "/admin-manage-destinates", element: <AdminManageDestinates />},
      { path: "/admin-manage-routes", element: <AdminManageRoutes />},
      { path: "/admin-manage-route_destinates", element: <AdminManageRouteDestinates />},
      { path: "/admin-manage-bookings", element: <AdminManageBookings />}
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
