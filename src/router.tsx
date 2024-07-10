import { createBrowserRouter } from "react-router-dom";
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import Main from "@/pages/index";
import Index from "@/pages/index";

const router = (() => {
    // const modules = import.meta.glob('@/**/**.tsx')
    // console.log(modules);

    const resolveRouter = createBrowserRouter([
        {
            path: "/", 
            element: <Index />,
        },
        {
            path: "/test", 
            element: <h1>hello World test</h1>,
        },
    ]);

    return resolveRouter;
})();

export default router;