import { lazy, Suspense } from "react";
import DefaultLayout from '@/layouts/Default';
// import Main from '@/pages/main.tsx'
// import '@/styles/index.css';

const view = () => {
  const MainComponent = lazy(() => import("./main"));
  
  return (
    <DefaultLayout>
      <Suspense>
        <MainComponent />
      </Suspense >
    </DefaultLayout>
  )
};

export default view