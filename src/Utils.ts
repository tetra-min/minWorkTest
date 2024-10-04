import { useEffect, useState } from "react";
import RequestWrap from "@/utils/Request";

export const uniqueArr = (arr: Array<string | number>) => {
    return arr.filter((element, index) => {
        return arr.indexOf(element) === index;
    });
};

export const rangeArray = (start: number, end: number): Array<number> => {
    return Array.from(Array(end - start + 1)).map((_, k) => start + k);
};

export const convertToHalfWidth = (str: string): string => {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９：]/g, (s) => {
        return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
};

export const useScript = (src: string): [boolean, any] => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;

        if (!script) {
            script = document.createElement("script");
            script.src = src;
            script.async = true;
        }

        const handleLoad = () => setLoading(false);
        const handleError = (error: any) => setError(error);

        script.addEventListener("load", handleLoad);
        script.addEventListener("error", handleError);

        document.head.appendChild(script);

        return () => {
            script.removeEventListener("load", handleLoad);
            script.removeEventListener("error", handleError);
        };
    }, [src]);

    return [loading, error];
};

// export const request = async () => {
//     const result = (() => {
//         const reqObj = new Request();
//     })()

// console.log(result)
//     return result;
// };

export async function getHolidays(startDate: string, endDate: string) {
    // let result: Promise<any> = new Promise((res) => res({}));
    let result: any;

    // APIキー
    const apiKey = "AIzaSyATm3HujEVPlLxbST04VCJyYz491UEw4h0";

    // カレンダーID
    const calendarId = encodeURIComponent("ja.japanese#holiday@group.v.calendar.google.com"); // Googleの提供する日本の祝日カレンダー

    // データの開始日
    const tempStart = new Date(startDate);
    const start = `${tempStart
        .toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
        .replace(/\//g, "-")}T${tempStart.toLocaleTimeString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })}Z`;

    // データの終了日
    const tempEnd = new Date(endDate);
    const end = `${tempEnd
        .toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
        .replace(/\//g, "-")}T${tempEnd.toLocaleTimeString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })}Z`;

    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`;

    const searchParams = new URLSearchParams({
        key: apiKey,
        timeMin: start,
        timeMax: end,
        maxResults: "50",
        orderBy: "startTime",
        singleEvents: "true",
    });

    try {
        // https://www.googleapis.com/calendar/v3/calendars/japanese__ja@holiday.calendar.google.com/events?orderBy=startTime&singleEvents=true&timeMax=2024-12-31T23:59:59Z&timeMin=2024-01-01T00:00:00Z&key=AIzaSyATm3HujEVPlLxbST04VCJyYz491UEw4h0
        const response = await fetch(`${url}?${searchParams}`);

        if (!response.ok) {
            throw new Error(`get holiday response status: ${response.status}`);
        }

        result = await response.json();

        // const reqObj = new RequestWrap({
        //     url: `${url}?${searchParams}`,
        // });

        // // reqObj.send();

        // result = reqObj.asyncSend();
    } catch (error: any) {
        console.error(error.message);
    }

    return result;
}
