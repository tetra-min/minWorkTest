// export const request = () => {
//     const url = "http://localhost:5174/"
//     // const url = "https://kvcu59ecv7.execute-api.ap-northeast-1.amazonaws.com/";

//     const data = fetch(url);

//     data.then((res) => {
//         console.log(res.json());
//     });
// };

type members = Pick<RequestWrap, "url" | "param" | "method" | "headers" | "setHeaders" | "body">;

export default class RequestWrap {
    url: string;

    param?: Record<string, any>;

    method?: string;

    headers?: Headers;

    setHeaders?: Record<string, any>;

    body?: Blob | BufferSource | FormData | URLSearchParams | string | ReadableStream;

    response: any;

    end: boolean = false;

    time: number;

    constructor(setVariables: members) {
        this.url = setVariables.url;
        this.time = Date.now();

        for (const key in setVariables) {
            const property = key as never;

            // 既にセットしている
            if (typeof this[property] !== "undefined") {
                continue;
            }
            // if (property == "url" || property == "method") {
            //     continue;
            // }

            if (typeof this.headers == "undefined" && (property == "setHeaders" || property == "headers")) {
                this.headers =
                    typeof setVariables.headers == typeof Headers
                        ? setVariables.headers
                        : setVariables.setHeaders
                        ? (() => {
                              const headers = new Headers();
                              for (const [name, value] of setVariables.setHeaders.entries()) {
                                  headers.append(name, value);
                              }
                              return headers;
                          })()
                        : setVariables.headers;
                continue;
            }

            if (setVariables[property]) {
                this[property] = setVariables[property];
            }
        }

        // this.url = setVariables.url;
        // this.param = setVariables.param ? setVariables.param : {};
        // this.method = setVariables.method;
        // this.headers =
        //     typeof setVariables.headers == typeof Headers
        //         ? setVariables.headers
        //         : setVariables.setHeaders
        //         ? (() => {
        //               const headers = new Headers();

        //               for (const [name, value] of setVariables.setHeaders.entries()) {
        //                   headers.append(name, value);
        //               }

        //               return headers;
        //           })()
        //         : setVariables.headers;

        // this.body = setVariables.body;
    }

    async asyncSend() {
        const setRequest = new Request(this.url, {
            method: this.method,
            headers: this.headers,
            body: this.body,
        });

        try {
            this.response = await fetch(setRequest);
            this.response = await this.response.json();
        } catch (e) {
            console.log(e);
        }

        return this.response;
    }

    // send() {
    //     this.asyncSend().then(() => {
    //     });

    //     // this.asyncSend();
    //     // this.wait();
    // }

    // wait() {
    //     const maxWaitSeconds = 1000 * 2;

    //     // if (Date.now() - this.time <= maxWaitSeconds) {
    //     //     this.wait();
    //     // }
    // }

    // getResponse() {
    //     this.send();

    //     return this.response;
    // }
}
