import { Link } from "react-router-dom";
import headerStyle from "@/styles/header.module.css";

const Header = () => {
    return (
        <>
            <header id={headerStyle.header}>
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
