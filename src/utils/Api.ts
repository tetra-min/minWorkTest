

export const request = () => {
    const url = "http://localhost:5174/"
    // const url = "https://kvcu59ecv7.execute-api.ap-northeast-1.amazonaws.com/";

    const data = fetch(url);

    data.then((res) => {
        console.log(res.json());
    });
};