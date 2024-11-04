import { useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Modal from 'react-modal';
import {HomePage} from './pages/Home'
import {News} from './pages/News'
import {Contact} from './pages/Contact'
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/news", element: <News /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);

function App() {
  useEffect(() => {
    Modal.setAppElement(document.getElementById('root'));
  }, []);
  return (
      <RouterProvider router={router} />
  );
}

export default App;
