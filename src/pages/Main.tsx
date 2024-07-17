// import { useState } from "react";
import { Link } from "react-router-dom";
// import reactLogo from "@/assets/react.svg";
// import viteLogo from "/vite.svg";
import inlineStyle from "@/styles/main.css?inline";

function App() {
    // const [count, setCount] = useState(0);

    return (
        <>
            <div id="main">
                {/* <div>
                    <a href="https://vitejs.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo" />
                    </a>
                </div> */}
                <h1>Min Test</h1>
                {/* <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                    <p>
                        Edit <code>src/App.tsx</code> and save to test HMR
                    </p>
                </div> */}
                <p className="read-the-docs">リンク</p>
                <Link to="/table">Go test2!</Link>
                <br />
                <Link to="/test2/test21">Go test21!</Link>
            </div>
            <style>{inlineStyle}</style>
        </>
    );
}

export default App;
