import { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import mainStyle from "@/styles/table/main.module.css";

type timeRecordType = Array<{
    date: number;
    day: string;
    scheduleArriveWorkTime: string | null | "";
    scheduleLeavingWorkTime: string | null | "";
    schedulePredictionWorkingTime: string | null | "";
    actualArriveWorkTime: string | null | "";
    actualLeavingWorkTime: string | null | "";
    actualBreaktime: string | null | "";
    actualWorkingTime: string | null | "";
    nightWorkingTime: string | null | "";
    paidLeaveApplydate: string | null | "";
    paidLeaveApplyHour: string | null | "";
    AnyApplicationKind: string | null | "";
    approval: string | null | "";
    overtimeWorkingTime: string | null | "";
}>;

const App = () => {
    const [timeRecord, setTimeRecord] = useState<timeRecordType>([]);
    const selectedYear = useRef<number>(0);
    const selectedMonth = useRef<number>(0);
    // const totalPredictionWorkingTime = useRef<string>("0:00");

    const headerObj: Array<
        Array<{
            header: string;
            rowSpan?: number;
            colSpan?: number;
            className?: string;
            width?: string;
        }>
    > = [
        [
            {
                header: "日",
                rowSpan: 2,
                className: `${mainStyle["dataTableCellPadding"]} ${mainStyle["dataTableHeaderCell"]}`,
            },
            {
                header: "曜日",
                rowSpan: 2,
                className: `${mainStyle["dataTableCellPadding"]} ${mainStyle["dataTableHeaderCell"]}`,
            },
            {
                header: "予定",
                colSpan: 3,
                className: `${mainStyle["dataTableCellPadding"]} ${mainStyle["dataTableHeaderCell"]} ${mainStyle["borderBottomNone"]}`,
            },
            {
                header: "実績",
                colSpan: 4,
                className: `${mainStyle["dataTableCellPadding"]} ${mainStyle["dataTableHeaderCell"]} ${mainStyle["borderBottomNone"]}`,
            },
            {
                header: "深夜実績\n実働(h)",
                rowSpan: 2,
                className: `${mainStyle["dataTableCellPadding"]} ${mainStyle["dataTableHeaderCell"]}`,
            },
            {
                header: "日有給申請",
                rowSpan: 2,
                className: `${mainStyle["dataTableCellPadding"]} ${mainStyle["dataTableHeaderCell"]}`,
            },
            {
                header: "時間\n有給申請",
                rowSpan: 2,
                className: `${mainStyle["dataTableCellPadding"]} ${mainStyle["dataTableHeaderCell"]}`,
            },
            {
                header: "適用",
                rowSpan: 2,
                className: `${mainStyle["dataTableCellPadding"]} ${mainStyle["dataTableHeaderCell"]}`,
            },
            {
                header: "承認",
                rowSpan: 2,
                className: `${mainStyle["dataTableCellPadding"]} ${mainStyle["dataTableHeaderCell"]}`,
            },
            {
                header: "overtime",
                className: `${mainStyle["dataTableCellPadding"]} ${mainStyle["dataTableHeaderCell"]} ${mainStyle["borderBottomNone"]}`,
            },
        ],
        [
            {
                header: "出社",
                className: `${mainStyle["dataTableCellPadding"]} ${mainStyle["dataTableHeaderCell"]} ${mainStyle["borderLeftNone"]}`,
            },
            {
                header: "退社",
                className: `${mainStyle["dataTableCellPadding"]} ${mainStyle["dataTableHeaderCell"]}`,
            },
            {
                header: "予働（h）",
                className: `${mainStyle["dataTableCellPadding"]} ${mainStyle["dataTableHeaderCell"]} ${mainStyle["dataTableBodyCellBackground"]}`,
            },
            {
                header: "出社",
                className: `${mainStyle["dataTableCellPadding"]} ${mainStyle["dataTableHeaderCell"]}`,
            },
            {
                header: "退社",
                className: `${mainStyle["dataTableCellPadding"]} ${mainStyle["dataTableHeaderCell"]}`,
            },
            {
                header: "休憩時間",
                className: `${mainStyle["dataTableCellPadding"]} ${mainStyle["dataTableHeaderCell"]}`,
            },
            {
                header: "実働（h）",
                className: `${mainStyle["dataTableCellPadding"]} ${mainStyle["dataTableHeaderCell"]} ${mainStyle["dataTableBodyCellBackground"]}`,
            },
            {
                header: "実績",
                className: `${mainStyle["dataTableCellPadding"]} ${mainStyle["dataTableHeaderCell"]} ${mainStyle["dataTableBodyCellBackground"]}`,
            },
        ],
    ];

    const headerGroup = (
        <ColumnGroup>
            {(() => {
                const result: any = [];

                for (const [headerKey, headers] of headerObj.entries()) {
                    const pushColumn = [];

                    for (const [itemKey, item] of headers.entries()) {
                        pushColumn.push(
                            <Column
                                headerClassName={`
                                    ${item.className ? item.className : ""}
                                `}
                                alignHeader="center"
                                header={item.header}
                                colSpan={item.colSpan}
                                rowSpan={item.rowSpan}
                                key={`col_${itemKey}`}
                            ></Column>
                        );
                    }

                    result.push(<Row key={`row_${headerKey}`}>{pushColumn}</Row>);
                }

                return result;
            })()}
        </ColumnGroup>
    );

    const footerGroup = (
        <ColumnGroup>
            <Row>
                <Column
                    className={bodyCellClassName("dummy")}
                    footer="予働計"
                    colSpan={4}
                    footerStyle={{ textAlign: "right" }}
                />
                <Column
                    className={(() => bodyCellClassName("dummy"))() + ` ${mainStyle["dataTableBodyCellBackground"]}`}
                    footer="123"
                />
                <Column className={bodyCellClassName("dummy")} footer="実働計" colSpan={3} />
                <Column
                    className={(() => bodyCellClassName("dummy"))() + ` ${mainStyle["dataTableBodyCellBackground"]}`}
                    footer="123"
                />
                <Column className={bodyCellClassName("dummy")} footer="" colSpan={5} />
                <Column
                    className={(() => bodyCellClassName("dummy"))() + ` ${mainStyle["dataTableBodyCellBackground"]}`}
                    footer="123"
                />
            </Row>
        </ColumnGroup>
    );

    useEffect(() => {
        selectedYear.current = 2024;
        selectedMonth.current = 7;

        const record = getTimeRecord(selectedYear.current, selectedMonth.current);

        // for (const recordValue of record) {
        //     if (recordValue.schedulePredictionWorkingTime) {
        //         totalPredictionWorkingTime.current = calcHoursAdd(
        //             totalPredictionWorkingTime.current,
        //             recordValue.schedulePredictionWorkingTime
        //         );
        //     }
        // }

        setTimeRecord(record);
    }, []);

    return (
        <>
            <main id={mainStyle.main}>
                <div className="card">
                    <DataTable
                        value={timeRecord}
                        headerColumnGroup={headerGroup}
                        footerColumnGroup={footerGroup}
                        tableStyle={{ minWidth: "1200px" }}
                        editMode="cell"
                    >
                        <Column bodyClassName={bodyCellClassName} field="date" />
                        <Column bodyClassName={bodyCellClassName} field="day" />
                        <Column
                            bodyClassName={bodyCellClassName}
                            field="scheduleArriveWorkTime"
                            bodyStyle={{ minWidth: "80px" }}
                        />
                        <Column
                            bodyClassName={bodyCellClassName}
                            field="scheduleLeavingWorkTime"
                            bodyStyle={{ minWidth: "80px" }}
                        />
                        <Column
                            bodyClassName={(content) => {
                                return bodyCellClassName(content) + ` ${mainStyle["dataTableBodyCellBackground"]}`;
                            }}
                            field="schedulePredictionWorkingTime"
                            bodyStyle={{ minWidth: "80px" }}
                        />
                        <Column
                            bodyClassName={bodyCellClassName}
                            field="actualArriveWorkTime"
                            bodyStyle={{ minWidth: "80px" }}
                        />
                        <Column
                            bodyClassName={bodyCellClassName}
                            field="actualLeavingWorkTime"
                            bodyStyle={{ minWidth: "80px" }}
                        />
                        <Column
                            bodyClassName={bodyCellClassName}
                            field="actualBreaktime"
                            bodyStyle={{ minWidth: "80px" }}
                        />
                        <Column
                            bodyClassName={(content) => {
                                return bodyCellClassName(content) + ` ${mainStyle["dataTableBodyCellBackground"]}`;
                            }}
                            field="actualWorkingTime"
                            bodyStyle={{ minWidth: "80px" }}
                        />
                        <Column bodyClassName={bodyCellClassName} field="nightWorkingTime" />
                        <Column bodyClassName={bodyCellClassName} field="paidLeaveApplydate" />
                        <Column bodyClassName={bodyCellClassName} field="paidLeaveApplyHour" />
                        <Column
                            bodyClassName={bodyCellClassName}
                            field="AnyApplicationKind"
                            bodyStyle={{ minWidth: "80px" }}
                        />
                        <Column bodyClassName={bodyCellClassName} field="approval" />
                        <Column
                            bodyClassName={(content) => {
                                return bodyCellClassName(content) + ` ${mainStyle["dataTableBodyCellBackground"]}`;
                            }}
                            field="overtimeWorkingTime"
                            style={{ minWidth: "80px" }}
                        />
                    </DataTable>
                </div>
            </main>
        </>
    );
};

/* local function */
function getTimeRecord(currentYear: number, currentMonth: number): timeRecordType {
    const year = currentYear;
    const month = currentMonth;
    const lastDate = getLastDate(year, month);
    const startTime = "9:00";
    const endTime = "18:00";
    const defaultBreakTime = "1:00";
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

function getLastDate(year: number, month: number = 1) {
    const date = new Date(year, month, 0);

    return date.getDate();
}

function getDayString(currentDate: string) {
    const date = new Date(currentDate);
    const dayNumber = date.getDay();

    const dayMap = ["日", "月", "火", "水", "木", "金", "土"];

    return dayMap[dayNumber];
}

function calcHoursDiff(startTime: string, endTime: string, breakTime: string = "") {
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

// function calcHoursAdd(time: string, addTime: string) {
//     const [startHours, startMinutes] = time.split(":");
//     const [addHours, addMinutes] = addTime.split(":");
//     const startDateTime = parseInt(startHours) * 60 + parseInt(startMinutes);
//     const addDateTime = parseInt(addHours) * 60 + parseInt(addMinutes);

//     const minutes = startDateTime + addDateTime;

//     return hoursFormat(minutes / 60, minutes % 60);
// }

function bodyCellClassName(content: any) {
    let name = "" || `${mainStyle["dataTableCellPadding"]} ${mainStyle["dataTableBodyCell"]}`;

    if (content.day == "土") {
        name += " " + mainStyle["dataTableBodySaturDay"];
    }

    if (content.day == "日") {
        name += " " + mainStyle["dataTableBodySunday"];
    }

    return name;
}

function hoursFormat(hours: number, minutes: number) {
    return `${Math.floor(hours).toString()}:${minutes.toString().padStart(2, "0")}`;
}

function isEmptyValueDay(day: string) {
    return ["土", "日"].indexOf(day) !== -1;
}

export default App;
