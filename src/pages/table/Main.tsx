import { useState, useRef, useEffect } from "react";
import { DataTable, DataTableCellClickEvent } from "primereact/datatable";
// import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Tooltip } from "primereact/tooltip";
import Provider from "@/components/Provider";
import MainTopSection from "@/pages/table/MainTopSection";
import mainStyle from "@/styles/table/main.module.css";
import { rangeArray } from "@/Utils";
import {
    tableCellMap,
    tableEditAvailableKey,
    getTimeRecord,
    isEmptyValueDay,
    bodyCellClassName,
    bodyTemplate,
    createCellChild,
} from "@/utils/table/Utils";
import type { timeRecordType, mainTableHeaderType } from "@/type/table/TableType";

const App = () => {
    const [timeRecord, setTimeRecord] = useState<timeRecordType[]>([]);
    const [selectYear, setSelectYear] = useState<number>(0);
    const [selectMonth, setSelectMonth] = useState<number>(0);
    // const selectYear = useRef<Dropdown>(null);
    // const selectMonth = useRef<Dropdown>(null);
    // const selectYear = useRef<number>(0);
    // const selectMonth = useRef<number>(0);

    const eventAvailableCell = useRef<{
        [rowIndex: number]: Array<number>;
    }>({});
    const fixedArriveTime = useRef<string>("");
    const fixedLeavingTime = useRef<string>("");
    const fixedlunchTime = useRef<string>("");
    // const totalPredictionWorkingTime = useRef<string>("0:00");

    const headerObj: mainTableHeaderType = [
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

    // const footerGroup = (
    //     <ColumnGroup>
    //         <Row>
    //             <Column
    //                 className={bodyCellClassName("dummy")}
    //                 footer="予働計"
    //                 colSpan={4}
    //                 footerStyle={{ textAlign: "right" }}
    //             />
    //             <Column
    //                 className={(() => bodyCellClassName("dummy"))() + ` ${mainStyle["dataTableBodyCellBackground"]}`}
    //                 footer="123"
    //             />
    //             <Column className={bodyCellClassName("dummy")} footer="実働計" colSpan={3} />
    //             <Column
    //                 className={(() => bodyCellClassName("dummy"))() + ` ${mainStyle["dataTableBodyCellBackground"]}`}
    //                 footer="123"
    //             />
    //             <Column className={bodyCellClassName("dummy")} footer="" colSpan={5} />
    //             <Column
    //                 className={(() => bodyCellClassName("dummy"))() + ` ${mainStyle["dataTableBodyCellBackground"]}`}
    //                 footer="123"
    //             />
    //         </Row>
    //     </ColumnGroup>
    // );

    useEffect(() => {
        // ref
        // selectYear.current = 2024;
        // selectMonth.current = 7;
        fixedArriveTime.current = "9:00";
        fixedLeavingTime.current = "18:00";
        fixedlunchTime.current = "1:00";

        const tempSelectYear = 2024;
        const tempSelectMonth = 7;

        setSelectYear(tempSelectYear);
        setSelectMonth(tempSelectMonth);

        const record = getTimeRecord(
            tempSelectYear,
            tempSelectMonth,
            // selectYear,
            // selectMonth,
            // selectYear.current,
            // selectMonth.current,
            fixedArriveTime.current,
            fixedLeavingTime.current,
            fixedlunchTime.current
        );

        // edit利用可能セル
        for (const [index, recordValue] of Object.entries(record)) {
            if (!isEmptyValueDay(recordValue.day)) {
                // eventInvalidCellInfo.current[parseInt(index) + 1] = [...rangeArray(1, Object.keys(record).length)];
                eventAvailableCell.current[parseInt(index)] = [...rangeArray(1, Object.keys(record).length)]
                    .filter((_v, idx) => tableEditAvailableKey.indexOf(tableCellMap[idx + 1]) !== -1)
                    .map((v) => v - 1);
            }
        }

        // setTimeout(() => {
        //     setTimeRecord(record);

        //     // setLoading(false);
        // }, 1000);

        setTimeRecord(record);
    }, []);

    return (
        <Provider
            {...{
                setTimeRecord: setTimeRecord,
                selectYear: selectYear,
                setSelectYear: setSelectYear,
                selectMonth: selectMonth,
                setSelectMonth: setSelectMonth,
                fixedArriveTime: fixedArriveTime,
                fixedLeavingTime: fixedLeavingTime,
                fixedlunchTime: fixedlunchTime,
            }}
        >
            <main id={mainStyle.main}>
                <MainTopSection />

                <section id={mainStyle["mainTableSection"]}>
                    {/* <DataTable
                        id={mainStyle["mainDataTable"]}
                        value={timeRecord}
                        headerColumnGroup={headerGroup}
                        // footerColumnGroup={footerGroup}
                        // lazy={true}
                        // loading={loading}
                        // editMode="cell"
                        emptyMessage={"データ読み込み中..."}
                        cellSelection
                        // selectionMode="single"
                        onCellSelect={cellSelectHandler}
                    >
                        <Column bodyClassName={bodyCellClassName} field="1" />
                        <Column bodyClassName={bodyCellClassName} field="2" />
                        <Column bodyClassName={bodyCellClassName} field="3" bodyStyle={{ minWidth: "80px" }} />
                        <Column bodyClassName={bodyCellClassName} field="4" bodyStyle={{ minWidth: "80px" }} />
                        <Column
                            bodyClassName={(content) => {
                                return bodyCellClassName(content) + ` ${mainStyle["dataTableBodyCellBackground"]}`;
                            }}
                            field="5"
                            bodyStyle={{ minWidth: "80px" }}
                        />
                        <Column
                            bodyClassName={bodyCellClassName}
                            field="6"
                            bodyStyle={{ minWidth: "80px" }}
                            // editor={(options: ColumnEditorOptions) => cellEditor(options)}
                            // onCellEditComplete={onCellEditComplete}
                        />
                        <Column bodyClassName={bodyCellClassName} field="7" bodyStyle={{ minWidth: "80px" }} />
                        <Column bodyClassName={bodyCellClassName} field="8" bodyStyle={{ minWidth: "80px" }} />
                        <Column
                            bodyClassName={(content) => {
                                return bodyCellClassName(content) + ` ${mainStyle["dataTableBodyCellBackground"]}`;
                            }}
                            field="9"
                            bodyStyle={{ minWidth: "80px" }}
                        />
                        <Column bodyClassName={bodyCellClassName} field="10" />
                        <Column bodyClassName={bodyCellClassName} field="11" />
                        <Column bodyClassName={bodyCellClassName} field="12" />
                        <Column bodyClassName={bodyCellClassName} field="13" bodyStyle={{ minWidth: "80px" }} />
                        <Column bodyClassName={bodyCellClassName} field="14" />
                        <Column
                            bodyClassName={(content) => {
                                return bodyCellClassName(content) + ` ${mainStyle["dataTableBodyCellBackground"]}`;
                            }}
                            field="15"
                            style={{ minWidth: "80px" }}
                        />
                    </DataTable> */}
                    <DataTable
                        key={`${selectYear}/${selectMonth}`}
                        id={mainStyle["mainDataTable"]}
                        value={timeRecord}
                        headerColumnGroup={headerGroup}
                        // footerColumnGroup={footerGroup}
                        // lazy={true}
                        // loading={loading}
                        // editMode="cell"
                        emptyMessage={"データ読み込み中..."}
                        cellSelection
                        // selectionMode="single"
                        onCellSelect={cellSelectHandler}
                    >
                        <Column bodyClassName={bodyCellClassName} field="date" body={bodyTemplate} />
                        <Column bodyClassName={bodyCellClassName} field="day" body={bodyTemplate} />
                        <Column
                            bodyClassName={bodyCellClassName}
                            field="scheduleArriveWorkTime"
                            bodyStyle={{ minWidth: "80px" }}
                            body={bodyTemplate}
                        />
                        <Column
                            bodyClassName={bodyCellClassName}
                            field="scheduleLeavingWorkTime"
                            bodyStyle={{ minWidth: "80px" }}
                            body={bodyTemplate}
                        />
                        <Column
                            bodyClassName={(content, options) => {
                                return (
                                    bodyCellClassName(content, options) + ` ${mainStyle["dataTableBodyCellBackground"]}`
                                );
                            }}
                            field="schedulePredictionWorkingTime"
                            bodyStyle={{ minWidth: "80px" }}
                            body={bodyTemplate}
                        />
                        <Column
                            bodyClassName={bodyCellClassName}
                            field="actualArriveWorkTime"
                            bodyStyle={{ minWidth: "80px" }}
                            body={bodyTemplate}
                        />
                        <Column
                            bodyClassName={bodyCellClassName}
                            field="actualLeavingWorkTime"
                            bodyStyle={{ minWidth: "80px" }}
                            body={bodyTemplate}
                        />
                        <Column
                            bodyClassName={bodyCellClassName}
                            field="actualBreaktime"
                            bodyStyle={{ minWidth: "80px" }}
                            body={bodyTemplate}
                        />
                        <Column
                            bodyClassName={(content, options) => {
                                return (
                                    bodyCellClassName(content, options) + ` ${mainStyle["dataTableBodyCellBackground"]}`
                                );
                            }}
                            field="actualWorkingTime"
                            bodyStyle={{ minWidth: "80px" }}
                            body={bodyTemplate}
                        />
                        <Column bodyClassName={bodyCellClassName} field="nightWorkingTime" body={bodyTemplate} />
                        <Column bodyClassName={bodyCellClassName} field="paidLeaveApplydate" body={bodyTemplate} />
                        <Column bodyClassName={bodyCellClassName} field="paidLeaveApplyHour" body={bodyTemplate} />
                        <Column
                            bodyClassName={bodyCellClassName}
                            field="AnyApplicationKind"
                            bodyStyle={{ minWidth: "80px" }}
                            body={bodyTemplate}
                        />
                        <Column bodyClassName={bodyCellClassName} field="approval" body={bodyTemplate} />
                        <Column
                            bodyClassName={(content, options) => {
                                return (
                                    bodyCellClassName(content, options) + ` ${mainStyle["dataTableBodyCellBackground"]}`
                                );
                            }}
                            field="overtimeWorkingTime"
                            style={{ minWidth: "80px" }}
                            body={bodyTemplate}
                        />
                    </DataTable>
                </section>
            </main>

            <Tooltip target={mainStyle["dataTableBodyCellTextEllipsis"]} />
        </Provider>
    );

    function cellSelectHandler(e: DataTableCellClickEvent<timeRecordType[]>) {
        const target = e.originalEvent.target as HTMLElement;
        const parent = (target.tagName.toLowerCase() == "td" ? target : target.closest("td")) as HTMLElement;
        const availableCell = eventAvailableCell.current;
        const row = e.rowIndex;
        const cell = e.cellIndex;
        const selectField = e["field"] as keyof timeRecordType;

        // temp input
        const input = document.createElement("input");
        input.type = "text";
        input.value = e.value || target.innerText;
        input.classList.add(mainStyle["editInputText"]);

        // input handle
        input.addEventListener("blur", inputEventHandler);
        input.addEventListener("keydown", (e) => (e.key == "Enter" ? inputEventHandler(e) : false));

        if (row in availableCell && availableCell[row].indexOf(cell) !== -1) {
            target.appendChild(input);
            input.focus();
        } else {
            return false;
        }

        function inputEventHandler(event: Event) {
            const inputTarget = event.currentTarget as HTMLInputElement;
            const value = inputTarget.value;

            // cell
            const temp = document.createElement("div") as HTMLElement;
            temp.innerHTML = createCellChild(value, true) as string;
            const div = temp.children[0] as HTMLElement;

            parent.innerHTML = "";
            parent.appendChild(div);

            // save data
            timeRecord[row][selectField] = value;
            setTimeRecord(timeRecord);

            // temp input remove
            input.remove();
        }
    }
};

export default App;
