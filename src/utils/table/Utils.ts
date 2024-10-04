import mainStyle from "@/styles/table/main.module.css";
import type { timeRecordType, holidayType } from "@/type/table/TableType";
import { ColumnBodyOptions } from "primereact/column";
import { createElement } from "react";

/* Cell Map
1: 日
2: 曜日
3: 予定-出社
4: 予定-退社
5: 予定-予働（h）
6: 実績-出社
7: 実績-退社
8: 実績-休憩時間
9: 実績-実働（h）
10: 深夜実績 実働(h)
11: 日有給申請
12: 時間有給申請
13: 適用
14: 承認
15 :overtime-実績
*/

export const tableCellKeyName: {
    [key: string]: string;
} = {
    date: "日",
    day: "曜日",
    scheduleArriveWorkTime: "出社",
    scheduleLeavingWorkTime: "退社",
    schedulePredictionWorkingTime: "予働(h)",
    actualArriveWorkTime: "出社",
    actualLeavingWorkTime: "退社",
    actualBreaktime: "休憩時間",
    actualWorkingTime: "実働(h)",
    nightWorkingTime: "深夜実績 実働(h)",
    paidLeaveApplydate: "日有給申請",
    paidLeaveApplyHour: "時間有給申請",
    AnyApplicationKind: "適用",
    approval: "承認",
    overtimeWorkingTime: "実績",
};

export const tableCellMap: {
    [key: string]: string;
} = {
    1: "date",
    2: "day",
    3: "scheduleArriveWorkTime",
    4: "scheduleLeavingWorkTime",
    5: "schedulePredictionWorkingTime",
    6: "actualArriveWorkTime",
    7: "actualLeavingWorkTime",
    8: "actualBreaktime",
    9: "actualWorkingTime",
    10: "nightWorkingTime",
    11: "paidLeaveApplydate",
    12: "paidLeaveApplyHour",
    13: "AnyApplicationKind",
    14: "approval",
    15: "overtimeWorkingTime",
};

export const reverseTableCellMap: {
    [key: string]: string;
} = Object.fromEntries(Object.entries(tableCellMap).map(([k, v]) => [v, k]));

export const tableEditAvailableKey = [
    "actualArriveWorkTime",
    "actualLeavingWorkTime",
    "nightWorkingTime",
    "paidLeaveApplydate",
    "paidLeaveApplyHour",
    "AnyApplicationKind",
    "approval",
];

export function getInitTimeRecord(
    currentYear: number,
    currentMonth: number,
    fixedArriveTime: string,
    fixedLeavingTime: string,
    fixedlunchTime: string,
    holiday: holidayType = {}
): timeRecordType[] {
    const year = currentYear;
    const month = currentMonth;
    const lastDate = getLastDate(year, month);
    const startTime = fixedArriveTime;
    const endTime = fixedLeavingTime;
    const defaultBreakTime = fixedlunchTime;
    const schedulePredictionWorkingTime = calcHoursDiff(startTime, endTime, defaultBreakTime);
    // const actualArriveWorkTime = "9:00";
    // const actualLeavingWorkTime = "19:03";
    const resultTimeRecord = [];

    for (let i = 1; i <= lastDate; i++) {
        const padDate = i.toString().padStart(2, "0");
        const tempDate = `${year}/${month}/${padDate}`;
        const dayStr = getDayString(tempDate);

        const temp = {
            date: i,
            day: dayStr,
            scheduleArriveWorkTime: startTime,
            scheduleLeavingWorkTime: endTime,
            schedulePredictionWorkingTime: schedulePredictionWorkingTime,
            actualArriveWorkTime: "",
            actualLeavingWorkTime: "",
            actualBreaktime: defaultBreakTime,
            actualWorkingTime: "",
            nightWorkingTime: "",
            paidLeaveApplydate: "",
            paidLeaveApplyHour: "",
            AnyApplicationKind: "",
            approval: "",
            overtimeWorkingTime: "",
        };

        // 土, 日, 祝日
        if (isEmptyValueDay(dayStr) || (holiday[year] && tempDate in holiday[year])) {
            temp.scheduleArriveWorkTime = "";
            temp.scheduleLeavingWorkTime = "";
            temp.schedulePredictionWorkingTime = "";
            temp.actualArriveWorkTime = "";
            temp.actualLeavingWorkTime = "";
            temp.actualBreaktime = "";
            temp.actualWorkingTime = "";
            temp.nightWorkingTime = "";
            temp.paidLeaveApplydate = "";
            temp.paidLeaveApplyHour = "";
            temp.AnyApplicationKind = "";
            temp.approval = "";
            temp.overtimeWorkingTime = "";

            if (holiday[year] && tempDate in holiday[year]) {
                temp.day += "(祝)";
                temp.AnyApplicationKind = holiday[year][tempDate];
            }
        }

        // const temp = {
        //     1: i,
        //     2: dayStr,
        //     3: startTime,
        //     4: endTime,
        //     5: schedulePredictionWorkingTime,
        //     6: "",
        //     7: "",
        //     8: defaultBreakTime,
        //     9: "",
        //     10: "",
        //     11: "",
        //     12: "",
        //     13: "",
        //     14: "",
        //     15: "",
        // };

        // // 土, 日
        // if (isEmptyValueDay(dayStr)) {
        //     temp[3] = "";
        //     temp[4] = "";
        //     temp[5] = "";
        //     temp[6] = "";
        //     temp[7] = "";
        //     temp[8] = "";
        //     temp[9] = "";
        //     temp[10] = "";
        //     temp[11] = "";
        //     temp[12] = "";
        //     temp[13] = "";
        //     temp[14] = "";
        //     temp[15] = "";
        // }

        resultTimeRecord.push(temp);
    }

    return resultTimeRecord;
}

export function isEmptyValueDay(day: string) {
    return ["土", "日"].indexOf(day) !== -1 || day.indexOf("(祝)") !== -1;
}

// export function isEmptyValueDay(date: string) {
//     const day = new Date(date).getDay();

//     // 土, 日
//     if ([0, 6].indexOf(day) !== -1) {
//         return true;
//     }

//     return false;
// }

export function getLastDate(year: number, month: number = 1) {
    const date = new Date(year, month, 0);

    return date.getDate();
}

export function getDayString(currentDate: string) {
    const date = new Date(currentDate);
    const dayNumber = date.getDay();

    const dayMap = ["日", "月", "火", "水", "木", "金", "土"];

    return dayMap[dayNumber];
}

export function calcHoursDiff(startTime: string, endTime: string, breakTime: string = "") {
    const [startHours, startMinutes] = startTime.split(":");
    const [endHours, endMinutes] = endTime.split(":");
    const startDateTime = parseInt(startHours) * 60 + parseInt(startMinutes);
    const endDateTime = parseInt(endHours) * 60 + parseInt(endMinutes);

    let diffMinutes = 0;

    if (breakTime) {
        const [breakHours, breakMinutes] = breakTime.split(":");
        const breakDateTime = parseInt(breakHours) * 60 + parseInt(breakMinutes);

        diffMinutes = endDateTime - startDateTime - breakDateTime;
    } else {
        diffMinutes = endDateTime - startDateTime;
    }

    return hoursFormat(diffMinutes / 60, diffMinutes % 60);
}

export function calcHoursAdd(targetTime: string, addTime: string) {
    const [startHours, startMinutes] = targetTime.split(":");
    const [endHours, endMinutes] = addTime.split(":");
    const startDateTime = parseInt(startHours) * 60 + parseInt(startMinutes);
    const endDateTime = parseInt(endHours) * 60 + parseInt(endMinutes);
    const addMinutes = startDateTime + endDateTime;

    return hoursFormat(addMinutes / 60, addMinutes % 60);
}

export function reduceCalcHoursAdd(accumulator: string, currentValue: timeRecordType, useKey: string) {
    const key = useKey as keyof timeRecordType;

    if (currentValue[key]) {
        return calcHoursAdd(accumulator, currentValue[key] as string);
    } else {
        return accumulator;
    }
}

export function bodyCellClassName(content: any, options: ColumnBodyOptions) {
    const field = options.field;
    let name = `${mainStyle["dataTableCellPadding"]} ${mainStyle["dataTableBodyCell"]}` || "";

    if (isEmptyValueDay(content.day)) {
        name += " " + mainStyle["dataTableBodyDisable"];
        return name;
    }

    // if (content.day == "土") {
    //     name += " " + mainStyle["dataTableBodySaturDay"];
    // }

    // if (content.day == "日") {
    //     name += " " + mainStyle["dataTableBodySunday"];
    // }

    if (tableEditAvailableKey.indexOf(field) !== -1) {
        name += " " + mainStyle["editAvailable"];
    }

    // if (content[2] == "土") {
    //     name += " " + mainStyle["dataTableBodySaturDay"];
    // }

    // if (content[2] == "日") {
    //     name += " " + mainStyle["dataTableBodySunday"];
    // }

    return name;
}

export function bodyTemplate(rowData: timeRecordType, options: ColumnBodyOptions) {
    // console.log(options);
    const field = options["field"] as keyof timeRecordType;

    return createCellChild(rowData[field]);
}

export function hoursFormat(hours: number, minutes: number) {
    if (isNaN(hours) || isNaN(minutes)) {
        return "";
    }

    return `${Math.floor(hours).toString()}:${minutes.toString().padStart(2, "0")}`;
}

export function createCellChild(text: any, html: boolean = false) {
    if (html) {
        return `
            <div class="${mainStyle["dataTableBodyCellTextEllipsis"]}">
                ${text}
            </div>
        `;
    }

    return createElement("div", { className: mainStyle["dataTableBodyCellTextEllipsis"] }, text);
}
