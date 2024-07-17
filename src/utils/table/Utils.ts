import mainStyle from "@/styles/table/main.module.css";
import type { timeRecordType } from "@/type/table/TableType";

export function getTimeRecord(
    currentYear: number,
    currentMonth: number,
    fixedArriveTime: string,
    fixedLeavingTime: string,
    fixedlunchTime: string
): timeRecordType {
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
        const tempDate = `${year}/${month}/${i}`;
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

        // 土, 日
        if (isEmptyValueDay(dayStr)) {
            temp.scheduleArriveWorkTime = "";
            temp.scheduleLeavingWorkTime = "";
            temp.schedulePredictionWorkingTime = "";
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
        }

        resultTimeRecord.push(temp);
    }

    return resultTimeRecord;
}

export function isEmptyValueDay(day: string) {
    return ["土", "日"].indexOf(day) !== -1;
}

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

export function bodyCellClassName(content: any) {
    let name = "" || `${mainStyle["dataTableCellPadding"]} ${mainStyle["dataTableBodyCell"]}`;

    if (content.day == "土") {
        name += " " + mainStyle["dataTableBodySaturDay"];
    }

    if (content.day == "日") {
        name += " " + mainStyle["dataTableBodySunday"];
    }

    return name;
}

export function hoursFormat(hours: number, minutes: number) {
    return `${Math.floor(hours).toString()}:${minutes.toString().padStart(2, "0")}`;
}
