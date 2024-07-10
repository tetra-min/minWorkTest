// import { ReactNode } from 'react';
import Header from '@/pages/Header';
import Footer from '@/pages/Footer';

const defaultLayout = ({ children }: { children?: JSX.Element }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default defaultLayout;