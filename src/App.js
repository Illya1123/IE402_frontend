import { useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Modal from 'react-modal';
import SignUpForm from './components/auth/SignUpForm';
import SignInForm from './components/auth/SignInForm';
import Layout from './components/Layout';
import Home from './pages/Home/Home.jsx';
import Detail from './components/TourDetail/detail.jsx';




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <SignUpForm /> },
      { path: "/login", element: <SignInForm /> },
      { path: "/detail", element: <Detail />}
    ],
  },
]);

function App() {
  useEffect(() => {
    Modal.setAppElement(document.getElementById('root'));
  }, []);
  return (
      <>
        <div className='App'><RouterProvider router={router} /></div>
      </>
      
  );
}

export default App;
