import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from '@/router';
import { RouterProvider } from "react-router-dom";
import '@/App.css';

(() => {
  const rootElement = document.getElementById('root');

  ReactDOM.createRoot(rootElement!).render(
    <React.StrictMode>
        <RouterProvider router={Router} />
    </React.StrictMode>,
  )
})();
