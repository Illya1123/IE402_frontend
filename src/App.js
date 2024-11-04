import { useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Modal from 'react-modal';
import {HomePage} from './pages/Home'
import {News} from './pages/News'
import {Contact} from './pages/Contact'
import SignUpForm from './components/auth/SignUpForm';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/news", element: <News /> },
      { path: "/contact", element: <Contact /> },
      { path: "/register", element: <SignUpForm /> },
    ],
  },
]);

function App() {
  useEffect(() => {
    Modal.setAppElement(document.getElementById('root'));
  }, []);
  return (
      <div className='App'><RouterProvider router={router} /></div>
  );
}

export default App;
