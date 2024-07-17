// import { createElement } from "react";
import Context from "@/components/Context";

const Provider = (props: any) => {
    const children: JSX.Element = props.children;

    return <Context.Provider value={props}>{children}</Context.Provider>;
};

// const Provider = <T extends Record<string, any>>(props: any) => {
//     const useProps = props as T;

//     return createElement(Context<T>(useProps).Provider, { value: useProps }, [props.children]);
// };

export default Provider;
