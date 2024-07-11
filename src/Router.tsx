import { Suspense, lazy, createElement, ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import { PAGE_DIR, LAYOUT_DIR } from "@/../env";
import { uniqueArr } from "@/Utils";

// import DefaultLayout from "@/layouts/Layout";
// import DefaultMain from "@/pages/Main";
// import testMain from "@/pages/test/Main";

const router = (() => {
    let routePath: Array<string> = ["/"];
    let routeParam: Array<{
        path: string,
        element: ReactNode,
        loader?: any,
        children?: [
            {
                path: string,
                element: ReactNode,
                loader?: any,
            },
        ]
    }> = [];

    const pagesTsx = import.meta.glob('@/pages/**');
    const layoutsTsx = import.meta.glob('@/layouts/**');
    const pageDir = PAGE_DIR;
    const layoutDir = LAYOUT_DIR;

    /* routePath set */
    Object.keys(pagesTsx).forEach((v) => {
        const splitPathArr = v.replace(pageDir, "").split("/");

        const path = splitPathArr.slice(0, splitPathArr.length - 1).join("/");

        if (path) {
            routePath.push(path);
        }
    });

    /* 重複あれば除去 */
    routePath = uniqueArr(routePath) as Array<string>;

    /* routeParam set */
    if (routePath.length) {
        routeParam = routePath.map((path) => {
            let mainPath = pageDir + '/Main';
            let layoutPath = layoutDir + '/Layout';

            if (path !== "/") {
                for (const pageTsxPath in pagesTsx) {
                    const checkMainPath = pageDir + path + '/Main';
    
                    if (pageTsxPath.indexOf(checkMainPath) !== -1) {
                        mainPath = checkMainPath;
                        break;
                    }
                }

                for (const layoutTsxPath in layoutsTsx) {
                    const checkLayoutPath = layoutDir + path + '/Layout';
    
                    if (layoutTsxPath.indexOf(checkLayoutPath) !== -1) {
                        layoutPath = checkLayoutPath;
                        break;
                    }
                }
            }

            const mainComponent = lazy(() => import(mainPath));
            const layoutComponent = lazy(() => import(layoutPath));
            
            return {
                path: path,
                element: createElement(Suspense, {}, createElement(layoutComponent, {}, [createElement(mainComponent)])),
            };
        });
    }

    return createBrowserRouter(routeParam);
})();

export default router;