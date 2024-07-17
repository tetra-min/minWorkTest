import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import headerStyle from "@/styles/header.module.css";

const Header = () => {
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        window.addEventListener("load", () => {
            const root = document.documentElement;
            const headerElement = headerRef.current as HTMLElement;
            const headerHeight = headerElement.offsetHeight;

            root.style.setProperty("--headerHeight", headerHeight + "px");
        });
    }, []);

    return (
        <>
            <header id={headerStyle.header} ref={headerRef}>
                <div className={headerStyle.headerFlexBlock}>
                    <div>
                        <Link to="/">
                            <img className={headerStyle.headerChild1Img} src="/tetra_logo.png" />
                        </Link>
                    </div>
                    <div></div>
                </div>
            </header>
        </>
    );
};

export default Header;
