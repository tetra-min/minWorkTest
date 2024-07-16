import React from "react";
import ReactDOM from "react-dom/client";
import Router from "@/Router";
import { RouterProvider } from "react-router-dom";
import "@/App.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

(() => {
    const rootElement = document.getElementById("root");

    ReactDOM.createRoot(rootElement!).render(
        <React.StrictMode>
            <RouterProvider router={Router} />
        </React.StrictMode>
    );
})();
